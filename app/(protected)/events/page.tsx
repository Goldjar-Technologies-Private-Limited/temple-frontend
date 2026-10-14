"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider";
import type { TranslationKey } from "@/utils/i18n";
import CommonHeader from "@/components/layout/CommonHeader";
import { EVENTS as events, type EventItem, type EventTab } from "@/data/events";

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[#641010]">{children}</h2>;
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
      className="group relative flex w-full overflow-hidden rounded-2xl border border-[#eadbc5] bg-[#fffdf8] text-left text-[#4b4039] shadow-[0_5px_20px_rgba(79,43,14,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b97f] hover:shadow-[0_14px_35px_rgba(79,43,14,0.11)] focus:outline-none focus:ring-2 focus:ring-[#a71919]/30 active:scale-[0.99] flex-row min-h-[115px] sm:min-h-[130px] md:min-h-[145px] lg:min-h-[300px] lg:flex-col xl:min-h-[320px] 2xl:min-h-[340px]"
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative shrink-0 overflow-hidden bg-[#f4e5c8] h-auto w-[38%] sm:w-[40%] md:w-[38%] lg:h-[185px] lg:w-full xl:h-[195px] 2xl:h-[205px]">
        <img
          src={event.image}
          alt={t(event.titleKey)}
          className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* IMAGE OVERLAY */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />

        {/* UTSAV BADGE */}

        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[8px] font-bold uppercase tracking-[1px] text-[#a71919] shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[9px] lg:text-[10px]">
          Utsav
        </span>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="flex min-w-0 flex-1 flex-col justify-between p-3 sm:p-3.5 md:p-4 lg:p-5 xl:p-5 2xl:p-5">
        <div>
          {/* LABEL */}

          <span className="mb-1.5 block text-[8px] font-bold uppercase tracking-[1.1px] text-[#c99435] sm:text-[9px] md:text-[10px]">
            Upcoming Event
          </span>

          {/* TITLE */}

          <SectionTitle>
            <span className="block text-[14px] font-semibold leading-[1.3] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[21px] 2xl:text-[22px]">
              {t(event.titleKey)}
            </span>
          </SectionTitle>

          {/* DATE */}

          <div className="mt-2 flex items-center gap-1.5 text-[9px] text-[#8a8077] sm:text-[10px] md:text-[11px] lg:mt-2.5 lg:text-[12px]">
            <span className="text-[11px] text-[#a71919] md:text-xs">◷</span>

            <span className="truncate">{t(event.dateKey)}</span>
          </div>
        </div>

        {/* ===================================================
            VIEW DETAILS
        =================================================== */}

        <div className="mt-3 flex items-center text-[9px] font-bold text-[#a71919] sm:text-[10px] md:text-[11px] lg:text-xs">
          <span>View Details</span>

          <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
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

function EmptyEvents({ t }: { t: (key: TranslationKey) => string }) {
  return (
    <div className="col-span-full flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#eadbc5] bg-[#fffdf8] px-6 py-12 text-center shadow-[0_5px_20px_rgba(79,43,14,0.04)] sm:min-h-[300px] lg:min-h-[340px]">
      {/* ICON */}

      <div className="mb-4 grid h-[68px] w-[68px] place-items-center rounded-full border border-[#e5cfaa] bg-[#fff7e9] text-3xl shadow-sm sm:h-[72px] sm:w-[72px] sm:text-4xl">
        🛕
      </div>

      {/* TITLE */}

      <h2 className="text-xl text-[#641010] md:text-2xl">{t("past")}</h2>

      {/* DESCRIPTION */}

      <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#8a8077] md:text-sm">
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
    <div className="mx-auto mt-8 flex max-w-[520px] items-center justify-center gap-2 px-6 text-[#c99435] md:mt-10">
      {/* LEFT LINE */}

      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8b66c]" />

      {/* CENTER */}

      <span className="whitespace-nowrap text-xs tracking-[2px]">❧ ❧ ❧</span>

      {/* RIGHT LINE */}

      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8b66c]" />
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

  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0,#fffaf0_42%,#f6ead5_100%)] text-[#4b4039] pb-[calc(35px+env(safe-area-inset-bottom))] lg:min-h-screen lg:bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.12),transparent_30%),#fff9ed] lg:pb-16">
      {/* HEADER */}
      <CommonHeader
        title={t("events")}
        subtitle={t("haveliName")}
        backHref="/dashboard"
      />

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1420px] px-4 sm:px-6 md:px-8 lg:px-10">
        {/* ===================================================
            HERO
        =================================================== */}

        {/* ===================================================
            TABS
        =================================================== */}

        <div className="mx-auto mt-5 grid w-full max-w-[520px] grid-cols-2 gap-1 rounded-xl border border-[#eadbc5] bg-[#fffdf8] p-1 shadow-[0_4px_15px_rgba(82,48,18,0.04)] md:mt-7">
          {(["upcoming", "past"] as EventTab[]).map((item) => {
            const active = tab === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                aria-pressed={active}
                className={`h-10 rounded-lg text-xs font-bold transition-all duration-200 sm:h-11 sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#a71919]/20 ${active ? "bg-[#a71919] text-white shadow-[0_4px_12px_rgba(167,25,25,0.18)]" : "text-[#776d65] hover:bg-[#fff1e7] hover:text-[#a71919]"}`}
              >
                {t(item)}
              </button>
            );
          })}
        </div>

        {/* ===================================================
            EVENTS GRID

            MOBILE      = 1 COLUMN
            TABLET      = 2 COLUMNS
            LAPTOP      = 3 COLUMNS
            SMART/2XL   = 4 COLUMNS
        =================================================== */}

        <section className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:mt-7 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4 2xl:gap-7">
          {tab === "upcoming" ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                t={t}
                onClick={() => router.push(`/events/${event.id}`)}
              />
            ))
          ) : (
            <EmptyEvents t={t} />
          )}
        </section>

        {/* ===================================================
            BOTTOM DECORATION
        =================================================== */}

        <Decoration />
      </div>
    </main>
  );
}
