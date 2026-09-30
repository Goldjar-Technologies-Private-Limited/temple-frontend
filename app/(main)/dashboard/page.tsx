"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  HeartHandshake,
  Gift,
  Play,
  Utensils,
  Grid2X2,
  Video,
} from "lucide-react";

import { GiCow } from "react-icons/gi";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";
import HomeHeader from "@/app/components/Header";

/* =========================================================
   TYPES
========================================================= */

type ProfileData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  image: string;
};

type DarshanItem = {
  nameKey: TranslationKey;
  hour: number;
  minute: number;
  image: string;
};

type ActionItem = {
  key: string;
  icon: keyof typeof iconMap;
  labels: [TranslationKey, TranslationKey?];
  route?: string;
};

/* =========================================================
   DARSHAN SCHEDULE
========================================================= */

const DARSHAN_SCHEDULE: DarshanItem[] = [
  {
    nameKey: "mangala",
    hour: 5,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shringar",
    hour: 7,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "gwal",
    hour: 9,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "rajbhog",
    hour: 12,
    minute: 15,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "utthapan",
    hour: 16,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "bhog",
    hour: 18,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "sandhyaAarti",
    hour: 19,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shayan",
    hour: 21,
    minute: 0,
    image: "/images/mangala.jpg",
  },
];

/* =========================================================
   ICONS
========================================================= */

const iconMap = {
  headset: Video,
  seva: HeartHandshake,
  cow: GiCow,
  gift: Gift,
  play: Play,
  food: Utensils,
  grid: Grid2X2,
};

/* =========================================================
   ACTION ITEMS
========================================================= */

const ACTION_ITEMS: ActionItem[] = [
  {
    key: "live",
    icon: "headset",
    labels: ["liveDarshan", "darshan"],
    route: "/live-darshan",
  },
  {
    key: "seva",
    icon: "seva",
    labels: ["seva", "donation"],
    route: "/seva-donation",
  },
 
  {
    key: "darshan",
    icon: "gift",
    labels: ["darshan", "darshanTimings"],
    route: "/darshan-timings",
  },
  {
    key: "events",
    icon: "gift",
    labels: ["events"],
    route: "/events",
  },
  {
    key: "reels",
    icon: "play",
    labels: ["reelsBhakti"],
    route: "/reels",
  },
  {
    key: "prasadam",
    icon: "food",
    labels: ["prasadam"],
    route: "/prasadam",
  },
  {
    key: "more",
    icon: "grid",
    labels: ["more"],
  },
];

/* =========================================================
   ICON COMPONENT
========================================================= */

