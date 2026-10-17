"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider";
import ProfileDrawer from "@/components/navigation/ProfileDrawer";
import type { ProfileData } from "@/data/profile";
import type { PrasadamWeight as Weight } from "@/data/prasadam";
import { ShoppingCart } from "lucide-react";

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

  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

        if (!storedProfile) {
          setProfileName("");
          setProfileImage("");
          return;
        }

        const parsedProfile = JSON.parse(storedProfile) as Partial<ProfileData>;

        setProfileName(parsedProfile.name?.trim() || "");
        setProfileImage(parsedProfile.image?.trim() || "");
      } catch (error) {
        console.error("Failed to load profile:", error);
        setProfileName("");
        setProfileImage("");
      }
    };

    loadProfile();

    window.addEventListener("profile-updated", loadProfile);

    return () => {
      window.removeEventListener("profile-updated", loadProfile);
    };
  }, []);

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
        console.error("Failed to load cart:", error);
        setCartCount(0);
      }
    };

    loadCartCount();

    window.addEventListener("prasadam-cart-updated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("prasadam-cart-updated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  const handleProfileImageClick = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      router.push("/profile");
    } else {
      setIsProfileDrawerOpen(true);
    }
  };

  const handleProfileImageKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleProfileImageClick();
    }
  };

  const actionButtonClass =
    "relative grid h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 place-items-center rounded-full border border-[#e7d6b9] bg-[#fffdf8] text-[#991919] shadow-[0_2px_8px_rgba(91,53,19,0.05)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#d5b66f] hover:bg-[#fff6e6] hover:shadow-[0_5px_14px_rgba(91,53,19,0.11)] active:scale-95";

  return (
    <>
      <header className="flex min-h-[62px] w-full items-center justify-between gap-2 py-2 sm:gap-3 sm:py-2.5 md:gap-4 md:py-3 lg:gap-5">
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
          <div
            onClick={handleProfileImageClick}
            role="button"
            tabIndex={0}
            aria-label="Open profile"
            onKeyDown={handleProfileImageKeyDown}
            className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#dfc181] bg-[#fff3d9] sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Radha profile"
                className="h-full w-full object-cover"
                onError={() => setProfileImage("")}
              />
            ) : (
              <span className="text-xl" aria-hidden="true">
                👤
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1 whitespace-nowrap text-[9px] font-semibold tracking-[0.2px] text-[#8a7968] sm:text-[10px] md:text-[11px]">
              <span className="text-[#c99435]">✦</span>
              <span>🙏 Jai Shree Krishna</span>
              <span className="text-[#c99435]">✦</span>
            </div>

            <h1
              onClick={() => router.push("/profile")}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push("/profile");
                }
              }}
              className="mt-0.5 truncate text-[14px] font-bold leading-tight text-[#302923] cursor-pointer sm:text-[15px] md:text-[17px] lg:text-[19px]"
            >
              {profileName || "Radha"}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
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
              className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px] md:h-[19px] md:w-[19px] lg:h-[20px] lg:w-[20px]"
              aria-hidden="true"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>

            <span className="absolute right-[4px] top-[4px] h-[6px] w-[6px] rounded-full border border-[#fffdf8] bg-[#d4871f] sm:h-[7px] sm:w-[7px]" />
          </button>

          <button
            type="button"
            onClick={() => router.push("/prasadam/cart")}
            aria-label="Open Cart"
            title="Open Cart"
            className={actionButtonClass}
          >
            <ShoppingCart size={18} strokeWidth={2} className="shrink-0" />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-h-[16px] min-w-[16px] place-items-center rounded-full bg-[#e74b18] px-1 text-[7px] font-bold leading-none text-white shadow-sm sm:min-h-[17px] sm:min-w-[17px] sm:text-[8px] md:min-h-[18px] md:min-w-[18px] md:text-[9px]">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {isProfileDrawerOpen && (
        <ProfileDrawer onClose={() => setIsProfileDrawerOpen(false)} />
      )}
    </>
  );
}