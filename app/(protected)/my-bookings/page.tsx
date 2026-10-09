"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type BookingStatus = "upcoming" | "completed" | "cancelled";

type Booking = {
  id: string;
  title: string;
  type: "Seva" | "Darshan";
  date: string;
  time: string;
  devotees: number;
  amount?: number;
  status: BookingStatus;
};

const bookings: Booking[] = [
  {
    id: "GVN-24091501",
    title: "Rajbhog Seva",
    type: "Seva",
    date: "20 Sep 2026",
    time: "11:30 AM",
    devotees: 2,
    amount: 1100,
    status: "upcoming",
  },
  {
    id: "GVN-24091402",
    title: "Mangla Darshan",
    type: "Darshan",
    date: "12 Sep 2026",
    time: "06:30 AM",
    devotees: 3,
    status: "completed",
  },
  {
    id: "GVN-24091003",
    title: "Shringar Seva",
    type: "Seva",
    date: "10 Sep 2026",
    time: "08:30 AM",
    devotees: 1,
    amount: 501,
    status: "cancelled",
  },
];

const tabs: {
  key: BookingStatus;
  label: string;
}[] = [
  {
    key: "upcoming",
    label: "Upcoming",
  },
  {
    key: "completed",
    label: "Completed",
  },
  {
    key: "cancelled",
    label: "Cancelled",
  },
];

