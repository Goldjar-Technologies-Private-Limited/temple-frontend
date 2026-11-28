"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageProvider";
import { useSevas } from "@/hooks/temple/seva/useSeva";
import PullToRefresh from "@/components/PullToRefresh";

import {
  SEVA_CATEGORIES as fallbackCategories,
  SEVA_LIST as fallbackSevas,
} from "@/data/seva";

export default function SevaDonation() {
  const router = useRouter();
  const { t } = useLanguage();

  const {
    sevas: apiSevas,
    categories: apiCategories,
    isLoading,
    refetch,
  } = useSevas({
    size: 50,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Merge categories: always have "all", then API categories or fallback categories
  const categoriesList = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return [
        { id: "all", label: t("all") || "All" },
        ...apiCategories.map((c) => ({ id: c, label: c })),
      ];
    }
    return fallbackCategories.map((c) => ({
      id: c.id,
      label: t(c.label),
    }));
  }, [apiCategories, t]);

  // Display items: use API data if available, otherwise graceful fallback
  const displaySevas = useMemo(() => {
    if (apiSevas && apiSevas.length > 0) {
      let filtered = apiSevas;
      if (selectedCategory !== "all") {
        const lowerCat = selectedCategory.toLowerCase();
        filtered = apiSevas.filter((s) => {
          if (lowerCat === "popular") return s.isPopular;
          return s.category?.toLowerCase() === lowerCat;
        });
      }
      return filtered.map((s) => ({
        id: String(s.id),
        title: s.name,
        subtitle: s.subTitle,
        image: s.imageUrl || "/images/go-seva.jpg",
        route: `/seva-donation/seva/${s.id}`,
      }));
    }

    // Fallback static list
    const filtered =
      selectedCategory === "all"
        ? fallbackSevas
        : fallbackSevas.filter((s) => s.category === selectedCategory);

    return filtered.map((s) => ({
      id: s.id,
      title: t(s.titleKey),
      subtitle: t(s.subtitleKey),
      image: s.image,
      route: s.route,
    }));
  }, [apiSevas, selectedCategory, t]);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <main className="relative box-border min-h-dvh w-full min-w-0 max-w-full overflow-x-clip bg-[#fffdf8]/95 pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-8 lg:pl-[92px]">
        {/* RESPONSIVE CONTENT */}
        <div className="mx-auto box-border w-full min-w-0 max-w-[1400px] px-3 py-5 sm:px-5 sm:py-7 md:px-6 lg:px-8 lg:py-9 xl:px-10">
          {/* CATEGORY FILTERS */}
          <section
            aria-label="Seva categories"
            className="-mx-3 mb-5 flex min-w-0 max-w-[calc(100%+24px)] items-center gap-2 overflow-x-auto overscroll-x-contain px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mb-7 sm:max-w-full sm:gap-2.5 sm:px-0 md:gap-3 lg:mb-8"
          >
            {categoriesList.map((item) => {
              const selected = selectedCategory === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`flex h-[35px] shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border px-4 text-[11px] font-semibold transition sm:h-[38px] sm:px-5 sm:text-xs lg:h-10 ${
                    selected
                      ? "border-[#a71919] bg-[#a71919] text-white shadow-[0_4px_12px_rgba(167,25,25,0.14)]"
                      : "border-[#eadbc5] bg-[#fffdf8] text-[#776d65] hover:border-[#cfae83] hover:bg-[#fff9ef] hover:text-[#8e241d]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </section>

          {/* SKELETON LOADING STATE */}
          {isLoading && displaySevas.length === 0 && (
            <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:gap-5">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="flex min-h-[84px] w-full items-center rounded-[13px] border border-[#eadfd2] bg-[#fffdf9] p-2 sm:min-h-[100px] sm:p-3"
                >
                  <div className="h-[76px] w-[76px] shrink-0 rounded-xl bg-gray-200 animate-pulse sm:h-[100px] sm:w-[100px]" />
                  <div className="ml-3 flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADAPTIVE CARD GRID */}
          {(!isLoading || displaySevas.length > 0) && (
            <section
              aria-label="Available sevas"
              className="grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:gap-5"
            >
              {displaySevas.map((seva) => (
                <button
                  key={seva.id}
                  type="button"
                  onClick={() => router.push(seva.route)}
                  className="group flex min-h-[84px] w-full min-w-0 items-center overflow-hidden rounded-[13px] border border-[#eadfd2] bg-[#fffdf9] p-2 text-left shadow-[0_3px_12px_rgba(97,45,25,0.045)] transition duration-300 hover:-translate-y-0.5 hover:border-[#dfc9ad] hover:shadow-[0_12px_35px_rgba(97,45,25,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.99] sm:min-h-[100px] sm:rounded-[16px] sm:p-3 lg:min-h-[106px] xl:min-h-[112px] xl:p-3.5"
                >
                  {/* IMAGE */}
                  <div className="relative flex aspect-square h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-xl sm:h-[100px] sm:w-[100px] lg:h-[120px] lg:w-[120px]">
                    <img
                      src={seva.image}
                      alt={seva.title}
                      loading="lazy"
                      className="h-full w-full rounded-lg object-cover object-center"
                    />
                  </div>

                  {/* TITLE AND DESCRIPTION */}
                  <div className="min-w-0 flex-1 overflow-hidden px-2 sm:px-3 lg:px-3.5">
                    <h2 className="break-words text-[13px] font-bold leading-snug text-[#332820] min-[375px]:text-sm sm:text-base md:text-sm lg:text-base xl:text-[17px]">
                      {seva.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 break-words text-[10px] leading-4 text-[#8a8077] sm:text-[11px] sm:leading-[18px] lg:text-xs">
                      {seva.subtitle}
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

              {displaySevas.length === 0 && (
                <div className="rounded-[16px] border border-[#eadfd2] bg-[#fffdf9] px-5 py-12 text-center text-[13px] text-[#8a8077] md:col-span-2">
                  {t("noSevaAvailable")}
                </div>
              )}
            </section>
          )}

          {/* DECORATION */}
          <div
            aria-hidden="true"
            className="mt-7 text-center text-[14px] tracking-[7px] text-[#c99435] opacity-70 sm:mt-9 sm:text-base lg:mt-10"
          >
            ❧ ❧ ❧
          </div>
        </div>
      </main>
    </PullToRefresh>
  );
}
