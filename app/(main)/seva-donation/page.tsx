"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";
import BottomNavigation from "@/app/components/navigation/BottomNavigation";

/* ======================================================
   CATEGORY TYPES
====================================================== */

type Category =
  | "all"
  | "popular"
  | "goSeva"
  | "utsav";

/* ======================================================
   CATEGORIES
====================================================== */

const categories: {
  id: Category;
  label: TranslationKey;
}[] = [
  {
    id: "all",
    label: "all",
  },
  {
    id: "popular",
    label: "popular",
  },
  {
    id: "goSeva",
    label: "goSeva",
  },
  {
    id: "utsav",
    label: "utsav",
  },
];

/* ======================================================
   SEVA DATA
====================================================== */

const sevas: {
  id: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  image: string;
  category: Category;
  route: string;
}[] = [
  {
    id: "go-seva",
    titleKey: "goSeva",
    subtitleKey: "careForGauMata",
    image: "/images/go-seva.jpg",
    category: "goSeva",
    route: "/seva/go-seva",
  },
  {
    id: "nitya-bhog",
    titleKey: "nityaBhogSeva",
    subtitleKey: "dailyFoodOffering",
    image: "/images/nitya-bhog.jpg",
    category: "popular",
    route: "/seva/nitya-bhog",
  },
  {
    id: "flower",
    titleKey: "flowerSeva",
    subtitleKey: "templeDecoration",
    image: "/images/flower-seva.jpg",
    category: "popular",
    route: "/seva/flower",
  },
  {
    id: "annakut",
    titleKey: "annakutSeva",
    subtitleKey: "specialUtsavSeva",
    image: "/images/annakut.jpg",
    category: "utsav",
    route: "/seva/annakut",
  },
  {
    id: "temple-maintenance",
    titleKey: "templeMaintenance",
    subtitleKey: "supportTempleServices",
    image: "/images/temple-maintenance.jpg",
    category: "all",
    route: "/seva/temple-maintenance",
  },
];

/* ======================================================
   COMPONENT
====================================================== */

