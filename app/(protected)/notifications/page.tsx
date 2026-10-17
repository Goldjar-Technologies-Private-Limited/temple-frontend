"use client";

import {
  CalendarDays,
  Eye,
  CalendarCheck,
  HandCoins,
  Landmark,
  Info,
} from "lucide-react";
import {
  NOTIFICATIONS_DATA as notifications,
  NOTIFICATION_CONFIG as notificationConfig,
  type NotificationType,
  type NotificationItem as Notification,
} from "@/data/notifications";

/* =========================================================
   NOTIFICATION TYPE ICON
========================================================= */

function NotificationTypeIcon({ type }: { type: NotificationType }) {
  const iconProps = {
    size: 22,
    strokeWidth: 1.7,
  };

  switch (type) {
    case "darshan":
      return <Eye {...iconProps} />;

    case "booking":
      return <CalendarCheck {...iconProps} />;

    case "donation":
      return <HandCoins {...iconProps} />;

    case "temple":
      return <Landmark {...iconProps} />;

    case "general":
    default:
      return <Info {...iconProps} />;
  }
}

/* =========================================================
   NOTIFICATION CARD
========================================================= */

function NotificationCard({ notification }: { notification: Notification }) {
  const config = notificationConfig[notification.type];

  return (
    <article
      className={`group relative overflow-hidden rounded-[15px] border bg-[#fffdf9] transition-all duration-300 sm:rounded-[18px] ${notification.unread ? "border-[#e6c8b9]" : "border-[#eadfd2]"} hover:-translate-y-[2px] hover:shadow-[0_12px_35px_rgba(97,45,25,0.08)]`}
    >
      {/* UNREAD ACCENT */}

      {notification.unread && (
        <div className="absolute bottom-0 left-0 top-0 w-0.5 bg-[#a71919] sm:w-1" />
      )}

      <div className="flex gap-2.5 p-3.5 sm:gap-4 sm:p-4 lg:p-5">
        {/* NOTIFICATION ICON */}

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 lg:h-12 lg:w-12 lg:rounded-2xl ${config.bgClass} ${config.iconClass} transition-transform duration-300 group-hover:scale-105`}
        >
          <NotificationTypeIcon type={notification.type} />
        </div>

        {/* NOTIFICATION CONTENT */}

        <div className="min-w-0 flex-1">
          {/* TOP ROW */}

          <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
            {/* CATEGORY */}

            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
                <span className="max-w-[100px] truncate text-[8px] font-bold uppercase tracking-[0.1em] text-[#a27d5b] sm:max-w-none sm:text-[10px] sm:tracking-[0.12em]">
                  {config.label}
                </span>

                {notification.unread && (
                  <span className="flex shrink-0 items-center gap-1 text-[8px] font-semibold text-[#a71919] sm:text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a71919]" />
                    New
                  </span>
                )}
              </div>
            </div>

            {/* DATE AND TIME */}

            <div className="shrink-0 text-right text-[10px] leading-3.5 text-[#9a8679] sm:text-[12px] sm:leading-4">
              <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                <CalendarDays size={10} strokeWidth={1.7} />

                <span className="whitespace-nowrap">
                  {notification.date} {notification.time}
                </span>
              </div>
            </div>
          </div>

          {/* TITLE */}

          <h3 className="mt-1 break-words text-[14px] font-semibold leading-snug text-[#4e211c] sm:mt-1.5 sm:text-[16px] lg:text-lg">
            {notification.title}
          </h3>

          {/* MESSAGE */}

          <div className="relative mt-1 sm:mt-1.5">
            <p className="text-[11px] leading-[18px] text-[#79685e] sm:text-xs sm:leading-5 lg:line-clamp-2 lg:text-sm">
              {notification.message}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function NotificationsPage() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#fffaf1] pb-[105px] text-[#3d2922] lg:ml-[92px] lg:w-[calc(100%-92px)] lg:pb-12">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 top-20 h-60 w-60 rounded-full bg-[#b8893b]/5 blur-3xl sm:h-80 sm:w-80" />

        <div className="absolute -left-32 top-[45%] h-72 w-72 rounded-full bg-[#a71919]/5 blur-3xl sm:h-96 sm:w-96" />
      </div>
      {/* MAIN CONTENT */}
      <div className="relative mx-auto w-full max-w-[1400px] px-3 py-5 sm:px-5 sm:py-7 md:px-6 lg:px-8 lg:py-9 xl:px-10">
        {/* NOTIFICATION LIST */}

        <section className="mt-4 sm:mt-5">
          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-5">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
