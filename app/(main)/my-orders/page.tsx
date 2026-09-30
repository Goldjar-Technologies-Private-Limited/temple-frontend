"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, ChevronRight, HelpCircle, ShoppingBag } from "lucide-react";

const ORDERS_KEY = "prasadam-orders";
const LAST_ORDER_KEY = "last-prasadam-order";
const ORDERS_UPDATED_EVENT = "prasadam-orders-updated";

type OrderStatus = "Delivered" | "Processing" | "Cancelled";

type Weight = "250g" | "500g" | "1kg";

type OrderItem = {
  id: number;
  productId?: number;
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

type FilterType = "All" | OrderStatus;

/* =========================================================
   NORMALIZE ORDER
========================================================= */

const normalizeOrder = (order: any): SavedOrder | null => {
  if (!order || typeof order !== "object") {
    return null;
  }

  const rawItems = Array.isArray(order.items)
    ? order.items
    : Array.isArray(order.cartItems)
      ? order.cartItems
      : [];

  const items: OrderItem[] = rawItems.map((item: any, index: number) => {
    const id = Number(item?.id) || Number(item?.productId) || index + 1;

    const productId = Number(item?.productId) || Number(item?.id) || index + 1;

    const quantity = Number(item?.quantity) > 0 ? Number(item.quantity) : 1;

    const price = Number(item?.price) >= 0 ? Number(item.price) : 0;

    let weight: Weight | undefined;

    if (
      item?.weight === "250g" ||
      item?.weight === "500g" ||
      item?.weight === "1kg"
    ) {
      weight = item.weight;
    }

    return {
      id,
      productId,

      name:
        typeof item?.name === "string" && item.name.trim()
          ? item.name
          : typeof item?.title === "string" && item.title.trim()
            ? item.title
            : "Prasadam",

      quantity,
      price,

      image:
        typeof item?.image === "string" && item.image.trim()
          ? item.image
          : undefined,

      weight,
    };
  });

  const calculatedSubtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const subtotal =
    Number(order?.subtotal) >= 0
      ? Number(order.subtotal)
      : Number(order?.subTotal) >= 0
        ? Number(order.subTotal)
        : calculatedSubtotal;

  const deliveryCharge =
    Number(order?.deliveryCharge) >= 0
      ? Number(order.deliveryCharge)
      : subtotal > 0
        ? 50
        : 0;

  const calculatedTotal = subtotal + deliveryCharge;

  const totalAmount =
    Number(order?.totalAmount) >= 0
      ? Number(order.totalAmount)
      : Number(order?.total) >= 0
        ? Number(order.total)
        : calculatedTotal;

  const createdAt =
    typeof order?.createdAt === "string"
      ? order.createdAt
      : typeof order?.date === "string"
        ? order.date
        : new Date().toISOString();

  const id = String(order?.id ?? order?.orderId ?? "").trim();

  if (!id) {
    return null;
  }

  let status: OrderStatus = "Processing";

  if (
    order?.status === "Delivered" ||
    order?.status === "Processing" ||
    order?.status === "Cancelled"
  ) {
    status = order.status;
  }

  let paymentMethod: PaymentMethod | undefined;

  if (
    order?.paymentMethod === "upi" ||
    order?.paymentMethod === "card" ||
    order?.paymentMethod === "cod"
  ) {
    paymentMethod = order.paymentMethod;
  }

  return {
    id,
    customer: order?.customer,
    items,
    paymentMethod,
    subtotal,
    deliveryCharge,
    totalAmount,
    createdAt,
    date: createdAt,
    status,
    total: totalAmount,
  };
};

/* =========================================================
   LOAD ORDERS
========================================================= */

const loadOrders = (): SavedOrder[] => {
  try {
    const orderMap = new Map<string, SavedOrder>();

    const savedOrders = localStorage.getItem(ORDERS_KEY);

    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);

        if (Array.isArray(parsed)) {
          parsed.forEach((order) => {
            const normalized = normalizeOrder(order);

            if (normalized) {
              orderMap.set(normalized.id, normalized);
            }
          });
        } else if (parsed && typeof parsed === "object") {
          const normalized = normalizeOrder(parsed);

          if (normalized) {
            orderMap.set(normalized.id, normalized);
          }
        }
      } catch (error) {
        console.error("Failed to parse prasadam-orders:", error);
      }
    }

    const lastOrder = localStorage.getItem(LAST_ORDER_KEY);

    if (lastOrder) {
      try {
        const parsedLastOrder = JSON.parse(lastOrder);

        const normalized = normalizeOrder(parsedLastOrder);

        if (normalized && !orderMap.has(normalized.id)) {
          orderMap.set(normalized.id, normalized);
        }
      } catch (error) {
        console.error("Failed to parse last order:", error);
      }
    }

    const orders = Array.from(orderMap.values());

    orders.sort((a, b) => {
      const dateA = new Date(a.createdAt || "").getTime();
      const dateB = new Date(b.createdAt || "").getTime();

      return dateB - dateA;
    });

    if (orders.length > 0) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }

    return orders;
  } catch (error) {
    console.error("Failed to load orders:", error);

    return [];
  }
};

