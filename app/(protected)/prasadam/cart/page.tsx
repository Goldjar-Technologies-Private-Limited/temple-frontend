"use client";

import { useMemo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomerPrasadCart } from "@/hooks/temple/prasad/usePrasad";
import { CustomerPrasadCartItem } from "@/models/temple/prasad.model";
import TempleLoader from "@/components/common/TempleLoader";
import PullToRefresh from "@/components/PullToRefresh";

const DELIVERY_CHARGE = 50;

function formatPrice(price: number): string {
  return price.toLocaleString("en-IN");
}

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    isLoading,
    updateQuantity,
    removeCartItem,
    refetch,
  } = useCustomerPrasadCart();

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const cartItems: CustomerPrasadCartItem[] = useMemo(() => {
    return cart?.items || [];
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart?.totalItems ?? cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cart, cartItems]);

  const subtotal = useMemo(() => {
    return cart?.totalAmount ?? cartItems.reduce((total, item) => total + (item.itemTotal || item.price * item.quantity), 0);
  }, [cart, cartItems]);

  const deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0;
  const totalAmount = subtotal + deliveryCharge;

  const [busyItemId, setBusyItemId] = useState<number | null>(null);

  const handleIncrease = async (item: CustomerPrasadCartItem) => {
    if (busyItemId === item.cartItemId) return;
    setBusyItemId(item.cartItemId);
    try {
      await updateQuantity(item.cartItemId, item.quantity + 1);
    } finally {
      setBusyItemId(null);
    }
  };

  const handleDecrease = async (item: CustomerPrasadCartItem) => {
    if (busyItemId === item.cartItemId) return;
    setBusyItemId(item.cartItemId);
    try {
      if (item.quantity <= 1) {
        await removeCartItem(item.cartItemId);
      } else {
        await updateQuantity(item.cartItemId, item.quantity - 1);
      }
    } finally {
      setBusyItemId(null);
    }
  };

  const handleManualQuantity = async (item: CustomerPrasadCartItem, val: string) => {
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed < 0) return;
    if (parsed === item.quantity) return;

    if (busyItemId === item.cartItemId) return;
    setBusyItemId(item.cartItemId);
    try {
      if (parsed === 0) {
        await removeCartItem(item.cartItemId);
      } else {
        await updateQuantity(item.cartItemId, parsed);
      }
    } finally {
      setBusyItemId(null);
    }
  };

  const handleRemove = async (cartItemId: number) => {
    if (busyItemId === cartItemId) return;
    setBusyItemId(cartItemId);
    try {
      await removeCartItem(cartItemId);
    } finally {
      setBusyItemId(null);
    }
  };

  const handlePlaceOrder = (): void => {
    if (cartItems.length === 0) return;
    router.push("/prasadam/checkout");
  };

  if (isLoading) {
    return <TempleLoader message="Loading cart items..." fullScreen />;
  }

  if (cartItems.length === 0) {
    return (
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="min-h-[100dvh] bg-[#fffaf3] pb-[100px] lg:ml-[92px] lg:w-[calc(100%-92px)]">
          <section className="flex min-h-[calc(100dvh-170px)] items-center justify-center px-4">
            <div className="w-full max-w-[430px] text-center">
              <div className="mx-auto grid h-[90px] w-[90px] place-items-center rounded-full border border-[#eadbc5] bg-[#fffdf8] shadow-sm">
                <CartIcon />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#561010]">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-2 max-w-[330px] text-sm leading-6 text-[#81756c]">
                Add your favourite prasadam before placing an order.
              </p>

              <button
                type="button"
                onClick={() => router.push("/prasadam")}
                className="mt-7 min-h-[48px] rounded-xl bg-[#a71919] px-8 text-sm font-bold text-white shadow-md transition hover:bg-[#861414] active:scale-[0.98]"
              >
                Explore Prasadam
              </button>
            </div>
          </section>
        </main>
      </PullToRefresh>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <main className="min-h-[100dvh] overflow-x-hidden bg-[#fffaf3] pb-10 lg:ml-[92px] lg:w-[calc(100%-92px)] lg:pb-12">
      <div className="mx-auto w-full max-w-[1400px] px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
          {/* =================================================
              CART ITEMS
          ================================================= */}

          <section className="min-w-0">
            <div className="overflow-hidden rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] shadow-[0_8px_25px_rgba(80,45,15,0.05)]">
              {cartItems.map((item, index) => {
                const itemPrice = item.price;
                const itemTotal = item.itemTotal || itemPrice * item.quantity;
                const weightLabel = `${item.weight} ${item.unit}`;

                return (
                  <article
                    key={item.cartItemId}
                    className={`p-3 sm:p-4 lg:p-5 ${
                      index !== cartItems.length - 1
                        ? "border-b border-[#eecfcf]"
                        : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      {/* IMAGE CONTAINER FIXED */}
                      <div className="relative flex aspect-square h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#faf6ee] sm:h-[100px] sm:w-[100px] lg:h-[120px] lg:w-[120px]">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.prasadName}
                            className="h-full w-full rounded-lg object-cover object-center"
                          />
                        ) : (
                          <div className="text-3xl">🛕</div>
                        )}
                      </div>

                      {/* INFO */}
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            {/* CATEGORY */}
                            <span className="block text-[9px] font-bold uppercase tracking-[1px] text-[#c18b32]">
                              {item.category || "Prasadam"}
                            </span>

                            {/* NAME */}
                            <h3 className="mt-1 truncate text-[15px] font-bold text-[#4d1616] sm:text-lg">
                              {item.prasadName}
                            </h3>

                            {/* WEIGHT */}
                            <span className="mt-1 inline-flex rounded-md border border-[#eadbc5] bg-[#f5e7dc] px-2 py-1 text-[12px] font-bold text-[#a71919] sm:text-[10px]">
                              {weightLabel}
                            </span>
                          </div>

                          {/* REMOVE */}
                          <button
                            type="button"
                            onClick={() => handleRemove(item.cartItemId)}
                            aria-label={`Remove ${item.prasadName} ${weightLabel}`}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#9a8b7e] transition hover:bg-[#fff0e8] hover:text-[#a71919]"
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        {/* PRICE */}
                        <p className="mt-2 text-[13px] font-bold text-[#a71919] sm:text-base">
                          ₹{formatPrice(itemPrice)}
                        </p>

                        {/* QUANTITY */}
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                          <div className={`flex h-9 items-center overflow-hidden rounded-lg border border-[#dfcdb4] bg-white sm:h-10 transition-opacity ${
                            busyItemId === item.cartItemId ? "opacity-60" : ""
                          }`}>
                            {/* MINUS */}
                            <button
                              type="button"
                              onClick={() => handleDecrease(item)}
                              aria-label="Decrease quantity"
                              disabled={busyItemId === item.cartItemId}
                              className="grid h-full w-9 place-items-center text-lg font-bold text-[#a71919] hover:bg-[#fff3df] active:bg-[#ffe7cc] disabled:opacity-50"
                            >
                              −
                            </button>

                            {/* QUANTITY INPUT */}
                            <input
                              type="number"
                              min="1"
                              max="999"
                              value={item.quantity}
                              disabled={busyItemId === item.cartItemId}
                              onChange={(e) => handleManualQuantity(item, e.target.value)}
                              aria-label={`Quantity for ${item.prasadName}`}
                              className="h-full w-12 border-x border-[#eee1cf] bg-transparent text-center text-xs font-bold text-[#40372f] outline-none focus:bg-[#fff9f0] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />

                            {/* PLUS */}
                            <button
                              type="button"
                              onClick={() => handleIncrease(item)}
                              aria-label="Increase quantity"
                              disabled={busyItemId === item.cartItemId}
                              className="grid h-full w-9 place-items-center text-lg font-bold text-[#a71919] hover:bg-[#fff3df] active:bg-[#ffe7cc] disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>

                          {/* ITEM TOTAL */}
                          <strong className="text-sm text-[#4d1616] sm:text-base">
                            ₹{formatPrice(itemTotal)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => router.push("/prasadam")}
              className="mt-4 flex min-h-[46px] w-full items-center justify-center rounded-xl border border-dashed border-[#d5b97f] bg-[#fffaf0] text-xs font-bold text-[#a71919] transition hover:bg-[#fff3df]"
            >
              + Add More Prasadam
            </button>
          </section>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="block w-full lg:sticky lg:top-[100px]">
            <div className="rounded-[18px] border border-[#eadbc5] bg-[#fffdf8] p-4 shadow-[0_10px_30px_rgba(80,45,15,0.07)] sm:p-5 lg:p-6">
              {/* TITLE */}
              <span className="block text-[10px] font-bold uppercase tracking-[1.3px] text-[#c18b32]">
                Order Details
              </span>

              <h2 className="mt-1 text-[21px] font-bold text-[#561010] sm:text-[22px]">
                Order Summary
              </h2>

              {/* SUMMARY */}
              <div className="mt-5 space-y-3 border-b border-[#eee1cf] pb-5">
                <SummaryRow
                  label={`Subtotal (${totalItems} ${
                    totalItems === 1 ? "item" : "items"
                  })`}
                  value={`₹${formatPrice(subtotal)}`}
                />

                <SummaryRow
                  label="Delivery"
                  value={`₹${formatPrice(deliveryCharge)}`}
                />
              </div>

              {/* TOTAL */}
              <div className="flex items-center justify-between gap-4 py-5">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#4c4037]">
                    Total Amount
                  </p>
                  <p className="mt-0.5 text-[9px] text-[#97897d]">
                    Inclusive of all charges
                  </p>
                </div>

                <strong className="shrink-0 text-xl font-bold text-[#a71919] sm:text-2xl">
                  ₹{formatPrice(totalAmount)}
                </strong>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#a71919] px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(167,25,25,0.18)] transition hover:bg-[#821313] active:scale-[0.99]"
              >
                Place Order
                <span>→</span>
              </button>

              {/* SECURE CHECKOUT */}
              <p className="mt-4 text-center text-[10px] text-[#8b7d72]">
                🔒 Secure checkout
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  </PullToRefresh>
  );
}

/* =====================================================
    SUMMARY ROW
===================================================== */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="min-w-0 text-[#81756c]">{label}</span>
      <strong className="shrink-0 text-[#4b4038]">{value}</strong>
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
      className="h-10 w-10 text-[#a71919]"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
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
      className="h-4 w-4"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}
