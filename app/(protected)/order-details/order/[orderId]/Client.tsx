"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Phone,
  XCircle,
  CheckCircle2,
  Clock3,
  ShoppingBag,
  Receipt,
  User,
} from "lucide-react";

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

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<SavedOrder | null>(null);

  const [loading, setLoading] = useState(true);

  const normalizeOrder = (raw: unknown): SavedOrder | null => {
    if (!raw || typeof raw !== "object") {
      return null;
    }

    const source = raw as Record<string, unknown>;

    const rawItems = Array.isArray(source.items)
      ? source.items
      : Array.isArray(source.cartItems)
        ? source.cartItems
        : [];

    const items: OrderItem[] = rawItems.map((item: unknown, index: number) => {
      const product = item as Record<string, unknown>;

      const price = Number(product.price) || 0;

      const quantity = Number(product.quantity) || 1;

      return {
        id: Number(product.id) || index + 1,

        productId: Number(product.productId ?? product.id) || undefined,

        name: String(product.name ?? product.title ?? "Product"),

        quantity,

        price,

        image: typeof product.image === "string" ? product.image : undefined,

        weight:
          product.weight === "250g" ||
          product.weight === "500g" ||
          product.weight === "1kg"
            ? product.weight
            : undefined,
      };
    });

    const subtotal =
      Number(source.subtotal) ||
      items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const deliveryCharge =
      source.deliveryCharge !== undefined
        ? Number(source.deliveryCharge) || 0
        : subtotal > 0
          ? 50
          : 0;

    const totalAmount =
      Number(source.totalAmount) ||
      Number(source.total) ||
      subtotal + deliveryCharge;

    const id = String(source.id ?? source.orderId ?? "");

    if (!id) {
      return null;
    }

    const rawStatus = source.status;

    const status: OrderStatus =
      rawStatus === "Delivered" ||
      rawStatus === "Cancelled" ||
      rawStatus === "Processing"
        ? rawStatus
        : "Processing";

    const rawPayment = source.paymentMethod;

    const paymentMethod: PaymentMethod | undefined =
      rawPayment === "upi" || rawPayment === "card" || rawPayment === "cod"
        ? rawPayment
        : undefined;

    const customer =
      source.customer && typeof source.customer === "object"
        ? (source.customer as Customer)
        : undefined;

    return {
      id,
      customer,
      items,
      paymentMethod,
      subtotal,
      deliveryCharge,
      totalAmount,

      createdAt:
        typeof source.createdAt === "string" ? source.createdAt : undefined,

      date: typeof source.date === "string" ? source.date : undefined,

      status,

      total: Number(source.total) || undefined,
    };
  };

  useEffect(() => {
    const loadOrder = () => {
      try {
        const routeOrderId = params?.orderId;

        if (!routeOrderId) {
          setLoading(false);
          return;
        }

        const decodedOrderId = decodeURIComponent(String(routeOrderId));

        const savedOrdersRaw = localStorage.getItem(ORDERS_KEY);

        let orders: unknown[] = [];

        if (savedOrdersRaw) {
          const parsed = JSON.parse(savedOrdersRaw);

          if (Array.isArray(parsed)) {
            orders = parsed;
          } else if (parsed) {
            orders = [parsed];
          }
        }

        let foundOrder =
          orders.find((item) => {
            const normalized = normalizeOrder(item);

            return normalized?.id === decodedOrderId;
          }) ?? null;

        if (!foundOrder) {
          const lastOrderRaw = localStorage.getItem(LAST_ORDER_KEY);

          if (lastOrderRaw) {
            const lastOrder = JSON.parse(lastOrderRaw);

            const normalized = normalizeOrder(lastOrder);

            if (normalized?.id === decodedOrderId) {
              foundOrder = normalized;
            }
          }
        }

        setOrder(foundOrder ? normalizeOrder(foundOrder) : null);
      } catch (error) {
        console.error("Failed to load order:", error);

        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();

    window.addEventListener(ORDERS_UPDATED_EVENT, loadOrder);

    window.addEventListener("storage", loadOrder);

    return () => {
      window.removeEventListener(ORDERS_UPDATED_EVENT, loadOrder);

      window.removeEventListener("storage", loadOrder);
    };
  }, [params?.orderId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return "—";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getPaymentMethod = (method?: PaymentMethod) => {
    switch (method) {
      case "upi":
        return "UPI";

      case "card":
        return "Card";

      case "cod":
        return "Cash on Delivery";

      default:
        return "—";
    }
  };

  const getStatusIcon = (status?: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 size={17} />;

      case "Cancelled":
        return <XCircle size={17} />;

      default:
        return <Clock3 size={17} />;
    }
  };

  const getStatusClass = (status?: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-orange-50 text-orange-700 border-orange-200";
    }
  };

  const handleCancelOrder = () => {
    if (!order || order.status !== "Processing") {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const savedOrdersRaw = localStorage.getItem(ORDERS_KEY);

      let orders: unknown[] = [];

      if (savedOrdersRaw) {
        const parsed = JSON.parse(savedOrdersRaw);

        if (Array.isArray(parsed)) {
          orders = parsed;
        } else if (parsed) {
          orders = [parsed];
        }
      }

      const updatedOrders = orders.map((item) => {
        const normalized = normalizeOrder(item);

        if (normalized?.id === order.id) {
          return {
            ...(item as Record<string, unknown>),
            status: "Cancelled",
          };
        }

        return item;
      });

      localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));

      const lastOrderRaw = localStorage.getItem(LAST_ORDER_KEY);

      if (lastOrderRaw) {
        const lastOrder = JSON.parse(lastOrderRaw);

        const normalizedLastOrder = normalizeOrder(lastOrder);

        if (normalizedLastOrder?.id === order.id) {
          localStorage.setItem(
            LAST_ORDER_KEY,
            JSON.stringify({
              ...lastOrder,
              status: "Cancelled",
            }),
          );
        }
      }

      setOrder({
        ...order,
        status: "Cancelled",
      });

      window.dispatchEvent(new Event(ORDERS_UPDATED_EVENT));
    } catch (error) {
      console.error("Failed to cancel order:", error);

      window.alert("Unable to cancel the order. Please try again.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffaf5] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#ead8c8] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-[#fff1e5] text-[#8b1e1e]">
              <Package size={24} />
            </div>

            <p className="text-sm font-medium text-gray-500">
              Loading order details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#fffaf5] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => router.push("/my-orders")}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#8b1e1e] transition hover:translate-x-[-2px]"
          >
            <ArrowLeft size={18} />
            Back to My Orders
          </button>

          <div className="rounded-2xl border border-[#ead8c8] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e5] text-[#8b1e1e]">
              <Package size={30} />
            </div>

            <h1 className="text-xl font-bold text-[#5e1919]">
              Order Not Found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              We couldn't find the requested order.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const subtotal = Number(order.subtotal) || 0;

  const deliveryCharge = Number(order.deliveryCharge) || 0;

  const totalAmount = Number(order.totalAmount) || subtotal + deliveryCharge;

  return (
   <main className="min-h-screen bg-[#fffaf5] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* TOP NAVIGATION */}

        <div className="sticky top-0 z-50 -mx-4 mb-5 border-b border-[#eac8c8] bg-[#fffaf5]/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
            {/* BACK TO MY ORDERS */}

            <button
              type="button"
              onClick={() => router.push("/my-orders")}
              className="group flex shrink-0 items-center gap-2 rounded-lg px-1 py-2 text-sm font-semibold text-[#8b1e1e] transition hover:opacity-80"
            >
              <ArrowLeft
                size={18}
                className="transition group-hover:-translate-x-1"
              />

              <span>Back to My Orders</span>
            </button>

            {/* ORDER DETAILS */}

            <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-gray-400 sm:text-sm">
              <ShoppingBag size={15} className="shrink-0" />

              <span className="truncate font-semibold text-[#5e1919]">
                Order Details
              </span>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* ORDER HEADER */}
        {/* ========================================= */}
        <section className="mb-5 overflow-hidden rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* LEFT */}

              <div className="flex min-w-0 items-start gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight text-[#5e1919] sm:text-3xl">
                      Order Details
                    </h1>

                    {/* STATUS */}

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClass(
                        order.status,
                      )}`}
                    >
                      {getStatusIcon(order.status)}

                      {order.status || "Processing"}
                    </span>
                  </div>

                  <p className="mt-2 break-all text-sm text-gray-500">
                    Order ID:{" "}
                    <span className="font-semibold text-gray-700">
                      {order.id}
                    </span>
                  </p>
                </div>
              </div>

              {/* RIGHT INFO */}

              <div className="grid grid-cols-2 gap-0 rounded-xl border border-[#f0dfd0] bg-[#fffaf5]">
                {/* DATE */}

                <div className="border-r border-[#ead8c8] px-4 py-3 sm:px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Order Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {formatDate(order.createdAt || order.date)}
                  </p>
                </div>

                {/* PAYMENT */}

                <div className="px-4 py-3 sm:px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Payment
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {getPaymentMethod(order.paymentMethod)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ========================================= */}
        {/* ORDERED ITEMS */}
        {/* ========================================= */}
        <section className="mb-5 rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#f0dfd0] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                <Package size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#5e1919]">Ordered Items</h2>

                <p className="text-xs text-gray-500">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            <span className="hidden rounded-full bg-[#fff1e5] px-3 py-1 text-xs font-semibold text-[#8b1e1e] sm:block">
              {order.items.length} Items
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex gap-3 rounded-xl border border-[#f0dfd0] bg-[#fffaf5] p-3 transition hover:border-[#e3cbb8] sm:gap-4 sm:p-4"
                >
                  {/* IMAGE */}

                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5e9df] sm:h-24 sm:w-24">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#8b1e1e]">
                        <Package size={28} />
                      </div>
                    )}
                  </div>

                  {/* PRODUCT */}

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-bold text-gray-800 sm:text-base">
                      {item.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {item.weight && (
                        <span className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-gray-600">
                          {item.weight}
                        </span>
                      )}

                      <span className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-gray-600">
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-gray-400">
                      ₹{item.price.toLocaleString("en-IN")} per item
                    </p>
                  </div>

                  {/* PRICE */}

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-[#8b1e1e] sm:text-base">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">Total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ========================================= */}
        {/* CUSTOMER + ADDRESS */}
        {/* ========================================= */}
        <div className="mb-5 grid gap-5 lg:grid-cols-2">
          {/* CUSTOMER */}

          {order.customer && (
            <section className="rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
              <div className="border-b border-[#f0dfd0] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                    <User size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#5e1919]">
                      Customer Details
                    </h2>

                    <p className="text-xs text-gray-500">Contact information</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Full Name
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {order.customer.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {order.customer.phone}
                  </p>
                </div>

                {order.customer.email && (
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                      {order.customer.email}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ADDRESS */}

          {order.customer && (
            <section className="rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
              <div className="border-b border-[#f0dfd0] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-[#5e1919]">
                      Delivery Address
                    </h2>

                    <p className="text-xs text-gray-500">
                      Shipping information
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-xl border border-[#f0dfd0] bg-[#fffaf5] p-4">
                  <p className="text-sm font-bold text-gray-800">
                    {order.customer.fullName}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {order.customer.address}
                    {order.customer.landmark && (
                      <>, {order.customer.landmark}</>
                    )}
                    <br />
                    {order.customer.city}, {order.customer.state} -{" "}
                    {order.customer.pincode}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
        {/* ========================================= */}
        {/* PRICE DETAILS */}
        {/* ========================================= */}
        <section className="mb-5 rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
          <div className="border-b border-[#f0dfd0] px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                <CreditCard size={19} />
              </div>

              <div>
                <h2 className="font-bold text-[#5e1919]">Price Details</h2>

                <p className="text-xs text-gray-500">Order payment summary</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mx-auto max-w-2xl space-y-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-500">Subtotal</span>

                <span className="font-semibold text-gray-800">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-500">Delivery Charge</span>

                <span className="font-semibold text-gray-800">
                  ₹{deliveryCharge.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="border-t border-[#ead8c8] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-bold text-[#5e1919]">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-[#8b1e1e]">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ========================================= */}
        {/* CANCEL ORDER */}
        {/* ========================================= */}
        {order.status === "Processing" && (
          <section className="mb-6 rounded-2xl border border-red-100 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <XCircle size={20} />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Need to cancel this order?
                  </p>

                  <p className="text-xs text-gray-500">
                    You can cancel while the order is processing.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCancelOrder}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 sm:w-auto"
              >
                
                Cancel Order
              </button>
            </div>
          </section>
        )}
        {/* ========================================= */}
        {/* FOOTER NOTE */}
        {/* ========================================= */}
        <div className="pb-8 text-center">
          <p className="text-xs text-gray-400">
            Thank you for choosing our prasadam service.
          </p>
        </div>
      </div>
    </main>
  );
}

