"use client";

import { useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageProvider";
import { useDarshanTimings } from "@/hooks/temple/darshan-timings/useDarshanTimings";
import { format12Hour, parseTimeParts } from "@/utils/time";
import type { TranslationKey } from "@/utils/i18n";
import TempleLoader from "@/components/common/TempleLoader";

type DarshanStatus = "completed" | "openNow" | "upcoming";

interface UnifiedDarshanItem {
  id?: number | string;
  title: string;
  timeDisplay: string;
  hour: number;
  minute: number;
  endHour?: number;
  endMinute?: number;
  image: string;
}

const getMinutes = (hour: number, minute: number) => hour * 60 + minute;

/* ---------------------------------------
   STATUS HELPER
---------------------------------------- */

const getDarshanStatus = (
  darshan: UnifiedDarshanItem,
  currentTime: Date | null,
): DarshanStatus => {
  if (!currentTime) return "upcoming";

  const currentMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  const startMinutes = getMinutes(darshan.hour, darshan.minute);
  const endMinutes =
    darshan.endHour !== undefined && darshan.endMinute !== undefined
      ? getMinutes(darshan.endHour, darshan.endMinute)
      : startMinutes + 30;

  if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
    return "openNow";
  }

  if (currentMinutes >= endMinutes) {
    return "completed";
  }

  return "upcoming";
};

/* ---------------------------------------
   CURRENT / NEXT DARSHAN
---------------------------------------- */

const getCurrentDarshan = (
  items: UnifiedDarshanItem[],
  currentTime: Date | null,
) => {
  if (!items.length) return null;
  if (!currentTime) return items[0];

  const currentMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  const openNow = items.find((item) => {
    const start = getMinutes(item.hour, item.minute);
    const end =
      item.endHour !== undefined && item.endMinute !== undefined
        ? getMinutes(item.endHour, item.endMinute)
        : start + 30;

    return currentMinutes >= start && currentMinutes < end;
  });

  if (openNow) return openNow;

  const nextUpcoming = items.find((item) => {
    const start = getMinutes(item.hour, item.minute);
    return currentMinutes < start;
  });

  return nextUpcoming || items[0];
};

/* ---------------------------------------
   STATUS BADGE
---------------------------------------- */

