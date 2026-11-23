export type EventFilterType = "all" | "upcoming" | "past";

export interface CustomerEventListItem {
  id: number;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export interface GetCustomerEventsResponse {
  data: CustomerEventListItem[];
  message: string;
  success: boolean;
}

export interface CustomerEventDateTime {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string | null;
}

export interface CustomerEventHighlight {
  icon: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface CustomerEventLiveDarshan {
  badge: string;
  title: string;
  enabled: boolean;
  videoUrl: string;
  description: string;
}

export interface CustomerEventScheduleItem {
  title: string;
  endTime: string | null;
  startTime: string;
  description: string;
  displayOrder: number;
}

export interface CustomerEventVenue {
  name: string;
  address: string;
  locationUrl: string;
}

export interface CustomerEventSeva {
  enabled: boolean;
  sevaUrl: string;
  buttonText: string;
}

export interface CustomerEventDetails {
  id: number;
  title: string;
  imageUrl: string;
  shortDescription: string;
  dateTime: CustomerEventDateTime;
  highlights: CustomerEventHighlight[];
  liveDarshan: CustomerEventLiveDarshan;
  schedule: CustomerEventScheduleItem[];
  venue: CustomerEventVenue;
  seva: CustomerEventSeva;
  about_event: string;
}

export interface GetCustomerEventDetailsResponse {
  data: CustomerEventDetails;
  message: string;
  success: boolean;
}
