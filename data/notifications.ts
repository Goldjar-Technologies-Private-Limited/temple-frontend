export type NotificationType =
  | "darshan"
  | "booking"
  | "donation"
  | "temple"
  | "general";

export type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  date: string;
  unread: boolean;
};

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 1,
    type: "darshan",
    title: "Darshan Reminder",
    message:
      "Your upcoming darshan is scheduled soon. We look forward to welcoming you.",
    time: "10:30 AM",
    date: "Today",
    unread: true,
  },
  {
    id: 2,
    type: "booking",
    title: "Booking Confirmed",
    message:
      "Your darshan booking has been successfully confirmed. Please keep your booking details handy.",
    time: "09:15 AM",
    date: "Today",
    unread: true,
  },
  {
    id: 3,
    type: "donation",
    title: "Thank You for Your Donation",
    message:
      "We sincerely thank you for your generous contribution towards the Haveli.",
    time: "04:30 PM",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    type: "temple",
    title: "Temple Update",
    message:
      "Please note the latest temple timings and important information for devotees.",
    time: "05:45 PM",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "general",
    title: "Welcome to Shri Govardhannath Haveli",
    message:
      "Stay connected with us for darshan updates, temple information and important announcements.",
    time: "11:20 AM",
    date: "28 Sep 2026",
    unread: false,
  },
];

export const NOTIFICATION_CONFIG: Record<
  NotificationType,
  {
    label: string;
    iconClass: string;
    bgClass: string;
  }
> = {
  darshan: {
    label: "Darshan",
    iconClass: "text-[#a71919]",
    bgClass: "bg-[#fff0ee]",
  },
  booking: {
    label: "Booking",
    iconClass: "text-[#8a641e]",
    bgClass: "bg-[#fff8e7]",
  },
  donation: {
    label: "Seva & Donation",
    iconClass: "text-[#7a4c2b]",
    bgClass: "bg-[#f8eee7]",
  },
  temple: {
    label: "Temple",
    iconClass: "text-[#6d5a25]",
    bgClass: "bg-[#f8f2dd]",
  },
  general: {
    label: "General",
    iconClass: "text-[#7b6253]",
    bgClass: "bg-[#f4eee9]",
  },
};
