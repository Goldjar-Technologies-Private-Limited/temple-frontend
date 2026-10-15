"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider";
import CommonHeader from "@/components/layout/CommonHeader";
import {
  PRASADAM_CATEGORIES as categories,
  ProductCategory,
  PRASADAM_PRODUCTS as products,
  type PrasadamCategory as Category,
  type PrasadamWeight as Weight,
} from "@/data/prasadam";

type CartItem = {
  productId: number;
  weight: Weight;
  quantity: number;
};

type LegacyCart = Record<string, unknown>;

/* =====================================================
   CONSTANTS
==================================================== */

const CART_STORAGE_KEY = "prasadam-cart";
const OLD_WEIGHT_STORAGE_KEY = "prasadam-cart-weights";
const CART_UPDATED_EVENT = "prasadam-cart-updated";

const DEFAULT_WEIGHT: Weight = "500g";

const WEIGHT_OPTIONS: {
  value: Weight;
  label: string;
}[] = [
  { value: "250g", label: "250 g" },
  { value: "500g", label: "500 g" },
  { value: "1kg", label: "1 kg" },
];

/* =====================================================
   WEIGHT HELPERS
===================================================== */

function isValidWeight(value: unknown): value is Weight {
  return value === "250g" || value === "500g" || value === "1kg";
}

function getWeightPrice(basePrice: number, weight: Weight): number {
  switch (weight) {
    case "250g":
      return basePrice * 0.5;
    case "1kg":
      return basePrice * 2;
    default:
      return basePrice;
  }
}

function getProductCategoryLabel(category: ProductCategory): string {
  switch (category) {
    case "sweets":
      return "Sweets";
    case "gifts":
      return "Gift Pack";
    default:
      return "Mahaprasad";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/* =====================================================
    CART VALIDATION
===================================================== */

function cleanCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  const normalized = new Map<string, CartItem>();

  for (const rawItem of value) {
    if (!isRecord(rawItem)) continue;

    const productId = Number(rawItem.productId);
    const quantity = Number(rawItem.quantity);
    const weight = rawItem.weight;

    if (
      !Number.isSafeInteger(productId) ||
      !isValidWeight(weight) ||
      !Number.isSafeInteger(quantity) ||
      quantity <= 0
    ) {
      continue;
    }

    const key = `${productId}:${weight}`;
    const existing = normalized.get(key);

    if (existing) {
      const combinedQuantity = existing.quantity + quantity;

      if (Number.isSafeInteger(combinedQuantity)) {
        existing.quantity = combinedQuantity;
      }
    } else {
      normalized.set(key, {
        productId,
        weight,
        quantity,
      });
    }
  }

  return Array.from(normalized.values());
}

/* =====================================================
    LEGACY CART MIGRATION
===================================================== */

function migrateOldCart(oldCart: unknown, oldWeights: unknown): CartItem[] {
  if (!isRecord(oldCart)) return [];

  const weights: LegacyCart = isRecord(oldWeights) ? oldWeights : {};

  const migrated: CartItem[] = [];

  for (const [productId, rawQuantity] of Object.entries(oldCart)) {
    const id = Number(productId);
    const quantity = Number(rawQuantity);

    if (
      !Number.isSafeInteger(id) ||
      !Number.isSafeInteger(quantity) ||
      quantity <= 0
    ) {
      continue;
    }

    const savedWeight = weights[productId];

    migrated.push({
      productId: id,
      weight: isValidWeight(savedWeight) ? savedWeight : DEFAULT_WEIGHT,
      quantity,
    });
  }

  return cleanCart(migrated);
}

/* =====================================================
    CART STORAGE
===================================================== */

function loadCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      const oldCart = localStorage.getItem("prasadam-cart");

      if (!oldCart) return [];

      return [];
    }

    const parsedCart: unknown = JSON.parse(savedCart);

    if (Array.isArray(parsedCart)) {
      return cleanCart(parsedCart);
    }

    let oldWeights: unknown = {};

    const savedWeights = localStorage.getItem(OLD_WEIGHT_STORAGE_KEY);

    if (savedWeights) {
      try {
        oldWeights = JSON.parse(savedWeights);
      } catch {
        oldWeights = {};
      }
    }

    return migrateOldCart(parsedCart, oldWeights);
  } catch (error) {
    console.error("Unable to load prasadam cart:", error);
    return [];
  }
}

function saveCart(cart: CartItem[]): boolean {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

    localStorage.removeItem(OLD_WEIGHT_STORAGE_KEY);

    window.dispatchEvent(new Event(CART_UPDATED_EVENT));

    return true;
  } catch (error) {
    console.error("Unable to save prasadam cart:", error);
    return false;
  }
}

/* =====================================================
    MAIN PAGE
===================================================== */

