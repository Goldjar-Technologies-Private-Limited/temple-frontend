import { apiClient } from "@/lib/api";
import {
  GetPrasadOrdersResponse,
  GetPrasadOrderByIdResponse,
  CreatePrasadOrderPayload,
  CreatePrasadOrderResponse,
} from "@/models/temple/order.model";

const BASE_URL = "/api/customer/temple/prasad-orders";

export const prasadOrderService = {
  /**
   * Get customer's prasad orders with optional pagination
   */
  async getOrders(page: number = 1, size: number = 10): Promise<GetPrasadOrdersResponse> {
    return apiClient<GetPrasadOrdersResponse>(`${BASE_URL}?page=${page}&size=${size}`);
  },

  /**
   * Get single prasad order by ID
   */
  async getOrderById(orderId: number | string): Promise<GetPrasadOrderByIdResponse> {
    return apiClient<GetPrasadOrderByIdResponse>(`${BASE_URL}/${orderId}`);
  },

  /**
   * Create a new prasad order
   * Backend will take the whole cart as one order if cartItemIds is null or contains all cartItemIds
   */
  async createOrder(payload: CreatePrasadOrderPayload): Promise<CreatePrasadOrderResponse> {
    return apiClient<CreatePrasadOrderResponse>(`${BASE_URL}/create`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
