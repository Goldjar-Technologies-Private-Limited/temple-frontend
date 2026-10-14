import type { TranslationKey } from "@/utils/i18n";

export type PrasadamCategory = "all" | "sweets" | "mahaprasad" | "gifts";
export type ProductCategory = "sweets" | "mahaprasad" | "gifts";
export type PrasadamWeight = "250g" | "500g" | "1kg";

export type PrasadamCategoryItem = {
  id: PrasadamCategory;
  labelKey: TranslationKey;
};

export type PrasadamProduct = {
  id: number;
  titleKey: TranslationKey;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
};

export type CartCheckoutProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export const PRASADAM_CATEGORIES: PrasadamCategoryItem[] = [
  { id: "all", labelKey: "all" },
  { id: "sweets", labelKey: "sweets" },
  { id: "mahaprasad", labelKey: "mahaprasad" },
  { id: "gifts", labelKey: "gifts" },
];

export const PRASADAM_PRODUCTS: PrasadamProduct[] = [
  {
    id: 1,
    titleKey: "makhanaPrasadam",
    description:
      "Delicious and crunchy makhana prasadam, perfect for devotional offerings.",
    price: 200,
    image: "/images/makhana-prasadam.jpg",
    category: "mahaprasad",
  },
  {
    id: 2,
    titleKey: "peda",
    description:
      "Traditional Indian milk sweet with a rich, creamy and delicious taste.",
    price: 180,
    image: "/images/peda.jpg",
    category: "sweets",
  },
  {
    id: 3,
    titleKey: "dryPrasadam",
    description:
      "A devotional dry prasadam selection, perfect for offerings and gifting.",
    price: 250,
    image: "/images/dry-prasadam.jpg",
    category: "mahaprasad",
  },
  {
    id: 4,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
  {
    id: 5,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
  {
    id: 6,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
  {
    id: 7,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
  {
    id: 8,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
  {
    id: 9,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
  {
    id: 10,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
  {
    id: 11,
    titleKey: "panchamrit",
    description: "A traditional sacred offering prepared with devotional care.",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
];

export const CART_CHECKOUT_PRODUCTS: CartCheckoutProduct[] = [
  {
    id: 1,
    name: "Makhana Prasadam",
    price: 200,
    image: "/images/makhana-prasadam.jpg",
  },
  {
    id: 2,
    name: "Peda",
    price: 180,
    image: "/images/peda.jpg",
  },
  {
    id: 3,
    name: "Dry Prasadam",
    price: 250,
    image: "/images/dry-prasadam.jpg",
  },
  {
    id: 4,
    name: "Panchamrit",
    price: 300,
    image: "/images/panchamrit.jpg",
  },
];