function StatusBadge({
  status,
  t,
}: {
  status: DarshanStatus;
  t: (key: TranslationKey) => string;
}) {
  const styles: Record<DarshanStatus, string> = {
    openNow: "bg-emerald-50 text-emerald-700 border-emerald-200",
    upcoming: "bg-amber-50 text-amber-700 border-amber-200",
    completed: "bg-stone-100 text-stone-500 border-stone-200",
  };

  const labels: Record<DarshanStatus, string> = {
    openNow: t("openNow"),
    upcoming: t("upcoming"),
    completed: t("completed"),
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

/* ---------------------------------------
   IMAGE COMPONENT
---------------------------------------- */

function DarshanImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#eadcc5] bg-[#fffaf0] sm:h-16 sm:w-16">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}

export default function DarshanTimings() {
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Hook to fetch darshan timings from API
  const { data: apiData, isLoading: apiLoading } = useDarshanTimings();

  /* ---------------------------------------
     UNIFY DATA (API only)
  ---------------------------------------- */
  const darshanList = useMemo<UnifiedDarshanItem[]>(() => {
    if (apiData && apiData.length > 0) {
      return apiData.map((item) => {
        const startParts = parseTimeParts(item.startTime);
        const endParts = item.endTime ? parseTimeParts(item.endTime) : undefined;
        const timeDisplay = item.endTime
          ? `${format12Hour(item.startTime)} - ${format12Hour(item.endTime)}`
          : format12Hour(item.startTime);

        return {
          id: item.id,
          title: item.title,
          timeDisplay,
          hour: startParts.hour,
          minute: startParts.minute,
          endHour: endParts?.hour,
          endMinute: endParts?.minute,
          image: item.imageUrl || "/images/mangala.jpg",
        };
      });
    }

    return [];
  }, [apiData]);

  /* ---------------------------------------
     LIVE CLOCK
  ---------------------------------------- */

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const currentDarshan = getCurrentDarshan(darshanList, currentTime);

  /* ---------------------------------------
     LANGUAGE / DATE
  ---------------------------------------- */

  const locale =
    language === "hi" ? "hi-IN" : language === "gu" ? "gu-IN" : "en-IN";

  const currentDate = currentTime
    ? currentTime.toLocaleDateString(locale, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const currentFormattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "--:--:--";

  if (apiLoading) {
    return <TempleLoader message="Fetching Sacred Darshan Timings..." fullScreen />;
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 pt-4 pb-5 text-[#40372f] sm:px-6 lg:ml-[92px] lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* ---------------------------------------
           RESPONSIVE DARSHAN HEADER
        ---------------------------------------- */}

        {currentDarshan && (
          <section className="mt-1 mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[#eadcc5] bg-white px-3 py-3 shadow-sm sm:gap-4 sm:p-4 lg:mt-6 lg:mb-6">
            {/* CONTENT */}

            <div className="min-w-0 flex-1">
              {/* DARSHAN NAME */}

              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-base font-bold text-[#8c1717] sm:text-xl lg:text-2xl">
                  {currentDarshan.title}
                </h1>

                <StatusBadge
                  status={getDarshanStatus(currentDarshan, currentTime)}
                  t={t}
                />
              </div>

              {/* DATE */}

              <p className="mt-1 truncate text-xs text-[#7d6e63] sm:text-sm">
                {currentDate}
              </p>

              {/* TIMINGS */}

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#52443a] sm:text-sm">
                <span>
                  Darshan: <strong>{currentDarshan.timeDisplay}</strong>
                </span>

                <span>•</span>

                <span>
                  Current: <strong>{currentFormattedTime}</strong>
                </span>
              </div>
            </div>

            {/* CURRENT DARSHAN IMAGE */}

            <DarshanImage
              src={currentDarshan.image}
              alt={currentDarshan.title}
            />
          </section>
        )}

        {/* ---------------------------------------
           SUMMARY CHIPS
        ---------------------------------------- */}

        <section className="mb-4 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">
          <div className="rounded-xl border border-[#eadcc5] bg-white p-2.5 text-center sm:p-3">
            <span className="block text-[11px] text-[#7d6e63] sm:text-xs">
              Total Darshans
            </span>
            <strong className="text-sm font-bold text-[#40342c] sm:text-lg">
              {darshanList.length}
            </strong>
          </div>

          <div className="rounded-xl border border-[#eadcc5] bg-white p-2.5 text-center sm:p-3">
            <span className="block text-[11px] text-[#7d6e63] sm:text-xs">
              {t("completed")}
            </span>
            <strong className="text-sm font-bold text-stone-600 sm:text-lg">
              {
                darshanList.filter(
                  (item) =>
                    getDarshanStatus(item, currentTime) === "completed",
                ).length
              }
            </strong>
          </div>

          <div className="rounded-xl border border-[#eadcc5] bg-white p-2.5 text-center sm:p-3">
            <span className="block text-[11px] text-[#7d6e63] sm:text-xs">
              Remaining
            </span>
            <strong className="text-sm font-bold text-amber-700 sm:text-lg">
              {
                darshanList.filter(
                  (item) => getDarshanStatus(item, currentTime) !== "completed",
                ).length
              }
            </strong>
          </div>
        </section>

        {/* ---------------------------------------
           DARSHAN CARDS
        ---------------------------------------- */}

        <section className="space-y-3">
          {darshanList.length === 0 ? (
            <div className="rounded-2xl border border-[#eadbc5] bg-white p-8 text-center shadow-sm">
              <span className="text-3xl">🛕</span>
              <h2 className="mt-2 text-base font-bold text-[#641010]">No Darshan Timings Scheduled</h2>
              <p className="mt-1 text-xs text-[#8a8077]">Please check back soon for the updated schedule.</p>
            </div>
          ) : (
            darshanList.map((darshan, index) => {
              const status = getDarshanStatus(darshan, currentTime);
              const isCurrent = currentDarshan?.id === darshan.id;

              return (
                <article
                  key={darshan.id ?? index}
                  className={`flex items-center gap-3 rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md sm:gap-4 sm:p-4 ${
                    isCurrent
                      ? "border-[#c99435] ring-2 ring-[#c99435]/20"
                      : "border-[#eadcc5]"
                  }`}
                >
                  {/* ---------------------------------------
                     IMAGE
                  ---------------------------------------- */}

                  <DarshanImage src={darshan.image} alt={darshan.title} />

                  {/* ---------------------------------------
                     DETAILS
                  ---------------------------------------- */}

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-wider text-[#c99435]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {isCurrent && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          LIVE
                        </span>
                      )}
                    </div>

                    <h2 className="truncate text-base font-bold text-[#40342c] sm:text-lg">
                      {darshan.title}
                    </h2>

                    <p className="mt-1 truncate text-xs text-[#938476]">
                      {status === "openNow"
                        ? t("darshanLiveNow")
                        : status === "completed"
                          ? t("darshanCompleted")
                          : t("darshanUpcoming")}
                    </p>
                  </div>

                  {/* ---------------------------------------
                     TIME + STATUS
                  ---------------------------------------- */}

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <time className="text-xs font-bold text-[#40342c] sm:text-sm">
                      {darshan.timeDisplay}
                    </time>

                    <StatusBadge status={status} t={t} />
                  </div>
                </article>
              );
            })
          )}
        </section>

        {/* ---------------------------------------
           FOOTER
        ---------------------------------------- */}

        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d8b66c] sm:w-20" />

          <span className="text-lg text-[#c99435]">ॐ</span>

          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d8b66c] sm:w-20" />
        </div>
      </div>
    </main>
  );
}
