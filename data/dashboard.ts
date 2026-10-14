import type { TranslationKey } from "@/utils/i18n";

export type DashboardActionKey = "darshan" | "events" | "prasadam" | "more";

export type DashboardActionItem = {
  key: DashboardActionKey;
  icon: "headset" | "seva" | "cow" | "gift" | "play" | "food" | "grid";
  labels: [TranslationKey, TranslationKey?];
  route?: string;
};

export const ACTION_ITEMS: DashboardActionItem[] = [
  {
    key: "darshan",
    icon: "gift",
    labels: ["darshan", "darshanTimings"],
    route: "/darshan-timings",
  },
  {
    key: "events",
    icon: "gift",
    labels: ["events"],
    route: "/events",
  },
  {
    key: "prasadam",
    icon: "food",
    labels: ["prasadam"],
    route: "/prasadam",
  },
  {
    key: "more",
    icon: "grid",
    labels: ["more"],
  },
];
