import { apiClient } from "@/lib/api";
import {
  GetSevaListResponse,
  GetSevaDetailResponse,
  GetSevaCategoriesResponse,
  GetSevaParams,
} from "@/models/temple/seva.model";

const BASE_URL = "/api/customer-website/seva";

export const sevaService = {
  /**
   * Get list of sevas with optional filters and pagination
   */
  async getSevas(params?: GetSevaParams): Promise<GetSevaListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined)
      searchParams.set("page", String(params.page));
    if (params?.size !== undefined)
      searchParams.set("size", String(params.size));
    if (params?.category) searchParams.set("category", params.category);
    if (params?.keyword) searchParams.set("keyword", params.keyword);

    const query = searchParams.toString();
    const endpoint = query ? `${BASE_URL}?${query}` : BASE_URL;
    return apiClient<GetSevaListResponse>(endpoint);
  },

  /**
   * Get single seva details by id
   */
  async getSevaById(id: number | string): Promise<GetSevaDetailResponse> {
    return apiClient<GetSevaDetailResponse>(`${BASE_URL}/${id}`);
  },

  /**
   * Get seva categories
   */
  async getCategories(): Promise<GetSevaCategoriesResponse> {
    return apiClient<GetSevaCategoriesResponse>(`${BASE_URL}/categories`);
  },
};
