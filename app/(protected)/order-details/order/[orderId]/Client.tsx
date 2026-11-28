"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Package,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock3,
  User,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { usePrasadOrderDetail } from "@/hooks/temple/order/useOrders";
import PullToRefresh from "@/components/PullToRefresh";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderIdParam = params?.orderId ? String(params.orderId) : "";

  const { order, isLoading, refetch } = usePrasadOrderDetail(orderIdParam);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status?: string) => {
    const s = String(status || "").toUpperCase();
    switch (s) {
      case "DELIVERED":
        return <CheckCircle2 size={17} />;
      default:
        return <Clock3 size={17} />;
    }
  };

  const getStatusClass = (status?: string) => {
    const s = String(status || "").toUpperCase();
    switch (s) {
      case "DELIVERED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      case "PENDING":
        return "bg-amber-50 text-amber-800 border-amber-200";
      default:
        return "bg-orange-50 text-orange-700 border-orange-200";
    }
  };

  // LOADING SCREEN
  if (isLoading && !order) {
    return (
      <main className="min-h-screen bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="rounded-2xl border border-[#ead8c8] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-[#fff1e5] text-[#8b1e1e]">
              <Package size={24} />
            </div>
            <p className="text-sm font-medium text-gray-500">
              Loading sacred order details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ORDER NOT FOUND
  if (!order) {
    return (
      <main className="min-h-screen bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="rounded-2xl border border-[#ead8c8] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1e5] text-[#8b1e1e]">
              <Package size={30} />
            </div>
            <h1 className="text-xl font-bold text-[#5e1919]">Order Not Found</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              We couldn't find the requested Prasadam order.
            </p>
            <button
              type="button"
              onClick={() => router.push("/my-orders")}
              className="mt-6 rounded-xl bg-[#8b1e1e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f1717]"
            >
              Back to My Orders
            </button>
          </div>
        </div>
      </main>
    );
  }

  const items = order.items || [];
  const addr = order.deliveryAddress;

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
      <main className="min-h-screen bg-[#fffaf5] pb-12">
        <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
          {/* BACK BUTTON */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => router.push("/my-orders")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8b1e1e] hover:underline"
            >
              <ArrowLeft size={16} /> Back to My Orders
            </button>
          </div>

          {/* ORDER HEADER */}
          <section className="mb-5 overflow-hidden rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl font-bold tracking-tight text-[#5e1919] sm:text-3xl">
                        Order Details
                      </h1>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status || "PENDING"}
                      </span>
                    </div>

                    <p className="mt-2 break-all text-sm text-gray-500">
                      Order Number:{" "}
                      <span className="font-semibold text-gray-700">
                        {order.orderNumber || `#${order.orderId}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-0 rounded-xl border border-[#f0dfd0] bg-[#fffaf5]">
                  <div className="border-r border-[#ead8c8] px-4 py-3 sm:px-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Order Date
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-800">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="px-4 py-3 sm:px-5">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Total Items
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-800">
                      {items.length} {items.length === 1 ? "Item" : "Items"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ORDERED ITEMS */}
          <section className="mb-5 rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#f0dfd0] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                  <Package size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-[#5e1919]">Ordered Prasadam Items</h2>
                  <p className="text-xs text-gray-500">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              <span className="hidden rounded-full bg-[#fff1e5] px-3 py-1 text-xs font-semibold text-[#8b1e1e] sm:block">
                {items.length} Items
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex gap-3 rounded-xl border border-[#f0dfd0] bg-[#fffaf5] p-3 transition hover:border-[#e3cbb8] sm:gap-4 sm:p-4"
                  >
                    {/* PRODUCT IMAGE */}
                    <div className="relative flex aspect-square h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-24 sm:w-24 bg-white border border-[#eadbc5]">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.prasadName}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#8b1e1e]">
                          <Package size={28} />
                        </div>
                      )}
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#a71919]">
                        {item.category}
                      </span>
                      <h3 className="line-clamp-2 text-sm font-bold text-gray-800 sm:text-base">
                        {item.prasadName}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-gray-600 border border-[#eee0cc]">
                          {item.weight} {item.unit}
                        </span>
                        <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-gray-600 border border-[#eee0cc]">
                          Qty: {item.quantity}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        ₹{item.price.toLocaleString("en-IN")} per item
                      </p>
                    </div>

                    {/* ITEM PRICE */}
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-[#8b1e1e] sm:text-base">
                        ₹{item.totalPrice.toLocaleString("en-IN")}
                      </p>
                      <p className="mt-1 text-[11px] text-gray-400">Total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CUSTOMER COMMENT / NOTES */}
          {order.customerComment && (
            <section className="mb-5 rounded-2xl border border-[#ead8c8] bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Delivery Instructions / Comment
                  </h3>
                  <p className="mt-1 text-sm text-gray-800 font-medium">
                    "{order.customerComment}"
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* CUSTOMER AND DELIVERY ADDRESS */}
          <div className="mb-5 grid gap-5 lg:grid-cols-2">
            {/* CUSTOMER DETAILS */}
            <section className="rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
              <div className="border-b border-[#f0dfd0] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                    <User size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#5e1919]">Recipient Details</h2>
                    <p className="text-xs text-gray-500">Contact information</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Name
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {addr?.recipientName || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {addr?.phoneNumber || "—"}
                  </p>
                </div>

                {addr?.email && (
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Email
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                      {addr.email}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* DELIVERY ADDRESS */}
            <section className="rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
              <div className="border-b border-[#f0dfd0] px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                    <MapPin size={19} />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#5e1919]">Delivery Location</h2>
                    <p className="text-xs text-gray-500">Shipping destination</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-xl border border-[#f0dfd0] bg-[#fffaf5] p-4">
                  <p className="text-sm font-bold text-gray-800">
                    {addr?.recipientName}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {addr?.fullAddress}
                    {addr?.landmark && <>, Near {addr.landmark}</>}
                    <br />
                    {addr?.city}, {addr?.state} - {addr?.pincode}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* PRICE DETAILS */}
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
                  <span className="text-gray-500">Total Items Amount</span>
                  <span className="font-semibold text-gray-800">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="border-t border-[#ead8c8] pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-bold text-[#5e1919]">
                      Total Paid Amount
                    </span>
                    <span className="text-xl font-bold text-[#8b1e1e]">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER NOTE */}
          <div className="pb-8 text-center">
            <p className="text-xs text-gray-400">
              Jai Shree Krishna • Shri Govardhannath Haveli Prasadam Service
            </p>
          </div>
        </div>
      </main>
    </PullToRefresh>
  );
}
