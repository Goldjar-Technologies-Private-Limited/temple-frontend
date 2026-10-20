import type { TranslationKey } from "@/utils/i18n";

export type SevaCategory = "all" | "popular" | "goSeva" | "utsav";

export type SevaCategoryItem = {
  id: SevaCategory;
  label: TranslationKey;
};

export type SevaListItem = {
  id: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  image: string;
  category: SevaCategory;
  route: string;
};

export type SevaDetailData = {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  image: string;
  descriptionKey: TranslationKey;
};

export type DonationAmountOption = {
  label: string;
  value: number;
};

export const SEVA_CATEGORIES: SevaCategoryItem[] = [
  { id: "all", label: "all" },
  { id: "popular", label: "popular" },
  { id: "goSeva", label: "goSeva" },
  { id: "utsav", label: "utsav" },
];

export const SEVA_LIST: SevaListItem[] = [
  {
    id: "go-seva",
    titleKey: "goSeva",
    subtitleKey: "careForGauMata",
    image: "/images/go-seva.jpg",
    category: "goSeva",
    route: "/seva-donation/seva/go-seva",
  },
  {
    id: "nitya-bhog",
    titleKey: "nityaBhogSeva",
    subtitleKey: "dailyFoodOffering",
    image: "/images/nitya-bhog.jpg",
    category: "popular",
    route: "/seva-donation/seva/nitya-bhog",
  },
  {
    id: "flower",
    titleKey: "flowerSeva",
    subtitleKey: "templeDecoration",
    image: "/images/flower-seva.jpg",
    category: "popular",
    route: "/seva-donation/seva/flower",
  },
  {
    id: "annakut",
    titleKey: "annakutSeva",
    subtitleKey: "specialUtsavSeva",
    image: "/images/annakut.jpg",
    category: "utsav",
    route: "/seva-donation/seva/annakut",
  },
  {
    id: "temple-maintenance",
    titleKey: "templeMaintenance",
    subtitleKey: "supportTempleServices",
    image: "/images/temple-maintenance.jpg",
    category: "all",
    route: "/seva-donation/seva/temple-maintenance",
  },
];

export const SEVA_DETAILS_DATA: Record<string, SevaDetailData> = {
  "go-seva": {
    titleKey: "goSeva",
    subtitleKey: "careForGauMata",
    image: "/images/go-seva.jpg",
    descriptionKey: "goSevaDescription",
  },
  "nitya-bhog": {
    titleKey: "nityaBhogSeva",
    subtitleKey: "dailyFoodOffering",
    image: "/images/nitya-bhog.jpg",
    descriptionKey: "nityaBhogDescription",
  },
  flower: {
    titleKey: "flowerSeva",
    subtitleKey: "templeDecoration",
    image: "/images/flower-seva.jpg",
    descriptionKey: "flowerSevaDescription",
  },
  annakut: {
    titleKey: "annakutSeva",
    subtitleKey: "specialUtsavSeva",
    image: "/images/annakut.jpg",
    descriptionKey: "annakutDescription",
  },
  "temple-maintenance": {
    titleKey: "templeMaintenance",
    subtitleKey: "supportTempleServices",
    image: "/images/temple-maintenance.jpg",
    descriptionKey: "templeMaintenanceDescription",
  },
};

export const SEVA_DONATION_AMOUNTS: DonationAmountOption[] = [
  { label: "₹101", value: 101 },
  { label: "₹501", value: 501 },
  { label: "₹1,001", value: 1001 },
  { label: "₹5,001", value: 5001 },
];
