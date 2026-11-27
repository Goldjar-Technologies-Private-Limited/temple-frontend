"use client";

import { useEffect, useState, useCallback } from "react";
import {
  DeliveryAddress,
  CreateDeliveryAddressPayload,
  UpdateDeliveryAddressPayload,
} from "@/models/temple/address.model";
import { deliveryAddressService } from "@/services/temple/address.service";

export function useDeliveryAddresses() {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await deliveryAddressService.getAddresses();
      if (res.success && Array.isArray(res.data)) {
        setAddresses(res.data);
      } else {
        setAddresses([]);
      }
    } catch (err: any) {
      console.error("[useDeliveryAddresses] fetch error:", err);
      setError(err?.message || "Failed to load delivery addresses");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const createAddress = async (payload: CreateDeliveryAddressPayload) => {
    const res = await deliveryAddressService.createAddress(payload);
    if (res.success) {
      await fetchAddresses();
    }
    return res;
  };

  const updateAddress = async (id: number, payload: UpdateDeliveryAddressPayload) => {
    const res = await deliveryAddressService.updateAddress(id, payload);
    if (res.success) {
      await fetchAddresses();
    }
    return res;
  };

  const deleteAddress = async (id: number) => {
    const res = await deliveryAddressService.deleteAddress(id);
    if (res.success) {
      await fetchAddresses();
    }
    return res;
  };

  const setDefaultAddress = async (address: DeliveryAddress) => {
    return updateAddress(address.id, {
      ...address,
      isDefault: true,
    });
  };

  return {
    addresses,
    isLoading,
    error,
    refetch: fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };
}
