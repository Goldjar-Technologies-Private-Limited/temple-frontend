"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CustomerPrasadItem,
  PaginationMeta,
} from "@/models/temple/prasad.model";
import { prasadService } from "@/services/temple/prasad.service";

export function useCustomerPrasadList(page?: number, size?: number, keyword?: string) {
  const [data, setData] = useState<CustomerPrasadItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrasadList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await prasadService.getPrasadList(page, size, keyword);
      if (res.success && res.data) {
        if (Array.isArray(res.data)) {
          setData(res.data);
          setPagination(null);
        } else if (res.data && Array.isArray((res.data as any).data)) {
          setData((res.data as any).data);
          setPagination((res.data as any).pagination || null);
        } else {
          setData([]);
          setPagination(null);
        }
      } else {
        setError(res.message || "Failed to load prasad list");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch prasad list");
    } finally {
      setIsLoading(false);
    }
  }, [page, size, keyword]);

  useEffect(() => {
    fetchPrasadList();
  }, [fetchPrasadList]);

  return {
    data,
    pagination,
    isLoading,
    error,
    refetch: fetchPrasadList,
  };
}

export function useCustomerPrasadDetails(id: number | null) {
  const [data, setData] = useState<CustomerPrasadItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrasad = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await prasadService.getPrasadById(id);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        setError(res.message || "Failed to load prasad details");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch prasad details");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPrasad();
  }, [fetchPrasad]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchPrasad,
  };
}

export function useCustomerPrasadCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await prasadService.getCategories();
      if (res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        setError(res.message || "Failed to load categories");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch prasad categories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}
