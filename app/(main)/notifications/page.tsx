"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */

type NotificationType =
  | "darshan"
  | "booking"
  | "donation"
  | "temple"
  | "general";

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  date: string;
  unread: boolean;
};

/* =========================================================
   NOTIFICATION DATA
========================================================= */

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "darshan",
    title: "Darshan Reminder",
    message:
      "Your upcoming darshan is scheduled soon. We look forward to welcoming you.",
    time: "10:30 AM",
    date: "Today",
    unread: true,
  },
  {
    id: 2,
    type: "booking",
    title: "Booking Confirmed",
    message:
      "Your darshan booking has been successfully confirmed. Please keep your booking details handy.",
    time: "09:15 AM",
    date: "Today",
    unread: true,
  },
  {
    id: 3,
    type: "donation",
    title: "Thank You for Your Donation",
    message:
      "We sincerely thank you for your generous contribution towards the Haveli.",
    time: "04:30 PM",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    type: "temple",
    title: "Temple Update",
    message:
      "Please note the latest temple timings and important information for devotees.",
    time: "05:45 PM",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "general",
    title: "Welcome to Shri Govardhannath Haveli",
    message:
      "Stay connected with us for darshan updates, temple information and important announcements.",
    time: "11:20 AM",
    date: "28 Sep 2026",
    unread: false,
  },
];

/* =========================================================
   ICONS
========================================================= */

