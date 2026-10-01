"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

type EventTab = "upcoming" | "past";

type EventItem = {
  id: string;
  titleKey: TranslationKey;
  dateKey: TranslationKey;
  image: string;
};

const events: EventItem[] = [
  {
    id: "janmashtami-utsav",
    titleKey: "janmashtamiUtsav",
    dateKey: "janmashtamiDate",
    image: "/images/janmashtami.jpg",
  },
  {
    id: "annakut-mahotsav",
    titleKey: "annakutMahotsav",
    dateKey: "annakutEventDate",
    image: "/images/annakut-event.jpg",
  },
  {
    id: "sharad-purnima",
    titleKey: "sharadPurnima",
    dateKey: "sharadPurnimaDate",
    image: "/images/sharad-purnima.jpg",
  },
  {
    id: "haveli-sangeet",
    titleKey: "haveliSangeet",
    dateKey: "haveliSangeetDate",
    image: "/images/haveli-sangeet.jpg",
  },
];

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-[#641010]">{children}</h2>;
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
      className="
        group relative flex w-full overflow-hidden
        rounded-2xl border border-[#eadbc5]
        bg-[#fffdf8]
        text-left text-[#4b4039]

        shadow-[0_5px_20px_rgba(79,43,14,0.05)]

        transition-all duration-300

        hover:-translate-y-1
        hover:border-[#d7b97f]
        hover:shadow-[0_14px_35px_rgba(79,43,14,0.11)]

        focus:outline-none
        focus:ring-2
        focus:ring-[#a71919]/30

        active:scale-[0.99]

        flex-row
        min-h-[115px]

        sm:min-h-[130px]

        md:min-h-[145px]

        lg:min-h-[300px]
        lg:flex-col

        xl:min-h-[320px]

        2xl:min-h-[340px]
      "
    >
      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div
        className="
          relative
          shrink-0
          overflow-hidden
          bg-[#f4e5c8]

          h-auto
          w-[38%]

          sm:w-[40%]

          md:w-[38%]

          lg:h-[185px]
          lg:w-full

          xl:h-[195px]

          2xl:h-[205px]
        "
      >
        <img
          src={event.image}
          alt={t(event.titleKey)}
          className="
            block
            h-full
            w-full
            object-cover

            transition-transform
            duration-500

            group-hover:scale-105
          "
        />

        {/* IMAGE OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
            opacity-70
          "
        />

        {/* UTSAV BADGE */}

        <span
          className="
            absolute
            left-2
            top-2

            rounded-full
            bg-white/95

            px-2
            py-1

            text-[8px]
            font-bold
            uppercase
            tracking-[1px]

            text-[#a71919]

            shadow-sm
            backdrop-blur-sm

            sm:left-3
            sm:top-3
            sm:px-2.5
            sm:py-1

            sm:text-[9px]

            lg:text-[10px]
          "
        >
          Utsav
        </span>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          justify-between

          p-3

          sm:p-3.5

          md:p-4

          lg:p-5

          xl:p-5

          2xl:p-5
        "
      >
        <div>
          {/* LABEL */}

          <span
            className="
              mb-1.5
              block

              text-[8px]
              font-bold
              uppercase
              tracking-[1.1px]

              text-[#c99435]

              sm:text-[9px]

              md:text-[10px]
            "
          >
            Upcoming Event
          </span>

          {/* TITLE */}

          <SectionTitle>
            <span
              className="
                block

                text-[14px]
                font-semibold
                leading-[1.3]

                sm:text-[16px]

                md:text-[18px]

                lg:text-[20px]

                xl:text-[21px]

                2xl:text-[22px]
              "
            >
              {t(event.titleKey)}
            </span>
          </SectionTitle>

          {/* DATE */}

          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5

              text-[9px]
              text-[#8a8077]

              sm:text-[10px]

              md:text-[11px]

              lg:mt-2.5
              lg:text-[12px]
            "
          >
            <span
              className="
                text-[11px]
                text-[#a71919]

                md:text-xs
              "
            >
              ◷
            </span>

            <span className="truncate">{t(event.dateKey)}</span>
          </div>
        </div>

        {/* ===================================================
            VIEW DETAILS
        =================================================== */}

        <div
          className="
            mt-3
            flex
            items-center

            text-[9px]
            font-bold
            text-[#a71919]

            sm:text-[10px]

            md:text-[11px]

            lg:text-xs
          "
        >
          <span>View Details</span>

          <span
            className="
              ml-1

              transition-transform
              duration-300

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

function EmptyEvents({ t }: { t: (key: TranslationKey) => string }) {
  return (
    <div
      className="
        col-span-full

        flex
        min-h-[280px]
        flex-col
        items-center
        justify-center

        rounded-2xl

        border
        border-[#eadbc5]

        bg-[#fffdf8]

        px-6
        py-12

        text-center

        shadow-[0_5px_20px_rgba(79,43,14,0.04)]

        sm:min-h-[300px]

        lg:min-h-[340px]
      "
    >
      {/* ICON */}

      <div
        className="
          mb-4
          grid
          h-[68px]
          w-[68px]
          place-items-center

          rounded-full

          border
          border-[#e5cfaa]

          bg-[#fff7e9]

          text-3xl

          shadow-sm

          sm:h-[72px]
          sm:w-[72px]
          sm:text-4xl
        "
      >
        🛕
      </div>

      {/* TITLE */}

      <h2
        className="
          font-serif
          text-xl
          text-[#641010]

          md:text-2xl
        "
      >
        {t("past")}
      </h2>

      {/* DESCRIPTION */}

      <p
        className="
          mt-2
          max-w-sm

          text-xs
          leading-relaxed

          text-[#8a8077]

          md:text-sm
        "
      >
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
      className="
        mx-auto
        mt-8
        flex
        max-w-[520px]
        items-center
        justify-center
        gap-2
        px-6

        text-[#c99435]

        md:mt-10
      "
    >
      {/* LEFT LINE */}

      <span
        className="
          h-px
          flex-1

          bg-gradient-to-r
          from-transparent
          to-[#d8b66c]
        "
      />

      {/* CENTER */}

      <span
        className="
          whitespace-nowrap
          text-xs
          tracking-[2px]
        "
      >
        ❧ ❧ ❧
      </span>

      {/* RIGHT LINE */}

      <span
        className="
          h-px
          flex-1

          bg-gradient-to-l
          from-transparent
          to-[#d8b66c]
        "
      />
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
    <main
      className="
        min-h-dvh
        w-full
        overflow-x-hidden

        bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0,#fffaf0_42%,#f6ead5_100%)]

        text-[#4b4039]

        pb-[calc(35px+env(safe-area-inset-bottom))]

        lg:min-h-screen

        lg:bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.12),transparent_30%),#fff9ed]

        lg:pb-16
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-30

          border-b
          border-[#eadbc5]

          bg-[#fffdf8]/95

          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            h-[70px]
            max-w-[1420px]
            items-center

            px-4

            sm:px-6

            md:h-[78px]
            md:px-8

            lg:h-[84px]
            lg:px-10
          "
        >
          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() => router.back()}
            aria-label={t("back")}
            className="
              grid
              h-10
              w-10
              shrink-0
              place-items-center

              rounded-full

              border
              border-[#eadbc5]

              bg-white

              text-2xl
              leading-none

              text-[#a71919]

              shadow-[0_3px_12px_rgba(70,40,10,0.06)]

              transition-all

              hover:bg-[#fff5e7]

              active:scale-95

              focus:outline-none
              focus:ring-2
              focus:ring-[#a71919]/20

              md:h-11
              md:w-11
            "
          >
            ‹
          </button>

          {/* HEADER TITLE */}

          <div
            className="
              ml-3
              flex-1
              text-center

              md:ml-4

              lg:text-left
            "
          >
            {/* DESKTOP SMALL TITLE */}

            <span
              className="
                hidden

                text-[10px]
                font-bold
                uppercase
                tracking-[1.5px]

                text-[#9a762f]

                lg:block
              "
            >
              Shri Govardhannath Haveli
            </span>

            {/* MAIN TITLE */}

            <h1
              className="
                font-serif

                text-[24px]
                leading-none

                text-[#641010]

                sm:text-[26px]

                md:text-[29px]

                lg:mt-1
                lg:text-[27px]
              "
            >
              {t("events")}
            </h1>
          </div>

          {/* RIGHT SPACE */}

          <div
            className="
              h-10
              w-10
              shrink-0

              md:h-11
              md:w-11
            "
          />
        </div>
      </header>

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1420px]

          px-4

          sm:px-6

          md:px-8

          lg:px-10
        "
      >
        {/* ===================================================
            HERO
        =================================================== */}

        <section
          className="
            relative
            mt-5
            overflow-hidden

            rounded-2xl

            border
            border-[#eadbc5]

            bg-gradient-to-br
            from-[#fffdf8]
            to-[#fff1dc]

            px-5
            py-6

            shadow-[0_8px_25px_rgba(80,45,15,0.05)]

            sm:mt-6
            sm:px-7
            sm:py-7

            md:px-9
            md:py-8

            lg:mt-8
            lg:rounded-[24px]
            lg:px-10
            lg:py-9
          "
        >
          {/* DECORATIVE CIRCLE */}

          <div
            className="
              pointer-events-none

              absolute
              -right-10
              -top-16

              h-40
              w-40

              rounded-full

              bg-[#c99435]/10

              blur-2xl
            "
          />

          <div
            className="
              relative
              flex
              items-center
              justify-between
              gap-5
            "
          >
            {/* HERO TEXT */}

            <div>
              <span
                className="
                  mb-2
                  block

                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[1.5px]

                  text-[#c99435]

                  md:text-[11px]
                "
              >
                Haveli Utsav
              </span>

              <h2
                className="
                  font-serif

                  text-[28px]
                  leading-tight

                  text-[#641010]

                  sm:text-[32px]

                  md:text-[38px]

                  lg:text-[42px]
                "
              >
                {t("events")}
              </h2>

              <p
                className="
                  mt-2
                  max-w-[600px]

                  text-xs
                  leading-relaxed

                  text-[#776d65]

                  sm:text-sm

                  md:mt-3
                "
              >
                Stay connected with upcoming utsavs, satsang and sacred
                celebrations.
              </p>
            </div>

            {/* TEMPLE ICON */}

            <div
              className="
                hidden

                h-20
                w-20
                shrink-0

                place-items-center

                rounded-full

                border
                border-[#dec182]

                bg-white/80

                text-4xl

                shadow-[0_8px_22px_rgba(96,57,18,0.08)]

                sm:grid

                md:h-24
                md:w-24
                md:text-5xl
              "
            >
              🛕
            </div>
          </div>
        </section>

        {/* ===================================================
            TABS
        =================================================== */}

        <div
          className="
            mx-auto
            mt-5

            grid
            w-full
            max-w-[520px]
            grid-cols-2
            gap-1

            rounded-xl

            border
            border-[#eadbc5]

            bg-[#fffdf8]

            p-1

            shadow-[0_4px_15px_rgba(82,48,18,0.04)]

            md:mt-7
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
                    h-10

                    rounded-lg

                    text-xs
                    font-bold

                    transition-all
                    duration-200

                    sm:h-11
                    sm:text-sm

                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#a71919]/20

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

        {/* ===================================================
            EVENTS GRID

            MOBILE      = 1 COLUMN
            TABLET      = 2 COLUMNS
            LAPTOP      = 3 COLUMNS
            SMART/2XL   = 4 COLUMNS
        =================================================== */}

        <section
          className="
            mt-5

            grid
            grid-cols-1
            gap-4

            sm:mt-6
            sm:grid-cols-2
            sm:gap-5

            lg:mt-7
            lg:grid-cols-2
            lg:gap-6

            xl:grid-cols-3
            xl:gap-6

            2xl:grid-cols-4
            2xl:gap-7
          "
        >
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
