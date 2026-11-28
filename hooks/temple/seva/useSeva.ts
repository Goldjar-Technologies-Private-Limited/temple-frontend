"use client";

import { useState, useEffect, useCallback } from "react";
import { sevaService } from "@/services/temple/seva.service";
import { SevaItem, GetSevaParams } from "@/models/temple/seva.model";
import { PaginationMeta } from "@/models/temple/prasad.model";

export function useSevas(params?: GetSevaParams) {
  const [sevas, setSevas] = useState<SevaItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSevas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sevaRes, catRes] = await Promise.allSettled([
        sevaService.getSevas(params),
        sevaService.getCategories(),
      ]);

      if (sevaRes.status === "fulfilled" && sevaRes.value?.data) {
        setSevas(sevaRes.value.data.data || []);
        setPagination(sevaRes.value.data.pagination || null);
      } else if (sevaRes.status === "rejected") {
        console.error("Failed to fetch sevas:", sevaRes.reason);
        setError("Failed to load sevas");
      }

      if (catRes.status === "fulfilled" && catRes.value?.data) {
        setCategories(catRes.value.data || []);
      }
    } catch (err: any) {
      console.error("Error in useSevas:", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [params?.page, params?.size, params?.category, params?.keyword]);

  useEffect(() => {
    fetchSevas();
  }, [fetchSevas]);

  return {
    sevas,
    pagination,
    categories,
    isLoading,
    error,
    refetch: fetchSevas,
  };
}

export function useSevaDetail(id: number | string | undefined | null) {
  const [seva, setSeva] = useState<SevaItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeva = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await sevaService.getSevaById(id);
      if (res && res.data) {
        setSeva(res.data);
      } else {
        setSeva(null);
      }
    } catch (err: any) {
      console.error(`Failed to fetch seva #${id}:`, err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load seva details",
      );
      setSeva(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSeva();
  }, [fetchSeva]);

  return {
    seva,
    isLoading,
    error,
    refetch: fetchSeva,
  };
}
