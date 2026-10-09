"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* =====================================================
   TYPES
===================================================== */

type Weight = "250g" | "500g" | "1kg";

type CartItemData = {
  productId: number;
  weight: Weight;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & CartItemData;

/* =====================================================
   PRODUCTS
===================================================== */

const products: Product[] = [
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

/* =====================================================
   CONSTANTS
===================================================== */

const CART_STORAGE_KEY = "prasadam-cart";
const OLD_WEIGHT_STORAGE_KEY = "prasadam-cart-weights";
const CART_UPDATED_EVENT = "prasadam-cart-updated";
const DELIVERY_CHARGE = 50;

/* =====================================================
   HELPERS
===================================================== */

function getWeightPrice(price: number, weight: Weight): number {
  switch (weight) {
    case "250g":
      return price * 0.5;

    case "1kg":
      return price * 2;

    case "500g":
    default:
      return price;
  }
}

function getWeightLabel(weight: Weight): string {
  switch (weight) {
    case "250g":
      return "250 Gram";

    case "1kg":
      return "1 Kg";

    case "500g":
    default:
      return "500 Gram";
  }
}

function isValidWeight(value: unknown): value is Weight {
  return value === "250g" || value === "500g" || value === "1kg";
}

function isValidCartItem(item: unknown): item is CartItemData {
  if (!item || typeof item !== "object") {
    return false;
  }

  const cartItem = item as Partial<CartItemData>;

  return (
    typeof cartItem.productId === "number" &&
    Number.isFinite(cartItem.productId) &&
    products.some((product) => product.id === cartItem.productId) &&
    isValidWeight(cartItem.weight) &&
    typeof cartItem.quantity === "number" &&
    Number.isFinite(cartItem.quantity) &&
    cartItem.quantity > 0
  );
}

function formatPrice(price: number): string {
  return price.toLocaleString("en-IN");
}

/* =====================================================
   LOAD CART
===================================================== */

function loadCart(): CartItemData[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsed: unknown = JSON.parse(savedCart);

    /* NEW FORMAT */

    if (Array.isArray(parsed)) {
      return parsed.filter(isValidCartItem);
    }

    /* OLD FORMAT */

    if (
      parsed &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      return Object.entries(parsed)
        .map(([productId, quantity]) => ({
          productId: Number(productId),
          weight: "500g" as Weight,
          quantity: Number(quantity),
        }))
        .filter(
          (item) =>
            Number.isFinite(item.productId) &&
            Number.isFinite(item.quantity) &&
            item.quantity > 0 &&
            products.some(
              (product) => product.id === item.productId,
            ),
        );
    }

    return [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
}

/* =====================================================
   SAVE CART
===================================================== */

function saveCart(cart: CartItemData[]): void {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart),
    );

    localStorage.removeItem(OLD_WEIGHT_STORAGE_KEY);

    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

/* =====================================================
   CART PAGE
===================================================== */

export default function CartPage() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItemData[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* ===================================================
     LOAD CART ON MOUNT
  =================================================== */

  useEffect(() => {
    const savedCart = loadCart();

    setCart(savedCart);
    setLoaded(true);
  }, []);

  /* ===================================================
     AUTO SAVE CART
  =================================================== */

  useEffect(() => {
    if (!loaded) {
      return;
    }

    saveCart(cart);
  }, [cart, loaded]);

  /* ===================================================
     CART ITEMS
  =================================================== */

  const cartItems = useMemo<CartItem[]>(() => {
    return cart
      .map((cartItem) => {
        const product = products.find(
          (item) => item.id === cartItem.productId,
        );

        if (!product) {
          return null;
        }

        return {
          ...product,
          productId: cartItem.productId,
          weight: cartItem.weight,
          quantity: cartItem.quantity,
        };
      })
      .filter(
        (item): item is CartItem => item !== null,
      );
  }, [cart]);

  /* ===================================================
     TOTAL ITEMS
  =================================================== */

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [cartItems]);

  /* ===================================================
     SUBTOTAL
  =================================================== */

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = getWeightPrice(
        item.price,
        item.weight,
      );

      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  /* ===================================================
     DELIVERY
  =================================================== */

  const deliveryCharge =
    subtotal > 0 ? DELIVERY_CHARGE : 0;

  /* ===================================================
     TOTAL
  =================================================== */

  const totalAmount = subtotal + deliveryCharge;

  /* ===================================================
     INCREASE QUANTITY
  =================================================== */

  const increase = (
    productId: number,
    weight: Weight,
  ): void => {
    setCart((previousCart) => {
      const exists = previousCart.some(
        (item) =>
          item.productId === productId &&
          item.weight === weight,
      );

      if (exists) {
        return previousCart.map((item) =>
          item.productId === productId &&
          item.weight === weight
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
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

  /* ===================================================
     DECREASE QUANTITY
  =================================================== */

  const decrease = (
    productId: number,
    weight: Weight,
  ): void => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.productId === productId &&
          item.weight === weight
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  /* ===================================================
     REMOVE ITEM
  =================================================== */

  const removeItem = (
    productId: number,
    weight: Weight,
  ): void => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.weight === weight
          ),
      ),
    );
  };

  /* ===================================================
     PLACE ORDER
  =================================================== */

  const handlePlaceOrder = (): void => {
    if (!loaded || cartItems.length === 0) {
      console.error("Cart is empty");
      return;
    }

    const checkoutCart = cart.filter(isValidCartItem);

    if (checkoutCart.length === 0) {
      console.error("Cart has no valid items");
      return;
    }

    try {
      saveCart(checkoutCart);

      router.push("/prasadam/checkout");
    } catch (error) {
      console.error(
        "Failed to proceed to checkout:",
        error,
      );
    }
  };

  /* ===================================================
     LOADING
  =================================================== */

  if (!loaded) {
    return (
      <main
        className="
          min-h-[100dvh]
          bg-[#fffaf3]

          lg:ml-[92px]
          lg:w-[calc(100%-92px)]
        "
      />
    );
  }

  /* ===================================================
     EMPTY CART
  =================================================== */

  if (cartItems.length === 0) {
    return (
      <main
        className="
          min-h-[100dvh]
          bg-[#fffaf3]
          pb-[100px]

          lg:ml-[92px]
          lg:w-[calc(100%-92px)]
        "
      >
        <CartHeader
          totalItems={0}
          onBack={() => router.back()}
        />

        <section
          className="
            flex
            min-h-[calc(100dvh-170px)]
            items-center
            justify-center
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-[430px]
              text-center
            "
          >
            <div
              className="
                mx-auto
                grid
                h-[90px]
                w-[90px]
                place-items-center
                rounded-full
                border
                border-[#eadbc5]
                bg-[#fffdf8]
                shadow-sm
              "
            >
              <CartIcon />
            </div>

            <h2
              className="
                mt-6
                font-serif
                text-2xl
                font-bold
                text-[#561010]
              "
            >
              Your cart is empty
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-[330px]
                text-sm
                leading-6
                text-[#81756c]
              "
            >
              Add your favourite prasadam before
              placing an order.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/prasadam")
              }
              className="
                mt-7
                min-h-[48px]
                rounded-xl
                bg-[#a71919]
                px-8
                text-sm
                font-bold
                text-white
                shadow-md
                transition

                hover:bg-[#861414]
                active:scale-[0.98]
              "
            >
              Explore Prasadam
            </button>
          </div>
        </section>
      </main>
    );
  }

  /* ===================================================
     MAIN CART
  =================================================== */

  return (
    <main
      className="
        min-h-[100dvh]
        overflow-x-hidden
        bg-[#fffaf3]
        pb-10

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      <CartHeader
        totalItems={totalItems}
        onBack={() => router.back()}
      />

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-3
          py-5

          sm:px-5
          sm:py-6

          lg:px-8
          lg:py-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-5

            lg:grid-cols-[minmax(0,1fr)_360px]
            lg:items-start
            lg:gap-7

            xl:grid-cols-[minmax(0,1fr)_390px]
          "
        >
          {/* =================================================
              CART ITEMS
          ================================================= */}

          <section className="min-w-0">
            <div
              className="
                overflow-hidden
                rounded-[18px]
                border
                border-[#eadbc5]
                bg-[#fffdf8]
                shadow-[0_8px_25px_rgba(80,45,15,0.05)]
              "
            >
              {cartItems.map((item, index) => {
                const itemPrice = getWeightPrice(
                  item.price,
                  item.weight,
                );

                const itemTotal =
                  itemPrice * item.quantity;

                return (
                  <article
                    key={`${item.productId}-${item.weight}`}
                    className={`
                      p-3

                      sm:p-4

                      lg:p-5

                      ${
                        index !== cartItems.length - 1
                          ? "border-b border-[#eee1cf]"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-start
                        gap-3

                        sm:gap-4
                      "
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          h-[76px]
                          w-[76px]
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#eee1cf]
                          bg-[#f7eddf]

                          sm:h-[100px]
                          sm:w-[100px]

                          lg:h-[120px]
                          lg:w-[120px]
                        "
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="
                            block
                            h-full
                            w-full
                            object-cover
                            object-center
                          "
                        />
                      </div>

                      {/* INFO */}

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <div
                          className="
                            flex
                            min-w-0
                            items-start
                            justify-between
                            gap-2
                          "
                        >
                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >
                            {/* CATEGORY */}

                            <span
                              className="
                                block
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[1px]
                                text-[#c18b32]
                              "
                            >
                              Prasadam
                            </span>

                            {/* NAME */}

                            <h3
                              className="
                                mt-1
                                truncate
                                font-serif
                                text-[15px]
                                font-bold
                                text-[#4d1616]

                                sm:text-lg
                              "
                            >
                              {item.name}
                            </h3>

                            {/* WEIGHT */}

                            <span
                              className="
                                mt-1
                                inline-flex
                                rounded-md
                                border
                                border-[#eadbc5]
                                bg-[#fff8ea]
                                px-2
                                py-1
                                text-[9px]
                                font-bold
                                text-[#8a641f]

                                sm:text-[10px]
                              "
                            >
                              {getWeightLabel(item.weight)}
                            </span>
                          </div>

                          {/* REMOVE */}

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(
                                item.productId,
                                item.weight,
                              )
                            }
                            aria-label={`Remove ${
                              item.name
                            } ${getWeightLabel(
                              item.weight,
                            )}`}
                            className="
                              grid
                              h-8
                              w-8
                              shrink-0
                              place-items-center
                              rounded-full
                              text-[#9a8b7e]
                              transition

                              hover:bg-[#fff0e8]
                              hover:text-[#a71919]
                            "
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        {/* PRICE */}

                        <p
                          className="
                            mt-2
                            text-[13px]
                            font-bold
                            text-[#a71919]

                            sm:text-base
                          "
                        >
                          ₹{formatPrice(itemPrice)}

                          <span
                            className="
                              ml-1
                              text-[9px]
                              font-medium
                              text-[#8d8177]
                            "
                          >
                            /{" "}
                            {getWeightLabel(
                              item.weight,
                            )}
                          </span>
                        </p>

                        {/* QUANTITY */}

                        <div
                          className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-3
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
                              border-[#dfcdb4]
                              bg-white

                              sm:h-10
                            "
                          >
                            {/* MINUS */}

                            <button
                              type="button"
                              onClick={() =>
                                decrease(
                                  item.productId,
                                  item.weight,
                                )
                              }
                              aria-label="Decrease quantity"
                              className="
                                grid
                                h-full
                                w-9
                                place-items-center
                                text-lg
                                font-bold
                                text-[#a71919]

                                hover:bg-[#fff3df]
                              "
                            >
                              −
                            </button>

                            {/* QUANTITY */}

                            <span
                              className="
                                grid
                                h-full
                                min-w-[38px]
                                place-items-center
                                border-x
                                border-[#eee1cf]
                                px-2
                                text-xs
                                font-bold
                              "
                            >
                              {item.quantity}
                            </span>

                            {/* PLUS */}

                            <button
                              type="button"
                              onClick={() =>
                                increase(
                                  item.productId,
                                  item.weight,
                                )
                              }
                              aria-label="Increase quantity"
                              className="
                                grid
                                h-full
                                w-9
                                place-items-center
                                bg-[#e74b18]
                                text-lg
                                font-bold
                                text-white

                                hover:bg-[#d83f11]
                              "
                            >
                              +
                            </button>
                          </div>

                          {/* ITEM TOTAL */}

                          <strong
                            className="
                              text-sm
                              text-[#4d1616]

                              sm:text-base
                            "
                          >
                            ₹{formatPrice(itemTotal)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ADD MORE */}

            <button
              type="button"
              onClick={() =>
                router.push("/prasadam")
              }
              className="
                mt-4
                flex
                min-h-[46px]
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-dashed
                border-[#d5b97f]
                bg-[#fffaf0]
                text-xs
                font-bold
                text-[#a71919]
                transition

                hover:bg-[#fff3df]
              "
            >
              + Add More Prasadam
            </button>
          </section>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside
            className="
              block
              w-full

              lg:sticky
              lg:top-[100px]
            "
          >
            <div
              className="
                rounded-[18px]
                border
                border-[#eadbc5]
                bg-[#fffdf8]
                p-4
                shadow-[0_10px_30px_rgba(80,45,15,0.07)]

                sm:p-5

                lg:p-6
              "
            >
              {/* TITLE */}

              <span
                className="
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[1.3px]
                  text-[#c18b32]
                "
              >
                Order Details
              </span>

              <h2
                className="
                  mt-1
                  font-serif
                  text-[21px]
                  font-bold
                  text-[#561010]

                  sm:text-[22px]
                "
              >
                Order Summary
              </h2>

              {/* SUMMARY */}

              <div
                className="
                  mt-5
                  space-y-3
                  border-b
                  border-[#eee1cf]
                  pb-5
                "
              >
                <SummaryRow
                  label={`Subtotal (${totalItems} ${
                    totalItems === 1
                      ? "item"
                      : "items"
                  })`}
                  value={`₹${formatPrice(
                    subtotal,
                  )}`}
                />

                <SummaryRow
                  label="Delivery"
                  value={`₹${formatPrice(
                    deliveryCharge,
                  )}`}
                />
              </div>

              {/* TOTAL */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-5
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      text-xs
                      font-semibold
                      text-[#4c4037]
                    "
                  >
                    Total Amount
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      text-[#97897d]
                    "
                  >
                    Inclusive of all charges
                  </p>
                </div>

                <strong
                  className="
                    shrink-0
                    text-xl
                    font-bold
                    text-[#a71919]

                    sm:text-2xl
                  "
                >
                  ₹{formatPrice(totalAmount)}
                </strong>
              </div>

              {/* PLACE ORDER */}

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="
                  flex
                  min-h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#a71919]
                  px-5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_20px_rgba(167,25,25,0.18)]
                  transition

                  hover:bg-[#821313]
                  active:scale-[0.99]
                "
              >
                Place Order

                <span>→</span>
              </button>

              {/* SECURE CHECKOUT */}

              <p
                className="
                  mt-4
                  text-center
                  text-[10px]
                  text-[#8b7d72]
                "
              >
                🔒 Secure checkout
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   HEADER
===================================================== */

function CartHeader({
  totalItems,
  onBack,
}: {
  totalItems: number;
  onBack: () => void;
}) {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-[#eee1cf]
        bg-[#fffaf3]/95
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[64px]
          max-w-[1400px]
          items-center
          justify-between
          gap-3
          px-4

          sm:min-h-[70px]
          sm:px-6

          lg:min-h-[78px]
          lg:px-8
        "
      >
        {/* LEFT */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          {/* BACK */}

          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              border
              border-[#eadbc5]
              bg-white
              text-[#a71919]

              lg:h-11
              lg:w-11
            "
          >
            ←
          </button>

          {/* TITLE */}

          <div className="min-w-0">
            <span
              className="
                block
                truncate
                text-[8px]
                font-bold
                uppercase
                tracking-[0.8px]
                text-[#c18b32]

                sm:text-[9px]
                sm:tracking-[1px]
              "
            >
              Shri Govardhannath
            </span>

            <h1
              className="
                font-serif
                text-xl
                font-bold
                text-[#561010]

                lg:text-2xl
              "
            >
              My Cart
            </h1>
          </div>
        </div>

        {/* TOTAL ITEMS */}

        {totalItems > 0 && (
          <span
            className="
              shrink-0
              rounded-full
              border
              border-[#eadbc5]
              bg-white
              px-2.5
              py-1
              text-[9px]
              font-bold
              text-[#75685e]

              sm:px-3
              sm:py-1.5
              sm:text-[11px]
            "
          >
            {totalItems}{" "}
            {totalItems === 1 ? "Item" : "Items"}
          </span>
        )}
      </div>
    </header>
  );
}

/* =====================================================
   SUMMARY ROW
===================================================== */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        text-xs
      "
    >
      <span className="min-w-0 text-[#81756c]">
        {label}
      </span>

      <strong className="shrink-0 text-[#4b4038]">
        {value}
      </strong>
    </div>
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="
        h-10
        w-10
        text-[#a71919]
      "
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

/* =====================================================
   TRASH ICON
===================================================== */

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="
        h-4
        w-4
      "
    >
      <path d="M3 6h18" />

      <path d="M8 6V4h8v2" />

      <path d="M19 6l-1 14H6L5 6" />

      <path d="M10 11v5" />

      <path d="M14 11v5" />
    </svg>
  );
}