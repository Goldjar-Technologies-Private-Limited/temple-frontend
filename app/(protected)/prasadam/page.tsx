"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider";

import type { TranslationKey } from "@/utils/i18n";


/* =====================================================
   TYPES
===================================================== */

type Category = "all" | "sweets" | "mahaprasad" | "gifts";
type ProductCategory = Exclude<Category, "all">;
type Weight = "250g" | "500g" | "1kg";

type CategoryItem = {
  id: Category;
  labelKey: TranslationKey;
};

type Product = {
  id: number;
  titleKey: TranslationKey;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
};

type CartItem = {
  productId: number;
  weight: Weight;
  quantity: number;
};

/* =====================================================
   CONSTANTS
===================================================== */

const CART_STORAGE_KEY = "prasadam-cart";
const OLD_WEIGHT_STORAGE_KEY = "prasadam-cart-weights";
const CART_UPDATED_EVENT = "prasadam-cart-updated";
const WISHLIST_STORAGE_KEY = "prasadam-wishlist";

const DEFAULT_WEIGHT: Weight = "500g";

/* =====================================================
   CATEGORIES
===================================================== */

const categories: CategoryItem[] = [
  { id: "all", labelKey: "all" },
  { id: "sweets", labelKey: "sweets" },
  { id: "mahaprasad", labelKey: "mahaprasad" },
  { id: "gifts", labelKey: "gifts" },
];

/* =====================================================
   PRODUCTS
===================================================== */

const products: Product[] = [
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

/* =====================================================
   WEIGHT HELPERS
===================================================== */

function isValidWeight(value: unknown): value is Weight {
  return value === "250g" || value === "500g" || value === "1kg";
}

function getWeightPrice(basePrice: number, weight: Weight): number {
  if (weight === "250g") return basePrice * 0.5;
  if (weight === "1kg") return basePrice * 2;
  return basePrice;
}

/* =====================================================
   CART HELPERS
===================================================== */

function cleanCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> =>
      Boolean(item && typeof item === "object" && !Array.isArray(item)),
    )
    .map((item) => ({
      productId: Number(item.productId),
      weight: item.weight as Weight,
      quantity: Math.floor(Number(item.quantity)),
    }))
    .filter(
      (item) =>
        Number.isInteger(item.productId) &&
        products.some((p) => p.id === item.productId) &&
        isValidWeight(item.weight) &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0,
    );
}

function migrateOldCart(oldCart: unknown, oldWeights: unknown): CartItem[] {
  if (!oldCart || typeof oldCart !== "object" || Array.isArray(oldCart)) {
    return [];
  }

  const cartObject = oldCart as Record<string, unknown>;

  const weightsObject =
    oldWeights && typeof oldWeights === "object" && !Array.isArray(oldWeights)
      ? (oldWeights as Record<string, unknown>)
      : {};

  return Object.entries(cartObject)
    .map(([productId, quantity]) => {
      const id = Number(productId);
      const count = Math.floor(Number(quantity));

      if (
        !Number.isInteger(id) ||
        !products.some((p) => p.id === id) ||
        !Number.isFinite(count) ||
        count <= 0
      ) {
        return null;
      }

      const savedWeight = weightsObject[productId];

      return {
        productId: id,
        weight: isValidWeight(savedWeight) ? savedWeight : DEFAULT_WEIGHT,
        quantity: count,
      };
    })
    .filter((item): item is CartItem => item !== null);
}

function loadCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) return [];

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
    console.error("Unable to load cart:", error);
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    localStorage.removeItem(OLD_WEIGHT_STORAGE_KEY);
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  } catch (error) {
    console.error("Unable to save cart:", error);
  }
}

/* =====================================================
   WISHLIST HELPERS
===================================================== */

