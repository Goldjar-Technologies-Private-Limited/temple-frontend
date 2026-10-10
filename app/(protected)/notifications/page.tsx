"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Sparkles,
  Heart,
  CalendarDays,
  Clock,
  Eye,
  CalendarCheck,
  HandCoins,
  Landmark,
  Info,
} from "lucide-react";

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

const notifications: Notification[] = [
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
      className={`
        group
        relative
        overflow-hidden
        rounded-[15px]
        border
        bg-[#fffdf9]
        transition-all
        duration-300

        sm:rounded-[18px]

        ${notification.unread ? "border-[#e6c8b9]" : "border-[#eadfd2]"}

        hover:-translate-y-[2px]
        hover:shadow-[0_12px_35px_rgba(97,45,25,0.08)]
      `}
    >
      {/* UNREAD ACCENT */}

      {notification.unread && (
        <div
          className="
            absolute
            bottom-0
            left-0
            top-0
            w-0.5
            bg-[#a71919]

            sm:w-1
          "
        />
      )}

      <div
        className="
          flex
          gap-2.5
          p-3.5

          sm:gap-4
          sm:p-4

          lg:p-5
        "
      >
        {/* NOTIFICATION ICON */}

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl

            sm:h-11
            sm:w-11

            lg:h-12
            lg:w-12
            lg:rounded-2xl

            ${config.bgClass}
            ${config.iconClass}

            transition-transform
            duration-300

            group-hover:scale-105
          `}
        >
          <NotificationTypeIcon type={notification.type} />
        </div>

        {/* NOTIFICATION CONTENT */}

        <div className="min-w-0 flex-1">
          {/* TOP ROW */}

          <div
            className="
              flex
              min-w-0
              items-start
              justify-between
              gap-2

              sm:gap-3
            "
          >
            {/* CATEGORY */}

            <div className="min-w-0 flex-1">
              <div
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-x-1.5
                  gap-y-1
                "
              >
                <span
                  className="
                    max-w-[100px]
                    truncate
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.1em]
                    text-[#a27d5b]

                    sm:max-w-none
                    sm:text-[10px]
                    sm:tracking-[0.12em]
                  "
                >
                  {config.label}
                </span>

                {notification.unread && (
                  <span
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1
                      text-[8px]
                      font-semibold
                      text-[#a71919]

                      sm:text-[10px]
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#a71919]
                      "
                    />
                    New
                  </span>
                )}
              </div>
            </div>

            {/* DATE AND TIME */}

            <div
              className="
                shrink-0
                text-right
                text-[8px]
                leading-3.5
                text-[#9a8679]

                sm:text-[10px]
                sm:leading-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-end
                  gap-0.5

                  sm:gap-1
                "
              >
                <CalendarDays size={10} strokeWidth={1.7} />

                <span className="whitespace-nowrap">{notification.date}</span>
              </div>

              <div
                className="
                  mt-0.5
                  flex
                  items-center
                  justify-end
                  gap-0.5

                  sm:gap-1
                "
              >
                <Clock size={10} strokeWidth={1.7} />

                <span className="whitespace-nowrap">{notification.time}</span>
              </div>
            </div>
          </div>

          {/* TITLE */}

          <h3
            className="
              mt-1
              break-words
              font-serif
              text-[14px]
              font-semibold
              leading-snug
              text-[#4e211c]

              sm:mt-1.5
              sm:text-[16px]

              lg:text-lg
            "
          >
            {notification.title}
          </h3>

          {/* MESSAGE */}

          <div className="relative mt-1 sm:mt-1.5">
            <p
              className="
                text-[11px]
                leading-[18px]
                text-[#79685e]

                sm:text-xs
                sm:leading-5

                lg:line-clamp-2
                lg:text-sm
              "
            >
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
  const router = useRouter();

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  return (
    <main
      className="
        relative
        min-h-[100dvh]
        overflow-x-hidden
        bg-[#fffaf1]
        pb-[105px]
        text-[#3d2922]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      {/* BACKGROUND DECORATION */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="
            absolute
            -right-32
            top-20
            h-60
            w-60
            rounded-full
            bg-[#b8893b]/5
            blur-3xl

            sm:h-80
            sm:w-80
          "
        />

        <div
          className="
            absolute
            -left-32
            top-[45%]
            h-72
            w-72
            rounded-full
            bg-[#a71919]/5
            blur-3xl

            sm:h-96
            sm:w-96
          "
        />
      </div>

      {/* HEADER */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-[#eadfce]
          bg-[#fffaf1]/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[64px]
            max-w-[1400px]
            items-center
            px-3

            sm:min-h-[70px]
            sm:px-6

            lg:px-8

            xl:px-10
          "
        >
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            {/* BACK BUTTON */}

            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="
                group
                grid
                h-9
                w-9
                shrink-0
                place-items-center
                rounded-full
                border
                border-[#ead7b8]
                bg-white
                text-[#641010]
                shadow-sm
                transition-all

                hover:border-[#b8893b]
                hover:bg-[#fff8eb]
                hover:shadow-sm

                active:scale-95

                sm:h-10
                sm:w-10
              "
            >
              <span
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-0.5
                "
              >
                <ArrowLeft size={19} strokeWidth={1.8} />
              </span>
            </button>

            {/* PAGE TITLE */}

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#bd8b39]

                  sm:text-[10px]
                "
              >
                Shri Govardhannath
              </p>

              <h1
                className="
                  truncate
                  font-serif
                  text-[18px]
                  font-bold
                  leading-tight
                  text-[#641010]

                  sm:text-xl
                "
              >
                Notifications
              </h1>

              <p
                className="
                  mt-0.5
                  hidden
                  text-xs
                  text-[#907b6c]

                  sm:block
                "
              >
                Stay connected with Haveli updates
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1400px]
          px-3
          py-5

          sm:px-5
          sm:py-7

          md:px-6

          lg:px-8
          lg:py-9

          xl:px-10
        "
      >
        {/* HERO SECTION */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[18px]
            border
            border-[#ead9c1]
            bg-gradient-to-br
            from-[#fffdf8]
            via-[#fff9ee]
            to-[#f8eee0]
            p-4
            shadow-[0_18px_50px_rgba(97,45,25,0.06)]

            sm:rounded-[24px]
            sm:p-5

            lg:rounded-[28px]
            lg:p-7
          "
        >
          {/* HERO DECORATION */}

          <div
            className="
              absolute
              -right-14
              -top-14
              h-32
              w-32
              rounded-full
              border
              border-[#b8893b]/10

              sm:h-36
              sm:w-36

              lg:-right-16
              lg:-top-16
              lg:h-40
              lg:w-40
            "
          />

          <div
            className="
              absolute
              -right-6
              -top-6
              h-24
              w-24
              rounded-full
              border
              border-[#b8893b]/10

              sm:h-28
              sm:w-28
            "
          />

          <div
            className="
              absolute
              bottom-[-55px]
              left-[-45px]
              h-32
              w-32
              rounded-full
              bg-[#a71919]/5

              sm:h-36
              sm:w-36
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              justify-between
              gap-4

              lg:flex-row
              lg:items-center
              lg:gap-8
            "
          >
            {/* HERO TEXT */}

            <div className="min-w-0 max-w-[680px]">
              <div
                className="
                  mb-2
                  inline-flex
                  max-w-full
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#e6cfa8]
                  bg-white/70
                  px-2.5
                  py-1
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#8a641e]

                  sm:mb-2.5
                  sm:gap-2
                  sm:px-3
                  sm:text-[10px]
                "
              >
                <Sparkles size={12} strokeWidth={1.6} />

                <span>Haveli Updates</span>
              </div>

              <h2
                className="
                  font-serif
                  text-[24px]
                  font-semibold
                  leading-[1.12]
                  text-[#641010]

                  sm:text-[30px]

                  lg:text-[38px]

                  xl:text-[42px]
                "
              >
                Stay Connected,
                <span className="block text-[#a71919]">Stay Blessed</span>
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-[11px]
                  leading-5
                  text-[#725f53]

                  sm:mt-2.5
                  sm:text-[12px]
                  sm:leading-5

                  lg:text-[14px]
                  lg:leading-6
                "
              >
                Receive important updates about darshan, bookings, seva, temple
                timings and announcements from Shri Govardhannath Haveli.
              </p>
            </div>

            {/* HERO BELL */}

            <div
              className="
                relative
                mx-auto
                hidden
                h-28
                w-28
                shrink-0
                items-center
                justify-center

                lg:mx-0
                lg:flex
                lg:h-32
                lg:w-32

                xl:h-36
                xl:w-36
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-[#d9b76e]/30
                "
              />

              <div
                className="
                  absolute
                  inset-3
                  rounded-full
                  border
                  border-[#d9b76e]/20
                "
              />

              <div
                className="
                  absolute
                  inset-7
                  rounded-full
                  bg-[#a71919]/8
                "
              />

              <div
                className="
                  relative
                  flex
                  h-[72px]
                  w-[72px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#a71919]
                  shadow-[0_12px_30px_rgba(97,45,25,0.12)]

                  xl:h-20
                  xl:w-20
                "
              >
                <Bell size={32} strokeWidth={1.5} />

                {unreadCount > 0 && (
                  <span
                    className="
                      absolute
                      right-1.5
                      top-1.5
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-white
                      bg-[#a71919]

                      xl:right-2
                      xl:top-2
                    "
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION HEADER */}

        <section className="mt-6 sm:mt-8">
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.13em]
              text-[#b78a3d]

              sm:text-[11px]
            "
          >
            YOUR UPDATES
          </p>

          <h2
            className="
              mt-1
              font-serif
              text-xl
              font-bold
              text-[#641010]

              sm:text-2xl

              lg:text-[27px]
            "
          >
            Notifications
          </h2>

          <p
            className="
              mt-1
              max-w-xl
              text-[11px]
              leading-5
              text-[#8b7568]

              sm:text-sm
              sm:leading-6
            "
          >
            Important messages from the Haveli, all in one place.
          </p>
        </section>

        {/* NOTIFICATION LIST */}

        <section className="mt-4 sm:mt-5">
          <div
            className="
              grid
              grid-cols-1
              gap-3

              sm:gap-4

              lg:grid-cols-2
              lg:gap-5
            "
          >
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </section>

        {/* FOOTER */}

        <section className="mt-7 sm:mt-10">
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              rounded-xl
              border
              border-[#eadcc7]
              bg-white/70
              px-4
              py-6
              text-center

              sm:rounded-2xl
              sm:px-5
              sm:py-7
            "
          >
            <div
              className="
                mb-2.5
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#fff3df]
                text-[#a71919]

                sm:mb-3
                sm:h-10
                sm:w-10
              "
            >
              <Heart size={17} strokeWidth={1.5} />
            </div>

            <p
              className="
                font-serif
                text-sm
                font-semibold
                text-[#641010]

                sm:text-base
              "
            >
              Jai Shri Govardhannath Ji
            </p>

            <p
              className="
                mt-1
                max-w-md
                text-[10px]
                leading-5
                text-[#8c7669]

                sm:text-xs
              "
            >
              May your connection with the divine remain blessed and peaceful.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
