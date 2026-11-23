"use client";

import { useEffect, useState, useCallback } from "react";
import { CustomerDarshanTiming } from "@/models/temple/darshanTiming.model";
import { darshanTimingService } from "@/services/temple/darshanTiming.service";

export function useDarshanTimings() {
  const [data, setData] = useState<CustomerDarshanTiming[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTimings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await darshanTimingService.getDarshanTimings();
      if (res.success && Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setError(res.message || "Failed to load darshan timings");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch darshan timings");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTimings();
  }, [fetchTimings]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchTimings,
  };
}

export function useDarshanTiming(id: number | null) {
  const [data, setData] = useState<CustomerDarshanTiming | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTiming = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await darshanTimingService.getDarshanTimingById(id);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        setError(res.message || "Failed to load darshan timing details");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch darshan timing details");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTiming();
    }
  }, [id, fetchTiming]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchTiming,
  };
}
