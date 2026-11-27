import { apiClient } from "@/lib/api";
import {
  CreateDeliveryAddressPayload,
  CreateDeliveryAddressResponse,
  DeleteDeliveryAddressResponse,
  GetDeliveryAddressByIdResponse,
  GetDeliveryAddressesResponse,
  UpdateDeliveryAddressPayload,
  UpdateDeliveryAddressResponse,
} from "../../models/temple/address.model";

class DeliveryAddressService {
  async getAddresses(): Promise<GetDeliveryAddressesResponse> {
    return apiClient<GetDeliveryAddressesResponse>(
      "/api/customer/temple/delivery-addresses"
    );
  }

  async getAddressById(id: number): Promise<GetDeliveryAddressByIdResponse> {
    return apiClient<GetDeliveryAddressByIdResponse>(
      `/api/customer/temple/delivery-addresses/${id}`
    );
  }

  async createAddress(
    payload: CreateDeliveryAddressPayload
  ): Promise<CreateDeliveryAddressResponse> {
    return apiClient<CreateDeliveryAddressResponse>(
      "/api/customer/temple/delivery-addresses",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  async updateAddress(
    id: number,
    payload: UpdateDeliveryAddressPayload
  ): Promise<UpdateDeliveryAddressResponse> {
    return apiClient<UpdateDeliveryAddressResponse>(
      `/api/customer/temple/delivery-addresses/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  }

  async deleteAddress(id: number): Promise<DeleteDeliveryAddressResponse> {
    return apiClient<DeleteDeliveryAddressResponse>(
      `/api/customer/temple/delivery-addresses/${id}`,
      {
        method: "DELETE",
      }
    );
  }
}

export const deliveryAddressService = new DeliveryAddressService();
