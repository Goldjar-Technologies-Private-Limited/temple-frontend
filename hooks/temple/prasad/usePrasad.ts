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

/* =====================================================
    CUSTOMER PRASAD CART HOOKS
===================================================== */

import {
  AddPrasadCartItemPayload,
  CustomerPrasadCartData,
  UpdatePrasadCartItemPayload,
} from "@/models/temple/prasad.model";
import { prasadCartService } from "@/services/temple/prasad.service";

export function useCustomerPrasadCart() {
  const [cart, setCart] = useState<CustomerPrasadCartData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await prasadCartService.getCart();
      if (res.success && res.data) {
        setCart(res.data);
      } else {
        setError(res.message || "Failed to load cart");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to fetch cart");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (payload: AddPrasadCartItemPayload) => {
    const res = await prasadCartService.addToCart(payload);
    if (res.success) {
      window.dispatchEvent(new Event("prasadam-cart-updated"));
      await fetchCart();
    }
    return res;
  };

  const updateCartItem = async (cartItemId: number, payload: UpdatePrasadCartItemPayload) => {
    const res = await prasadCartService.updateCartItem(cartItemId, payload);
    if (res.success) {
      window.dispatchEvent(new Event("prasadam-cart-updated"));
      await fetchCart();
    }
    return res;
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    const res = await prasadCartService.updateCartItemQuantity(cartItemId, quantity);
    if (res.success) {
      window.dispatchEvent(new Event("prasadam-cart-updated"));
      await fetchCart();
    }
    return res;
  };

  const removeCartItem = async (cartItemId: number) => {
    const res = await prasadCartService.removeCartItem(cartItemId);
    if (res.success) {
      window.dispatchEvent(new Event("prasadam-cart-updated"));
      await fetchCart();
    }
    return res;
  };

  const clearCart = async () => {
    const res = await prasadCartService.clearCart();
    if (res.success) {
      window.dispatchEvent(new Event("prasadam-cart-updated"));
      await fetchCart();
    }
    return res;
  };

  return {
    cart,
    isLoading,
    error,
    refetch: fetchCart,
    addToCart,
    updateCartItem,
    updateQuantity,
    removeCartItem,
    clearCart,
  };
}

export function useCustomerPrasadCartCount() {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCount = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await prasadCartService.getCartCount();
      if (res.success && typeof res.data === "number") {
        setCount(res.data);
      }
    } catch {
      // Ignore count fetch errors silently or fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();

    const handleUpdate = () => {
      fetchCount();
    };

    window.addEventListener("prasadam-cart-updated", handleUpdate);
    return () => {
      window.removeEventListener("prasadam-cart-updated", handleUpdate);
    };
  }, [fetchCount]);

  return {
    count,
    isLoading,
    refetch: fetchCount,
  };
}
