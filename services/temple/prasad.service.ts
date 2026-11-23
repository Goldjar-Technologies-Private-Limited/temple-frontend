import { apiClient } from "@/lib/api";
import {
  GetCustomerPrasadByIdResponse,
  GetCustomerPrasadCategoriesResponse,
  GetCustomerPrasadListResponse,
} from "../../models/temple/prasad.model";

class PrasadService {
  async getPrasadList(
    page?: number,
    size?: number,
    keyword?: string
  ): Promise<GetCustomerPrasadListResponse> {
    const params = new URLSearchParams();
    if (page !== undefined) params.append("page", page.toString());
    if (size !== undefined) params.append("size", size.toString());
    if (keyword) params.append("keyword", keyword);

    const queryString = params.toString();
    const endpoint = `/api/customer-website/temple/prasad${
      queryString ? `?${queryString}` : ""
    }`;

    return apiClient<GetCustomerPrasadListResponse>(endpoint);
  }

  async getPrasadById(id: number): Promise<GetCustomerPrasadByIdResponse> {
    return apiClient<GetCustomerPrasadByIdResponse>(
      `/api/customer-website/temple/prasad/${id}`
    );
  }

  async getCategories(): Promise<GetCustomerPrasadCategoriesResponse> {
    return apiClient<GetCustomerPrasadCategoriesResponse>(
      "/api/customer-website/temple/prasad/categories"
    );
  }
}

export const prasadService = new PrasadService();

/* =====================================================
    CUSTOMER PRASAD CART SERVICE
===================================================== */

import {
  AddPrasadCartItemPayload,
  GetCustomerPrasadCartCountResponse,
  GetCustomerPrasadCartResponse,
  PrasadCartActionResponse,
  UpdatePrasadCartItemPayload,
} from "../../models/temple/prasad.model";

class PrasadCartService {
  async getCart(): Promise<GetCustomerPrasadCartResponse> {
    return apiClient<GetCustomerPrasadCartResponse>(
      "/api/customer/temple/prasad-cart"
    );
  }

  async getCartCount(): Promise<GetCustomerPrasadCartCountResponse> {
    return apiClient<GetCustomerPrasadCartCountResponse>(
      "/api/customer/temple/prasad-cart/count"
    );
  }

  async addToCart(
    payload: AddPrasadCartItemPayload
  ): Promise<PrasadCartActionResponse> {
    return apiClient<PrasadCartActionResponse>(
      "/api/customer/temple/prasad-cart/add",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  async updateCartItem(
    cartItemId: number,
    payload: UpdatePrasadCartItemPayload
  ): Promise<PrasadCartActionResponse> {
    return apiClient<PrasadCartActionResponse>(
      `/api/customer/temple/prasad-cart/${cartItemId}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  }

  async updateCartItemQuantity(
    cartItemId: number,
    quantity: number
  ): Promise<PrasadCartActionResponse> {
    return apiClient<PrasadCartActionResponse>(
      `/api/customer/temple/prasad-cart/${cartItemId}/quantity?quantity=${quantity}`,
      {
        method: "PUT",
      }
    );
  }

  async removeCartItem(
    cartItemId: number
  ): Promise<PrasadCartActionResponse> {
    return apiClient<PrasadCartActionResponse>(
      `/api/customer/temple/prasad-cart/${cartItemId}`,
      {
        method: "DELETE",
      }
    );
  }

  async clearCart(): Promise<PrasadCartActionResponse> {
    return apiClient<PrasadCartActionResponse>(
      "/api/customer/temple/prasad-cart/clear",
      {
        method: "DELETE",
      }
    );
  }
}

export const prasadCartService = new PrasadCartService();
