"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

/* =========================================================
   TYPES
========================================================= */

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
  price: number;
  image: string;
  category: ProductCategory;
};

type CartItem = {
  productId: number;
  weight: Weight;
  quantity: number;
};

/* =========================================================
   CONSTANTS
========================================================= */

const CART_STORAGE_KEY = "prasadam-cart";
const OLD_WEIGHT_STORAGE_KEY = "prasadam-cart-weights";
const CART_UPDATED_EVENT = "prasadam-cart-updated";

const DEFAULT_WEIGHT: Weight = "500g";

const categories: CategoryItem[] = [
  {
    id: "all",
    labelKey: "all",
  },
  {
    id: "sweets",
    labelKey: "sweets",
  },
  {
    id: "mahaprasad",
    labelKey: "mahaprasad",
  },
  {
    id: "gifts",
    labelKey: "gifts",
  },
];

const products: Product[] = [
  {
    id: 1,
    titleKey: "makhanaPrasadam",
    price: 200,
    image: "/images/makhana-prasadam.jpg",
    category: "mahaprasad",
  },
  {
    id: 2,
    titleKey: "peda",
    price: 180,
    image: "/images/peda.jpg",
    category: "sweets",
  },
  {
    id: 3,
    titleKey: "dryPrasadam",
    price: 250,
    image: "/images/dry-prasadam.jpg",
    category: "mahaprasad",
  },
  {
    id: 4,
    titleKey: "panchamrit",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function isValidWeight(value: unknown): value is Weight {
  return (
    value === "250g" ||
    value === "500g" ||
    value === "1kg"
  );
}

function getWeightPrice(
  basePrice: number,
  weight: Weight
): number {
  if (weight === "250g") {
    return basePrice * 0.5;
  }

  if (weight === "1kg") {
    return basePrice * 2;
  }

  return basePrice;
}

function cleanCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        Boolean(
          item &&
            typeof item === "object" &&
            !Array.isArray(item)
        )
    )
    .map((item) => ({
      productId: Number(item.productId),
      weight: item.weight,
      quantity: Math.floor(Number(item.quantity)),
    }))
    .filter(
      (item): item is CartItem =>
        Number.isInteger(item.productId) &&
        item.productId > 0 &&
        isValidWeight(item.weight) &&
        Number.isFinite(item.quantity) &&
        item.quantity > 0
    );
}

/* =========================================================
   OLD CART MIGRATION
========================================================= */

function migrateOldCart(
  oldCart: unknown,
  oldWeights: unknown
): CartItem[] {
  if (
    !oldCart ||
    typeof oldCart !== "object" ||
    Array.isArray(oldCart)
  ) {
    return [];
  }

  const cartObject =
    oldCart as Record<string, unknown>;

  const weightsObject =
    oldWeights &&
    typeof oldWeights === "object" &&
    !Array.isArray(oldWeights)
      ? (oldWeights as Record<string, unknown>)
      : {};

  return Object.entries(cartObject)
    .map(([productId, quantity]) => {
      const id = Number(productId);
      const count = Number(quantity);

      if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !Number.isFinite(count) ||
        count <= 0
      ) {
        return null;
      }

      const savedWeight =
        weightsObject[productId];

      return {
        productId: id,
        weight: isValidWeight(savedWeight)
          ? savedWeight
          : DEFAULT_WEIGHT,
        quantity: Math.floor(count),
      };
    })
    .filter(
      (item): item is CartItem =>
        item !== null
    );
}

/* =========================================================
   LOAD CART FROM LOCAL STORAGE
========================================================= */

function loadCart(): CartItem[] {
  try {
    const savedCart =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if (!savedCart) {
      return [];
    }

    const parsedCart: unknown =
      JSON.parse(savedCart);

    /* New cart format */

    if (Array.isArray(parsedCart)) {
      return cleanCart(parsedCart);
    }

    /* Old cart format */

    let oldWeights: unknown = {};

    const savedWeights =
      localStorage.getItem(
        OLD_WEIGHT_STORAGE_KEY
      );

    if (savedWeights) {
      try {
        oldWeights =
          JSON.parse(savedWeights);
      } catch {
        oldWeights = {};
      }
    }

    return migrateOldCart(
      parsedCart,
      oldWeights
    );
  } catch (error) {
    console.error(
      "Failed to load prasadam cart:",
      error
    );

    return [];
  }
}