/* =========================================================
   PAGE
========================================================= */

export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD ORDERS
  ========================================================= */

  useEffect(() => {
    const load = () => {
      const loadedOrders = loadOrders();

      setOrders(loadedOrders);
      setLoading(false);
    };

    load();

    const handleUpdate = () => {
      load();
    };

    window.addEventListener(ORDERS_UPDATED_EVENT, handleUpdate);

    window.addEventListener("storage", handleUpdate);

    const handleFocus = () => {
      load();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, handleUpdate);

      window.removeEventListener("storage", handleUpdate);

      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") {
      return orders;
    }

    return orders.filter((order) => order.status === activeFilter);
  }, [orders, activeFilter]);

  /* =========================================================
     STATUS
  ========================================================= */

  const getStatusClass = (status?: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";

      case "Processing":
      default:
        return "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200";
    }
  };

  /* =========================================================
     DATE
  ========================================================= */

  const formatDate = (date?: string) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     VIEW DETAILS
  ========================================================= */

  const handleViewDetails = (orderId: string) => {
    if (!orderId) {
      return;
    }

    router.push(`/order-details/order/${encodeURIComponent(orderId)}`);
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="animate-pulse">
            <div className="mb-3 h-8 w-44 rounded-lg bg-gray-200" />

            <div className="mb-7 h-4 w-64 rounded bg-gray-200" />

            <div className="mb-6 flex gap-2 overflow-hidden">
              <div className="h-10 w-24 rounded-full bg-gray-200" />
              <div className="h-10 w-28 rounded-full bg-gray-200" />
              <div className="h-10 w-28 rounded-full bg-gray-200" />
            </div>

            <div className="space-y-4">
              <div className="h-48 rounded-2xl bg-gray-200" />
              <div className="h-48 rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#fffaf5] pb-12">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="border-b border-[#ead8c8] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 sm:py-4">
          <div>
            <h5 className="text-xl font-bold tracking-tight text-[#5e1919]">
              My Orders
            </h5>

            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Track and manage your prasadam orders
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* ===================================================
            FILTERS
        =================================================== */}

        <div className="mb-6">
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2">
              {(
                ["All", "Delivered", "Processing", "Cancelled"] as FilterType[]
              ).map((filter) => {
                const count =
                  filter === "All"
                    ? orders.length
                    : orders.filter((order) => order.status === filter).length;

                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8b1e1e]/20 sm:px-5 ${
                      isActive
                        ? "bg-[#8b1e1e] text-white shadow-sm"
                        : "border border-[#ead8c8] bg-white text-gray-600 hover:border-[#dcbfae] hover:bg-[#fff8f2]"
                    }`}
                  >
                    <span>{filter}</span>

                    <span
                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                        isActive
                          ? "bg-white text-[#8b1e1e]"
                          : "bg-[#fff1e5] text-[#8b1e1e]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================
            ORDER COUNT
        =================================================== */}

        {filteredOrders.length > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"}
            </p>

            <p className="hidden text-xs text-gray-400 sm:block">
              Click an order to view details
            </p>
          </div>
        )}

        {/* ===================================================
            EMPTY STATE
        =================================================== */}

        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-[#ead8c8] bg-white px-5 py-14 text-center shadow-sm sm:px-8">
            <div className="mx-auto mb-5 flex  items-center justify-center  text-5xl">
              🛍️
            </div>

            <h2 className="text-xl font-bold text-[#5e1919]">
              No Orders Found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              You don't have any {activeFilter.toLowerCase()} orders yet.
            </p>

            <button
              type="button"
              onClick={() => router.push("/prasadam")}
              className="mt-5 rounded-xl bg-[#8b1e1e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#731818] focus:outline-none focus:ring-2 focus:ring-[#8b1e1e]/20"
            >
              Shop Prasadam
            </button>
          </div>
        ) : (
          /* =================================================
             ORDER LIST
          ================================================= */

          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const firstItem = order.items?.[0];

              const itemCount = order.items?.length || 0;

              return (
                <article
                  key={order.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleViewDetails(order.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();

                      handleViewDetails(order.id);
                    }
                  }}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-[#ead8c8] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ddc2ae] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#8b1e1e]/20"
                >
                  {/* ORDER TOP */}

                  <div className="border-b border-[#f0e3d8] px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                          Order ID
                        </p>

                        <p className="mt-1 truncate text-sm font-bold text-[#5e1919] sm:text-base">
                          {order.id}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <p className="text-xs font-medium text-gray-500 sm:text-sm">
                          {formatDate(order.createdAt || order.date)}
                        </p>

                        <span
                          className={`rounded-full px-3 py-1.5 text-[11px] font-bold sm:text-xs ${getStatusClass(
                            order.status,
                          )}`}
                        >
                          {order.status || "Processing"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ORDER PRODUCT */}

                  <div className="p-4 sm:p-5">
                    <div className="flex min-w-0 gap-3 sm:gap-4">
                      {/* IMAGE */}

                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#fff7f0] sm:h-24 sm:w-24">
                        {firstItem?.image ? (
                          <img
                            src={firstItem.image}
                            alt={firstItem.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-8 w-8 text-[#c8a18a]" />
                          </div>
                        )}
                      </div>

                      {/* PRODUCT INFO */}

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-gray-800 sm:text-base">
                          {firstItem?.name || "Prasadam"}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
                          {firstItem?.weight && (
                            <span className="rounded-md bg-[#fff7f0] px-2 py-1 font-medium">
                              {firstItem.weight}
                            </span>
                          )}

                          <span className="rounded-md bg-[#fff7f0] px-2 py-1 font-medium">
                            Qty: {firstItem?.quantity || 1}
                          </span>
                        </div>

                        {itemCount > 1 && (
                          <p className="mt-2 text-xs font-medium text-gray-400 sm:text-sm">
                            + {itemCount - 1} more{" "}
                            {itemCount - 1 > 1 ? "items" : "item"}
                          </p>
                        )}
                      </div>

                      {/* PRICE */}

                      <div className="flex shrink-0 flex-col items-end justify-between">
                        <div className="text-right">
                          <p className="text-[11px] font-medium text-gray-400">
                            Total
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#8b1e1e] sm:text-base">
                            ₹
                            {Number(
                              order.totalAmount ?? order.total ?? 0,
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>

                        <ChevronRight
                          size={18}
                          className="mt-3 text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#8b1e1e]"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ===================================================
            HELP
        =================================================== */}

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                <HelpCircle size={20} />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-[#5e1919]">Need Help?</h3>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  If you have any questions about your order, please contact our
                  support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