export default function PrasadamPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const [category, setCategory] = useState<Category>("all");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  const [selectedWeights, setSelectedWeights] = useState<
    Record<number, Weight>
  >({});

  /* LOAD CART */

  useEffect(() => {
    setCart(loadCart());
    setCartLoaded(true);
  }, []);

  /* SAVE CART */

  useEffect(() => {
    if (!cartLoaded) return;

    saveCart(cart);
  }, [cart, cartLoaded]);

  /* SYNC CART CHANGES FROM OTHER TABS */

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CART_STORAGE_KEY && event.key !== null) {
        return;
      }

      if (event.newValue === null) {
        setCart([]);
        return;
      }

      try {
        const parsed: unknown = JSON.parse(event.newValue);

        setCart(Array.isArray(parsed) ? cleanCart(parsed) : []);
      } catch {
        setCart([]);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  /* FILTER PRODUCTS */

  const filteredProducts = useMemo(() => {
    if (category === "all") return products;

    return products.filter((product) => product.category === category);
  }, [category]);

  /* SELECTED CATEGORY HEADING */

  const categoryHeading = useMemo(() => {
    if (category === "all") {
      return "Explore Prasadam";
    }

    const selected = categories.find((item) => item.id === category);

    return selected ? t(selected.labelKey) : "Prasadam";
  }, [category, t]);

  /* SELECTED WEIGHT */

  const getSelectedWeight = useCallback(
    (productId: number): Weight => selectedWeights[productId] ?? DEFAULT_WEIGHT,
    [selectedWeights],
  );

  /* CART QUANTITY */

  const getQuantity = useCallback(
    (productId: number, weight: Weight): number =>
      cart.find(
        (item) => item.productId === productId && item.weight === weight,
      )?.quantity ?? 0,
    [cart],
  );

  /* CHANGE WEIGHT */

  const changeWeight = (productId: number, weight: Weight) => {
    setSelectedWeights((previous) => ({
      ...previous,
      [productId]: weight,
    }));
  };

  /* ADD TO CART */

  const increase = (productId: number, weight: Weight) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.productId === productId && item.weight === weight,
      );

      if (existing) {
        if (existing.quantity >= Number.MAX_SAFE_INTEGER) {
          return previous;
        }

        return previous.map((item) =>
          item.productId === productId && item.weight === weight
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...previous,
        {
          productId,
          weight,
          quantity: 1,
        },
      ];
    });
  };

  /* DECREASE CART QUANTITY */

  const decrease = (productId: number, weight: Weight) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.productId === productId && item.weight === weight,
      );

      if (!existing) return previous;

      if (existing.quantity <= 1) {
        return previous.filter(
          (item) => !(item.productId === productId && item.weight === weight),
        );
      }

      return previous.map((item) =>
        item.productId === productId && item.weight === weight
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      );
    });
  };

  /* CART COUNT */

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  /* RENDER */

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#fffaf1] pb-12 text-[#332820] lg:ml-[92px] lg:w-[calc(100%-92px)]">
      {/* HEADER WITH CART */}
      <CommonHeader
        title={t("prasadam")}
        subtitle="Shri Govardhannath Haveli"
        backHref="/dashboard"
        rightAction={
          <button
            type="button"
            onClick={() => router.push("/prasadam/cart")}
            aria-label={`Open shopping cart, ${cartCount} items`}
            title="Open shopping cart"
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#eadbc5] bg-white text-[#8c1717] shadow-sm transition hover:border-[#b8893b] hover:bg-[#fff4e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919]"
          >
            <CartIcon />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-[#e87519] px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        }
      />

      <div className="mx-auto w-full max-w-[1500px]">
        {/* CATEGORY FILTERS */}

        <div className="flex gap-2 overflow-x-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5 md:justify-center lg:justify-start lg:px-8">
          {categories.map((item) => {
            const active = category === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-lg border px-4 py-2.5 text-xs font-semibold transition sm:px-5 sm:text-sm ${active ? "border-[#e87519] bg-[#e87519] text-white shadow-sm" : "border-[#e5d7c4] bg-white text-[#66584b] hover:border-[#e87519] hover:text-[#b55d17]"}`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>

        {/* SECTION HEADING */}

        <div className="mb-4 flex items-end justify-between px-3 sm:px-5 lg:px-8">
          <div>
            <h2 className="text-lg font-bold text-[#641010] sm:text-xl">
              {category === "all"
                ? "Explore Prasadam"
                : categories.find((item) => item.id === category)?.labelKey
                  ? t(categories.find((item) => item.id === category)!.labelKey)
                  : "Prasadam"}
            </h2>

            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              Sacred offerings, sweets and devotional gifts
            </p>
          </div>

          <span className="shrink-0 text-[10px] text-gray-500 sm:text-xs">
            {filteredProducts.length} products
          </span>
        </div>

        {/* PRODUCT GRID */}

        <section className="grid grid-cols-2 gap-3 px-3 sm:grid-cols-4 sm:gap-4 sm:px-5 md:gap-5 md:px-6 lg:grid-cols-6 lg:gap-4 lg:px-8">
          {filteredProducts.map((product) => {
            const selectedWeight = getSelectedWeight(product.id);

            const quantity = getQuantity(product.id, selectedWeight);

            const currentPrice = getWeightPrice(product.price, selectedWeight);

            return (
              <article
                key={product.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#e8e8e8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-[#d8c5a3] hover:shadow-[0_6px_18px_rgba(0,0,0,0.09)]"
              >
                {/* PRODUCT IMAGE — REDUCED HEIGHT */}

                <div className="relative flex h-[110px] items-center justify-center overflow-hidden bg-[#faf8f3] p-2 sm:h-[125px] sm:p-3 lg:h-[115px]">
                  <img
                    src={product.image}
                    alt={t(product.titleKey)}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* CATEGORY BADGE */}
                </div>

                {/* DETAILS */}

                <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                  {/* TITLE AND CATEGORY */}

                  <div className="flex items-start justify-between gap-1">
                    <h3
                      title={t(product.titleKey)}
                      className="min-w-0 flex-1 line-clamp-2 text-xs font-semibold leading-4 text-[#252525] sm:text-sm sm:leading-[18px]"
                    >
                      {t(product.titleKey)}
                    </h3>

                    <span
                      className={`shrink-0 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[8px] font-semibold sm:text-[9px] ${product.category === "sweets" ? "bg-pink-50 text-pink-700" : product.category === "gifts" ? "bg-purple-50 text-purple-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {getProductCategoryLabel(product.category)}
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    title={product.description}
                    className="mt-0.5 line-clamp-1 min-h-[14px] text-[10px] leading-[14px] text-gray-500 sm:text-[11px]"
                  >
                    {product.description}
                  </p>

                  {/* WEIGHT */}

                  <div className="mt-2">
                    <label
                      htmlFor={`weight-${product.id}`}
                      className="mb-1 block text-[10px] font-medium text-gray-600"
                    >
                      Select weight
                    </label>

                    <select
                      id={`weight-${product.id}`}
                      value={selectedWeight}
                      onChange={(event) =>
                        changeWeight(product.id, event.target.value as Weight)
                      }
                      className="h-8 w-full rounded-md border border-gray-200 bg-white px-2 text-[11px] text-gray-700 outline-none focus:border-[#e87519] focus:ring-1 focus:ring-[#e87519] sm:text-xs"
                    >
                      {WEIGHT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PRICE */}

                  <div className="mt-3">
                    <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
                      <span className="text-base font-bold text-[#202020] sm:text-lg">
                        ₹{currentPrice.toLocaleString("en-IN")}
                      </span>

                      {selectedWeight !== "500g" && (
                        <span className="text-[10px] text-gray-400">
                          {selectedWeight === "250g"
                            ? "250 g pack"
                            : "1 kg pack"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CART CONTROLS */}

                  <div className="mt-auto pt-3">
                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() => increase(product.id, selectedWeight)}
                        className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#e87519] px-1 text-[11px] font-bold text-white transition hover:bg-[#cf5f0d] active:scale-[0.98] sm:text-xs"
                      >
                        <CartIcon />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className="flex h-9 w-full items-center justify-between overflow-hidden rounded-lg border border-[#e87519] bg-white">
                        <button
                          type="button"
                          onClick={() => decrease(product.id, selectedWeight)}
                          aria-label="Decrease quantity"
                          className="h-full flex-1 bg-[#fff7ef] text-lg font-semibold text-[#c45a0c] hover:bg-[#ffead8]"
                        >
                          −
                        </button>

                        <span
                          aria-live="polite"
                          className="
                            flex-1 text-center
                            text-xs font-bold text-gray-800
                          "
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increase(product.id, selectedWeight)}
                          aria-label="Increase quantity"
                          className="h-full flex-1 bg-[#e87519] text-lg font-semibold text-white hover:bg-[#cf5f0d]"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* EMPTY STATE */}

        {filteredProducts.length === 0 && (
          <div className="px-4 py-16 text-center">
            <p className="text-3xl">🪔</p>
            <h3 className="mt-3 text-lg font-semibold text-[#641010]">
              No products found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Please select another category.
            </p>
          </div>
        )}

        {/* FOOTER */}

        <footer className="mt-10 flex items-center justify-center gap-2 px-4 text-[#c99435]">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8b66c] lg:w-24" />

          <span aria-hidden="true">❧ ❧ ❧</span>

          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8b66c] lg:w-24" />
        </footer>
      </div>
    </main>
  );
}

/* =====================================================
    CART ICON
===================================================== */

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] shrink-0"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}