/* =========================================================
   SAVE CART
========================================================= */

function saveCart(cart: CartItem[]) {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );

    localStorage.removeItem(
      OLD_WEIGHT_STORAGE_KEY
    );

    window.dispatchEvent(
      new Event(CART_UPDATED_EVENT)
    );
  } catch (error) {
    console.error(
      "Failed to save prasadam cart:",
      error
    );
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function PrasadamPage() {
  const router = useRouter();

  const { t } = useLanguage();

  const [category, setCategory] =
    useState<Category>("all");

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [cartLoaded, setCartLoaded] =
    useState(false);

  const [selectedWeights, setSelectedWeights] =
    useState<Record<number, Weight>>({});

  /* =======================================================
     LOAD CART
  ======================================================= */

  useEffect(() => {
    const loadedCart = loadCart();

    setCart(loadedCart);
    setCartLoaded(true);
  }, []);

  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    saveCart(cart);
  }, [cart, cartLoaded]);

  /* =======================================================
     FILTER PRODUCTS
  ======================================================= */

  const filteredProducts = useMemo(() => {
    if (category === "all") {
      return products;
    }

    return products.filter(
      (product) =>
        product.category === category
    );
  }, [category]);

  /* =======================================================
     GET SELECTED WEIGHT
  ======================================================= */

  const getSelectedWeight = (
    productId: number
  ): Weight => {
    return (
      selectedWeights[productId] ??
      DEFAULT_WEIGHT
    );
  };

  /* =======================================================
     GET CART ITEM
  ======================================================= */

  const findCartItem = (
    productId: number,
    weight: Weight
  ) => {
    return cart.find(
      (item) =>
        item.productId === productId &&
        item.weight === weight
    );
  };

  /* =======================================================
     GET QUANTITY
  ======================================================= */

  const getQuantity = (
    productId: number,
    weight: Weight
  ): number => {
    return (
      findCartItem(
        productId,
        weight
      )?.quantity ?? 0
    );
  };

  /* =======================================================
     CHANGE WEIGHT
  ======================================================= */

  const changeWeight = (
    productId: number,
    weight: Weight
  ) => {
    setSelectedWeights(
      (previousWeights) => ({
        ...previousWeights,
        [productId]: weight,
      })
    );
  };

  /* =======================================================
     INCREASE
  ======================================================= */

  const increase = (
    productId: number,
    weight: Weight
  ) => {
    setCart((previousCart) => {
      const existingItem =
        previousCart.find(
          (item) =>
            item.productId ===
              productId &&
            item.weight === weight
        );

      if (existingItem) {
        return previousCart.map(
          (item) =>
            item.productId ===
              productId &&
            item.weight === weight
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      }

      return [
        ...previousCart,
        {
          productId,
          weight,
          quantity: 1,
        },
      ];
    });
  };

  /* =======================================================
     DECREASE
  ======================================================= */

  const decrease = (
    productId: number,
    weight: Weight
  ) => {
    setCart((previousCart) => {
      const existingItem =
        previousCart.find(
          (item) =>
            item.productId ===
              productId &&
            item.weight === weight
        );

      if (!existingItem) {
        return previousCart;
      }

      if (existingItem.quantity <= 1) {
        return previousCart.filter(
          (item) =>
            !(
              item.productId ===
                productId &&
              item.weight === weight
            )
        );
      }

      return previousCart.map(
        (item) =>
          item.productId ===
              productId &&
          item.weight === weight
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
      );
    });
  };

  /* =======================================================
     CART COUNT
  ======================================================= */

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cart]);

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="
        min-h-[100dvh]
        w-full
        overflow-x-hidden
        bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0%,#fffaf0_42%,#f6ead5_100%)]
        pb-[110px]
        text-[#4b4039]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:bg-[#fff9ed]
        lg:pb-14
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="
          sticky
          top-0
          z-30
          flex
          h-[68px]
          items-center
          justify-between
          border-b
          border-[#eadbc5]
          bg-[#fffdf8]/95
          px-3
          backdrop-blur-md

          sm:h-[74px]
          sm:px-5

          md:h-[80px]
          md:px-7

          lg:static
          lg:h-[84px]
          lg:px-10
        "
      >
        {/* BACK */}

        <button
          type="button"
          onClick={() => router.back()}
          aria-label={t("back")}
          className="
            grid
            h-9
            w-9
            shrink-0
            place-items-center
            rounded-full
            border
            border-[#eadbc5]
            bg-[#fffdf8]
            text-[27px]
            leading-none
            text-[#a71919]
            shadow-sm
            transition

            active:scale-95

            sm:h-10
            sm:w-10

            lg:h-11
            lg:w-11
            lg:hover:border-[#c99435]
            lg:hover:bg-[#fff8ea]
          "
        >
          ‹
        </button>

        {/* TITLE */}

        <div
          className="
            flex-1
            text-center

            lg:ml-4
            lg:flex-none
            lg:text-left
          "
        >
          <span
            className="
              hidden
              text-[10px]
              font-bold
              uppercase
              tracking-[1.3px]
              text-[#9a762f]

              lg:block
            "
          >
            Shri Govardhannath Haveli
          </span>

          <h1
            className="
              m-0
              font-serif
              text-[22px]
              font-semibold
              text-[#641010]

              sm:text-2xl

              md:text-[27px]
            "
          >
            {t("prasadam")}
          </h1>
        </div>

        {/* CART ICON */}

        <button
          type="button"
          onClick={() =>
            router.push(
              "/prasadam/cart"
            )
          }
          aria-label="Open Cart"
          className="
            relative
            grid
            h-9
            w-9
            shrink-0
            place-items-center
            rounded-full
            border
            border-[#eadbc5]
            bg-[#fffdf8]
            text-[#a71919]
            shadow-sm
            transition

            active:scale-95

            sm:h-10
            sm:w-10

            lg:ml-auto
            lg:h-11
            lg:w-11
            lg:hover:border-[#c99435]
            lg:hover:bg-[#fff8ea]
          "
        >
          <CartIcon />

          {cartCount > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                grid
                min-h-[17px]
                min-w-[17px]
                place-items-center
                rounded-full
                bg-[#e74b18]
                px-1
                text-[8px]
                font-bold
                text-white
              "
            >
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1420px]

          lg:px-8

          xl:px-10
        "
      >
        {/* =================================================
            DESKTOP HERO
        ================================================= */}

        <section
          className="
            hidden

            lg:mt-7
            lg:flex
            lg:min-h-[150px]
            lg:items-center
            lg:justify-between
            lg:gap-8
            lg:rounded-[22px]
            lg:border
            lg:border-[#eadbc5]
            lg:bg-gradient-to-br
            lg:from-[#fffdf8]
            lg:to-[#fff3df]
            lg:px-8
            lg:py-7
            lg:shadow-[0_10px_30px_rgba(80,45,15,0.06)]
          "
        >
          <div>
            <span
              className="
                mb-2
                block
                text-[11px]
                font-bold
                uppercase
                tracking-[1.4px]
                text-[#c99435]
              "
            >
              Sacred Offering
            </span>

            <h2
              className="
                m-0
                font-serif
                text-[35px]
                font-semibold
                text-[#641010]
              "
            >
              {t("prasadam")}
            </h2>

            <p
              className="
                mt-2
                max-w-[540px]
                text-sm
                leading-6
                text-[#776d65]
              "
            >
              Choose blessed prasadam and sacred
              offerings from Shri Govardhannath Haveli.
            </p>
          </div>

          <div
            className="
              grid
              h-[86px]
              w-[86px]
              shrink-0
              place-items-center
              rounded-full
              border
              border-[#dec182]
              bg-[#fffdf8]
              text-[42px]
            "
          >
            🛕
          </div>
        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <div
          className="
            flex
            w-full
            gap-2
            overflow-x-auto
            px-3
            py-3
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            sm:px-5
            sm:py-4

            md:justify-center
            md:px-6

            lg:justify-start
            lg:px-0
            lg:py-5
          "
        >
          {categories.map((item) => {
            const active =
              category === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setCategory(item.id)
                }
                className={`
                  h-9
                  shrink-0
                  rounded-lg
                  border
                  px-4
                  text-[10px]
                  font-semibold
                  transition-all

                  sm:h-10
                  sm:px-5
                  sm:text-[11px]

                  md:text-xs

                  ${
                    active
                      ? `
                        border-[#e74b18]
                        bg-[#e74b18]
                        text-white
                        shadow-sm
                      `
                      : `
                        border-[#eadbc5]
                        bg-[#fffdf8]
                        text-[#776d65]

                        lg:hover:-translate-y-0.5
                        lg:hover:border-[#e74b18]
                        lg:hover:text-[#e74b18]
                      `
                  }
                `}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </div>

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <section
          className="
            grid
            grid-cols-1
            gap-3
            px-3

            sm:px-5

            md:grid-cols-2
            md:gap-4
            md:px-6

            lg:grid-cols-3
            lg:px-0

            xl:grid-cols-4
            xl:gap-5
          "
        >
          {filteredProducts.map(
            (product) => {
              const selectedWeight =
                getSelectedWeight(
                  product.id
                );

              const quantity =
                getQuantity(
                  product.id,
                  selectedWeight
                );

              const currentPrice =
                getWeightPrice(
                  product.price,
                  selectedWeight
                );

              return (
                <article
                  key={product.id}
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-[#eee0cc]
                    bg-[#fffdf9]
                    p-2.5
                    shadow-[0_4px_14px_rgba(79,43,14,0.04)]
                    transition-all

                    sm:p-3

                    md:min-h-[125px]

                    lg:min-h-[310px]
                    lg:flex-col
                    lg:items-stretch
                    lg:p-3.5
                    lg:hover:-translate-y-1
                    lg:hover:border-[#d7b97f]
                    lg:hover:shadow-[0_12px_30px_rgba(79,43,14,0.09)]
                  "
                >
                  {/* =======================================
                      PRODUCT IMAGE
                  ======================================= */}

                  <div
                    className="
                      relative
                      h-[72px]
                      w-[72px]
                      shrink-0
                      overflow-hidden
                      rounded-lg
                      border
                      border-[#eee0cc]
                      bg-[#f4e5c8]

                      sm:h-[82px]
                      sm:w-[82px]

                      md:h-[94px]
                      md:w-[94px]
                      md:rounded-xl

                      lg:h-[175px]
                      lg:w-full
                      lg:rounded-xl
                    "
                  >
                    <img
                      src={product.image}
                      alt={t(product.titleKey)}
                      loading="lazy"
                      className="
                        absolute
                        inset-0
                        block
                        h-full
                        w-full
                        object-cover
                        object-center
                        transition-transform
                        duration-300

                        lg:hover:scale-[1.03]
                      "
                    />
                  </div>

                  {/* =======================================
                      PRODUCT INFO
                  ======================================= */}

                  <div
                    className="
                      min-w-0
                      flex-1

                      lg:px-1
                    "
                  >
                    <span
                      className="
                        hidden
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[1px]
                        text-[#c99435]

                        md:block
                      "
                    >
                      {t("prasadam")}
                    </span>

                    <h2
                      className="
                        truncate
                        font-serif
                        text-[14px]
                        font-semibold
                        text-[#332820]

                        sm:text-[15px]

                        md:mt-1
                        md:text-[17px]

                        lg:whitespace-normal
                        lg:text-[19px]
                      "
                    >
                      {t(product.titleKey)}
                    </h2>

                    {/* WEIGHT */}

                    <div className="mt-2">
                      <select
                        value={selectedWeight}
                        onChange={(event) =>
                          changeWeight(
                            product.id,
                            event.target
                              .value as Weight
                          )
                        }
                        aria-label="Select weight"
                        className="
                          h-7
                          w-[82px]
                          cursor-pointer
                          rounded-md
                          border
                          border-[#eadbc5]
                          bg-[#fffdf8]
                          px-2
                          text-[10px]
                          font-semibold
                          text-[#641010]
                          outline-none
                          transition
                          focus:border-[#e74b18]
                          focus:ring-1
                          focus:ring-[#e74b18]/20

                          sm:h-9
                          sm:text-[11px]

                          lg:h-9
                          lg:text-xs
                        "
                      >
                        <option value="250g">
                          250 Gram
                        </option>

                        <option value="500g">
                          500 Gram
                        </option>

                        <option value="1kg">
                          1 Kg
                        </option>
                      </select>
                    </div>

                    {/* PRICE */}

                    <p
                      className="
                        mt-1
                        text-[12px]
                        font-bold
                        text-[#a71919]

                        md:mt-2
                        md:text-[13px]

                        lg:text-sm
                      "
                    >
                      ₹
                      {currentPrice.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  {/* =======================================
                      ADD TO CART / QUANTITY
                  ======================================= */}

                  <div
                    className="
                      shrink-0

                      lg:mt-auto
                      lg:w-full
                    "
                  >
                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() =>
                          increase(
                            product.id,
                            selectedWeight
                          )
                        }
                        className="
                          flex
                          h-9
                          min-w-[100px]
                          items-center
                          justify-center
                          gap-1.5
                          rounded-lg
                          border
                          border-[#e74b18]
                          bg-[#e74b18]
                          px-3
                          text-[10px]
                          font-bold
                          text-white
                          shadow-sm
                          transition-all

                          active:scale-[0.97]

                          sm:h-10
                          sm:min-w-[110px]
                          sm:text-[11px]

                          lg:w-full
                          lg:text-xs
                          lg:hover:bg-[#d83f11]
                        "
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div
                        className="
                          flex
                          flex-col
                          gap-1

                          lg:w-full
                        "
                      >
                        <div
                          className="
                            flex
                            h-9
                            items-center
                            overflow-hidden
                            rounded-lg
                            border
                            border-[#e74b18]
                            bg-white
                            shadow-sm

                            sm:h-10

                            lg:w-full
                          "
                        >
                          {/* MINUS */}

                          <button
                            type="button"
                            onClick={() =>
                              decrease(
                                product.id,
                                selectedWeight
                              )
                            }
                            aria-label="Decrease quantity"
                            className="
                              grid
                              h-full
                              w-9
                              shrink-0
                              place-items-center
                              bg-white
                              text-lg
                              font-bold
                              text-[#e74b18]
                              transition

                              active:bg-[#fff2eb]

                              sm:w-10

                              lg:hover:bg-[#fff2eb]
                            "
                          >
                            −
                          </button>

                          {/* NUMBER */}

                          <span
                            className="
                              grid
                              h-full
                              min-w-[34px]
                              flex-1
                              place-items-center
                              border-x
                              border-[#f1d6cb]
                              bg-[#fffaf7]
                              px-2
                              text-xs
                              font-bold
                              text-[#641010]

                              sm:text-[13px]
                            "
                          >
                            {quantity}
                          </span>

                          {/* PLUS */}

                          <button
                            type="button"
                            onClick={() =>
                              increase(
                                product.id,
                                selectedWeight
                              )
                            }
                            aria-label="Increase quantity"
                            className="
                              grid
                              h-full
                              w-9
                              shrink-0
                              place-items-center
                              bg-[#e74b18]
                              text-lg
                              font-bold
                              text-white
                              transition

                              active:bg-[#c83c10]

                              sm:w-10

                              lg:hover:bg-[#d83f11]
                            "
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            }
          )}
        </section>

        {/* =================================================
            DECORATION
        ================================================= */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-1.5
            px-4
            text-[#c99435]

            lg:mt-12
          "
        >
          <span
            className="
              h-px
              w-12
              bg-gradient-to-r
              from-transparent
              to-[#d8b66c]

              lg:w-24
            "
          />

          <b className="font-normal">
            ❧
          </b>

          <b className="font-normal">
            ❧
          </b>

          <b className="font-normal">
            ❧
          </b>

          <span
            className="
              h-px
              w-12
              bg-gradient-to-l
              from-transparent
              to-[#d8b66c]

              lg:w-24
            "
          />
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   CART ICON
========================================================= */

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="20"
        r="1"
      />

      <circle
        cx="18"
        cy="20"
        r="1"
      />

      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}

/* =========================================================
   WHITE CART ICON
========================================================= */

function CartIconWhite() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="20"
        r="1"
      />

      <circle
        cx="18"
        cy="20"
        r="1"
      />

      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
}