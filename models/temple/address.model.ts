export interface DeliveryAddress {
  id: number;
  customerId: number;
  recipientName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeliveryAddressPayload {
  recipientName: string;
  email?: string;
  phoneNumber: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault?: boolean;
}

export interface UpdateDeliveryAddressPayload {
  recipientName?: string;
  email?: string;
  phoneNumber?: string;
  fullAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
  landmark?: string | null;
  isDefault?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type GetDeliveryAddressesResponse = ApiResponse<DeliveryAddress[]>;
export type GetDeliveryAddressByIdResponse = ApiResponse<DeliveryAddress>;
export type CreateDeliveryAddressResponse = ApiResponse<DeliveryAddress>;
export type UpdateDeliveryAddressResponse = ApiResponse<DeliveryAddress>;
export type DeleteDeliveryAddressResponse = ApiResponse<null>;