function loadWishlist(): number[] {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return [
      ...new Set(
        parsed.filter(
          (id): id is number =>
            typeof id === "number" &&
            Number.isInteger(id) &&
            products.some((p) => p.id === id),
        ),
      ),
    ];
  } catch {
    return [];
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

  const [wishlist, setWishlist] = useState<number[]>([]);

  /* LOAD SAVED DATA */

  useEffect(() => {
    setCart(loadCart());
    setWishlist(loadWishlist());
    setCartLoaded(true);
  }, []);

  /* SAVE CART */

  useEffect(() => {
    if (!cartLoaded) return;
    saveCart(cart);
  }, [cart, cartLoaded]);

  /* SAVE WISHLIST */

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Unable to save wishlist:", error);
    }
  }, [wishlist]);

  /* FILTER PRODUCTS */

  const filteredProducts = useMemo(() => {
    if (category === "all") return products;

    return products.filter((product) => product.category === category);
  }, [category]);

  /* SELECTED WEIGHT */

  const getSelectedWeight = (productId: number): Weight =>
    selectedWeights[productId] ?? DEFAULT_WEIGHT;

  /* CART QUANTITY */

  const getQuantity = (productId: number, weight: Weight): number => {
    return (
      cart.find(
        (item) => item.productId === productId && item.weight === weight,
      )?.quantity ?? 0
    );
  };

  /* CHANGE WEIGHT */

  const changeWeight = (productId: number, weight: Weight) => {
    setSelectedWeights((previous) => ({
      ...previous,
      [productId]: weight,
    }));
  };

  /* ADD ITEM */

  const increase = (productId: number, weight: Weight) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.productId === productId && item.weight === weight,
      );

      if (existing) {
        return previousCart.map((item) =>
          item.productId === productId && item.weight === weight
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...previousCart, { productId, weight, quantity: 1 }];
    });
  };

  /* REMOVE ITEM */

  const decrease = (productId: number, weight: Weight) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.productId === productId && item.weight === weight,
      );

      if (!existing) return previousCart;

      if (existing.quantity <= 1) {
        return previousCart.filter(
          (item) => !(item.productId === productId && item.weight === weight),
        );
      }

      return previousCart.map((item) =>
        item.productId === productId && item.weight === weight
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };

  /* TOGGLE WISHLIST */

  const toggleWishlist = (productId: number) => {
    setWishlist((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId],
    );
  };

  /* CART COUNT */

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  /* RENDER */

  return (
    <main
      className="
        min-h-screen w-full overflow-x-hidden
        bg-[#fffaf1] pb-12 text-[#332820]
        lg:ml-[92px] lg:w-[calc(100%-92px)]
      "
    >
      {/* HEADER */}

      <header
        className="
          sticky top-0 z-30
          flex h-[68px] items-center justify-between
          border-b border-[#eadbc5]
          bg-white/95 px-3 backdrop-blur-md
          sm:h-[76px] sm:px-5
          lg:static lg:h-[84px] lg:px-8
        "
      >
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="
            grid h-10 w-10 place-items-center
            rounded-full border border-[#eadbc5]
            bg-white text-2xl text-[#8c1717]
            transition hover:bg-[#fff4e4]
          "
        >
          ‹
        </button>

        <div className="flex-1 text-center lg:ml-4 lg:text-left">
          <p className="hidden text-[10px] font-bold uppercase tracking-[2px] text-[#a17b37] lg:block">
            Shri Govardhannath Haveli
          </p>

          <h1 className="font-serif text-xl font-bold text-[#641010] sm:text-2xl">
            {t("prasadam")}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => router.push("/prasadam/cart")}
          aria-label="Open shopping cart"
          className="
            relative grid h-10 w-10 place-items-center
            rounded-full border border-[#eadbc5]
            bg-white text-[#8c1717]
            transition hover:bg-[#fff4e4]
          "
        >
          <CartIcon />

          {cartCount > 0 && (
            <span
              className="
                absolute -right-1 -top-1
                grid h-[19px] min-w-[19px]
                place-items-center rounded-full
                bg-[#e87519] px-1 text-[10px]
                font-bold text-white
              "
            >
              {cartCount}
            </span>
          )}
        </button>
      </header>

      <div className="mx-auto w-full max-w-[1500px]">
        {/* CATEGORY FILTERS */}

        <div
          className="
            flex gap-2 overflow-x-auto px-3 py-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:px-5 md:justify-center
            lg:justify-start lg:px-8
          "
        >
          {categories.map((item) => {
            const active = category === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={active}
                className={`
                  shrink-0 rounded-lg border
                  px-4 py-2.5 text-xs font-semibold
                  transition sm:px-5 sm:text-sm
                  ${
                    active
                      ? "border-[#e87519] bg-[#e87519] text-white shadow-sm"
                      : "border-[#e5d7c4] bg-white text-[#66584b] hover:border-[#e87519] hover:text-[#b55d17]"
                  }
                `}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>

        {/* SECTION HEADING */}

        <div className="mb-4 flex items-end justify-between px-3 sm:px-5 lg:px-8">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#641010] sm:text-xl">
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

          <span className="text-[10px] text-gray-500 sm:text-xs">
            {filteredProducts.length} products
          </span>
        </div>

        {/* COMPACT PRODUCT GRID */}

        <section
          className="
            grid grid-cols-2 gap-3 px-3
            sm:grid-cols-4 sm:gap-4 sm:px-5
            md:gap-5 md:px-6
            lg:grid-cols-6 lg:gap-4 lg:px-8
          "
        >
          {filteredProducts.map((product) => {
            const selectedWeight = getSelectedWeight(product.id);
            const quantity = getQuantity(product.id, selectedWeight);
            const currentPrice = getWeightPrice(product.price, selectedWeight);
            const isWishlisted = wishlist.includes(product.id);

            return (
              <article
                key={product.id}
                className="
                  group relative flex min-w-0 flex-col
                  overflow-hidden rounded-xl
                  border border-[#e8e8e8]
                  bg-white
                  shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                  transition-all duration-200
                  hover:border-[#d8c5a3]
                  hover:shadow-[0_6px_18px_rgba(0,0,0,0.09)]
                "
              >
                {/* PRODUCT IMAGE — REDUCED HEIGHT */}

                <div
                  className="
                    relative flex h-[110px]
                    items-center justify-center
                    overflow-hidden bg-[#faf8f3]
                    p-2 sm:h-[125px] sm:p-3
                    lg:h-[115px]
                  "
                >
                  <img
                    src={product.image}
                    alt={t(product.titleKey)}
                    loading="lazy"
                    className="
                      h-full w-full object-contain
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  />

                  {/* WISHLIST BUTTON */}

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    aria-pressed={isWishlisted}
                    className="
                      absolute right-2 top-2
                      grid h-8 w-8 place-items-center
                      rounded-full border border-gray-200
                      bg-white/95 text-[#b42323]
                      shadow-sm transition
                      hover:bg-[#fff0f0]
                      sm:right-3 sm:top-3
                    "
                  >
                    <HeartIcon filled={isWishlisted} />
                  </button>

                  {/* CATEGORY BADGE */}
                </div>

                {/* PRODUCT DETAILS — REDUCED PADDING */}

                <div className="flex flex-1 flex-col p-2 sm:p-2.5">
                  {/* PRODUCT NAME + CATEGORY */}

                  <div className="flex items-center justify-between gap-1">
                    <h3
                      title={t(product.titleKey)}
                      className="
                      min-w-0 flex-1 line-clamp-2
                      text-xs font-semibold leading-4
                      text-[#252525]
                      sm:text-sm sm:leading-[18px]"
                    >
                      {t(product.titleKey)}
                    </h3>

                    <span
                      className={`
        shrink-0 whitespace-nowrap rounded-full
        px-1.5 py-0.5 text-[8px] font-semibold
        sm:text-[9px]
        ${
          product.category === "sweets"
            ? "bg-pink-50 text-pink-700"
            : product.category === "gifts"
              ? "bg-purple-50 text-purple-700"
              : "bg-amber-50 text-amber-700"
                                            }
                                          `}
                    >
                      {product.category === "sweets"
                        ? "Sweets"
                        : product.category === "gifts"
                          ? "Gift Pack"
                          : "Mahaprasad"}
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    title={product.description}
                    className="
                    mt-0.5 line-clamp-1 min-h-[14px]
                    text-[10px] leading-[14px]
                    text-gray-500 sm:text-[11px]
                  "
                  >
                    {product.description}
                  </p>

                  {/* KEEP YOUR EXISTING WEIGHT SELECTOR BELOW */}

                  {/* WEIGHT SELECTOR */}

                  <div className="mt-2">
                    <label
                      htmlFor={`weight-${product.id}`}
                      className="
                        mb-1 block text-[10px]
                        font-medium text-gray-600
                      "
                    >
                      Select weight
                    </label>

                    <select
                      id={`weight-${product.id}`}
                      value={selectedWeight}
                      onChange={(event) =>
                        changeWeight(product.id, event.target.value as Weight)
                      }
                      className="
                        h-8 w-full rounded-md
                        border border-gray-200
                        bg-white px-2 text-[11px]
                        text-gray-700 outline-none
                        focus:border-[#e87519]
                        focus:ring-1 focus:ring-[#e87519]
                        sm:text-xs
                      "
                    >
                      <option value="250g">250 g</option>
                      <option value="500g">500 g</option>
                      <option value="1kg">1 kg</option>
                    </select>
                  </div>

                  {/* PRICE */}

                  <div className="mt-2">
                    <div className="flex flex-wrap items-baseline gap-1">
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

                  {/* ADD TO CART / QUANTITY */}

                  <div className="mt-auto pt-2">
                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() => increase(product.id, selectedWeight)}
                        className="
                          flex h-9 w-full
                          items-center justify-center gap-1.5
                          rounded-lg bg-[#e87519]
                          px-1 text-[11px] font-bold
                          text-white transition
                          hover:bg-[#cf5f0d]
                          active:scale-[0.98]
                          sm:text-xs
                        "
                      >
                        <CartIcon />
                        Add to Cart
                      </button>
                    ) : (
                      <div
                        className="
                          flex h-9 w-full items-center
                          justify-between overflow-hidden
                          rounded-lg border border-[#e87519]
                          bg-white
                        "
                      >
                        <button
                          type="button"
                          onClick={() => decrease(product.id, selectedWeight)}
                          aria-label="Decrease quantity"
                          className="
                            h-full flex-1 bg-[#fff7ef]
                            text-lg font-semibold
                            text-[#c45a0c]
                            hover:bg-[#ffead8]
                          "
                        >
                          −
                        </button>

                        <span className="flex-1 text-center text-xs font-bold text-gray-800">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increase(product.id, selectedWeight)}
                          aria-label="Increase quantity"
                          className="
                            h-full flex-1 bg-[#e87519]
                            text-lg font-semibold text-white
                            hover:bg-[#cf5f0d]
                          "
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
            <h3 className="mt-3 font-serif text-lg font-semibold text-[#641010]">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Please select another category.
            </p>
          </div>
        )}

        {/* FOOTER DECORATION */}

        <div className="mt-10 flex items-center justify-center gap-2 px-4 text-[#c99435]">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8b66c] lg:w-24" />
          <span>❧ ❧ ❧</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8b66c] lg:w-24" />
        </div>
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

/* =====================================================
   HEART ICON
===================================================== */

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}
