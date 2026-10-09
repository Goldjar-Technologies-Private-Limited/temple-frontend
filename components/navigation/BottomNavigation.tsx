"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  MdHomeFilled,
  MdLiveTv,
  MdVolunteerActivism,
  MdOndemandVideo,
  MdPerson,
} from "react-icons/md";

import { useLanguage } from "@/contexts/LanguageProvider";
import type { TranslationKey } from "@/utils/i18n";

type Props = {
  onProfileClick?: () => void;
};

type NavItem = {
  key: string;
  labelKey: TranslationKey;
  icon: ReactNode;
  route?: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    labelKey: "home",
    icon: <MdHomeFilled />,
    route: "/dashboard",
  },
  {
    key: "darshan",
    labelKey: "darshan",
    icon: <MdLiveTv />,
    route: "/live-darshan",
  },
  {
    key: "seva",
    labelKey: "seva",
    icon: <MdVolunteerActivism />,
    route: "/seva-donation",
  },
  {
    key: "reels",
    labelKey: "reels",
    icon: <MdOndemandVideo />,
    route: "/reels",
  },
  {
    key: "profile",
    labelKey: "profile",
    icon: <MdPerson />,
  },
];

const isNavItemActive = (
  item: NavItem,
  pathname: string,
) => {
  if (!item.route) return false;

  switch (item.route) {
    case "/dashboard":
      return pathname === "/dashboard";

    case "/live-darshan":
      return (
        pathname === "/live-darshan" ||
        pathname === "/darshan-timings"
      );

    case "/seva-donation":
      return (
        pathname === "/seva-donation" ||
        pathname.startsWith("/seva/") ||
        pathname.startsWith("/donate") ||
        pathname.startsWith("/donation/")
      );

    default:
      return (
        pathname === item.route ||
        pathname.startsWith(`${item.route}/`)
      );
  }
};

export default function BottomNavigation({
  onProfileClick,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const handleNavigation = (item: NavItem) => {
    if (item.key === "profile") {
      onProfileClick?.();
      return;
    }

    if (item.route && pathname !== item.route) {
      router.push(item.route);
    }
  };

  return (
    <>
      {/* =========================
          MOBILE / TABLET
      ========================== */}

      <nav
        aria-label="Bottom navigation"
        className="
          fixed
          inset-x-0
          bottom-0
          z-50

          grid
          h-[64px]
          grid-cols-5

          border-t
          border-[#eadbc5]

          bg-[#fffdf8]/95
          pb-[env(safe-area-inset-bottom)]

          shadow-[0_-3px_14px_rgba(80,40,10,0.08)]
          backdrop-blur-xl

          lg:hidden
        "
      >
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(
            item,
            pathname,
          );

          return (
            <NavButton
              key={item.key}
              item={item}
              active={active}
              label={t(item.labelKey)}
              onClick={() =>
                handleNavigation(item)
              }
              mobile
            />
          );
        })}
      </nav>

      {/* =========================
          DESKTOP
      ========================== */}

      <nav
        aria-label="Sidebar navigation"
        className="
          fixed
          inset-y-0
          left-0
          z-50

          hidden
          w-[92px]

          flex-col

          border-r
          border-[#eadbc5]

          bg-[#fffdf8]

          px-2
          pb-4
          pt-[90px]

          shadow-[3px_0_18px_rgba(80,40,10,0.07)]

          lg:flex
        "
      >
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(
            item,
            pathname,
          );

          return (
            <NavButton
              key={item.key}
              item={item}
              active={active}
              label={t(item.labelKey)}
              onClick={() =>
                handleNavigation(item)
              }
            />
          );
        })}
      </nav>
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
        className={`
          relative

          flex
          min-w-0
          flex-col
          items-center
          justify-center
          gap-1

          border-0
          bg-transparent

          px-1
          py-1

          text-[9px]

          transition-all
          duration-200

          ${
            active
              ? "font-bold text-[#a71919]"
              : "font-medium text-[#766c63] hover:text-[#a71919]"
          }
        `}
      >
        <span
          className={`
            flex
            items-center
            justify-center

            text-[23px]
            leading-none

            transition-transform
            duration-200

            ${active ? "scale-110" : ""}
          `}
        >
          {item.icon}
        </span>

        <span className="w-full truncate text-center">
          {label}
        </span>

        {active && (
          <span
            className="
              absolute
              bottom-[2px]

              h-[3px]
              w-5

              rounded-full
              bg-[#c99435]
            "
          />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`
        relative

        flex
        min-h-[72px]
        w-full
        flex-col
        items-center
        justify-center
        gap-2

        rounded-xl

        border-0

        px-1
        py-2

        text-[11px]

        transition-all
        duration-200

        ${
          active
            ? `
              bg-[#fbead3]
              font-bold
              text-[#a71919]

              before:absolute
              before:left-0
              before:h-9
              before:w-[3px]
              before:rounded-r-md
              before:bg-[#c99435]
            `
            : `
              bg-transparent
              text-[#766c63]

              hover:bg-[#fff2dd]
              hover:text-[#a71919]
            `
        }
      `}
    >
      <span
        className={`
          flex
          items-center
          justify-center

          text-[27px]
          leading-none

          transition-transform
          duration-200

          ${active ? "scale-110" : ""}
        `}
      >
        {item.icon}
      </span>

      <span className="w-full truncate text-center">
        {label}
      </span>
    </button>
  );
}