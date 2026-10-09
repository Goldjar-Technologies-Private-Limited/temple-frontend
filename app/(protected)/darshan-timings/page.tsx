"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/contexts/LanguageProvider";
import type { TranslationKey } from "@/utils/i18n";
import HomeHeader from "@/components/Header";

type DarshanStatus = "completed" | "openNow" | "upcoming";

type DarshanItem = {
  nameKey: TranslationKey;
  time: string;
  hour: number;
  minute: number;
  image: string;
};

const DARSHANS: DarshanItem[] = [
  {
    nameKey: "mangala",
    time: "05:30 AM",
    hour: 5,
    minute: 30,
    image: "/images/mangala1.jpg",
  },
  {
    nameKey: "shringar",
    time: "07:30 AM",
    hour: 7,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "gwal",
    time: "09:00 AM",
    hour: 9,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "rajbhog",
    time: "12:15 PM",
    hour: 12,
    minute: 15,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "utthapan",
    time: "04:00 PM",
    hour: 16,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "bhog",
    time: "06:00 PM",
    hour: 18,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "sandhyaAarti",
    time: "07:30 PM",
    hour: 19,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shayan",
    time: "09:00 PM",
    hour: 21,
    minute: 0,
    image: "/images/mangala.jpg",
  },
];

const getMinutes = (hour: number, minute: number) => hour * 60 + minute;

function getStatus(index: number, currentTime: Date | null): DarshanStatus {
  if (!currentTime) return "upcoming";

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const currentDarshan = DARSHANS[index];

  const startTime = getMinutes(currentDarshan.hour, currentDarshan.minute);

  const nextDarshan = DARSHANS[index + 1];

  if (currentMinutes < startTime) {
    return "upcoming";
  }

  if (!nextDarshan) {
    return "openNow";
  }

  const nextTime = getMinutes(nextDarshan.hour, nextDarshan.minute);

  return currentMinutes < nextTime ? "openNow" : "completed";
}

function getCurrentDarshan(currentTime: Date | null): DarshanItem | null {
  if (!currentTime) return null;

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  for (let i = DARSHANS.length - 1; i >= 0; i--) {
    const darshan = DARSHANS[i];

    if (currentMinutes >= getMinutes(darshan.hour, darshan.minute)) {
      return darshan;
    }
  }

  return null;
}

function StatusBadge({
  status,
  t,
}: {
  status: DarshanStatus;
  t: ReturnType<typeof useLanguage>["t"];
}) {
  const styles = {
    completed: "border-gray-200 bg-gray-100 text-gray-500",

    openNow: "border-emerald-200 bg-emerald-50 text-emerald-700",

    upcoming: "border-amber-200 bg-amber-50 text-amber-700",
  };

  const labels = {
    completed: t("completed"),
    openNow: t("openNow"),
    upcoming: t("upcoming"),
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status === "openNow" && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
      )}

      {labels[status]}
    </span>
  );
}

/* ---------------------------------------
   PROFILE STYLE IMAGE
---------------------------------------- */

