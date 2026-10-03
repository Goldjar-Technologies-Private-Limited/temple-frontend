
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

type Props = {
  onClose: () => void;
};

type IconName =
  | "temple"
  | "booking"
  | "donation"
  | "notification"
  | "settings"
  | "help"
  | "logout"
  | "edit";

type MenuItem = {
  icon: IconName;
  key: TranslationKey;
  route?: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

type ProfileData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  image: string;
};

const PROFILE_STORAGE_KEY = "profile-data";

const defaultProfile: ProfileData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  image: "",
};

const menuSections: MenuSection[] = [
  {
    title: "My Account",
    items: [
      {
        icon: "temple",
        key: "templeInformation",
        route: "/temple-information",
      },
      // {
      //   icon: "booking",
      //   key: "myBookings",
      //   route: "/my-bookings",
      // },
      {
        icon: "booking",
        key: "myOrders",
        route: "/my-orders",
      },
      {
        icon: "donation",
        key: "myDonations",
        route: "/my-donations",
      },
      {
        icon: "notification",
        key: "notifications",
        route: "/notifications",
      },
    ],
  },
  {
    title: "Preferences",
    items: [
      {
        icon: "settings",
        key: "settings",
        route: "/settings",
      },
      {
        icon: "help",
        key: "helpSupport",
        route: "/help",
      },
    ],
  },
];

