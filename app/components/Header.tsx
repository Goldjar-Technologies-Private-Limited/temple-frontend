"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../lib/LanguageProvider";

type ProfileData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  image: string;
};

type Weight = "250g" | "500g" | "1kg";

type CartItem = {
  productId: number;
  weight: Weight;
  quantity: number;
};

const PROFILE_STORAGE_KEY = "profile-data";
const CART_STORAGE_KEY = "prasadam-cart";

export default function HomeHeader() {
  const router = useRouter();
  const { t } = useLanguage();

  const [profileName, setProfileName] = useState("");
  const [cartCount, setCartCount] = useState(0);

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem(
          PROFILE_STORAGE_KEY
        );

        if (!storedProfile) {
          setProfileName("");
          return;
        }

        const parsedProfile =
          JSON.parse(storedProfile) as Partial<ProfileData>;

        const name = parsedProfile.name?.trim();

        setProfileName(name || "");
      } catch (error) {
        console.error("Failed to load profile:", error);
        setProfileName("");
      }
    };

    loadProfile();

    window.addEventListener(
      "profile-updated",
      loadProfile
    );

    return () => {
      window.removeEventListener(
        "profile-updated",
        loadProfile
      );
    };
  }, []);

  /* =========================================================
     LOAD CART COUNT
  ========================================================= */

useEffect(() => {
  const loadCartCount = () => {
    try {
      const storedCart = localStorage.getItem(
        CART_STORAGE_KEY
      );

      if (!storedCart) {
        setCartCount(0);
        return;
      }

      const parsedCart = JSON.parse(storedCart);

      let totalItems = 0;

      if (Array.isArray(parsedCart)) {
        totalItems = parsedCart.reduce(
          (total: number, item: CartItem) => {
            return total + Number(item.quantity || 0);
          },
          0
        );
      }

      setCartCount(totalItems);
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      setCartCount(0);
    }
  };

  // Load immediately
  loadCartCount();

  // Same tab update
  window.addEventListener(
    "prasadam-cart-updated",
    loadCartCount
  );

  // Other tab/window update
  window.addEventListener(
    "storage",
    loadCartCount
  );

  return () => {
    window.removeEventListener(
      "prasadam-cart-updated",
      loadCartCount
    );

    window.removeEventListener(
      "storage",
      loadCartCount
    );
  };
}, []);

  /* =========================================================
     BUTTON STYLE
  ========================================================= */

  const actionButtonClass = `
    relative
    grid
    h-9
    w-9
    shrink-0
    place-items-center
    rounded-full
    border
    border-[#e7d6b9]
    bg-[#fffdf8]
    text-[#991919]
    shadow-[0_2px_8px_rgba(91,53,19,0.05)]
    transition-all
    duration-200
    hover:-translate-y-[1px]
    hover:border-[#d5b66f]
    hover:bg-[#fff6e6]
    hover:shadow-[0_5px_14px_rgba(91,53,19,0.11)]
    active:scale-95
    lg:h-11
    lg:w-11
  `;

  return (
    <header
      className="
        relative
        flex
        min-h-[62px]
        w-full
        items-center
        justify-between
        gap-3
        border-b
        border-[#eee2cf]
        bg-[linear-gradient(180deg,#fffdf9_0%,#fffaf2_100%)]
        px-0
        pb-2
        pt-1
      "
    >
      {/* =====================================================
          LEFT
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-2.5
        "
      >
        <div
          className="
            relative
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#dfc181]
            bg-[radial-gradient(circle,#fffdf9_0%,#fff3d9_100%)]
            text-[20px]
            shadow-[0_4px_12px_rgba(112,71,20,0.08)]
          "
        >
          <span
            className="
              absolute
              inset-[3px]
              rounded-full
              border
              border-[#ecd8a8]/60
            "
          />

          <span className="relative z-10">
            🛕
          </span>
        </div>

        <div className="min-w-0">
          <div
            className="
              flex
              items-center
              gap-1
              truncate
              text-[9px]
              font-semibold
              tracking-[0.2px]
              text-[#8a7968]
            "
          >
            <span className="text-[#c99435]">
              ✦
            </span>

            <span className="truncate">
              {t("jaiShreeKrishna")}
            </span>

            <span className="text-[#c99435]">
              ✦
            </span>
          </div>

          <h1
            className="
              m-0
              mt-0.5
              max-w-[180px]
              truncate
              font-serif
              text-[15px]
              font-bold
              leading-tight
              text-[#302923]
            "
          >
            {profileName || "Devotee"}
          </h1>
        </div>
      </div>

      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-1.5
        "
      >
        {/* NOTIFICATION */}

        <button
          type="button"
          onClick={() =>
            router.push("/notifications")
          }
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
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

            <path d="M10 21h4" />
          </svg>

          <span
            className="
              absolute
              right-[5px]
              top-[4px]
              h-[7px]
              w-[7px]
              rounded-full
              border
              border-[#fffdf8]
              bg-[#d4871f]
            "
          />
        </button>

        {/* =================================================
            CART
        ================================================= */}

        <button
  type="button"
  onClick={() =>
    router.push("/prasadam/cart")
  }
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
    className="h-[18px] w-[18px]"
    aria-hidden="true"
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

  {/* CART BADGE */}
  {cartCount > 0 && (
    <span
      className="
        absolute
        -right-1
        -top-1
        grid
        min-h-[17px]
        min-w-[17px]
        place-items-center
        rounded-full
        bg-[#e74b18]
        px-1
        text-[8px]
        font-bold
        text-white
      "
    >
      {cartCount}
    </span>
  )}
</button>
      </div>

      {/* BOTTOM DECORATION */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-1px]
          left-1/2
          h-[2px]
          w-14
          -translate-x-1/2
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-[#d0a24e]
          to-transparent
          opacity-70
        "
      />
    </header>
  );
}