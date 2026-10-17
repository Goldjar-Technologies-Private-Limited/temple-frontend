"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { getPageInfo } from "@/data/commonHeader";
import { useLanguage } from "@/contexts/LanguageProvider";
import type { PrasadamWeight as Weight } from "@/data/prasadam";

type CartItem = {
  productId: number;
  weight: Weight;
  quantity: number;
};

const CART_STORAGE_KEY = "prasadam-cart";
const CART_UPDATED_EVENT = "prasadam-cart-updated";

type CommonHeaderProps = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  showNotificationAndCart?: boolean;
};

export default function CommonHeader({
  title,
  subtitle,
  backHref,
  showBack = true,
  rightAction,
  showNotificationAndCart = true,
}: CommonHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadCartCount = () => {
      try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (!storedCart) {
          setCartCount(0);
          return;
        }

        const parsedCart = JSON.parse(storedCart);
        let totalItems = 0;

        if (Array.isArray(parsedCart)) {
          totalItems = parsedCart.reduce((total: number, item: CartItem) => {
            return total + Number(item.quantity || 0);
          }, 0);
        }

        setCartCount(totalItems);
      } catch (error) {
        console.error("Failed to load cart count in CommonHeader:", error);
        setCartCount(0);
      }
    };

    loadCartCount();

    window.addEventListener(CART_UPDATED_EVENT, loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  const routeInfo = getPageInfo(pathname);

  const pageTitle = title ?? routeInfo.title;
  const pageSubtitle = subtitle ?? routeInfo.subtitle;
  const targetBackHref = backHref ?? routeInfo.backHref;

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(targetBackHref);
    }
  };

  const actionButtonClass =
    "group relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#ead7b8] bg-white text-[#641010] shadow-sm transition-all duration-200 hover:border-[#b8893b] hover:bg-[#fff4e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-95 sm:size-10 lg:size-11";

  return (
    <header className="sticky top-0 z-50 w-full min-w-0 border-b border-[#eadbc5] bg-[#fffdf8]/95 shadow-[0_2px_12px_rgba(80,40,10,0.035)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[60px] w-full min-w-0 max-w-[1500px] items-center gap-2 px-3 min-[375px]:px-4 sm:min-h-[68px] sm:gap-3 sm:px-5 md:px-6 lg:min-h-[76px] lg:px-8 xl:px-10 2xl:px-12">
        {/* Back button */}
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            title="Go back"
            className="group flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#ead7b8] bg-white text-[#641010] shadow-sm transition-all duration-200 hover:border-[#b8893b] hover:bg-[#fff4e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-95 sm:size-10 lg:size-11"
          >
            <ArrowLeft
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </button>
        )}

        {/* Current page title and description */}
        <div className="min-w-0 flex-1">
          <h1 className="truncate uppercase text-[17px] font-bold leading-tight text-[#641010] min-[375px]:text-[19px] sm:text-[22px] lg:text-[25px]">
            {pageTitle}
          </h1>

          {pageSubtitle && (
            <p className="truncate text-[10px] leading-tight text-[#806f63] min-[375px]:text-[11px] sm:text-xs">
              {pageSubtitle}
            </p>
          )}
        </div>

        {/* Right-side actions: Optional custom rightAction, Notification & Cart buttons */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-2.5">
          {rightAction}

          {showNotificationAndCart && (
            <>
              {/* Notification Button */}
              <button
                type="button"
                onClick={() => router.push("/notifications")}
                aria-label={t("notifications")}
                title={t("notifications")}
                className={actionButtonClass}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[17px] sm:size-[18px] lg:size-[20px]"
                  aria-hidden="true"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>

                {/* Notification indicator dot */}
                <span className="absolute right-1 top-1 size-1.5 rounded-full border border-white bg-[#d4871f] sm:size-2" />
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => router.push("/prasadam/cart")}
                aria-label="Open Cart"
                title="Open Cart"
                className={actionButtonClass}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-[17px] sm:size-[18px] lg:size-[20px]"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                  <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
                </svg>

                {/* Cart Badge */}
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 grid min-h-[16px] min-w-[16px] place-items-center rounded-full bg-[#e74b18] px-1 text-[7px] font-bold leading-none text-white shadow-sm sm:min-h-[17px] sm:min-w-[17px] sm:text-[8px] lg:min-h-[18px] lg:min-w-[18px] lg:text-[9px]">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* Reusable Save button for forms */
export function HeaderSaveButton({
  formId,
  disabled = false,
  isSaving = false,
}: {
  formId: string;
  disabled?: boolean;
  isSaving?: boolean;
}) {
  return (
    <button
      type="submit"
      form={formId}
      disabled={disabled || isSaving}
      className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#a71919] px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#8f1414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none sm:min-h-[40px] sm:gap-2 sm:px-4 sm:text-sm lg:min-h-[44px] lg:px-5"
    >
      <Save size={16} />
      <span>{isSaving ? "Saving..." : "Save"}</span>
    </button>
  );
}