export default function ProfileDrawer({ onClose }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { t } = useLanguage();

  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

      if (!savedProfile) {
        setProfile(defaultProfile);
        return;
      }

      const parsedProfile = JSON.parse(
        savedProfile
      ) as Partial<ProfileData>;

      setProfile({
        ...defaultProfile,
        ...parsedProfile,
      });
    } catch (error) {
      console.error("Failed to load profile:", error);

      setProfile(defaultProfile);
    }
  }, []);

  // =========================================================
  // ESC + BODY SCROLL
  // =========================================================

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // =========================================================
  // ACTIVE ROUTE
  // =========================================================

  const isActive = (route?: string) => {
    if (!route) return false;

    return pathname === route || pathname.startsWith(`${route}/`);
  };

  // =========================================================
  // NORMAL NAVIGATION
  // =========================================================

  const navigateTo = (route?: string) => {
    if (!route) return;

    onClose();

    if (pathname !== route) {
      router.push(route);
    }
  };

  // =========================================================
  // EDIT PROFILE
  // =========================================================

  const handleEditProfile = () => {
    onClose();
    router.push("/profile");
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("auth-token");

    onClose();

    router.replace("/login");
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        role="presentation"
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[999]
          flex
          bg-[#21150f]/45
          backdrop-blur-[4px]
        "
      >
        {/* ===================================================
            DRAWER
        =================================================== */}

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Profile menu"
          onClick={(event) => event.stopPropagation()}
          className="
            flex
            h-[100dvh]
            w-[88%]
            max-w-[360px]
            flex-col
            overflow-hidden
            border-r
            border-[#e6d4b7]
            bg-[#fffaf1]
            shadow-[18px_0_50px_rgba(54,28,11,0.22)]
            sm:w-[360px]
            lg:w-[380px]
            lg:max-w-[380px]
          "
        >
          {/* =================================================
              PROFILE HEADER
          ================================================= */}

          <header
            className="
              relative
              shrink-0
              overflow-hidden
              bg-[linear-gradient(145deg,#6f1010_0%,#961b18_52%,#b74c25_100%)]
              px-5
              pb-6
              pt-5
              text-white
              sm:px-6
              sm:pb-7
              sm:pt-6
            "
          >
            {/* DECORATION */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-[55px]
                -top-[70px]
                h-[180px]
                w-[180px]
                rounded-full
                border
                border-white/10
                bg-white/[0.04]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-[75px]
                left-[70px]
                h-[150px]
                w-[150px]
                rounded-full
                bg-[#f0c46c]/10
              "
            />

            {/* =================================================
                TOP BAR
            ================================================= */}

            <div
              className="
                relative
                z-10
                flex
                items-center
                justify-between
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-semibold
                  tracking-[0.08em]
                  text-[#ffe7b5]
                "
              >
                <span>🙏</span>

                <span>{t("jaiShreeKrishna")}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close profile menu"
                className="
                  grid
                  h-9
                  w-9
                  place-items-center
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  text-[23px]
                  font-light
                  leading-none
                  text-white
                  transition
                  hover:bg-white/20
                  active:scale-95
                "
              >
                ×
              </button>
            </div>

            {/* =================================================
                PROFILE
            ================================================= */}

            <div
              className="
                relative
                z-10
                mt-6
                flex
                items-start
                gap-4
              "
            >
              {/* =================================================
                  AVATAR
              ================================================= */}

              <div className="relative shrink-0">
                <div
                  className="
                    h-[70px]
                    w-[70px]
                    overflow-hidden
                    rounded-full
                    border-[3px]
                    border-[#f2d18d]
                    bg-[#fff8e9]
                    shadow-[0_8px_22px_rgba(40,12,8,0.22)]
                    sm:h-[76px]
                    sm:w-[76px]
                  "
                >
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name || "Profile"}
                      className="
                        block
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        grid
                        h-full
                        w-full
                        place-items-center
                        text-[30px]
                        sm:text-[33px]
                      "
                    >
                      👤
                    </div>
                  )}
                </div>
              </div>

              {/* =================================================
                  USER INFO
              ================================================= */}

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[10px]
                    font-medium
                    text-[#f8dca8]
                  "
                >
                  Welcome back
                </p>

                <h2
                  className="
                    mt-0.5
                    truncate
                    font-serif
                    text-[20px]
                    font-bold
                    leading-tight
                    text-white
                    sm:text-[22px]
                  "
                >
                  {profile.name || "Krishna Sharma"}
                </h2>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-white/75
                    sm:text-xs
                  "
                >
                  {profile.phone || "+91 8080232328"}
                </p>

                {/* =================================================
                    EDIT PROFILE
                ================================================= */}

                <button
                  type="button"
                  onClick={handleEditProfile}
                  className="
                    mt-3
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-white/25
                    bg-white/10
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-[#ffe7b5]
                    transition-all
                    hover:border-white/40
                    hover:bg-white/20
                    active:scale-95
                  "
                >
                  <MenuIcon name="edit" />

                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </header>

          {/* =================================================
              MENU
          ================================================= */}

          <div
            className="
              flex-1
              overflow-y-auto
              overscroll-contain
              px-3
              pb-5
              pt-4
              [scrollbar-color:#d7bd93_transparent]
              [scrollbar-width:thin]
              sm:px-4
            "
          >
            {menuSections.map((section, sectionIndex) => (
              <section
                key={section.title}
                className={sectionIndex > 0 ? "mt-5" : ""}
              >
                {/* SECTION TITLE */}

                <p
                  className="
                    mb-2
                    px-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.13em]
                    text-[#a08d7b]
                  "
                >
                  {section.title}
                </p>

                {/* SECTION CARD */}

                <div
                  className="
                    overflow-hidden
                    rounded-[16px]
                    border
                    border-[#eadfce]
                    bg-[#fffdf9]
                    shadow-[0_4px_16px_rgba(74,42,16,0.035)]
                  "
                >
                  {section.items.map((item, index) => {
                    const active = isActive(item.route);

                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => navigateTo(item.route)}
                        className={`
                          group
                          relative
                          flex
                          min-h-[58px]
                          w-full
                          items-center
                          gap-3
                          px-3
                          text-left
                          transition-all
                          duration-200

                          ${
                            index !== section.items.length - 1
                              ? "border-b border-[#f0e5d6]"
                              : ""
                          }

                          ${
                            active
                              ? "bg-[#fff1df] text-[#a71919]"
                              : "bg-transparent text-[#4d433a] hover:bg-[#fff7eb]"
                          }
                        `}
                      >
                        {/* ACTIVE INDICATOR */}

                        {active && (
                          <span
                            className="
                              absolute
                              bottom-[12px]
                              left-0
                              top-[12px]
                              w-[3px]
                              rounded-r-full
                              bg-[#a71919]
                            "
                          />
                        )}

                        {/* ICON */}

                        <span
                          className={`
                            grid
                            h-10
                            w-10
                            shrink-0
                            place-items-center
                            rounded-xl
                            transition-all
                            duration-200

                            ${
                              active
                                ? "bg-[#a71919] text-white shadow-[0_5px_12px_rgba(167,25,25,0.18)]"
                                : "bg-[#fff1dc] text-[#b24a20] group-hover:bg-[#fbe4c4]"
                            }
                          `}
                        >
                          <MenuIcon name={item.icon} />
                        </span>

                        {/* TEXT */}

                        <span className="min-w-0 flex-1">
                          <strong
                            className={`
                              block
                              truncate
                              text-[12px]
                              sm:text-[13px]

                              ${active ? "font-bold" : "font-semibold"}
                            `}
                          >
                            {t(item.key)}
                          </strong>

                          <span
                            className="
                              mt-[2px]
                              hidden
                              text-[9px]
                              text-[#a09286]
                              sm:block
                            "
                          >
                            {getDescription(item.icon)}
                          </span>
                        </span>

                        {/* ARROW */}

                        <span
                          className={`
                            text-[20px]
                            font-light
                            leading-none
                            transition-transform
                            duration-200
                            group-hover:translate-x-[2px]

                            ${active ? "text-[#a71919]" : "text-[#c0b1a0]"}
                          `}
                        >
                          ›
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* =================================================
                LOGOUT
            ================================================= */}

            <section className="mt-5">
              <button
                type="button"
                onClick={handleLogout}
                className="
                  group
                  flex
                  min-h-[56px]
                  w-full
                  items-center
                  gap-3
                  rounded-[14px]
                  border
                  border-[#f0d6d0]
                  bg-[#fff7f4]
                  px-3
                  text-left
                  text-[#a71919]
                  transition-all
                  hover:border-[#e8bdb5]
                  hover:bg-[#fff0ec]
                  active:scale-[0.99]
                "
              >
                {/* ICON */}

                <span
                  className="
                    grid
                    h-10
                    w-10
                    shrink-0
                    place-items-center
                    rounded-xl
                    bg-[#ffebe7]
                    text-[#a71919]
                    transition
                    group-hover:bg-[#ffe1da]
                  "
                >
                  <MenuIcon name="logout" />
                </span>

                {/* TEXT */}

                <span className="min-w-0 flex-1">
                  <strong
                    className="
                      block
                      text-[12px]
                      font-bold
                      sm:text-[13px]
                    "
                  >
                    {t("logout")}
                  </strong>

                  <span
                    className="
                      mt-[2px]
                      block
                      text-[9px]
                      text-[#a67c73]
                    "
                  >
                    Sign out from your account
                  </span>
                </span>

                {/* ARROW */}

                <span
                  className="
                    text-lg
                    transition-transform
                    group-hover:translate-x-[2px]
                  "
                >
                  →
                </span>
              </button>
            </section>
          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer
            className="
              shrink-0
              border-t
              border-[#eadfce]
              bg-[#fff8ec]
              px-5
              py-3.5
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <span className="h-px w-7 bg-[#dfc99f]" />

              <span
                className="
                  text-[11px]
                  font-semibold
                  text-[#8e251f]
                "
              >
                🙏 Shri Govardhannath
              </span>

              <span className="h-px w-7 bg-[#dfc99f]" />
            </div>

            <p
              className="
                mt-1
                text-center
                text-[9px]
                tracking-[0.08em]
                text-[#a09283]
              "
            >
              HAVELI • DEVOTION • SEVA
            </p>
          </footer>
        </aside>
      </div>
    </>
  );
}

// =========================================================
// DESCRIPTION
// =========================================================

function getDescription(icon: IconName) {
  switch (icon) {
    case "temple":
      return "About temple & darshan information";

    case "booking":
      return "View your seva & darshan bookings";

    case "donation":
      return "Donation history & receipts";

    case "notification":
      return "Updates and temple notifications";

    case "settings":
      return "Language and account preferences";

    case "help":
      return "Help, support & contact";

    default:
      return "";
  }
}

// =========================================================
// MENU ICON
// =========================================================

function MenuIcon({ name }: { name: IconName }) {
  const common = "h-[19px] w-[19px]";

  // =======================================================
  // TEMPLE
  // =======================================================

  if (name === "temple") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <path d="M3 21h18" />
        <path d="M5 21V10h14v11" />
        <path d="M3 10h18" />
        <path d="M6 10l6-6 6 6" />
        <path d="M9 21v-6h6v6" />
        <path d="M12 4V2" />
      </svg>
    );
  }

  // =======================================================
  // BOOKING
  // =======================================================

  if (name === "booking") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <rect x="4" y="5" width="16" height="15" rx="2" />

        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 10h16" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }

  // =======================================================
  // DONATION
  // =======================================================

  if (name === "donation") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />

        <path d="M9.5 12h5" />

        <path d="M12 9.5v5" />
      </svg>
    );
  }

  // =======================================================
  // NOTIFICATION
  // =======================================================

  if (name === "notification") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />

        <path d="M10 21h4" />
      </svg>
    );
  }

  // =======================================================
  // SETTINGS
  // =======================================================

  if (name === "settings") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <circle cx="12" cy="12" r="3" />

        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20.3h-3v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.08 15a1.7 1.7 0 0 0-1.55-1H5.4v-3h.13a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V4.7h3v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.55 1h.13v3h-.13a1.7 1.7 0 0 0-1.55 1Z" />
      </svg>
    );
  }

  // =======================================================
  // HELP
  // =======================================================

  if (name === "help") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={common}
      >
        <circle cx="12" cy="12" r="9" />

        <path d="M9.8 9a2.4 2.4 0 1 1 3.7 2c-.9.6-1.5 1-1.5 2.2" />

        <path d="M12 17h.01" />
      </svg>
    );
  }

  // =======================================================
  // EDIT
  // =======================================================

  if (name === "edit") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[14px] w-[14px]"
      >
        <path d="M12 20h9" />

        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </svg>
    );
  }

  // =======================================================
  // LOGOUT
  // =======================================================

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={common}
    >
      <path d="M10 17l5-5-5-5" />

      <path d="M15 12H3" />

      <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
    </svg>
  );
}
