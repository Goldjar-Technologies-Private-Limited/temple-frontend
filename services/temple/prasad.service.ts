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