export default function MyBookingsPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<BookingStatus>("upcoming");

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (booking) => booking.status === activeTab
    );
  }, [activeTab]);

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[#fffaf1]
        pb-[105px]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      {/* ================= HEADER ================= */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-[#eadfce]
          bg-[#fffaf1]/95
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[64px]
            max-w-[1400px]
            items-center
            gap-3
            px-4

            sm:min-h-[70px]
            sm:px-6

            lg:min-h-[82px]
            lg:px-8
          "
        >
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              border
              border-[#ead7b8]
              bg-white
              text-[#a71919]
              shadow-sm
              transition
              hover:bg-[#fff4e6]
              active:scale-95

              lg:h-11
              lg:w-11
            "
          >
            <BackIcon />
          </button>

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#bd8b39]
              "
            >
              Shri Govardhannath
            </p>

            <h1
              className="
                truncate
                font-serif
                text-[19px]
                font-bold
                text-[#641010]

                lg:text-[25px]
              "
            >
              My Bookings
            </h1>
          </div>

          <div
            className="
              ml-auto
              hidden
              rounded-full
              border
              border-[#eadbc5]
              bg-[#fffdf8]
              px-4
              py-2
              text-[11px]
              font-semibold
              text-[#76695e]

              sm:block
            "
          >
            {bookings.length} Bookings
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section
        className="
          border-b
          border-[#eadbc5]
          bg-[linear-gradient(135deg,#fff4df_0%,#fffaf1_65%,#fff7ea_100%)]
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1400px]
            grid-cols-1
            gap-4
            px-4
            py-6

            sm:px-6
            sm:py-8

            lg:grid-cols-[1fr_auto]
            lg:items-center
            lg:px-8
            lg:py-9
          "
        >
          <div>
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#ead4a9]
                bg-white/70
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.1em]
                text-[#a56f21]
              "
            >
              <CalendarIcon />
              Your Temple Visits
            </span>

            <h2
              className="
                mt-3
                font-serif
                text-[24px]
                font-bold
                leading-tight
                text-[#641010]

                sm:text-[28px]

                lg:text-[34px]
              "
            >
              Seva & Darshan Bookings
            </h2>

            <p
              className="
                mt-2
                max-w-[600px]
                text-[11px]
                leading-5
                text-[#80746a]

                sm:text-xs

                lg:text-[13px]
                lg:leading-6
              "
            >
              View and manage your upcoming and previous
              temple bookings from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push("/seva-donation")
            }
            className="
              hidden
              min-h-[46px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#a71919]
              px-5
              text-xs
              font-bold
              text-white
              shadow-[0_8px_20px_rgba(167,25,25,0.15)]
              transition
              hover:bg-[#841313]
              active:scale-[0.98]

              lg:flex
            "
          >
            <PlusIcon />
            Book New Seva
          </button>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-3
          py-5

          sm:px-5
          sm:py-6

          lg:px-8
          lg:py-8
        "
      >
        {/* ================= TABS ================= */}

        <div
          className="
            overflow-x-auto
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div
            className="
              flex
              min-w-max
              gap-1
              rounded-xl
              border
              border-[#eadfce]
              bg-[#fffdf8]
              p-1

              sm:w-fit
            "
          >
            {tabs.map((tab) => {
              const count = bookings.filter(
                (booking) =>
                  booking.status === tab.key
              ).length;

              const active =
                activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.key)
                  }
                  className={`
                    flex
                    min-h-[38px]
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    px-4
                    text-[10px]
                    font-bold
                    transition

                    sm:min-h-[42px]
                    sm:px-5
                    sm:text-[11px]

                    ${
                      active
                        ? `
                          bg-[#a71919]
                          text-white
                          shadow-sm
                        `
                        : `
                          text-[#76695e]
                          hover:bg-[#fff3e1]
                        `
                    }
                  `}
                >
                  {tab.label}

                  <span
                    className={`
                      grid
                      h-5
                      min-w-5
                      place-items-center
                      rounded-full
                      px-1
                      text-[8px]

                      ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-[#fff0da] text-[#a71919]"
                      }
                    `}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= BOOKINGS ================= */}

        {filteredBookings.length > 0 ? (
          <section
            className="
              mt-5
              grid
              grid-cols-1
              gap-4

              md:grid-cols-2

              xl:grid-cols-3
            "
          >
            {filteredBookings.map(
              (booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onView={() =>
                    console.log(
                      "View booking:",
                      booking.id
                    )
                  }
                />
              )
            )}
          </section>
        ) : (
          <EmptyBookings
            status={activeTab}
            onBook={() =>
              router.push("/seva-donation")
            }
          />
        )}

        {/* ================= INFO ================= */}

        <section
          className="
            mt-6
            flex
            items-start
            gap-3
            rounded-[16px]
            border
            border-[#ead7b5]
            bg-[#fff6e6]
            p-4

            lg:mt-8
            lg:max-w-[700px]
          "
        >
          <div
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              bg-white
              text-[#a71919]
            "
          >
            <InfoIcon />
          </div>

          <div>
            <h3
              className="
                text-[11px]
                font-bold
                text-[#5c3521]

                sm:text-xs
              "
            >
              Booking Information
            </h3>

            <p
              className="
                mt-1
                text-[9px]
                leading-5
                text-[#88766a]

                sm:text-[10px]
              "
            >
              Please keep your booking ID available when
              visiting the Haveli. Final timings and entry
              instructions should be confirmed from the
              temple before your visit.
            </p>
          </div>
        </section>
      </div>

      {/* ================= MOBILE CTA ================= */}

      <div
        className="
          fixed
          bottom-[calc(76px+env(safe-area-inset-bottom))]
          left-0
          right-0
          z-30
          border-t
          border-[#eadbc5]
          bg-[#fffdf8]/95
          p-3
          backdrop-blur-md

          lg:hidden
        "
      >
        <button
          type="button"
          onClick={() =>
            router.push("/seva-donation")
          }
          className="
            mx-auto
            flex
            min-h-[48px]
            w-full
            max-w-[600px]
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#a71919]
            px-5
            text-xs
            font-bold
            text-white
            shadow-[0_7px_18px_rgba(167,25,25,0.17)]
            active:scale-[0.99]
          "
        >
          <PlusIcon />
          Book New Seva
        </button>
      </div>
    </main>
  );
}

/* =========================================================
   BOOKING CARD
========================================================= */

function BookingCard({
  booking,
  onView,
}: {
  booking: Booking;
  onView: () => void;
}) {
  return (
    <article
      className="
        overflow-hidden
        rounded-[18px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        shadow-[0_6px_22px_rgba(74,42,16,0.045)]
        transition

        lg:hover:-translate-y-1
        lg:hover:shadow-[0_12px_28px_rgba(74,42,16,0.08)]
      "
    >
      {/* TOP */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-3
          border-b
          border-[#f0e4d3]
          bg-[linear-gradient(135deg,#fff8eb,#fffdf9)]
          p-4
        "
      >
        <div className="flex min-w-0 gap-3">
          <div
            className="
              grid
              h-11
              w-11
              shrink-0
              place-items-center
              rounded-xl
              bg-[#fff0d8]
              text-[#a71919]
            "
          >
            {booking.type === "Seva" ? (
              <SevaIcon />
            ) : (
              <TempleIcon />
            )}
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#b4873e]
              "
            >
              {booking.type}
            </p>

            <h2
              className="
                mt-[2px]
                truncate
                font-serif
                text-[16px]
                font-bold
                text-[#641010]
              "
            >
              {booking.title}
            </h2>
          </div>
        </div>

        <StatusBadge status={booking.status} />
      </div>

      {/* DETAILS */}

      <div className="p-4">
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-[#a09285]
          "
        >
          Booking ID
        </p>

        <p
          className="
            mt-1
            text-[11px]
            font-bold
            text-[#51463d]
          "
        >
          #{booking.id}
        </p>

        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-3
          "
        >
          <Detail
            icon="calendar"
            label="Date"
            value={booking.date}
          />

          <Detail
            icon="clock"
            label="Time"
            value={booking.time}
          />

          <Detail
            icon="users"
            label="Devotees"
            value={`${booking.devotees}`}
          />

          <Detail
            icon="money"
            label="Amount"
            value={
              booking.amount
                ? `₹${booking.amount.toLocaleString(
                    "en-IN"
                  )}`
                : "—"
            }
          />
        </div>

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-[#f0e5d6]
            pt-3
          "
        >
          <span
            className="
              text-[9px]
              text-[#95887d]
            "
          >
            Shri Govardhannath Haveli
          </span>

          <button
            type="button"
            onClick={onView}
            className="
              flex
              items-center
              gap-1
              text-[10px]
              font-bold
              text-[#a71919]
              transition
              hover:text-[#7f1212]
            "
          >
            View Details
            <span className="text-base">
              ›
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const config = {
    upcoming: {
      label: "Upcoming",
      style:
        "border-[#ead19d] bg-[#fff5dd] text-[#9a6514]",
    },
    completed: {
      label: "Completed",
      style:
        "border-[#cde4d1] bg-[#eff8f0] text-[#347243]",
    },
    cancelled: {
      label: "Cancelled",
      style:
        "border-[#efd0cb] bg-[#fff1ef] text-[#a23a32]",
    },
  };

  const item = config[status];

  return (
    <span
      className={`
        shrink-0
        rounded-full
        border
        px-2.5
        py-1
        text-[8px]
        font-bold
        ${item.style}
      `}
    >
      {item.label}
    </span>
  );
}

/* =========================================================
   DETAIL
========================================================= */

function Detail({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-2
        rounded-xl
        bg-[#fff9ef]
        p-2.5
      "
    >
      <div
        className="
          mt-[1px]
          text-[#a71919]
        "
      >
        <DetailIcon name={icon} />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.06em]
            text-[#9d8e81]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-[2px]
            truncate
            text-[10px]
            font-bold
            text-[#51463d]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyBookings({
  status,
  onBook,
}: {
  status: BookingStatus;
  onBook: () => void;
}) {
  return (
    <section
      className="
        mx-auto
        mt-8
        max-w-[450px]
        rounded-[20px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        p-7
        text-center
        shadow-[0_8px_25px_rgba(74,42,16,0.04)]

        sm:p-9
      "
    >
      <div
        className="
          mx-auto
          grid
          h-[72px]
          w-[72px]
          place-items-center
          rounded-full
          bg-[#fff1dc]
          text-[#a71919]
        "
      >
        <CalendarLargeIcon />
      </div>

      <h2
        className="
          mt-5
          font-serif
          text-xl
          font-bold
          capitalize
          text-[#641010]
        "
      >
        No {status} bookings
      </h2>

      <p
        className="
          mt-2
          text-[11px]
          leading-5
          text-[#877a70]
        "
      >
        Your {status} seva and darshan bookings
        will appear here.
      </p>

      {status === "upcoming" && (
        <button
          type="button"
          onClick={onBook}
          className="
            mt-5
            min-h-[44px]
            rounded-xl
            bg-[#a71919]
            px-6
            text-[11px]
            font-bold
            text-white
          "
        >
          Book a Seva
        </button>
      )}
    </section>
  );
}

/* =========================================================
   ICONS
========================================================= */

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-[18px] w-[18px]"
    >
      <path
        d="m15 18-6-6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-3.5 w-3.5"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </svg>
  );
}

function CalendarLargeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-8 w-8"
    >
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SevaIcon() {
  return <span className="text-xl">🙏</span>;
}

function TempleIcon() {
  return <span className="text-xl">🛕</span>;
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-[18px] w-[18px]"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

function DetailIcon({
  name,
}: {
  name: string;
}) {
  if (name === "calendar") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
        <path d="M16 6a3 3 0 0 1 0 6M17 15c2.5.3 4 2 4 5" />
      </svg>
    );
  }

  return (
    <span
      className="
        text-[13px]
        font-bold
      "
    >
      ₹
    </span>
  );
}