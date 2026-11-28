import { ApiResponse, PaginatedData, PaginationMeta } from "./prasad.model";
import { DeliveryAddress } from "./address.model";

export type { PaginationMeta };

export type PrasadOrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface PrasadOrderItem {
  itemId: number;
  prasadId: number;
  prasadName: string;
  category: string;
  imageUrl?: string | null;
  variantId: number;
  weight: number;
  unit: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status?: string;
}

export interface PrasadOrderSummary {
  orderId: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  status: PrasadOrderStatus | string;
  totalAmount: number;
  totalItems: number;
  createdAt: string;
}

export interface PrasadOrderDetail {
  orderId: number;
  orderNumber: string;
  customerId: number;
  deliveryAddress: DeliveryAddress;
  customerComment?: string | null;
  adminNotes?: string | null;
  status: PrasadOrderStatus | string;
  totalAmount: number;
  items: PrasadOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePrasadOrderPayload {
  cartItemIds?: number[] | null;
  deliveryAddressId: number;
  customerComment?: string | null;
}

export type GetPrasadOrdersResponse = ApiResponse<PaginatedData<PrasadOrderSummary>>;
export type GetPrasadOrderByIdResponse = ApiResponse<PrasadOrderDetail>;
export type CreatePrasadOrderResponse = ApiResponse<PrasadOrderDetail>;