function ActionIcon({
  name,
}: {
  name: keyof typeof iconMap;
}) {
  const IconComponent = iconMap[name];

  return (
    <IconComponent
      size={25}
      strokeWidth={1.8}
    />
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getMinutesFromMidnight(
  hour: number,
  minute: number,
) {
  return hour * 60 + minute;
}

function getNextDarshan(
  currentTime: Date | null,
): DarshanItem {
  if (!currentTime) {
    return DARSHAN_SCHEDULE[0];
  }

  const currentMinutes =
    currentTime.getHours() * 60 +
    currentTime.getMinutes();

  return (
    DARSHAN_SCHEDULE.find(
      (darshan) =>
        getMinutesFromMidnight(
          darshan.hour,
          darshan.minute,
        ) > currentMinutes,
    ) ?? DARSHAN_SCHEDULE[0]
  );
}

function getCountdown(
  darshan: DarshanItem,
  currentTime: Date | null,
) {
  if (!currentTime) {
    return "--:--:--";
  }

  const target = new Date(currentTime);

  target.setHours(
    darshan.hour,
    darshan.minute,
    0,
    0,
  );

  const currentMinutes =
    currentTime.getHours() * 60 +
    currentTime.getMinutes();

  const darshanMinutes = getMinutesFromMidnight(
    darshan.hour,
    darshan.minute,
  );

  if (darshanMinutes <= currentMinutes) {
    target.setDate(target.getDate() + 1);
  }

  const totalSeconds = Math.max(
    0,
    Math.floor(
      (target.getTime() -
        currentTime.getTime()) /
        1000,
    ),
  );

  const hours = Math.floor(
    totalSeconds / 3600,
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60,
  );

  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) =>
      String(value).padStart(2, "0"),
    )
    .join(":");
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  const router = useRouter();
  const { t } = useLanguage();

  const [profileName, setProfileName] =
    useState("");

  const [currentTime, setCurrentTime] =
    useState<Date | null>(null);

  /* =======================================================
     LOAD PROFILE
  ======================================================= */

  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile =
          localStorage.getItem(
            "profile-data",
          );

        if (!storedProfile) {
          setProfileName("");
          return;
        }

        const profile =
          JSON.parse(
            storedProfile,
          ) as Partial<ProfileData>;

        setProfileName(
          profile.name?.trim() || "",
        );
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error,
        );

        setProfileName("");
      }
    };

    loadProfile();

    window.addEventListener(
      "profile-updated",
      loadProfile,
    );

    return () => {
      window.removeEventListener(
        "profile-updated",
        loadProfile,
      );
    };
  }, []);

  /* =======================================================
     LIVE CLOCK
  ======================================================= */

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();

    const timer = window.setInterval(
      updateTime,
      1000,
    );

    return () =>
      window.clearInterval(timer);
  }, []);

  /* =======================================================
     NEXT DARSHAN
  ======================================================= */

  const nextDarshan = getNextDarshan(
    currentTime,
  );

  const countdown = getCountdown(
    nextDarshan,
    currentTime,
  );

  /* =======================================================
     ACTION HANDLER
  ======================================================= */

  const handleAction = (
    route?: string,
  ) => {
    if (!route) return;

    router.push(route);
  };

  /* =======================================================
     CURRENT TIME
  ======================================================= */

  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        },
      )
    : "--:--:--";

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="
        min-h-[100dvh]
        w-full
        overflow-x-hidden

        bg-[#fffaf0]

        px-3
        pb-[84px]
        pt-2

        text-[#40372f]

        sm:px-4
        sm:pt-3

        md:px-6
        md:pt-4

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:px-8
        lg:pb-10
        lg:pt-5

        xl:px-10
        2xl:px-12
      "
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <HomeHeader />

        {/* =================================================
            LIVE DARSHAN
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            router.push("/live-darshan")
          }
          className="
            relative
            mt-2
            block
            h-[170px]
            w-full
            overflow-hidden
            rounded-[13px]

            bg-[#e8d8bc]

            p-0
            text-left

            shadow-[0_5px_18px_rgba(86,47,20,0.08)]

            sm:h-[220px]
            sm:rounded-2xl

            md:h-[300px]

            lg:mt-5
            lg:h-[clamp(330px,35vw,510px)]
            lg:rounded-[20px]
          "
        >
          <img
            src="/images/haveli.jpg"
            alt="Shri Govardhannath Haveli"
            className="
              block
              h-full
              w-full
              object-cover
            "
          />

          {/* LIVE OVERLAY */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0

              flex
              min-h-[50px]
              items-end
              justify-between
              gap-3

              bg-[linear-gradient(to_bottom,transparent_0%,rgba(70,15,12,0.40)_25%,rgba(132,19,19,0.96)_100%)]

              px-3
              pb-2.5
              pt-6

              text-white

              lg:min-h-[90px]
              lg:px-6
              lg:pb-5
              lg:pt-10
            "
          >
            <strong
              className="
                text-[13px]

                sm:text-[15px]

                lg:text-xl
              "
            >
              🙏 {t("liveDarshanNow")}
            </strong>

            <span
              className="
                shrink-0

                rounded-md

                bg-[#b51212]

                px-2
                py-1

                text-[9px]
                font-bold

                sm:text-[10px]

                lg:px-3
                lg:py-1.5
                lg:text-xs
              "
            >
              • {t("live")}
            </span>
          </div>
        </button>

        {/* =================================================
            NEXT DARSHAN
        ================================================= */}

        <section
          className="
            mt-3

            flex
            min-h-[110px]
            w-full
            items-center
            justify-between
            gap-3

            rounded-xl

            border
            border-[#eadbc5]

            bg-[#fffdf8]

            px-3
            py-3

            shadow-[0_2px_8px_rgba(100,60,10,0.03)]

            sm:gap-4
            sm:px-4

            md:px-5
            md:py-4

            lg:mt-4
            lg:min-h-[145px]
            lg:px-6
            lg:py-5

            xl:min-h-[155px]
          "
        >
          {/* LEFT */}

          <div
            className="
              flex
              min-w-0
              flex-1
              items-center
              gap-3

              sm:gap-4
            "
          >
            {/* DARSHAN IMAGE */}

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                overflow-hidden

                rounded-full

                border
                border-[#d8bd83]

                bg-[#fff8e9]

                p-[3px]

                shadow-[0_3px_10px_rgba(100,60,10,0.10)]

                sm:h-14
                sm:w-14

                md:h-16
                md:w-16

                lg:h-[72px]
                lg:w-[72px]

                xl:h-[78px]
                xl:w-[78px]
              "
            >
              <img
                src={nextDarshan.image}
                alt={t(
                  nextDarshan.nameKey,
                )}
                className="
                  block
                  h-full
                  w-full

                  rounded-full

                  object-contain
                  object-center
                "
              />
            </div>

            {/* DARSHAN INFO */}

            <div className="min-w-0">
              <h2
                className="
                  mb-1.5

                  font-serif
                  text-base
                  font-bold
                  text-[#40372f]

                  sm:text-lg

                  lg:text-[22px]
                "
              >
                {t("nextDarshan")}
              </h2>

              <strong
                className="
                  block
                  truncate

                  text-[12px]

                  sm:text-sm

                  lg:text-base
                "
              >
                {t(nextDarshan.nameKey)}
              </strong>

              <span
                className="
                  mt-1
                  block

                  text-[9px]
                  text-[#81766d]

                  sm:text-[10px]

                  lg:text-xs
                "
              >
                {t("today")}
              </span>
            </div>
          </div>

          {/* RIGHT / COUNTDOWN */}

          <div
            className="
              w-[125px]
              shrink-0
              text-right

              sm:w-[150px]

              md:w-[190px]

              lg:w-[240px]
            "
          >
            {/* CURRENT TIME */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-2

                text-[9px]

                sm:text-[10px]

                lg:text-xs
              "
            >
              <strong>
                {t(nextDarshan.nameKey)}
              </strong>

              <span>
                {formattedTime}
              </span>
            </div>

            {/* COUNTDOWN */}

            <div
              className="
                my-1.5
                ml-auto
                w-fit

                rounded

                bg-[#dff0df]

                px-2.5
                py-1

                text-[12px]
                font-bold
                tracking-wide
                text-[#47784e]

                sm:text-[13px]

                lg:my-2
                lg:px-3
                lg:py-1.5
                lg:text-base
              "
            >
              {countdown}
            </div>

            {/* SCHEDULE */}

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/darshan-timings",
                )
              }
              className="
                border-0
                bg-transparent
                p-0

                text-[9px]
                font-semibold
                text-[#a71919]

                hover:underline

                sm:text-[10px]

                lg:text-xs
              "
            >
              {t("viewSchedule")} ›
            </button>
          </div>
        </section>

        {/* =================================================
            ACTION CARDS
        ================================================= */}

        <section
          className="
            mt-3

            grid
            w-full
            grid-cols-4
            gap-2

            sm:gap-3

            md:gap-3.5

            lg:mt-5
            lg:gap-4

            xl:gap-5
          "
        >
          {ACTION_ITEMS.map((item) => {
            const IconComponent =
              iconMap[item.icon];

            return (
              <button
                key={item.key}
                type="button"
                disabled={!item.route}
                onClick={() =>
                  handleAction(
                    item.route,
                  )
                }
                className="
                  group

                  flex
                  h-[78px]
                  min-w-0
                  flex-col
                  items-center
                  justify-center

                  rounded-[10px]

                  border
                  border-[#efdfc9]

                  bg-[#fffdf9]

                  px-1
                  py-2

                  text-[#a71919]

                  shadow-[0_2px_8px_rgba(100,60,10,0.04)]

                  transition-all
                  duration-200

                  active:scale-[0.97]

                  disabled:cursor-default

                  sm:h-[90px]

                  md:h-[100px]

                  lg:h-[120px]
                  lg:rounded-[14px]

                  lg:hover:-translate-y-1
                  lg:hover:border-[#d7b879]
                  lg:hover:shadow-[0_10px_25px_rgba(90,50,20,0.10)]

                  xl:h-[128px]
                "
              >
                {/* ICON */}

                <span
                  className="
                    grid
                    h-7
                    place-items-center

                    transition-transform
                    duration-200

                    group-hover:scale-110

                    sm:h-8

                    lg:h-9
                  "
                >
                  <IconComponent
                    size={25}
                    strokeWidth={1.8}
                  />
                </span>

                {/* LABEL */}

                <span
                  className="
                    mt-1.5
                    min-w-0

                    text-center
                    text-[9px]
                    leading-[1.2]
                    text-[#4d453e]

                    sm:text-[10px]

                    md:text-[11px]

                    lg:mt-2
                    lg:text-xs
                  "
                >
                  <strong className="block font-semibold">
                    {t(item.labels[0])}
                  </strong>

                  {item.labels[1] && (
                    <strong className="block font-semibold">
                      {t(item.labels[1])}
                    </strong>
                  )}
                </span>
              </button>
            );
          })}
        </section>

        {/* =================================================
            DECORATION
        ================================================= */}

        <div
          className="
            flex
            h-12
            items-center
            justify-center
            overflow-hidden

            text-[24px]
            tracking-[6px]

            text-[#c99435]

            opacity-30

            lg:h-16
            lg:text-[30px]
          "
        >
          ❧ ❧ ❧ ❧ ❧
        </div>
      </div>
    </main>
  );
}