export default function SevaDonation() {
  const router = useRouter();
  const { t } = useLanguage();

  const [category, setCategory] =
    useState<Category>("all");

  /* ====================================================
     FILTER SEVAS
  ==================================================== */

  const filteredSevas =
    category === "all"
      ? sevas
      : sevas.filter(
          (seva) => seva.category === category,
        );

  return (
    <main
      className="
        min-h-[100dvh]
        overflow-x-hidden
        bg-[#fff9ed]
        pb-[105px]
        text-[#4b4039]

        sm:pb-[110px]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      {/* ==================================================
          HEADER
      ================================================== */}

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
            relative
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
          {/* ==================================================
              BACK BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => router.back()}
            aria-label={t("back")}
            className="
              group
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#e7d7c2]
              bg-[#fffdf8]
              text-[#8b251d]
              shadow-[0_3px_12px_rgba(97,45,25,0.05)]
              transition-all
              duration-200
              hover:border-[#cfae83]
              hover:bg-[#fff8ec]
              hover:shadow-[0_5px_16px_rgba(97,45,25,0.08)]
              active:scale-95

              sm:h-10
              sm:w-10
            "
          >
            <span
              className="
                text-[23px]
                font-light
                leading-none
                transition-transform
                duration-200
                group-hover:-translate-x-[1px]

                sm:text-[24px]
              "
            >
              ‹
            </span>
          </button>

          {/* ==================================================
              TITLE AREA
          ================================================== */}

          <div
            className="
              min-w-0
              flex-1
              pl-3

              sm:pl-4
            "
          >
            <p
              className="
                mb-0.5
                truncate
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#b07a26]

                sm:text-[9px]
              "
            >
              SHRI GOVARDHANNATH
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
              {t("sevaDonation")}
            </h1>

            <p
              className="
                mt-0.5
                hidden
                truncate
                text-[10px]
                text-[#8c796c]

                sm:block
                sm:text-[11px]
              "
            >
              Seva and devotional offerings
            </p>
          </div>
        </div>
      </header>

      {/* ==================================================
          PAGE CONTENT
      ================================================== */}

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
        {/* ==================================================
            PAGE INTRO
        ================================================== */}

        <section
          className="
            mb-5
            sm:mb-7
            lg:mb-8
          "
        >
          <p
            className="
              mb-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#b07a26]

              sm:text-[10px]

              lg:text-[11px]
            "
          >
            DEVOTIONAL SERVICES
          </p>

          <h2
            className="
              font-serif
              text-[25px]
              font-bold
              leading-tight
              text-[#641010]

              sm:text-[30px]

              lg:text-[34px]

              xl:text-[36px]
            "
          >
            Seva & Donation
          </h2>

          <p
            className="
              mt-1.5
              max-w-[650px]
              text-[11px]
              leading-5
              text-[#806f63]

              sm:text-xs
              sm:leading-5

              lg:text-sm
              lg:leading-6
            "
          >
            Offer your seva and support the sacred activities
            of Shri Govardhannath Haveli.
          </p>
        </section>

        {/* ==================================================
            CATEGORY TABS
        ================================================== */}

        <section
          className="
            -mx-3
            mb-5
            flex
            items-center
            gap-2
            overflow-x-auto
            px-3
            pb-1

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            sm:mx-0
            sm:mb-7
            sm:justify-start
            sm:gap-2.5
            sm:px-0

            md:gap-3

            lg:mb-8
          "
        >
          {categories.map((item) => {
            const selected =
              category === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() =>
                  setCategory(item.id)
                }
                className={`
                  h-[34px]
                  shrink-0
                  whitespace-nowrap
                  rounded-[10px]
                  border
                  px-4
                  text-[11px]
                  font-semibold
                  transition-all
                  duration-200
                  active:scale-[0.98]

                  sm:h-[38px]
                  sm:px-5
                  sm:text-[12px]

                  lg:h-[40px]
                  lg:px-5

                  ${
                    selected
                      ? "border-[#a71919] bg-[#a71919] text-white shadow-[0_4px_12px_rgba(167,25,25,0.14)]"
                      : "border-[#eadbc5] bg-[#fffdf8] text-[#776d65] hover:border-[#cfae83] hover:bg-[#fff9ef] hover:text-[#8e241d]"
                  }
                `}
              >
                {t(item.label)}
              </button>
            );
          })}
        </section>

        {/* ==================================================
            SEVA CARDS
        ================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2
            sm:gap-4

            lg:grid-cols-2
            lg:gap-5

            xl:gap-5
          "
        >
          {filteredSevas.map((seva) => (
            <button
              type="button"
              key={seva.id}
              onClick={() =>
                router.push(seva.route)
              }
              className="
                group
                flex
                min-h-[96px]
                w-full
                min-w-0
                items-center
                rounded-[15px]
                border
                border-[#eadfd2]
                bg-[#fffdf9]
                p-3
                text-left
                shadow-[0_3px_12px_rgba(97,45,25,0.045)]
                transition-all
                duration-300
                active:scale-[0.99]

                sm:min-h-[112px]
                sm:gap-1
                sm:p-3.5
                sm:rounded-[17px]

                lg:min-h-[132px]
                lg:p-4

                hover:-translate-y-[2px]
                hover:border-[#dfc9ad]
                hover:shadow-[0_12px_35px_rgba(97,45,25,0.08)]
              "
            >
              {/* ==================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  relative
                  h-[72px]
                  w-[86px]
                  shrink-0
                  overflow-hidden
                  rounded-[9px]
                  bg-[#eadbc5]

                  sm:h-[88px]
                  sm:w-[105px]
                  sm:rounded-[10px]

                  lg:h-[100px]
                  lg:w-[120px]
                  lg:rounded-[11px]

                  xl:h-[104px]
                  xl:w-[125px]
                "
              >
                <img
                  src={seva.image}
                  alt={t(seva.titleKey)}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.04]
                  "
                />
              </div>

              {/* ==================================================
                  INFO
              ================================================== */}

              <div
                className="
                  min-w-0
                  flex-1
                  overflow-hidden
                  px-3

                  sm:px-4

                  lg:px-5
                "
              >
                <h2
                  className="
                    truncate
                    font-serif
                    text-[16px]
                    font-bold
                    leading-tight
                    text-[#332820]

                    sm:text-[17px]

                    lg:text-[19px]
                  "
                >
                  {t(seva.titleKey)}
                </h2>

                <p
                  className="
                    mt-1
                    line-clamp-2
                    break-words
                    text-[11px]
                    leading-[18px]
                    text-[#8a8077]

                    sm:text-xs
                    sm:leading-5

                    lg:text-sm
                    lg:leading-5
                  "
                >
                  {t(seva.subtitleKey)}
                </p>
              </div>

              {/* ==================================================
                  ARROW
              ================================================== */}

              <span
                className="
                  flex
                  h-8
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  text-[25px]
                  font-light
                  leading-none
                  text-[#d3832d]
                  transition-transform
                  duration-200
                  group-hover:translate-x-1

                  sm:h-9
                  sm:w-6
                  sm:text-[28px]

                  lg:w-7
                  lg:text-[30px]
                "
              >
                ›
              </span>
            </button>
          ))}

          {/* ==================================================
              EMPTY STATE
          ================================================== */}

          {filteredSevas.length === 0 && (
            <div
              className="
                rounded-[16px]
                border
                border-[#eadfd2]
                bg-[#fffdf9]
                px-5
                py-12
                text-center
                text-[13px]
                text-[#8a8077]

                sm:col-span-2

                lg:col-span-2
              "
            >
              {t("noSevaAvailable")}
            </div>
          )}
        </section>

        {/* ==================================================
            DECORATION
        ================================================== */}

        <div
          className="
            mt-7
            text-center
            text-[14px]
            tracking-[7px]
            text-[#c99435]
            opacity-70

            sm:mt-9
            sm:text-[16px]

            lg:mt-10
          "
        >
          ❧ ❧ ❧
        </div>
      </div>

      {/* ==================================================
          BOTTOM NAVIGATION
      ================================================== */}

      <BottomNavigation />
    </main>
  );
}