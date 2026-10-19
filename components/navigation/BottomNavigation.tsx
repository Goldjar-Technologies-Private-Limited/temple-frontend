"use client";

import { ReactNode, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MdHomeFilled,
  MdLiveTv,
  MdVolunteerActivism,
  MdOutlineVideocam,
  MdPerson,
} from "react-icons/md";

import { useLanguage } from "@/contexts/LanguageProvider";
import type { TranslationKey } from "@/utils/i18n";

import { BOTTOM_NAV_ITEMS_DATA } from "@/data/navigation";

type Props = {
  onProfileClick?: () => void;
};

type NavItem = {
  key: string;
  labelKey: TranslationKey;
  icon: ReactNode;
  route?: string;
};

const navIconMap = {
  home: <MdHomeFilled />,
  darshan: <MdLiveTv />,
  seva: <MdVolunteerActivism />,
  reels: <MdOutlineVideocam />,
  profile: <MdPerson />,
};

const NAV_ITEMS: NavItem[] = BOTTOM_NAV_ITEMS_DATA.map((item) => ({
  key: item.key,
  labelKey: item.labelKey,
  icon: navIconMap[item.iconName],
  route: item.route,
}));

const isNavItemActive = (item: NavItem, pathname: string) => {
  if (!item.route) return false;

  switch (item.route) {
    case "/dashboard":
      return pathname === "/dashboard";

    case "/live-darshan":
      return pathname === "/live-darshan" || pathname === "/darshan-timings";

    case "/seva-donation":
      return (
        pathname === "/seva-donation" ||
        pathname.startsWith("/seva/") ||
        pathname.startsWith("/donate") ||
        pathname.startsWith("/donation/")
      );

    default:
      return pathname === item.route || pathname.startsWith(`${item.route}/`);
  }
};

export default function BottomNavigation({ onProfileClick }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const handleNavigation = useCallback(
    (item: NavItem) => {
      // Haptic Feedback for Touch Devices
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(10);
      }

      if (item.key === "profile") {
        onProfileClick?.();
        return;
      }

      if (item.route && pathname !== item.route) {
        router.push(item.route);
      }
    },
    [onProfileClick, pathname, router],
  );

  return (
    <>
      {/* =========================
          MOBILE / TABLET
      ========================== */}

      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 bottom-0 z-50 box-border grid grid-cols-5 h-[60px] sm:h-[68px] pb-[env(safe-area-inset-bottom)] border-t border-[#eadbc5]/70 bg-[#fffdf8]/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(80,40,10,0.08)] lg:hidden select-none"
      >
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(item, pathname);

          return (
            <NavButton
              key={item.key}
              item={item}
              active={active}
              label={t(item.labelKey)}
              onClick={() => handleNavigation(item)}
              mobile
            />
          );
        })}
      </nav>

      {/* =========================
          DESKTOP (ORIGINAL)
      ========================== */}

      {pathname !== "/reels" && (
        <nav
          aria-label="Sidebar navigation"
          className="fixed inset-y-0 left-0 z-50 hidden w-[92px] flex-col bg-[#fffdf8] px-2 pb-4 gap-2 pt-[90px] shadow-[3px_0_18px_rgba(80,40,10,0.07)] lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavItemActive(item, pathname);

            return (
              <NavButton
                key={item.key}
                item={item}
                active={active}
                label={t(item.labelKey)}
                onClick={() => handleNavigation(item)}
              />
            );
          })}
        </nav>
      )}
    </>
  );
}

/* =========================================================
   NAV BUTTON
========================================================= */

type NavButtonProps = {
  item: NavItem;
  active: boolean;
  label: string;
  onClick: () => void;
  mobile?: boolean;
};

function NavButton({
  item,
  active,
  label,
  onClick,
  mobile = false,
}: NavButtonProps) {
  if (mobile) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className="relative flex flex-col items-center justify-center w-full h-full border-0 bg-transparent py-1 group outline-none cursor-pointer transition-transform duration-100 active:scale-95 touch-manipulation"
      >
        {/* Active Pill Highlight */}
        <span
          className={`absolute inset-x-2.5 sm:inset-x-3 top-1.5 bottom-1.5 sm:top-2 sm:bottom-2 rounded-2xl transition-all duration-300 ${
           active
          ? `bg-[#fbead3] font-bold text-[#a71919]`
          : `bg-transparent text-[#766c63] hover:bg-[#fff2dd] hover:text-[#a71919]`
      }`}
        />

        {/* Icon: Slightly larger on Mobile (`text-[25px]`) as label is hidden */}
        <span
          className={`relative z-10 text-[25px] sm:text-[23px] leading-none transition-all duration-300 ${
            active
              ? "scale-110 text-[#a71919]"
              : "text-[#641010] group-hover:text-[#a71919]"
          }`}
        >
          {item.icon}
        </span>

        {/* Label: Hidden on Mobile (`hidden`), Visible on Tablet (`sm:block`) */}
        <span
          className={`relative z-10 w-full truncate px-1 text-center text-[10px] tracking-tight mt-0.5 hidden sm:block transition-colors duration-200 ${
            active ? "font-bold text-[#a71919]" : "font-medium text-[#766c63]"
          }`}
        >
          {label}
        </span>
      </button>
    );
  }

  // Desktop Button (Original & Untouched)
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`relative flex min-h-[72px] w-full flex-col items-center justify-center gap-2 rounded-xl border-0 px-1 py-2 text-[11px] transition-all duration-200 ${
        active
          ? `bg-[#fbead3] font-bold text-[#a71919]`
          : `bg-transparent text-[#641010] hover:bg-[#fff2dd] hover:text-[#a71919]`
      }`}
    >
      <span
        className={`flex items-center justify-center text-[27px] leading-none transition-transform duration-200 ${
          active ? "scale-110" : ""
        }`}
      >
        {item.icon}
      </span>

      <span className="w-full truncate text-center">{label}</span>
    </button>
  );
}
