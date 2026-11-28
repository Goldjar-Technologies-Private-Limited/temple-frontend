"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, ChevronRight, HelpCircle } from "lucide-react";
import { usePrasadOrders } from "@/hooks/temple/order/useOrders";
import PullToRefresh from "@/components/PullToRefresh";

type FilterType = "All" | "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All", value: "All" },
  { label: "Pending", value: "PENDING" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function MyOrdersPage() {
  const router = useRouter();
  const { orders, isLoading, refetch } = usePrasadOrders(1, 50);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const filteredOrders = useMemo(() => {
    if (activeFilter === "All") {
      return orders;
    }
    return orders.filter((order) => {
      const statusUpper = String(order.status || "").toUpperCase();
      return statusUpper === activeFilter;
    });
  }, [orders, activeFilter]);

  const getStatusClass = (status?: string) => {
    const s = String(status || "").toUpperCase();
    switch (s) {
      case "DELIVERED":
        return "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";
      case "PENDING":
        return "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200";
      case "PROCESSING":
      case "CONFIRMED":
      case "SHIPPED":
      default:
        return "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200";
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;
    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleViewDetails = (orderId: number | string) => {
    if (!orderId) return;
    router.push(`/order-details/order/${encodeURIComponent(String(orderId))}`);
  };

  if (isLoading && orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#fffaf5]">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <div className="animate-pulse">
            <div className="mb-6 flex gap-2 overflow-hidden">
              <div className="h-10 w-24 rounded-full bg-gray-200" />
              <div className="h-10 w-28 rounded-full bg-gray-200" />
              <div className="h-10 w-28 rounded-full bg-gray-200" />
            </div>

            <div className="space-y-4">
              <div className="h-40 rounded-2xl bg-gray-200" />
              <div className="h-40 rounded-2xl bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <PullToRefresh onRefresh={async () => { await refetch(); }}>
      <main className="min-h-screen bg-[#fffaf5] pb-12">
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          {/* FILTERS */}
          <div className="mb-6">
            <div className="overflow-x-auto pb-1">
              <div className="flex min-w-max gap-2">
                {FILTERS.map((f) => {
                  const count =
                    f.value === "All"
                      ? orders.length
                      : orders.filter(
                          (o) => String(o.status || "").toUpperCase() === f.value
                        ).length;

                  const isActive = activeFilter === f.value;

                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setActiveFilter(f.value)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8b1e1e]/20 sm:px-5 ${
                        isActive
                          ? "bg-[#8b1e1e] text-white shadow-sm"
                          : "border border-[#ead8c8] bg-white text-gray-600 hover:border-[#dcbfae] hover:bg-[#fff8f2]"
                      }`}
                    >
                      <span>{f.label}</span>
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

          {/* ORDER COUNT */}
          {filteredOrders.length > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1 ? "order" : "orders"}
              </p>
              <p className="hidden text-xs text-gray-400 sm:block">
                Click an order to view full details
              </p>
            </div>
          )}

          {/* EMPTY STATE */}
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-[#ead8c8] bg-white px-5 py-14 text-center shadow-sm sm:px-8">
              <div className="mx-auto mb-5 flex items-center justify-center text-5xl">
                🛍️
              </div>
              <h2 className="text-xl font-bold text-[#5e1919]">No Orders Found</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                You don't have any {activeFilter === "All" ? "" : activeFilter.toLowerCase()} orders yet.
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
            /* ORDER LIST */
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const targetKey = order.orderId || order.orderNumber;
                return (
                  <article
                    key={targetKey}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleViewDetails(order.orderId || order.orderNumber)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleViewDetails(order.orderId || order.orderNumber);
                      }
                    }}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-[#ead8c8] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ddc2ae] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#8b1e1e]/20"
                  >
                    {/* ORDER TOP */}
                    <div className="border-b border-[#f0e3d8] px-4 py-4 sm:px-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            Order Number
                          </p>
                          <p className="mt-1 truncate text-sm font-bold text-[#5e1919] sm:text-base">
                            {order.orderNumber || `#${order.orderId}`}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <p className="text-xs font-medium text-gray-500 sm:text-sm">
                            {formatDate(order.createdAt)}
                          </p>
                          <span
                            className={`rounded-full px-3 py-1.5 text-[11px] font-bold sm:text-xs ${getStatusClass(
                              order.status
                            )}`}
                          >
                            {order.status || "PENDING"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="p-4 sm:p-5">
                      <div className="flex min-w-0 items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                            <Package size={24} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800">
                              {order.totalItems} {order.totalItems === 1 ? "Prasadam item" : "Prasadam items"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Recipient: {order.customerName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-[11px] font-medium text-gray-400">Total Amount</p>
                            <p className="mt-0.5 text-base font-bold text-[#8b1e1e] sm:text-lg">
                              ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                            </p>
                          </div>
                          <ChevronRight
                            size={18}
                            className="text-gray-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#8b1e1e]"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* HELP */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#ead8c8] bg-white shadow-sm">
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff1e5] text-[#8b1e1e]">
                  <HelpCircle size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#5e1919]">Need Help?</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    If you have any questions about your Prasadam order, please contact our Haveli support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PullToRefresh>
  );
}
