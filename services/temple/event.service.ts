import { apiClient } from "@/lib/api";
import type {
  EventFilterType,
  GetCustomerEventsResponse,
  GetCustomerEventDetailsResponse,
} from "@/models/temple/event.model";

export const eventService = {
  getEvents: async (type?: EventFilterType): Promise<GetCustomerEventsResponse> => {
    const query = type ? `?type=${type}` : "";
    return apiClient<GetCustomerEventsResponse>(`/api/customer-website/temple/events${query}`);
  },

  getEventById: async (id: number | string): Promise<GetCustomerEventDetailsResponse> => {
    return apiClient<GetCustomerEventDetailsResponse>(`/api/customer-website/temple/events/${id}`);
  },
};
