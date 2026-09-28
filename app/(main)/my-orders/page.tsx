"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type OrderStatus = "Delivered" | "Processing" | "Cancelled";

type Weight = "250g" | "500g" | "1kg";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image?: string;
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

type PaymentMethod = "upi" | "card" | "cod";

type SavedOrder = {
  id: string;
  customer?: Customer;
  items: OrderItem[];
  paymentMethod?: PaymentMethod;
  subtotal?: number;
  deliveryCharge?: number;
  totalAmount?: number;
  createdAt?: string;
  date?: string;
  status?: OrderStatus;
  total?: number;
};

type CartItem = {
  productId: number;
  weight: Weight;
  quantity: number;
};

const ORDERS_KEY = "prasadam-orders";
const LAST_ORDER_KEY = "last-prasadam-order";
const ORDERS_UPDATED_EVENT = "prasadam-orders-updated";

const PRASADAM_CART_KEY = "prasadam-cart";
const PRASADAM_CART_UPDATED_EVENT = "prasadam-cart-updated";

export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [filter, setFilter] = useState<
    "All" | "Processing" | "Delivered" | "Cancelled"
  >("All");

  const [selectedOrder, setSelectedOrder] = useState<SavedOrder | null>(null);

  // =========================================================
  // VALID WEIGHT
  // =========================================================

  const isValidWeight = (value: unknown): value is Weight => {
    return value === "250g" || value === "500g" || value === "1kg";
  };

  // =========================================================
  // NORMALIZE ORDERS
  // =========================================================

  const normalizeOrders = (input: unknown[]): SavedOrder[] => {
    const usedIds = new Set<string>();

    const normalizedOrders: SavedOrder[] = input.map(
      (order: any, orderIndex): SavedOrder => {
        // -----------------------------------------------------
        // UNIQUE ORDER ID
        // -----------------------------------------------------

        const originalId =
          typeof order?.id === "string" && order.id.trim().length > 0
            ? order.id.trim()
            : `PRASADAM-${Date.now()}-${orderIndex}`;

        let uniqueId = originalId;
        let counter = 1;

        while (usedIds.has(uniqueId)) {
          uniqueId = `${originalId}-${counter}`;
          counter++;
        }

        usedIds.add(uniqueId);

        // -----------------------------------------------------
        // ITEMS
        // -----------------------------------------------------

        const items: OrderItem[] = Array.isArray(order?.items)
          ? order.items.map(
              (item: any, itemIndex: number): OrderItem => ({
                id:
                  Number(item?.id) || Number(item?.productId) || itemIndex + 1,

                name:
                  typeof item?.name === "string" && item.name.trim()
                    ? item.name
                    : "Prasadam Item",

                quantity:
                  Number(item?.quantity) > 0 ? Number(item.quantity) : 1,

                price: Number(item?.price) >= 0 ? Number(item.price) : 0,

                image:
                  typeof item?.image === "string" && item.image.trim()
                    ? item.image
                    : undefined,

                weight: isValidWeight(item?.weight) ? item.weight : "500g",
              }),
            )
          : [];

        // -----------------------------------------------------
        // SUBTOTAL
        // -----------------------------------------------------

        const calculatedSubtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );

        const subtotal =
          Number(order?.subtotal) >= 0
            ? Number(order.subtotal)
            : calculatedSubtotal;

        // -----------------------------------------------------
        // DELIVERY
        // -----------------------------------------------------

        const deliveryCharge =
          subtotal > 0
            ? Number(order?.deliveryCharge) >= 0
              ? Number(order.deliveryCharge)
              : 50
            : 0;

        // -----------------------------------------------------
        // TOTAL
        // -----------------------------------------------------

        const calculatedTotal = subtotal + deliveryCharge;

        const totalAmount =
          Number(order?.totalAmount) >= 0
            ? Number(order.totalAmount)
            : Number(order?.total) >= 0
              ? Number(order.total)
              : calculatedTotal;

        // -----------------------------------------------------
        // DATE
        // -----------------------------------------------------

        const createdAt =
          typeof order?.createdAt === "string"
            ? order.createdAt
            : typeof order?.date === "string"
              ? order.date
              : new Date().toISOString();

        // -----------------------------------------------------
        // STATUS
        // -----------------------------------------------------

        const status: OrderStatus =
          order?.status === "Delivered" ||
          order?.status === "Cancelled" ||
          order?.status === "Processing"
            ? order.status
            : "Processing";

        // -----------------------------------------------------
        // RETURN NORMALIZED ORDER
        // -----------------------------------------------------

        return {
          id: uniqueId,
          customer: order?.customer,
          items,

          paymentMethod:
            order?.paymentMethod === "upi" ||
            order?.paymentMethod === "card" ||
            order?.paymentMethod === "cod"
              ? order.paymentMethod
              : undefined,

          subtotal,
          deliveryCharge,
          totalAmount,
          createdAt,
          date: createdAt,
          status,
          total: totalAmount,
        };
      },
    );

    // ---------------------------------------------------------
    // NEWEST ORDER FIRST
    // ---------------------------------------------------------

    return normalizedOrders.sort((a, b) => {
      const dateA = new Date(a.createdAt || "").getTime();

      const dateB = new Date(b.createdAt || "").getTime();

      return dateB - dateA;
    });
  };

  // =========================================================
  // LOAD ORDERS
  // =========================================================

  const loadOrders = () => {
    try {
      const savedOrders = localStorage.getItem(ORDERS_KEY);

      let parsedOrders: unknown[] = [];

      if (savedOrders) {
        const parsed = JSON.parse(savedOrders);

        if (Array.isArray(parsed)) {
          parsedOrders = parsed;
        }
      }

      // -----------------------------------------------------
      // LAST ORDER
      // -----------------------------------------------------

      const lastOrder = localStorage.getItem(LAST_ORDER_KEY);

      if (lastOrder) {
        try {
          const parsedLastOrder = JSON.parse(lastOrder);

          if (parsedLastOrder && typeof parsedLastOrder === "object") {
            const alreadyExists = parsedOrders.some(
              (order: any) => order?.id === parsedLastOrder?.id,
            );

            if (!alreadyExists) {
              parsedOrders.push(parsedLastOrder);
            }
          }
        } catch (error) {
          console.error("Failed to parse last order:", error);
        }
      }

      // -----------------------------------------------------
      // NORMALIZE
      // -----------------------------------------------------

      const normalizedOrders = normalizeOrders(parsedOrders);

      setOrders(normalizedOrders);

      localStorage.setItem(ORDERS_KEY, JSON.stringify(normalizedOrders));
    } catch (error) {
      console.error("Failed to load orders:", error);

      setOrders([]);
    } finally {
      setLoaded(true);
    }
  };

  // =========================================================
  // INITIAL LOAD + EVENTS
  // =========================================================

  useEffect(() => {
    loadOrders();

    const handleOrdersUpdated = () => {
      loadOrders();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === ORDERS_KEY) {
        loadOrders();
      }
    };

    window.addEventListener(ORDERS_UPDATED_EVENT, handleOrdersUpdated);

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, handleOrdersUpdated);

      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // =========================================================
  // CANCEL ORDER
  // =========================================================

  const handleCancelOrder = (orderId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const updatedOrders = orders.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        return {
          ...order,
          status: "Cancelled" as OrderStatus,
        };
      });

      setOrders(updatedOrders);

      localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

      // -----------------------------------------------------
      // UPDATE LAST ORDER
      // -----------------------------------------------------

      const lastOrderRaw = localStorage.getItem(LAST_ORDER_KEY);

      if (lastOrderRaw) {
        try {
          const lastOrder = JSON.parse(lastOrderRaw);

          if (lastOrder?.id === orderId) {
            const cancelledOrder = updatedOrders.find(
              (order) => order.id === orderId,
            );

            if (cancelledOrder) {
              localStorage.setItem(
                LAST_ORDER_KEY,
                JSON.stringify(cancelledOrder),
              );
            }
          }
        } catch (error) {
          console.error("Failed to update last order:", error);
        }
      }

      // -----------------------------------------------------
      // UPDATE MODAL
      // -----------------------------------------------------

      if (selectedOrder?.id === orderId) {
        setSelectedOrder((current) =>
          current
            ? {
                ...current,
                status: "Cancelled",
              }
            : null,
        );
      }

      window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT));
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  // =========================================================
  // VIEW DETAILS
  // =========================================================

  const handleViewDetails = (order: SavedOrder) => {
    setSelectedOrder(order);
  };

  // =========================================================
  // REORDER
  // =========================================================

  const handleReorder = (order: SavedOrder) => {
    try {
      const cartItems: CartItem[] = order.items.map((item) => ({
        productId: item.id,
        weight: item.weight || "500g",
        quantity: item.quantity,
      }));

      localStorage.setItem(PRASADAM_CART_KEY, JSON.stringify(cartItems));

      window.dispatchEvent(new Event(PRASADAM_CART_UPDATED_EVENT));

      setSelectedOrder(null);

      router.push("/prasadam/cart");
    } catch (error) {
      console.error("Failed to reorder:", error);
    }
  };

  // =========================================================
  // FILTER
  // =========================================================

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => (order.status || "Processing") === filter);

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";

      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (order: SavedOrder) => {
    const dateValue = order.createdAt || order.date;

    if (!dateValue) {
      return "Date unavailable";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // PAYMENT LABEL
  // =========================================================

  const getPaymentLabel = (method?: PaymentMethod) => {
    switch (method) {
      case "upi":
        return "UPI";

      case "card":
        return "Card";

      case "cod":
        return "Cash on Delivery";

      default:
        return "Not specified";
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf0]">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#4b2e1f]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#ead8b8] bg-[#fffaf0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => router.push("/prasadam")}
            className="rounded-xl border border-[#d9bc8a] bg-white px-4 py-2 text-sm font-semibold text-[#7b1e1e] transition hover:bg-[#fff6e7]"
          >
            ← Back
          </button>

          <h1 className="text-lg font-bold text-[#7b1e1e] sm:text-xl">
            My Orders
          </h1>

          <button
            type="button"
            onClick={() => router.push("/prasadam/cart")}
            className="rounded-xl bg-[#8f1d1d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#731515]"
          >
            Cart
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* ===================================================
            FILTERS
        =================================================== */}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {["All", "Processing", "Delivered", "Cancelled"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setFilter(
                  item as "All" | "Processing" | "Delivered" | "Cancelled",
                )
              }
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "border-[#8f1d1d] bg-[#8f1d1d] text-white"
                  : "border-[#d9bc8a] bg-white text-[#7b1e1e] hover:bg-[#fff6e7]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-[#ead8b8] bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛍️</div>

            <h3 className="mt-4 text-xl font-bold text-[#7b1e1e]">
              No Orders Found
            </h3>

            <p className="mt-2 text-sm text-[#765f48]">
              You haven't placed any prasadam orders yet.
            </p>

            <button
              type="button"
              onClick={() => router.push("/prasadam")}
              className="mt-5 rounded-xl bg-[#8f1d1d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731515]"
            >
              Shop Prasadam
            </button>
          </div>
        )}

        {/* ===================================================
            ORDERS
        =================================================== */}

        <div className="space-y-5">
          {filteredOrders.map((order) => {
            const status = order.status || "Processing";

            const subtotal =
              order.subtotal ??
              order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              );

            const deliveryCharge =
              order.deliveryCharge ?? (subtotal > 0 ? 50 : 0);

            const total =
              order.totalAmount ?? order.total ?? subtotal + deliveryCharge;

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-[#ead8b8] bg-white shadow-sm"
              >
                {/* =========================================
                      ORDER HEADER
                  ========================================= */}

                <div className="flex flex-col gap-4 border-b border-[#f0e2ca] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div>
                    <p className="text-xs font-medium text-[#8c7252]">
                      Order ID
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-[#7b1e1e]">
                      {order.id}
                    </p>

                    <p className="mt-1 text-xs text-[#8c7252]">
                      {formatDate(order)}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                      status,
                    )}`}
                  >
                    {status}
                  </span>
                </div>

                {/* =========================================
                      ITEMS
                  ========================================= */}

                <div className="divide-y divide-[#f0e2ca]">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order.id}-${item.id}-${item.weight}-${index}`}
                      className="flex items-center gap-3 px-4 py-4 sm:px-5"
                    >
                      {/* IMAGE */}

                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#eac2b8] bg-white">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || "Product image"}
                            className="block h-full w-full object-cover scale-125"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl">
                            🙏
                          </div>
                        )}
                      </div>

                      {/* PRODUCT INFO */}

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-bold text-[#4b2e1f]">
                          {item.name}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#8c7252]">
                          <span>Qty: {item.quantity}</span>

                          {item.weight && <span>• Weight: {item.weight}</span>}
                        </div>

                        <p className="mt-1 text-sm font-semibold text-[#7b1e1e]">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>
                      </div>

                      {/* ITEM TOTAL */}

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-[#7b1e1e]">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* =========================================
                      FOOTER
                  ========================================= */}

                <div className="flex flex-col gap-4 border-t border-[#f0e2ca] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  {/* TOTAL */}

                  <div>
                    <p className="text-xs text-[#8c7252]">Total Amount</p>

                    <p className="mt-1 text-xl font-bold text-[#7b1e1e]">
                      ₹{total.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* BUTTONS */}

                  <div className="flex flex-wrap gap-2">
                    {/* VIEW */}

                    <button
                      type="button"
                      onClick={() => handleViewDetails(order)}
                      className="flex-1 rounded-xl border border-[#cfae78] bg-white px-4 py-2.5 text-sm font-semibold text-[#7b1e1e] transition hover:bg-[#fff6e7] sm:flex-none"
                    >
                      View Details
                    </button>

                    {/* CANCEL */}

                    {status === "Processing" && (
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order.id)}
                        className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 sm:flex-none"
                      >
                        Cancel Order
                      </button>
                    )}

                    {/* REORDER */}

                    {status === "Delivered" && (
                      <button
                        type="button"
                        onClick={() => handleReorder(order)}
                        className="flex-1 rounded-xl bg-[#8f1d1d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#731515] sm:flex-none"
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ===================================================
            HELP
        =================================================== */}

        <section className="mt-8 rounded-2xl border border-[#ead8b8] bg-[#fff6e7] p-5 sm:p-6">
          <h3 className="text-lg font-bold text-[#7b1e1e]">Need Help?</h3>

          <p className="mt-2 text-sm leading-6 text-[#765f48]">
            If you have any questions about your order, delivery, payment, or
            cancellation, please contact our support team.
          </p>
        </section>
      </main>

      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* ===============================================
                MODAL HEADER
            =============================================== */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#ead8b8] bg-white px-5 py-4">
              <div>
                <p className="text-xs font-medium text-[#8c7252]">
                  Order Details
                </p>

                <h2 className="mt-1 break-all text-lg font-bold text-[#7b1e1e]">
                  {selectedOrder.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff6e7] text-xl text-[#7b1e1e] hover:bg-[#f8e9cf]"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              {/* =============================================
                  STATUS + DATE
              ============================================= */}

              <div className="mb-5 flex flex-col gap-3 rounded-xl bg-[#fffaf0] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-[#8c7252]">Order Date</p>

                  <p className="mt-1 text-sm font-semibold text-[#4b2e1f]">
                    {formatDate(selectedOrder)}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                    selectedOrder.status || "Processing",
                  )}`}
                >
                  {selectedOrder.status || "Processing"}
                </span>
              </div>

              {/* =============================================
                  PRODUCTS
              ============================================= */}

              <section>
                <h3 className="mb-3 text-base font-bold text-[#7b1e1e]">
                  Items
                </h3>

                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={`${selectedOrder.id}-detail-${item.id}-${index}`}
                      className="flex gap-3 rounded-xl border border-[#ead8b8] p-3"
                    >
                      {/* MODAL IMAGE */}

                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#eac2b8] bg-white">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || "Product image"}
                            className="block h-full w-full object-cover scale-125"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl">
                            🙏
                          </div>
                        )}
                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#4b2e1f]">{item.name}</p>

                        <div className="mt-1 text-xs text-[#8c7252]">
                          Quantity: {item.quantity}
                          {item.weight && (
                            <>
                              {" • "}
                              Weight: {item.weight}
                            </>
                          )}
                        </div>

                        <p className="mt-1 text-sm font-semibold text-[#7b1e1e]">
                          ₹{item.price.toLocaleString("en-IN")} ×{" "}
                          {item.quantity}
                        </p>
                      </div>

                      {/* TOTAL */}

                      <div className="shrink-0 text-right font-bold text-[#7b1e1e]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* =============================================
                  PRICE SUMMARY
              ============================================= */}

              <section className="mt-5 rounded-xl bg-[#fffaf0] p-4">
                <h3 className="mb-3 text-base font-bold text-[#7b1e1e]">
                  Price Summary
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#765f48]">Subtotal</span>

                    <span className="font-semibold">
                      ₹{(selectedOrder.subtotal ?? 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#765f48]">Delivery</span>

                    <span className="font-semibold">
                      ₹
                      {(selectedOrder.deliveryCharge ?? 0).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>

                  <div className="my-2 border-t border-[#ead8b8]" />

                  <div className="flex justify-between gap-4 text-base">
                    <span className="font-bold text-[#4b2e1f]">Total</span>

                    <span className="font-bold text-[#7b1e1e]">
                      ₹
                      {(
                        selectedOrder.totalAmount ??
                        selectedOrder.total ??
                        0
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </section>

              {/* =============================================
                  CUSTOMER DETAILS
              ============================================= */}

              {selectedOrder.customer && (
                <section className="mt-5">
                  <h3 className="mb-3 text-base font-bold text-[#7b1e1e]">
                    Delivery Details
                  </h3>

                  <div className="rounded-xl border border-[#ead8b8] p-4">
                    <p className="font-bold text-[#4b2e1f]">
                      {selectedOrder.customer.fullName}
                    </p>

                    <p className="mt-1 text-sm text-[#765f48]">
                      Phone: {selectedOrder.customer.phone}
                    </p>

                    {selectedOrder.customer.email && (
                      <p className="mt-1 text-sm text-[#765f48]">
                        Email: {selectedOrder.customer.email}
                      </p>
                    )}

                    <p className="mt-3 text-sm leading-6 text-[#765f48]">
                      {selectedOrder.customer.address}
                      {selectedOrder.customer.landmark && (
                        <>
                          <br />
                          Landmark: {selectedOrder.customer.landmark}
                        </>
                      )}
                      <br />
                      {selectedOrder.customer.city},{" "}
                      {selectedOrder.customer.state} -{" "}
                      {selectedOrder.customer.pincode}
                    </p>
                  </div>
                </section>
              )}

              {/* =============================================
                  PAYMENT
              ============================================= */}

              <section className="mt-5">
                <h3 className="mb-3 text-base font-bold text-[#7b1e1e]">
                  Payment
                </h3>

                <div className="rounded-xl border border-[#ead8b8] p-4">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#765f48]">Payment Method</span>

                    <span className="font-semibold text-[#4b2e1f]">
                      {getPaymentLabel(selectedOrder.paymentMethod)}
                    </span>
                  </div>
                </div>
              </section>

              {/* =============================================
                  MODAL ACTIONS
              ============================================= */}

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                {selectedOrder.status === "Processing" && (
                  <button
                    type="button"
                    onClick={() => handleCancelOrder(selectedOrder.id)}
                    className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                  >
                    Cancel Order
                  </button>
                )}

                {selectedOrder.status === "Delivered" && (
                  <button
                    type="button"
                    onClick={() => handleReorder(selectedOrder)}
                    className="rounded-xl bg-[#8f1d1d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731515]"
                  >
                    Reorder
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-xl border border-[#cfae78] bg-white px-5 py-3 text-sm font-semibold text-[#7b1e1e] transition hover:bg-[#fff6e7]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
