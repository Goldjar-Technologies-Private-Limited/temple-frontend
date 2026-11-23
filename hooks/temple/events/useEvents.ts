"use client";

import { useState, useEffect, useCallback } from "react";
import { eventService } from "@/services/temple/event.service";
import type {
  EventFilterType,
  CustomerEventListItem,
  CustomerEventDetails,
} from "@/models/temple/event.model";

export function useCustomerEvents(type?: EventFilterType) {
  const [events, setEvents] = useState<CustomerEventListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await eventService.getEvents(type);
      if (res.success && res.data) {
        // Handle both raw array data: [...] and paginated object data: { data: [...], pagination: {...} }
        const items = Array.isArray(res.data)
          ? res.data
          : Array.isArray((res.data as any).data)
          ? (res.data as any).data
          : [];
        setEvents(items);
      } else {
        setEvents([]);
      }
    } catch (err: any) {
      console.error("[useCustomerEvents] Fetch error:", err);
      setError(err?.message || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refresh: fetchEvents,
  };
}

export function useCustomerEventDetails(id?: number | string | null) {
  const [event, setEvent] = useState<CustomerEventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async () => {
    if (!id) {
      setEvent(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await eventService.getEventById(id);
      if (res.success && res.data) {
        setEvent(res.data);
      } else {
        setEvent(null);
      }
    } catch (err: any) {
      console.error(`[useCustomerEventDetails] Fetch error for id ${id}:`, err);
      setError(err?.message || "Failed to load event details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    event,
    loading,
    error,
    refresh: fetchDetails,
  };
}
