"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

export interface RaceTimer {
  currentTime: number; // milliseconds
  bestTime: number | null; // milliseconds
  lapTimes: number[]; // array of lap times in milliseconds
  currentLap: number;
  totalLaps: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

export function useRaceTimer(totalLaps: number = 1) {
  const [timer, setTimer] = useState<RaceTimer>({
    currentTime: 0,
    bestTime: null,
    lapTimes: [],
    currentLap: 1,
    totalLaps,
    isRunning: false,
    isPaused: false,
    isFinished: false
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const lastLapTimeRef = useRef<number>(0);

  // Start the timer
  const startTimer = useCallback(() => {
    if (timer.isFinished) return;

    const now = Date.now();
    if (timer.isPaused) {
      // Resume from pause
      const pauseDuration = now - pausedTimeRef.current;
      startTimeRef.current += pauseDuration;
      lastLapTimeRef.current += pauseDuration;
    } else {
      // Fresh start
      startTimeRef.current = now;
      lastLapTimeRef.current = now;
    }

    setTimer(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false
    }));

    intervalRef.current = setInterval(() => {
      const currentTime = Date.now() - startTimeRef.current;
      setTimer(prev => ({
        ...prev,
        currentTime
      }));
    }, 10); // Update every 10ms for smooth display
  }, [timer.isFinished, timer.isPaused]);

  // Pause the timer
  const pauseTimer = useCallback(() => {
    if (!timer.isRunning || timer.isPaused || timer.isFinished) return;

    pausedTimeRef.current = Date.now();
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimer(prev => ({
      ...prev,
      isRunning: false,
      isPaused: true
    }));
  }, [timer.isRunning, timer.isPaused, timer.isFinished]);

  // Stop the timer
  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimer(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      isFinished: true
    }));
  }, []);

  // Complete a lap
  const completeLap = useCallback(() => {
    if (!timer.isRunning || timer.isFinished) return;

    const now = Date.now();
    const lapTime = now - lastLapTimeRef.current;
    lastLapTimeRef.current = now;

    setTimer(prev => {
      const newLapTimes = [...prev.lapTimes, lapTime];
      const newBestTime = prev.bestTime === null ? lapTime : Math.min(prev.bestTime, lapTime);
      const newCurrentLap = prev.currentLap + 1;
      const isFinished = newCurrentLap > prev.totalLaps;

      return {
        ...prev,
        lapTimes: newLapTimes,
        bestTime: newBestTime,
        currentLap: newCurrentLap,
        isFinished
      };
    });
  }, [timer.isRunning, timer.isFinished]);

  // Reset the timer
  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setTimer({
      currentTime: 0,
      bestTime: null,
      lapTimes: [],
      currentLap: 1,
      totalLaps,
      isRunning: false,
      isPaused: false,
      isFinished: false
    });

    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
    lastLapTimeRef.current = 0;
  }, [totalLaps]);

  // Format time helper function
  const formatTime = useCallback((milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }, []);

  // Get current lap time
  const getCurrentLapTime = useCallback((): number => {
    if (!timer.isRunning && !timer.isPaused) return 0;
    
    const now = timer.isPaused ? pausedTimeRef.current : Date.now();
    return now - lastLapTimeRef.current;
  }, [timer.isRunning, timer.isPaused]);

  // Get best lap time
  const getBestLapTime = useCallback((): number | null => {
    if (timer.lapTimes.length === 0) return null;
    return Math.min(...timer.lapTimes);
  }, [timer.lapTimes]);

  // Get average lap time
  const getAverageLapTime = useCallback((): number | null => {
    if (timer.lapTimes.length === 0) return null;
    const total = timer.lapTimes.reduce((sum, time) => sum + time, 0);
    return total / timer.lapTimes.length;
  }, [timer.lapTimes]);

  // Get progress percentage
  const getProgress = useCallback((): number => {
    if (timer.totalLaps === 0) return 0;
    return Math.min(100, ((timer.currentLap - 1) / timer.totalLaps) * 100);
  }, [timer.currentLap, timer.totalLaps]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-stop when finished
  useEffect(() => {
    if (timer.isFinished && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [timer.isFinished]);

  return {
    timer,
    // Timer controls
    startTimer,
    pauseTimer,
    stopTimer,
    resetTimer,
    completeLap,
    // Utility functions
    formatTime,
    getCurrentLapTime,
    getBestLapTime,
    getAverageLapTime,
    getProgress,
    // Formatted strings for display
    formattedCurrentTime: formatTime(timer.currentTime),
    formattedBestTime: timer.bestTime ? formatTime(timer.bestTime) : null,
    formattedCurrentLapTime: formatTime(getCurrentLapTime()),
    // Status helpers
    canStart: !timer.isRunning && !timer.isFinished,
    canPause: timer.isRunning && !timer.isPaused,
    canResume: timer.isPaused && !timer.isFinished,
    canReset: timer.currentTime > 0 || timer.lapTimes.length > 0
  };
}