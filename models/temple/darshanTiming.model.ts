export interface CustomerDarshanTiming {
  id: number;
  title: string;
  description: string;
  startTime: string; // e.g., "06:00"
  endTime: string;   // e.g., "07:30"
  sortOrder: number;
  imageUrl?: string | null;
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

export type GetCustomerDarshanTimingsResponse = ApiResponse<CustomerDarshanTiming[] | PaginatedData<CustomerDarshanTiming>>;
export type GetCustomerDarshanTimingByIdResponse = ApiResponse<CustomerDarshanTiming>;
