import { ApiResponse, PaginatedData } from "./prasad.model";

export interface SevaItem {
  id: number;
  name: string;
  subTitle: string;
  description: string;
  category: string;
  isPopular: boolean;
  suggestedAmounts: number[];
  imageUrl: string;
}

export interface GetSevaParams {
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
}

export type GetSevaListResponse = ApiResponse<PaginatedData<SevaItem>>;
export type GetSevaDetailResponse = ApiResponse<SevaItem>;
export type GetSevaCategoriesResponse = ApiResponse<string[]>;