function BellIcon({
  size = 24,
  strokeWidth = 1.8,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 8C18 4.686 15.314 2 12 2S6 4.686 6 8c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 21h4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowLeftIcon({ size = 21 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M12 19L5 12L12 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIcon({ size = 21 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M19 16L19.7 18.3L22 19L19.7 19.7L19 22L18.3 19.7L16 19L18.3 18.3L19 16Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.84 4.61C19.74 3.51 18.26 2.9 16.72 2.9c-1.54 0-3.02.61-4.12 1.71L12 5.21l-.6-.6C9.11 2.32 5.39 2.32 3.1 4.61c-2.29 2.29-2.29 6.01 0 8.3l8.9 8.9 8.9-8.9c2.29-2.29 2.29-6.01-.06-8.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 2V6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M16 2V6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M3 9H21"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ClockIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 7V12L15 14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   NOTIFICATION TYPE ICON
========================================================= */

function NotificationTypeIcon({
  type,
}: {
  type: NotificationType;
}) {
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  if (type === "darshan") {
    return (
      <svg {...props}>
        <path
          d="M12 3C8 3 4.5 5.8 3 9c1.5 3.2 5 6 9 6s7.5-2.8 9-6c-1.5-3.2-5-6-9-6Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <circle
          cx="12"
          cy="9"
          r="3"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M6 18c1.5 2 3.5 3 6 3s4.5-1 6-3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "booking") {
    return (
      <svg {...props}>
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M8 3V7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M16 3V7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M4 10H20"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M8 14L10.5 16.5L16 11"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "donation") {
    return (
      <svg {...props}>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M12 8V16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M9.5 10.2C9.5 9 10.5 8 12 8c1.5 0 2.5 1 2.5 2.2S13.5 12 12 12s-2.5.6-2.5 1.8S10.5 16 12 16c1.5 0 2.5-1 2.5-2.2"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "temple") {
    return (
      <svg {...props}>
        <path
          d="M4 20H20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        <path
          d="M6 20V10H18V20"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M4 10L12 4L20 10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M9 20V15H15V20"
          stroke="currentColor"
          strokeWidth="1.7"
        />

        <path
          d="M12 4V2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 11V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

/* =========================================================
   NOTIFICATION CONFIG
========================================================= */

const notificationConfig: Record<
  NotificationType,
  {
    label: string;
    iconClass: string;
    bgClass: string;
  }
> = {
  darshan: {
    label: "Darshan",
    iconClass: "text-[#a71919]",
    bgClass: "bg-[#fff0ee]",
  },

  booking: {
    label: "Booking",
    iconClass: "text-[#8a641e]",
    bgClass: "bg-[#fff8e7]",
  },

  donation: {
    label: "Seva & Donation",
    iconClass: "text-[#7a4c2b]",
    bgClass: "bg-[#f8eee7]",
  },

  temple: {
    label: "Temple",
    iconClass: "text-[#6d5a25]",
    bgClass: "bg-[#f8f2dd]",
  },

  general: {
    label: "General",
    iconClass: "text-[#7b6253]",
    bgClass: "bg-[#f4eee9]",
  },
};

/* =========================================================
   PAGE
========================================================= */

export default function NotificationsPage() {
  const router = useRouter();

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = useMemo(() => {
    return initialNotifications.filter(
      (notification) => notification.unread
    ).length;
  }, []);

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return initialNotifications.filter(
        (notification) => notification.unread
      );
    }

    return initialNotifications;
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#fffaf1] text-[#3d2922]">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#b8893b]/5 blur-3xl" />

        <div className="absolute -left-32 top-[45%] h-96 w-96 rounded-full bg-[#a71919]/5 blur-3xl" />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#eadcc7] bg-[#fffaf1]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#e8d7bf] bg-white text-[#641010] transition-all duration-200 hover:border-[#b8893b] hover:bg-[#fff8eb] hover:shadow-sm"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
                <ArrowLeftIcon />
              </span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-semibold text-[#641010] sm:text-xl">
                  Notifications
                </h1>

                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a71919] px-1.5 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>

              <p className="hidden text-xs text-[#907b6c] sm:block">
                Stay connected with Haveli updates
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-10 items-center gap-2 rounded-full border border-[#eadcc7] bg-white px-4 text-xs font-medium text-[#765e50] shadow-sm">
              <BellIcon size={16} />

              <span>
                {unreadCount === 0
                  ? "You're all caught up"
                  : `${unreadCount} new ${
                      unreadCount === 1 ? "update" : "updates"
                    }`}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        {/* ===================================================
            HERO
        =================================================== */}

        <section className="relative overflow-hidden rounded-[28px] border border-[#ead9c1] bg-gradient-to-br from-[#fffdf8] via-[#fff9ee] to-[#f8eee0] p-6 shadow-[0_18px_50px_rgba(97,45,25,0.06)] sm:p-8 lg:p-10">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#b8893b]/10" />

          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-[#b8893b]/10" />

          <div className="absolute bottom-[-60px] left-[-50px] h-40 w-40 rounded-full bg-[#a71919]/5" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e6cfa8] bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a641e]">
                <SparklesIcon size={14} />

                Haveli Updates
              </div>

              <h2 className="font-serif text-3xl font-semibold leading-tight text-[#641010] sm:text-4xl lg:text-[42px]">
                Stay Connected,
                <span className="block text-[#a71919]">
                  Stay Blessed
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#725f53] sm:text-[15px]">
                Receive important updates about darshan, bookings, seva,
                temple timings and announcements from Shri Govardhannath
                Haveli.
              </p>
            </div>

            {/* Bell illustration */}
            <div className="relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center sm:h-36 sm:w-36 lg:mx-0">
              <div className="absolute inset-0 rounded-full border border-[#d9b76e]/30" />

              <div className="absolute inset-3 rounded-full border border-[#d9b76e]/20" />

              <div className="absolute inset-7 rounded-full bg-[#a71919]/8" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#a71919] shadow-[0_12px_30px_rgba(97,45,25,0.12)]">
                <BellIcon size={36} strokeWidth={1.5} />

                {unreadCount > 0 && (
                  <span className="absolute right-2 top-2 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#a71919]" />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            SUMMARY
        =================================================== */}

        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <SummaryCard
            label="Total Updates"
            value={initialNotifications.length}
            icon={<BellIcon size={19} />}
          />

          <SummaryCard
            label="Unread"
            value={unreadCount}
            icon={<SparklesIcon size={19} />}
            highlight
          />

          <div className="hidden sm:block">
            <SummaryCard
              label="Connection"
              value="Active"
              icon={<HeartIcon size={19} />}
            />
          </div>
        </section>

        {/* ===================================================
            SECTION HEADER + FILTER
        =================================================== */}

        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a27e58]">
                Your Updates
              </p>

              <h3 className="mt-1 font-serif text-2xl font-semibold text-[#641010]">
                Notifications
              </h3>

              <p className="mt-1 text-sm text-[#8b7568]">
                Important messages from the Haveli, all in one place.
              </p>
            </div>

            {/* Filter */}
            <div className="flex w-full rounded-xl border border-[#e6d6c0] bg-white p-1 shadow-sm sm:w-auto">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold transition-all duration-200 sm:flex-none ${
                  filter === "all"
                    ? "bg-[#641010] text-white shadow-sm"
                    : "text-[#755f52] hover:bg-[#fff7eb]"
                }`}
              >
                All

                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    filter === "all"
                      ? "bg-white/15 text-white"
                      : "bg-[#f4eadc] text-[#806a5d]"
                  }`}
                >
                  {initialNotifications.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-xs font-semibold transition-all duration-200 sm:flex-none ${
                  filter === "unread"
                    ? "bg-[#641010] text-white shadow-sm"
                    : "text-[#755f52] hover:bg-[#fff7eb]"
                }`}
              >
                Unread

                {unreadCount > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      filter === "unread"
                        ? "bg-white/15 text-white"
                        : "bg-[#f4eadc] text-[#806a5d]"
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            NOTIFICATION GRID

            MOBILE  = 1 COLUMN
            TABLET  = 2 COLUMNS
            DESKTOP = 2 COLUMNS
        =================================================== */}

        <section className="mt-5">
          {filteredNotifications.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          ) : (
            <EmptyState filter={filter} />
          )}
        </section>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <section className="mt-10">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#eadcc7] bg-white/70 px-5 py-7 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fff3df] text-[#a71919]">
              <HeartIcon size={18} />
            </div>

            <p className="font-serif text-base font-semibold text-[#641010]">
              Jai Shri Govardhannath Ji
            </p>

            <p className="mt-1 max-w-md text-xs leading-5 text-[#8c7669]">
              May your connection with the divine remain blessed and peaceful.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
        highlight
          ? "border-[#e5c995] bg-gradient-to-br from-[#fffaf0] to-[#fff5df]"
          : "border-[#eadcc7] bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#977f70]">
            {label}
          </p>

          <p
            className={`mt-1.5 font-serif text-2xl font-semibold ${
              highlight ? "text-[#a71919]" : "text-[#641010]"
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            highlight
              ? "bg-[#a71919]/8 text-[#a71919]"
              : "bg-[#f8efe3] text-[#8a641e]"
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATION CARD
========================================================= */

function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  const config = notificationConfig[notification.type];

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_35px_rgba(97,45,25,0.08)] ${
        notification.unread
          ? "border-[#e6c8b9]"
          : "border-[#eadfd2]"
      }`}
    >
      {/* Unread accent */}
      {notification.unread && (
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#a71919]" />
      )}

      <div className="flex min-h-[190px] gap-3 p-4 sm:min-h-[205px] sm:gap-4 sm:p-5">
        {/* Notification Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${config.bgClass} ${config.iconClass} transition-transform duration-300 group-hover:scale-105`}
        >
          <NotificationTypeIcon type={notification.type} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Category */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a27d5b]">
              {config.label}
            </span>

            {notification.unread && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[#a71919]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a71919]" />
                New
              </span>
            )}
          </div>

          {/* Title */}
          <h4 className="mt-1 font-serif text-[16px] font-semibold leading-snug text-[#4e211c] sm:text-lg">
            {notification.title}
          </h4>

          {/* Message */}
          <p className="mt-1.5 text-sm leading-6 text-[#79685e]">
            {notification.message}
          </p>

          {/* Bottom Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#f0e6da] pt-3 text-[11px] text-[#9a8679]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon />
              {notification.date}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <ClockIcon />
              {notification.time}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  filter,
}: {
  filter: "all" | "unread";
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[#ddcdb8] bg-white/70 px-6 py-14 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#fff5e7] text-[#b8893b]">
        <BellIcon size={48} />
      </div>

      <h4 className="mt-6 font-serif text-xl font-semibold text-[#641010]">
        {filter === "unread"
          ? "No unread notifications"
          : "No notifications yet"}
      </h4>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#8a7669]">
        {filter === "unread"
          ? "You are all caught up. New updates from the Haveli will appear here."
          : "Important updates, announcements and messages from the Haveli will appear here."}
      </p>
    </div>
  );
}