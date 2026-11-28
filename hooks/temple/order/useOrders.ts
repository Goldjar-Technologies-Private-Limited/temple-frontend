"use client";

import { useState, useEffect, useCallback } from "react";
import { prasadOrderService } from "@/services/temple/order.service";
import {
  PrasadOrderSummary,
  PrasadOrderDetail,
  CreatePrasadOrderPayload,
  PaginationMeta,
} from "@/models/temple/order.model";

export function usePrasadOrders(initialPage: number = 1, pageSize: number = 10) {
  const [orders, setOrders] = useState<PrasadOrderSummary[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (page: number = initialPage) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await prasadOrderService.getOrders(page, pageSize);
      if (response && response.data) {
        setOrders(response.data.data || []);
        setPagination(response.data.pagination || null);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      console.error("Failed to fetch prasad orders:", err);
      setError(err?.response?.data?.message || err?.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, [initialPage, pageSize]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const createOrder = async (payload: CreatePrasadOrderPayload): Promise<PrasadOrderDetail> => {
    const response = await prasadOrderService.createOrder(payload);
    if (!response.success || !response.data) {
      throw new Error(response.message || "Failed to place prasad order");
    }
    // Refresh orders list in background
    fetchOrders().catch(() => {});
    return response.data;
  };

  return {
    orders,
    pagination,
    isLoading,
    error,
    refetch: fetchOrders,
    createOrder,
  };
}

export function usePrasadOrderDetail(orderId: number | string | undefined | null) {
  const [order, setOrder] = useState<PrasadOrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetail = useCallback(async () => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await prasadOrderService.getOrderById(orderId);
      if (response && response.data) {
        setOrder(response.data);
      } else {
        setOrder(null);
      }
    } catch (err: any) {
      console.error(`Failed to fetch order #${orderId}:`, err);
      setError(err?.response?.data?.message || err?.message || "Failed to load order details");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

  return {
    order,
    isLoading,
    error,
    refetch: fetchOrderDetail,
  };
}
