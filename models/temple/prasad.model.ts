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

/* =====================================================
    CUSTOMER PRASAD CART MODELS
===================================================== */

export interface CustomerPrasadCartItem {
  cartItemId: number;
  prasadId: number;
  prasadName: string;
  category: string;
  imageUrl?: string | null;
  variantId: number;
  weight: number;
  unit: string;
  price: number;
  quantity: number;
  itemTotal: number;
  isAvailable: boolean;
  comment?: string | null;
  addedAt: string;
}

export interface CustomerPrasadCartData {
  items: CustomerPrasadCartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface AddPrasadCartItemPayload {
  prasadId: number;
  variantId: number;
  quantity: number;
}

export interface UpdatePrasadCartItemPayload {
  quantity?: number;
  comment?: string | null;
}

export type GetCustomerPrasadCartResponse = ApiResponse<CustomerPrasadCartData>;
export type GetCustomerPrasadCartCountResponse = ApiResponse<number>;
export type PrasadCartActionResponse = ApiResponse<null>;
