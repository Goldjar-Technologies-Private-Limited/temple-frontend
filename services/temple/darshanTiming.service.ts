import { apiClient } from "@/lib/api";
import {
  GetCustomerDarshanTimingByIdResponse,
  GetCustomerDarshanTimingsResponse,
} from "../../models/temple/darshanTiming.model";

class DarshanTimingService {
  async getDarshanTimings(): Promise<GetCustomerDarshanTimingsResponse> {
    return apiClient<GetCustomerDarshanTimingsResponse>(
      "/api/customer-website/temple/darshan-timings"
    );
  }

  async getDarshanTimingById(id: number): Promise<GetCustomerDarshanTimingByIdResponse> {
    return apiClient<GetCustomerDarshanTimingByIdResponse>(
      `/api/customer-website/temple/darshan-timings/${id}`
    );
  }
}

export const darshanTimingService = new DarshanTimingService();
