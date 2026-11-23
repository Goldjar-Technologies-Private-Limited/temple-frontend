export interface CustomerPrasadVariant {
  id: number;
  weight: number;
  unit: string;
  price: number;
  isAvailable: boolean;
}

export interface CustomerPrasadItem {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUrl?: string | null;
  isAvailable: boolean;
  variants: CustomerPrasadVariant[];
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}

export interface PaginatedData<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type GetCustomerPrasadListResponse = ApiResponse<CustomerPrasadItem[] | PaginatedData<CustomerPrasadItem>>;
export type GetCustomerPrasadByIdResponse = ApiResponse<CustomerPrasadItem>;
export type GetCustomerPrasadCategoriesResponse = ApiResponse<string[]>;
