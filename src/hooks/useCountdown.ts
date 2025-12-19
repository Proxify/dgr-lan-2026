'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CountdownTime } from '@/types';

export type EventStatus = 'loading' | 'upcoming' | 'in_progress' | 'completed';

// Initial state that indicates "loading" - uses -1 for total to distinguish from "event passed"
const INITIAL_STATE: CountdownTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  total: -1, // -1 means "not yet calculated"
};

interface UseCountdownResult extends CountdownTime {
  isLoading: boolean;
  status: EventStatus;
}

export function useCountdown(startDate: Date, endDate?: Date): UseCountdownResult {
  const calculateTimeLeft = useCallback((): CountdownTime & { status: EventStatus } => {
    const now = new Date().getTime();
    const start = startDate.getTime();
    const end = endDate ? endDate.getTime() : start;
    const difference = start - now;

    // Check if event has ended (after end date)
    if (endDate && now > end) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, status: 'completed' };
    }

    // Check if event is in progress (between start and end dates)
    if (now >= start && now <= end) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, status: 'in_progress' };
    }

    // Event hasn't started yet - show countdown
    if (difference <= 0) {
      // Start date passed but no end date specified - treat as in progress
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, status: 'in_progress' };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      total: difference,
      status: 'upcoming',
    };
  }, [startDate, endDate]);

  // Start with initial state to avoid SSR hydration mismatch
  const [timeLeft, setTimeLeft] = useState<CountdownTime & { status: EventStatus }>({
    ...INITIAL_STATE,
    status: 'loading',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Calculate immediately on mount
    setTimeLeft(calculateTimeLeft());
    setIsLoading(false);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return { ...timeLeft, isLoading };
}

// Format number to always have 2 digits
export function padNumber(num: number): string {
  return num.toString().padStart(2, '0');
}
