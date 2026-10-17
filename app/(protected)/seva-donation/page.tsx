"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider";

import {
  SEVA_CATEGORIES as categories,
  SEVA_LIST as sevas,
  type SevaCategory as Category,
} from "@/data/seva";

export default function SevaDonation() {
  const router = useRouter();
  const { t } = useLanguage();
  const [category, setCategory] = useState<Category>("all");

  const filteredSevas =
    category === "all"
      ? sevas
      : sevas.filter((seva) => seva.category === category);

  return (
    <main className="relative box-border min-h-dvh w-full min-w-0 max-w-full overflow-x-clip bg-[#fffdf8]/95 pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-8 lg:pl-[92px]">
      {/* RESPONSIVE CONTENT */}
      <div className="mx-auto box-border w-full min-w-0 max-w-[1400px] px-3 py-5 sm:px-5 sm:py-7 md:px-6 lg:px-8 lg:py-9 xl:px-10">
        {/* CATEGORY FILTERS */}
        <section
          aria-label="Seva categories"
          className="-mx-3 mb-5 flex min-w-0 max-w-[calc(100%+24px)] items-center gap-2 overflow-x-auto overscroll-x-contain px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mb-7 sm:max-w-full sm:gap-2.5 sm:px-0 md:gap-3 lg:mb-8"
        >
          {categories.map((item) => {
            const selected = category === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item.id)}
                className={`flex h-[35px] shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border px-4 text-[11px] font-semibold transition sm:h-[38px] sm:px-5 sm:text-xs lg:h-10 ${selected ? "border-[#a71919] bg-[#a71919] text-white shadow-[0_4px_12px_rgba(167,25,25,0.14)]" : "border-[#eadbc5] bg-[#fffdf8] text-[#776d65] hover:border-[#cfae83] hover:bg-[#fff9ef] hover:text-[#8e241d]"}`}
              >
                {t(item.label)}
              </button>
            );
          })}
        </section>

        {/* ADAPTIVE CARD GRID */}
        <section
          aria-label="Available sevas"
          className="grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:gap-5"
        >
          {filteredSevas.map((seva) => (
            <button
              key={seva.id}
              type="button"
              onClick={() => router.push(seva.route)}
              className="group flex min-h-[84px] w-full min-w-0 items-center overflow-hidden rounded-[13px] border border-[#eadfd2] bg-[#fffdf9] p-2 text-left shadow-[0_3px_12px_rgba(97,45,25,0.045)] transition duration-300 hover:-translate-y-0.5 hover:border-[#dfc9ad] hover:shadow-[0_12px_35px_rgba(97,45,25,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.99] sm:min-h-[100px] sm:rounded-[16px] sm:p-3 lg:min-h-[106px] xl:min-h-[112px] xl:p-3.5"
            >
              {/* IMAGE */}
              <div className="relative h-[56px] w-[58px] shrink-0 overflow-hidden rounded-lg bg-[#eadbc5] min-[375px]:h-[62px] min-[375px]:w-[66px] sm:h-[72px] sm:w-[78px] md:h-[68px] md:w-[72px] lg:h-[76px] lg:w-[84px] xl:h-[84px] xl:w-[96px]">
                <img
                  src={seva.image}
                  alt={t(seva.titleKey)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* TITLE AND DESCRIPTION */}
              <div className="min-w-0 flex-1 overflow-hidden px-2 sm:px-3 lg:px-3.5">
                <h2 className="break-words text-[13px] font-bold leading-snug text-[#332820] min-[375px]:text-sm sm:text-base md:text-sm lg:text-base xl:text-[17px]">
                  {t(seva.titleKey)}
                </h2>
                <p className="mt-1 line-clamp-2 break-words text-[10px] leading-4 text-[#8a8077] sm:text-[11px] sm:leading-[18px] lg:text-xs">
                  {t(seva.subtitleKey)}
                </p>
              </div>

              {/* ARROW */}
              <span
                aria-hidden="true"
                className="flex h-7 w-4 shrink-0 items-center justify-center text-[21px] font-light leading-none text-[#d3832d] transition-transform group-hover:translate-x-0.5 sm:h-8 sm:w-5 sm:text-[25px]"
              >
                ›
              </span>
            </button>
          ))}

          {filteredSevas.length === 0 && (
            <div className="rounded-[16px] border border-[#eadfd2] bg-[#fffdf9] px-5 py-12 text-center text-[13px] text-[#8a8077] md:col-span-2">
              {t("noSevaAvailable")}
            </div>
          )}
        </section>

        {/* DECORATION */}
        <div
          aria-hidden="true"
          className="mt-7 text-center text-[14px] tracking-[7px] text-[#c99435] opacity-70 sm:mt-9 sm:text-base lg:mt-10"
        >
          ❧ ❧ ❧
        </div>
      </div>
    </main>
  );
}
