
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider";
import type { TranslationKey } from "@/utils/i18n";
import { EVENTS as events, type EventItem, type EventTab } from "@/data/events";

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="min-w-0 break-words text-[#641010]">
      {children}
    </h2>
  );
}

/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({
  event,
  onClick,
  t,
}: {
  event: EventItem;
  onClick: () => void;
  t: (key: TranslationKey) => string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${t(event.titleKey)} — View Details`}
      className="
        group flex min-w-0 w-full flex-col overflow-hidden
        rounded-2xl border border-[#eadbc5] bg-[#fffdf8]
        text-left text-[#4b4039]
        shadow-[0_5px_20px_rgba(79,43,14,0.05)]
        transition-[border-color,box-shadow,transform]
        duration-300
        hover:-translate-y-1 hover:border-[#d7b97f]
        hover:shadow-[0_14px_35px_rgba(79,43,14,0.11)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#a71919]/40
        active:scale-[0.99]
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative aspect-[16/9] w-full shrink-0
          overflow-hidden bg-[#f4e5c8]
          sm:aspect-[16/9]
          lg:aspect-[5/3]
          2xl:aspect-[16/9]
        "
      >
        <img
          src={event.image}
          alt={t(event.titleKey)}
          loading="lazy"
          className="
            block h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* UTSAV BADGE */}

        <span
          className="
            absolute left-3 top-3 rounded-full
            bg-white/95 px-2.5 py-1
            text-[9px] font-bold uppercase tracking-[1px]
            text-[#a71919] shadow-sm backdrop-blur-sm
            sm:text-[10px]
          "
        >
          Utsav
        </span>
      </div>

      {/* CARD CONTENT */}

      <div
        className="
          flex min-w-0 flex-1 flex-col
          p-3.5 sm:p-4 md:p-5
          lg:p-4 xl:p-5
        "
      >
        <div className="min-w-0">
          <span
            className="
              mb-2 block text-[9px] font-bold uppercase
              tracking-[1.2px] text-[#c99435]
              sm:text-[10px]
            "
          >
            Upcoming Event
          </span>

          <SectionTitle>
            <span
              className="
                block text-base font-semibold leading-snug
                sm:text-lg
                lg:text-base
                xl:text-lg
                2xl:text-xl
              "
            >
              {t(event.titleKey)}
            </span>
          </SectionTitle>

          {/* DATE */}

          <div
            className="
              mt-3 flex min-w-0 items-start gap-2
              text-xs leading-relaxed text-[#8a8077]
              sm:text-sm
            "
          >
            <span
              aria-hidden="true"
              className="shrink-0 text-sm text-[#a71919]"
            >
              ◷
            </span>

            <span className="min-w-0 break-words">
              {t(event.dateKey)}
            </span>
          </div>
        </div>

        {/* VIEW DETAILS */}

        <div
          className="
            mt-5 flex items-center justify-between
            border-t border-[#f0e5d4] pt-3
            text-xs font-bold text-[#a71919]
            sm:text-sm
          "
        >
          <span>View Details</span>

          <span
            aria-hidden="true"
            className="
              ml-2 text-base transition-transform duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   EMPTY EVENTS
========================================================= */

function EmptyEvents({
  t,
}: {
  t: (key: TranslationKey) => string;
}) {
  return (
    <div
      className="
        col-span-full flex min-h-[260px] flex-col
        items-center justify-center rounded-2xl
        border border-[#eadbc5] bg-[#fffdf8]
        px-5 py-10 text-center
        shadow-[0_5px_20px_rgba(79,43,14,0.04)]
        sm:min-h-[300px] sm:px-8
        lg:min-h-[340px]
      "
    >
      <div
        className="
          mb-4 grid h-16 w-16 shrink-0 place-items-center
          rounded-full border border-[#e5cfaa]
          bg-[#fff7e9] text-3xl shadow-sm
          sm:h-[72px] sm:w-[72px] sm:text-4xl
        "
        aria-hidden="true"
      >
        🛕
      </div>

      <h2 className="text-xl font-semibold text-[#641010] sm:text-2xl">
        {t("past")}
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#8a8077]">
        {t("noPastEvents")}
      </p>
    </div>
  );
}

/* =========================================================
   DECORATION
========================================================= */

function Decoration() {
  return (
    <div
      aria-hidden="true"
      className="
        mx-auto mt-8 flex w-full max-w-[520px]
        items-center justify-center gap-3
        px-4 text-[#c99435]
        sm:mt-10 md:mt-12
      "
    >
      <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-transparent to-[#d8b66c]" />

      <span className="shrink-0 whitespace-nowrap text-xs tracking-[2px]">
        ❧ ❧ ❧
      </span>

      <span className="h-px min-w-0 flex-1 bg-gradient-to-l from-transparent to-[#d8b66c]" />
    </div>
  );
}

/* =========================================================
   MAIN EVENTS PAGE
========================================================= */

export default function Events() {
  const router = useRouter();
  const { t } = useLanguage();

  const [tab, setTab] = useState<EventTab>("upcoming");

  const visibleEvents = tab === "upcoming" ? events : [];

  return (
    <main
      className="
        relative min-h-dvh w-full min-w-0
        overflow-x-clip
        bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0,#fffaf0_42%,#f6ead5_100%)]
        text-[#4b4039]
        pb-[calc(88px+env(safe-area-inset-bottom))]
        sm:pb-[calc(92px+env(safe-area-inset-bottom))]
        lg:min-h-screen
        lg:bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.12),transparent_30%),#fff9ed]
        lg:pb-12
      "
    >
      {/* PAGE CONTAINER
          Mobile: full width
          Tablet: comfortable horizontal padding
          Desktop: leaves room for a fixed 92px sidebar
      */}

      <div
        className="
          mx-auto w-full min-w-0
          max-w-[1800px]
          px-3
          sm:px-5
          md:px-7
          lg:ml-[92px]
          lg:w-[calc(100%-92px)]
          lg:px-7
          xl:px-9
          2xl:px-12
        "
      >
        {/* PAGE INTRO */}

        <header className="mx-auto w-full max-w-[1000px] pt-5 sm:pt-7 lg:pt-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#c99435] sm:text-xs">
              Temple celebrations
            </span>

            <h1 className="mt-2 text-2xl font-bold leading-tight text-[#641010] sm:text-3xl md:text-4xl">
              {t("upcoming")}
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-[#8a8077] sm:text-sm">
              Discover upcoming celebrations and revisit past events.
            </p>
          </div>
        </header>

        {/* TABS */}

        <div
          role="group"
          aria-label="Filter events"
          className="
            mx-auto mt-5 grid w-full max-w-[520px]
            grid-cols-2 gap-1 rounded-xl
            border border-[#eadbc5] bg-[#fffdf8] p-1
            shadow-[0_4px_15px_rgba(82,48,18,0.04)]
            sm:mt-7
          "
        >
          {(["upcoming", "past"] as EventTab[]).map((item) => {
            const active = tab === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                aria-pressed={active}
                className={`
                  min-w-0 rounded-lg px-2
                  h-10 sm:h-11
                  text-xs font-bold capitalize
                  transition-colors duration-200 sm:text-sm
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#a71919]/30
                  ${
                    active
                      ? "bg-[#a71919] text-white shadow-[0_4px_12px_rgba(167,25,25,0.18)]"
                      : "text-[#776d65] hover:bg-[#fff1e7] hover:text-[#a71919]"
                  }
                `}
              >
                {t(item)}
              </button>
            );
          })}
        </div>

        {/* EVENTS GRID
            Small phones: 1 column
            Large phones / tablets: 2 columns
            Desktop: 3 columns
            Wide desktop: 4 columns
        */}

        <section
          aria-label={tab === "upcoming" ? "Upcoming events" : "Past events"}
          className="
            mt-4 grid min-w-0 grid-cols-1
            items-stretch gap-4
            sm:mt-5 sm:grid-cols-2 sm:gap-5
            lg:mt-7 lg:gap-6
            xl:grid-cols-3
            2xl:grid-cols-4 2xl:gap-7
          "
        >
          {tab === "upcoming" ? (
            visibleEvents.length > 0 ? (
              visibleEvents.map((event: EventItem) => (
                <EventCard
                  key={event.id}
                  event={event}
                  t={t}
                  onClick={() => router.push(`/events/${event.id}`)}
                />
              ))
            ) : (
              <EmptyEvents t={t} />
            )
          ) : (
            <EmptyEvents t={t} />
          )}
        </section>

        {/* BOTTOM DECORATION */}

        <Decoration />
      </div>
    </main>
  );
}
