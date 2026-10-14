export type BookingStatus = "upcoming" | "completed" | "cancelled";

export type BookingItem = {
  id: string;
  title: string;
  type: "Seva" | "Darshan";
  date: string;
  time: string;
  devotees: number;
  amount?: number;
  status: BookingStatus;
};

export type BookingTabItem = {
  key: BookingStatus;
  label: string;
};

export const BOOKINGS_DATA: BookingItem[] = [
  {
    id: "GVN-24091501",
    title: "Rajbhog Seva",
    type: "Seva",
    date: "20 Sep 2026",
    time: "11:30 AM",
    devotees: 2,
    amount: 1100,
    status: "upcoming",
  },
  {
    id: "GVN-24091402",
    title: "Mangla Darshan",
    type: "Darshan",
    date: "12 Sep 2026",
    time: "06:30 AM",
    devotees: 3,
    status: "completed",
  },
  {
    id: "GVN-24091003",
    title: "Shringar Seva",
    type: "Seva",
    date: "10 Sep 2026",
    time: "08:30 AM",
    devotees: 1,
    amount: 501,
    status: "cancelled",
  },
];

export const BOOKING_TABS: BookingTabItem[] = [
  {
    key: "upcoming",
    label: "Upcoming",
  },
  {
    key: "completed",
    label: "Completed",
  },
  {
    key: "cancelled",
    label: "Cancelled",
  },
];
