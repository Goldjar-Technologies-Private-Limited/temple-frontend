"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type Weight = "250g" | "500g" | "1kg";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight?: Weight;
};

type Customer = {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
};

type Order = {
  id: string;

  customer: Customer;

  items: OrderItem[];

  paymentMethod: "upi" | "card" | "cod";

  subtotal: number;

  deliveryCharge: number;

  totalAmount: number;

  createdAt: string;
};

/* =========================================================
   CONSTANTS
========================================================= */

const LAST_ORDER_KEY = "last-prasadam-order";

/* =========================================================
   PAGE
========================================================= */

export default function OrderSuccessPage() {
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);

  const [loaded, setLoaded] = useState(false);

  /* =======================================================
     LOAD LAST ORDER
  ======================================================= */

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem(LAST_ORDER_KEY);

      if (!savedOrder) {
        setOrder(null);
        return;
      }

      const parsedOrder: unknown = JSON.parse(savedOrder);

      if (!isValidOrder(parsedOrder)) {
        console.error("Invalid saved order data.");
        setOrder(null);
        return;
      }

      setOrder(parsedOrder);
    } catch (error) {
      console.error("Failed to load order:", error);
      setOrder(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  /* =======================================================
     HELPERS
  ======================================================= */

  const formatPrice = (value: number) => {
    if (!Number.isFinite(value)) {
      return "0";
    }

    return value.toLocaleString("en-IN");
  };

  const formatDate = (value: string) => {
    try {
      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return "";
      }

      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "";
    }
  };

  const getPaymentLabel = (method: Order["paymentMethod"]) => {
    if (method === "upi") {
      return "UPI";
    }

    if (method === "card") {
      return "Debit / Credit Card";
    }

    return "Cash on Delivery";
  };

  /* =======================================================
     LOADING
  ======================================================= */

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

  /* =======================================================
     NO ORDER FOUND
  ======================================================= */

  if (!order) {
    return (
      <main
        className="
          flex
          min-h-[100dvh]
          items-center
          justify-center
          bg-[#fffaf3]
          px-4
          pb-[100px]

          lg:ml-[92px]
          lg:w-[calc(100%-92px)]
        "
      >
        <div
          className="
            w-full
            max-w-[430px]
            rounded-[22px]
            border
            border-[#eadbc5]
            bg-[#fffdf8]
            p-6
            text-center
            shadow-[0_12px_35px_rgba(80,45,15,0.08)]

            sm:p-8
          "
        >
          <div
            className="
              mx-auto
              grid
              h-20
              w-20
              place-items-center
              rounded-full
              bg-[#fff1df]
              text-3xl
            "
          >
            🛍️
          </div>

          <h1
            className="
              mt-5
              font-serif
              text-2xl
              font-bold
              text-[#641010]
            "
          >
            No Order Found
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#81756c]
            "
          >
            We could not find your latest Prasadam order.
          </p>

          <button
            type="button"
            onClick={() => router.push("/prasadam")}
            className="
              mt-6
              min-h-[48px]
              w-full
              rounded-xl
              bg-[#a71919]
              px-5
              text-sm
              font-bold
              text-white
              transition

              hover:bg-[#821313]
              active:scale-[0.98]
            "
          >
            Explore Prasadam
          </button>
        </div>
      </main>
    );
  }

  /* =======================================================
     SUCCESS
  ======================================================= */

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0%,#fffaf0_45%,#f6ead5_100%)]
        pb-[110px]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1100px]
          px-3
          py-5

          sm:px-5
          sm:py-8

          md:px-7

          lg:px-8
          lg:py-10
        "
      >
        {/* =================================================
            SUCCESS HERO
        ================================================= */}

        <section
          className="
            rounded-[22px]
            border
            border-[#e5d5bc]
            bg-[#fffdf8]
            px-4
            py-7
            text-center
            shadow-[0_12px_35px_rgba(80,45,15,0.07)]

            sm:px-6
            sm:py-9

            lg:px-10
            lg:py-10
          "
        >
          {/* SUCCESS ICON */}

          <div
            className="
              relative
              mx-auto
              grid
              h-[82px]
              w-[82px]
              place-items-center
              rounded-full
              bg-[#edf8ee]

              sm:h-[94px]
              sm:w-[94px]
            "
          >
            <div
              className="
                grid
                h-[58px]
                w-[58px]
                place-items-center
                rounded-full
                bg-[#248b42]
                text-[28px]
                font-bold
                text-white
                shadow-[0_8px_20px_rgba(36,139,66,0.22)]

                sm:h-[66px]
                sm:w-[66px]
                sm:text-[32px]
              "
            >
              ✓
            </div>
          </div>

          <span
            className="
              mt-5
              block
              text-[10px]
              font-bold
              uppercase
              tracking-[1.5px]
              text-[#c18b32]
            "
          >
            Jai Shree Krishna
          </span>

          <h1
            className="
              mt-1
              font-serif
              text-[25px]
              font-bold
              text-[#561010]

              sm:text-[30px]

              lg:text-[34px]
            "
          >
            Order Placed Successfully
          </h1>

          <p
            className="
              mx-auto
              mt-2
              max-w-[560px]
              text-xs
              leading-5
              text-[#81756c]

              sm:text-sm
              sm:leading-6
            "
          >
            Thank you for your Prasadam order. Your sacred offering request
            has been received successfully.
          </p>

          {/* ORDER ID */}

          <div
            className="
              mx-auto
              mt-5
              inline-flex
              flex-col
              rounded-xl
              border
              border-[#eadbc5]
              bg-[#fff8ea]
              px-5
              py-3
            "
          >
            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[1px]
                text-[#96887b]
              "
            >
              Order ID
            </span>

            <strong
              className="
                mt-0.5
                text-sm
                text-[#a71919]

                sm:text-base
              "
            >
              {order.id}
            </strong>
          </div>

          <p
            className="
              mt-3
              text-[10px]
              text-[#9a8d82]
            "
          >
            {formatDate(order.createdAt)}
          </p>
        </section>

        {/* =================================================
            DETAILS GRID
        ================================================= */}

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-5

            md:grid-cols-2

            lg:mt-7
            lg:gap-7
          "
        >
          {/* ===============================================
              ORDER ITEMS
          =============================================== */}

          <section
            className="
              rounded-[18px]
              border
              border-[#eadbc5]
              bg-[#fffdf8]
              p-4
              shadow-[0_8px_25px_rgba(80,45,15,0.05)]

              sm:p-5

              lg:p-6
            "
          >
            <SectionTitle icon="🛍️" title="Order Items" />

            <div
              className="
                mt-4
                space-y-3
              "
            >
              {order.items.map((item) => (
                <div
                  key={`${item.id}-${item.weight ?? "500g"}`}
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-[#f0e4d3]
                    pb-3

                    last:border-0
                    last:pb-0
                  "
                >
                  <div
                    className="
                      relative
                      h-[58px]
                      w-[58px]
                      shrink-0
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        h-full
                        w-full
                        rounded-xl
                        border
                        border-[#eee1cf]
                        object-cover
                      "
                    />

                    <span
                      className="
                        absolute
                        -right-1.5
                        -top-1.5
                        grid
                        h-5
                        min-w-5
                        place-items-center
                        rounded-full
                        bg-[#a71919]
                        px-1
                        text-[8px]
                        font-bold
                        text-white
                      "
                    >
                      {item.quantity}
                    </span>
                  </div>

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <h3
                      className="
                        truncate
                        font-serif
                        text-sm
                        font-bold
                        text-[#4d1616]
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-[#81756c]
                      "
                    >
                      ₹{formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>

                  <strong
                    className="
                      shrink-0
                      text-xs
                      text-[#a71919]

                      sm:text-sm
                    "
                  >
                    ₹
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </strong>
                </div>
              ))}
            </div>
          </section>

          {/* ===============================================
              DELIVERY ADDRESS
          =============================================== */}

          <section
            className="
              rounded-[18px]
              border
              border-[#eadbc5]
              bg-[#fffdf8]
              p-4
              shadow-[0_8px_25px_rgba(80,45,15,0.05)]

              sm:p-5

              lg:p-6
            "
          >
            <SectionTitle icon="📍" title="Delivery Details" />

            <div className="mt-4">
              <h3
                className="
                  text-sm
                  font-bold
                  text-[#4d1616]
                "
              >
                {order.customer.fullName}
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#81756c]
                "
              >
                +91 {order.customer.phone}
              </p>

              {order.customer.email && (
                <p
                  className="
                    mt-1
                    break-all
                    text-xs
                    text-[#81756c]
                  "
                >
                  {order.customer.email}
                </p>
              )}

              <div
                className="
                  my-4
                  h-px
                  bg-[#eee1cf]
                "
              />

              <p
                className="
                  text-xs
                  leading-6
                  text-[#655a51]
                "
              >
                {order.customer.address}

                {order.customer.landmark && (
                  <>
                    <br />
                    Landmark: {order.customer.landmark}
                  </>
                )}

                <br />

                {order.customer.city},{" "}
                {order.customer.state}

                <br />

                PIN - {order.customer.pincode}
              </p>
            </div>
          </section>
        </div>

        {/* =================================================
            PAYMENT + TOTAL
        ================================================= */}

        <section
          className="
            mt-5
            rounded-[18px]
            border
            border-[#eadbc5]
            bg-[#fffdf8]
            p-4
            shadow-[0_8px_25px_rgba(80,45,15,0.05)]

            sm:p-5

            lg:mt-7
            lg:p-6
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-5

              md:grid-cols-2
              md:gap-8
            "
          >
            {/* PAYMENT */}

            <div>
              <SectionTitle icon="₹" title="Payment" />

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  gap-3
                  rounded-xl
                  border
                  border-[#eee1cf]
                  bg-[#fffaf2]
                  p-3
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      text-[#4d1616]
                    "
                  >
                    {getPaymentLabel(order.paymentMethod)}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      text-[#918479]
                    "
                  >
                    Selected payment method
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    bg-[#edf8ee]
                    px-2.5
                    py-1
                    text-[9px]
                    font-bold
                    text-[#248b42]
                  "
                >
                  Confirmed
                </span>
              </div>
            </div>

            {/* PRICE */}

            <div>
              <SectionTitle
                icon="₹"
                title="Payment Summary"
              />

              <div
                className="
                  mt-4
                  space-y-3
                "
              >
                <PriceRow
                  label="Subtotal"
                  value={`₹${formatPrice(order.subtotal)}`}
                />

                <PriceRow
                  label="Delivery"
                  value={`₹${formatPrice(order.deliveryCharge)}`}
                />

                <div
                  className="
                    my-3
                    h-px
                    bg-[#eee1cf]
                  "
                />

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <strong
                    className="
                      text-sm
                      text-[#4d1616]
                    "
                  >
                    Total Amount
                  </strong>

                  <strong
                    className="
                      text-xl
                      text-[#a71919]
                    "
                  >
                    ₹{formatPrice(order.totalAmount)}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            MESSAGE
        ================================================= */}

        <div
          className="
            mt-5
            rounded-[16px]
            border
            border-[#e7d6b8]
            bg-[#fff7e5]
            p-4
            text-center

            lg:mt-7
          "
        >
          <p
            className="
              font-serif
              text-sm
              font-semibold
              text-[#6b441d]

              sm:text-base
            "
          >
            🙏 May Shri Govardhannath bless you and your family.
          </p>
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2

            lg:mx-auto
            lg:mt-7
            lg:max-w-[650px]
          "
        >
          <button
            type="button"
            onClick={() => router.push("/prasadam")}
            className="
              min-h-[50px]
              rounded-xl
              border
              border-[#a71919]
              bg-white
              px-5
              text-sm
              font-bold
              text-[#a71919]
              transition

              hover:bg-[#fff2ed]
              active:scale-[0.98]
            "
          >
            Order More Prasadam
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="
              min-h-[50px]
              rounded-xl
              bg-[#a71919]
              px-5
              text-sm
              font-bold
              text-white
              shadow-[0_8px_20px_rgba(167,25,25,0.18)]
              transition

              hover:bg-[#821313]
              active:scale-[0.98]
            "
          >
            Continue to Home →
          </button>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   VALIDATE ORDER
========================================================= */

function isValidOrder(value: unknown): value is Order {
  if (!value || typeof value !== "object") {
    return false;
  }

  const order = value as Partial<Order>;

  if (
    typeof order.id !== "string" ||
    typeof order.createdAt !== "string"
  ) {
    return false;
  }

  if (!order.customer || typeof order.customer !== "object") {
    return false;
  }

  if (!Array.isArray(order.items)) {
    return false;
  }

  if (
    order.paymentMethod !== "upi" &&
    order.paymentMethod !== "card" &&
    order.paymentMethod !== "cod"
  ) {
    return false;
  }

  if (
    typeof order.subtotal !== "number" ||
    typeof order.deliveryCharge !== "number" ||
    typeof order.totalAmount !== "number"
  ) {
    return false;
  }

  return true;
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5
      "
    >
      <div
        className="
          grid
          h-8
          w-8
          shrink-0
          place-items-center
          rounded-full
          bg-[#fff0df]
          text-sm
          font-bold
          text-[#a71919]
        "
      >
        {icon}
      </div>

      <h2
        className="
          font-serif
          text-lg
          font-bold
          text-[#561010]
        "
      >
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   PRICE ROW
========================================================= */

function PriceRow({
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
      <span
        className="
          text-[#81756c]
        "
      >
        {label}
      </span>

      <strong
        className="
          text-[#4b4038]
        "
      >
        {value}
      </strong>
    </div>
  );
}