function ProfileImage({
  src,
  alt,
  size = "normal",
}: {
  src: string;
  alt: string;
  size?: "normal" | "large";
}) {
  const sizeClass =
    size === "large" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-16 w-16";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-[#dfc38d] bg-[#fffaf0] shadow-sm ${sizeClass}`}
    >
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

  const currentDarshan = getCurrentDarshan(currentTime);

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

  return (
    <main
      className="
    min-h-screen
    bg-[#fffaf0]
    px-4
    pt-0
    pb-5
    text-[#40372f]

    sm:px-6
    lg:ml-[92px]
    lg:px-10
  "
    >
      <div className="mx-auto max-w-7xl ">
        {/* ---------------------------------------
           COMMON HEADER
        ---------------------------------------- */}

        <HomeHeader />

        {/* ---------------------------------------
           RESPONSIVE DARSHAN HEADER
        ---------------------------------------- */}

        <section
          className="
    mt-1
    mb-4

    flex
    items-center
    justify-between
    gap-3

    rounded-2xl
    border
    border-[#eadcc5]
    bg-white

    px-3
    py-3

    shadow-sm

    sm:gap-4
    sm:p-4

    lg:mt-6
    lg:mb-6
  "
        >
          {/* CONTENT */}

          <div className="min-w-0 flex-1">
            {/* DARSHAN NAME */}

            <h1
              className="
        truncate

        font-serif
        text-lg
        font-bold
        leading-tight
        text-[#991919]

        sm:text-xl

        lg:text-2xl
      "
            >
              {currentDarshan ? t(currentDarshan.nameKey) : t("darshan")}
            </h1>

            {/* DATE */}

            <p
              className="
        mt-1
        truncate

        text-[11px]
        text-[#938476]

        sm:text-xs

        lg:text-sm
      "
            >
              {currentDate}
            </p>

            {/* LIVE CLOCK */}

            <div
              className="
        mt-1.5

        inline-flex
        items-center
        gap-1.5

        px-0
        py-0

        text-[11px]
        font-medium
        text-[#6d5b49]

        sm:mt-2
        sm:text-xs

        lg:text-sm
      "
            >
              <span
                className="
          h-1.5
          w-1.5

          animate-pulse
          rounded-full
          bg-emerald-500

          sm:h-2
          sm:w-2
        "
              />

              {currentFormattedTime}
            </div>
          </div>

          {/* CURRENT DARSHAN IMAGE */}

          {currentDarshan && (
            <ProfileImage
              src={currentDarshan.image}
              alt={t(currentDarshan.nameKey)}
              size="normal"
            />
          )}
        </section>

        {/* ---------------------------------------
           TITLE
        ---------------------------------------- */}

        <div
          className="
            mb-5
            flex
            items-center
            gap-3

            sm:gap-4
          "
        >
          <div className="h-px flex-1 bg-[#e3cfaa]" />

          <div className="shrink-0 text-center">
            <p
              className="
                font-serif
                text-lg
                font-semibold
                text-[#991919]

                sm:text-xl
              "
            >
              {t("darshan")}
            </p>

            <span className="text-xs text-[#b18a4d]">Daily Timings</span>
          </div>

          <div className="h-px flex-1 bg-[#e3cfaa]" />
        </div>

        {/* ---------------------------------------
           DARSHAN CARDS
        ---------------------------------------- */}

        <section
          className="
            grid
            gap-4

            md:grid-cols-2
          "
        >
          {DARSHANS.map((darshan, index) => {
            const status = getStatus(index, currentTime);

            const isCurrent = status === "openNow";

            return (
              <article
                key={darshan.nameKey}
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  bg-white
                  p-3
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-lg

                  sm:gap-4
                  sm:p-4

                  ${
                    isCurrent
                      ? "border-emerald-200 bg-gradient-to-r from-emerald-50/70 to-white"
                      : "border-[#eadcc5]"
                  }
                `}
              >
                {/* ---------------------------------------
                   PROFILE IMAGE
                ---------------------------------------- */}

                <ProfileImage src={darshan.image} alt={t(darshan.nameKey)} />

                {/* ---------------------------------------
                   DETAILS
                ---------------------------------------- */}

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className="
                        text-[11px]
                        font-semibold
                        tracking-wider
                        text-[#c99435]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {isCurrent && (
                      <span
                        className="
                          rounded-full
                          bg-emerald-100
                          px-2
                          py-0.5
                          text-[10px]
                          font-bold
                          text-emerald-700
                        "
                      >
                        LIVE
                      </span>
                    )}
                  </div>

                  <h2
                    className="
                      truncate
                      font-serif
                      text-base
                      font-bold
                      text-[#40342c]

                      sm:text-lg
                    "
                  >
                    {t(darshan.nameKey)}
                  </h2>

                  <p
                    className="
                      mt-1
                      truncate
                      text-xs
                      text-[#938476]
                    "
                  >
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

                <div
                  className="
                    flex
                    shrink-0
                    flex-col
                    items-end
                    gap-2
                  "
                >
                  <time
                    className="
                      text-xs
                      font-bold
                      text-[#40342c]

                      sm:text-sm
                    "
                  >
                    {darshan.time}
                  </time>

                  <StatusBadge status={status} t={t} />
                </div>
              </article>
            );
          })}
        </section>

        {/* ---------------------------------------
           FOOTER
        ---------------------------------------- */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-3

            sm:gap-4
          "
        >
          <div
            className="
              h-px
              w-12
              bg-gradient-to-r
              from-transparent
              to-[#d8b66c]

              sm:w-20
            "
          />

          <span
            className="
              font-serif
              text-lg
              text-[#c99435]
            "
          >
            ॐ
          </span>

          <div
            className="
              h-px
              w-12
              bg-gradient-to-l
              from-transparent
              to-[#d8b66c]

              sm:w-20
            "
          />
        </div>
      </div>
    </main>
  );
}
