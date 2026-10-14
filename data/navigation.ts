import type { TranslationKey } from "@/utils/i18n";

export type IconName =
  | "temple"
  | "booking"
  | "donation"
  | "notification"
  | "settings"
  | "help"
  | "logout"
  | "edit";

export type MenuItem = {
  icon: IconName;
  key: TranslationKey;
  route?: string;
};

export type MenuSection = {
  title: string;
  items: MenuItem[];
};

export const menuSections: MenuSection[] = [
  {
    title: "My Account",
    items: [
      {
        icon: "temple",
        key: "templeInformation",
        route: "/temple-information",
      },
      {
        icon: "booking",
        key: "myOrders",
        route: "/my-orders",
      },
      {
        icon: "donation",
        key: "myDonations",
        route: "/my-donations",
      },
      {
        icon: "notification",
        key: "notifications",
        route: "/notifications",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        icon: "settings",
        key: "settings",
        route: "/settings",
      },
      {
        icon: "help",
        key: "helpSupport",
        route: "/help",
      },
    ],
  },
];

export type BottomNavItemData = {
  key: string;
  labelKey: TranslationKey;
  iconName: "home" | "darshan" | "seva" | "reels" | "profile";
  route?: string;
};

export const BOTTOM_NAV_ITEMS_DATA: BottomNavItemData[] = [
  {
    key: "home",
    labelKey: "home",
    iconName: "home",
    route: "/dashboard",
  },
  {
    key: "darshan",
    labelKey: "darshan",
    iconName: "darshan",
    route: "/live-darshan",
  },
  {
    key: "seva",
    labelKey: "seva",
    iconName: "seva",
    route: "/seva-donation",
  },
  {
    key: "reels",
    labelKey: "reels",
    iconName: "reels",
    route: "/reels",
  },
  {
    key: "profile",
    labelKey: "profile",
    iconName: "profile",
  },
];
