"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePrasadOrderDetail } from "@/hooks/temple/order/useOrders";

/* =========================================================
   TYPES
========================================================= */

type FallbackOrder = {
  id: string;
  orderId?: number;
  orderNumber?: string;
  customer?: {
    fullName: string;
    phone: string;
    email?: string;
    address: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    weight?: string;
  }>;
  totalAmount: number;
  createdAt: string;
};

const LAST_ORDER_KEY = "last-prasadam-order";

/* =========================================================
   PAGE
========================================================= */

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get("orderId");

  const { order: serverOrder, isLoading: serverLoading } = usePrasadOrderDetail(orderIdParam);
  const [fallbackOrder, setFallbackOrder] = useState<FallbackOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAST_ORDER_KEY);
      if (saved) {
        setFallbackOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse last-prasadam-order:", e);
    } finally {
      setLoaded(true);
    }
  }, []);

  const formatPrice = (value: number) => {
    if (!Number.isFinite(value)) return "0";
    return value.toLocaleString("en-IN");
  };

  const formatDate = (value?: string) => {
    if (!value) return "";
    try {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return value;
    }
  };

  if (!loaded && serverLoading) {
    return <main className="min-h-[100dvh] bg-[#fffaf3] lg:ml-[92px] lg:w-[calc(100%-92px)]" />;
  }

  const orderNumber = serverOrder?.orderNumber || fallbackOrder?.orderNumber || serverOrder?.orderId || fallbackOrder?.id || "—";
  const createdAt = serverOrder?.createdAt || fallbackOrder?.createdAt;
  const totalAmount = serverOrder?.totalAmount ?? fallbackOrder?.totalAmount ?? 0;
  const serverItems = serverOrder?.items;
  const fallbackItems = fallbackOrder?.items;

  if (!serverOrder && !fallbackOrder) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#fffaf3] px-4 pb-[100px] lg:ml-[92px] lg:w-[calc(100%-92px)]">
        <div className="w-full max-w-[430px] rounded-[22px] border border-[#eadbc5] bg-[#fffdf8] p-6 text-center shadow-[0_12px_35px_rgba(80,45,15,0.08)] sm:p-8">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#fff1df] text-3xl">
            🛍️
          </div>
          <h1 className="mt-5 text-2xl font-bold text-[#641010]">No Order Found</h1>
          <p className="mt-2 text-sm leading-6 text-[#81756c]">
            We could not find your latest Prasadam order.
          </p>
          <button
            type="button"
            onClick={() => router.push("/prasadam")}
            className="mt-6 min-h-[48px] w-full rounded-xl bg-[#a71919] px-5 text-sm font-bold text-white transition hover:bg-[#821313] active:scale-[0.98]"
          >
            Explore Prasadam
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0%,#fffaf0_45%,#f6ead5_100%)] pb-[110px] lg:ml-[92px] lg:w-[calc(100%-92px)] lg:pb-12">
      <div className="mx-auto w-full max-w-[1100px] px-3 py-5 sm:px-5 sm:py-8 md:px-7 lg:px-8 lg:py-10">
        {/* HERO */}
        <section className="rounded-[22px] border border-[#e5d5bc] bg-[#fffdf8] px-4 py-7 text-center shadow-[0_12px_35px_rgba(80,45,15,0.07)] sm:px-6 sm:py-9 lg:px-10 lg:py-10">
          <div className="relative mx-auto grid h-[82px] w-[82px] place-items-center rounded-full bg-[#edf8ee] sm:h-[94px] sm:w-[94px]">
            <div className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[#248b42] text-[28px] font-bold text-white shadow-[0_8px_20px_rgba(36,139,66,0.22)] sm:h-[66px] sm:w-[66px] sm:text-[32px]">
              ✓
            </div>
          </div>

          <span className="mt-5 block text-[10px] font-bold uppercase tracking-[1.5px] text-[#c18b32]">
            Jai Shree Krishna
          </span>

          <h1 className="mt-1 text-[25px] font-bold text-[#561010] sm:text-[30px] lg:text-[34px]">
            Prasad Order Placed Successfully
          </h1>

          <p className="mx-auto mt-2 max-w-[560px] text-xs leading-5 text-[#81756c] sm:text-sm sm:leading-6">
            Thank you for your Prasadam order. Your sacred offering request has been received with devotion.
          </p>

          <div className="mx-auto mt-5 inline-flex flex-col rounded-xl border border-[#eadbc5] bg-[#fff8ea] px-5 py-3">
            <span className="text-[9px] font-bold uppercase tracking-[1px] text-[#96887b]">
              Order Number
            </span>
            <strong className="mt-0.5 text-sm text-[#a71919] sm:text-base">
              {orderNumber}
            </strong>
          </div>

          <p className="mt-3 text-[10px] text-[#9a8d82]">
            {formatDate(createdAt)}
          </p>
        </section>

        {/* DETAILS GRID */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-7 lg:gap-7">
          {/* ITEMS */}
          <section className="rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] p-4 shadow-[0_8px_25px_rgba(80,45,15,0.05)] sm:p-5 lg:p-6">
            <SectionTitle icon="🛍️" title="Prasadam Items" />

            <div className="mt-4 space-y-3">
              {serverItems && serverItems.length > 0
                ? serverItems.map((item) => (
                    <div
                      key={item.itemId}
                      className="flex items-center gap-3 border-b border-[#f0e4d3] pb-3 last:border-0 last:pb-0"
                    >
                      <div className="relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-xl border border-[#eadbc5] bg-white">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.prasadName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-[#8b1e1e]">
                            🙏
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#561010]">
                          {item.prasadName}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#81756c]">
                          {item.weight} {item.unit} • Qty: {item.quantity}
                        </p>
                      </div>

                      <strong className="text-xs font-bold text-[#641010]">
                        ₹{formatPrice(item.totalPrice)}
                      </strong>
                    </div>
                  ))
                : fallbackItems?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border-b border-[#f0e4d3] pb-3 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#561010]">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#81756c]">
                          {item.weight} • Qty: {item.quantity}
                        </p>
                      </div>
                      <strong className="text-xs font-bold text-[#641010]">
                        ₹{formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>
                  ))}
            </div>
          </section>

          {/* SUMMARY */}
          <section className="flex flex-col justify-between rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] p-4 shadow-[0_8px_25px_rgba(80,45,15,0.05)] sm:p-5 lg:p-6">
            <div>
              <SectionTitle icon="📜" title="Order Summary" />
              <div className="mt-4 space-y-3">
                <PriceRow label="Order Status" value={serverOrder?.status || "PENDING"} />
                <PriceRow
                  label="Delivery Recipient"
                  value={serverOrder?.deliveryAddress?.recipientName || fallbackOrder?.customer?.fullName || "—"}
                />
                <PriceRow
                  label="Destination City"
                  value={serverOrder?.deliveryAddress?.city || fallbackOrder?.customer?.city || "—"}
                />
              </div>

              <div className="mt-5 border-t border-[#f0e4d3] pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#561010]">Total Amount</span>
                  <strong className="text-base font-bold text-[#a71919]">
                    ₹{formatPrice(totalAmount)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push("/my-orders")}
                className="min-h-[46px] flex-1 rounded-xl border border-[#eadbc5] bg-white text-xs font-bold text-[#5c5047] transition hover:bg-[#fff7ed]"
              >
                View in My Orders
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="min-h-[46px] flex-1 rounded-xl bg-[#a71919] text-xs font-bold text-white shadow-sm transition hover:bg-[#821313]"
              >
                Go to Home →
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fff0df] text-sm font-bold text-[#a71919]">
        {icon}
      </div>
      <h2 className="text-base font-bold text-[#561010]">{title}</h2>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="text-[#81756c]">{label}</span>
      <strong className="text-[#4b4038]">{value}</strong>
    </div>
  );
}
