
"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageProvider";
import type { TranslationKey } from "@/utils/i18n";
import BottomNavigation from "@/components/navigation/BottomNavigation";

/* =========================================================
   TYPES
========================================================= */

type SevaDetailData = {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  image: string;
  descriptionKey: TranslationKey;
};

type DonationAmount = {
  label: string;
  value: number;
};

/* =========================================================
   SEVA DATA
========================================================= */

const sevaData: Record<string, SevaDetailData> = {
  "go-seva": {
    titleKey: "goSeva",
    subtitleKey: "careForGauMata",
    image: "/images/go-seva.jpg",
    descriptionKey: "goSevaDescription",
  },
  "nitya-bhog": {
    titleKey: "nityaBhogSeva",
    subtitleKey: "dailyFoodOffering",
    image: "/images/nitya-bhog.jpg",
    descriptionKey: "nityaBhogDescription",
  },
  flower: {
    titleKey: "flowerSeva",
    subtitleKey: "templeDecoration",
    image: "/images/flower-seva.jpg",
    descriptionKey: "flowerSevaDescription",
  },
  annakut: {
    titleKey: "annakutSeva",
    subtitleKey: "specialUtsavSeva",
    image: "/images/annakut.jpg",
    descriptionKey: "annakutDescription",
  },
  "temple-maintenance": {
    titleKey: "templeMaintenance",
    subtitleKey: "supportTempleServices",
    image: "/images/temple-maintenance.jpg",
    descriptionKey: "templeMaintenanceDescription",
  },
};

/* =========================================================
   DONATION AMOUNTS
========================================================= */

const donationAmounts: DonationAmount[] = [
  { label: "₹101", value: 101 },
  { label: "₹501", value: 501 },
  { label: "₹1,001", value: 1001 },
  { label: "₹5,001", value: 5001 },
];

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function SevaDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { t } = useLanguage();

  const rawId = params?.id;

  const id = Array.isArray(rawId)
    ? rawId[0] ?? "go-seva"
    : rawId ?? "go-seva";

  const seva = sevaData[id] ?? sevaData["go-seva"];

  const [selectedAmount, setSelectedAmount] =
    useState<number | null>(501);

  const [customAmount, setCustomAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  /* =======================================================
     SELECT PRESET AMOUNT
  ======================================================= */

  const handlePresetAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setAmountError("");
  };

  /* =======================================================
     SELECT CUSTOM AMOUNT
  ======================================================= */

  const handleCustomAmount = () => {
    setSelectedAmount(null);
    setAmountError("");
  };

  /* =======================================================
     DONATION VALIDATION
  ======================================================= */

  const handleDonate = () => {
    const rawAmount =
      selectedAmount !== null
        ? String(selectedAmount)
        : customAmount.trim();

    if (!/^\d+$/.test(rawAmount)) {
      setAmountError(t("selectDonationAmount"));
      return;
    }

    const amount = Number(rawAmount);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      setAmountError(t("selectDonationAmount"));
      return;
    }

    setAmountError("");

    const query = new URLSearchParams({
      seva: id,
      amount: String(amount),
    });

    router.push(`/donate?${query.toString()}`);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      className="
        relative box-border
        min-h-screen min-h-[100dvh]
        w-full min-w-0 max-w-full
        overflow-x-clip
        bg-[#fff9ed] text-[#4b4039]
        pb-24 sm:pb-28
        lg:pb-12 lg:pl-[92px]
      "
    >
      {/* HEADER */}

      <header
        className="
          sticky top-0 z-40
          w-full min-w-0
          border-b border-[#eadbc5]
          bg-[#fffdf8]/95
          shadow-[0_2px_12px_rgba(80,40,10,0.035)]
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto flex min-h-[60px]
            w-full min-w-0 max-w-[1500px]
            items-center gap-2
            px-3
            min-[375px]:px-4
            sm:min-h-[68px] sm:gap-3 sm:px-5
            md:px-6
            lg:min-h-[76px] lg:px-8
            xl:px-10 2xl:px-12
          "
        >
          <button
            type="button"
            onClick={() => router.back()}
            aria-label={t("back")}
            title={t("back")}
            className="
              group flex size-9 shrink-0
              items-center justify-center
              rounded-full border border-[#ead7b8]
              bg-white text-[#641010] shadow-sm
              transition-all duration-200
              hover:border-[#b8893b]
              hover:bg-[#fff4e4]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#a71919]
              focus-visible:ring-offset-2
              active:scale-95
              sm:size-10 lg:size-11
            "
          >
            <ArrowLeft
              size={20}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </button>

          <div className="min-w-0 flex-1">
            <p
              className="
                truncate text-[8px] font-bold
                uppercase tracking-[0.14em]
                text-[#b07a26]
                min-[375px]:text-[9px]
                sm:text-[10px] sm:tracking-[0.2em]
              "
            >
              SHRI GOVARDHANNATH
            </p>

            <h1
              className="
                truncate font-serif text-[17px]
                font-bold leading-tight text-[#641010]
                min-[375px]:text-[19px]
                sm:text-[22px] lg:text-[25px]
              "
            >
              {t("sevaDetail")}
            </h1>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}

      <section
        className="
          mx-auto box-border
          w-full min-w-0 max-w-[1500px]
          px-3 py-4
          min-[375px]:px-4
          sm:px-5 sm:py-6
          md:px-6
          lg:px-8 lg:py-8
          xl:px-10 xl:py-10
          2xl:px-12
        "
      >
        {/* MAIN GRID: STACKED UNTIL LARGE DESKTOP */}

        <div
          className="
            grid w-full min-w-0
            grid-cols-1 items-start
            gap-4 sm:gap-5
            xl:grid-cols-2 xl:gap-7
            2xl:gap-10
          "
        >
          {/* LEFT: IMAGE */}

          <div className="w-full min-w-0">
            <div
              className="
                group relative isolate
                w-full min-w-0 overflow-hidden
                rounded-[14px]
                border border-[#eadbc5]
                bg-[#eadbc5]
                shadow-[0_8px_30px_rgba(80,40,10,0.07)]
                sm:rounded-[18px]
                xl:rounded-[22px]
              "
            >
              <img
                src={seva.image}
                alt={t(seva.titleKey)}
                className="
                  block h-auto w-full max-w-full
                  aspect-[16/10]
                  object-cover object-center
                  transition-transform duration-500
                  group-hover:scale-[1.02]
                  sm:aspect-[16/9]
                  xl:aspect-[4/3]
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-[#35160d]/40
                  via-transparent to-transparent
                "
              />
            </div>
          </div>

          {/* RIGHT: DONATION PANEL */}

          <div
            className="
              box-border w-full min-w-0
              rounded-[15px]
              border border-[#eadbc5]
              bg-[#fffdf8] p-3.5
              shadow-[0_8px_30px_rgba(80,40,10,0.045)]
              min-[375px]:p-4
              sm:rounded-[19px] sm:p-5
              md:p-6
              xl:rounded-[22px] xl:p-6
              2xl:p-9
            "
          >
            {/* PANEL HEADER */}

            <div className="min-w-0 border-b border-[#efe5d7] pb-4 sm:pb-5">
              <h2
                className="
                  break-words font-serif
                  text-[24px] font-bold
                  leading-tight text-[#641010]
                  min-[375px]:text-[26px]
                  sm:text-[30px]
                  xl:text-[34px] 2xl:text-[40px]
                "
              >
                {t(seva.titleKey)}
              </h2>

              <p
                className="
                  mt-2 break-words text-[12px]
                  leading-5 text-[#806f63]
                  sm:text-sm sm:leading-6
                "
              >
                {t(seva.subtitleKey)}
              </p>

              <p
                className="
                  mt-3 break-words text-[12px]
                  leading-5 text-[#776d65]
                  sm:mt-4 sm:text-sm sm:leading-6
                "
              >
                {t(seva.descriptionKey)}
              </p>
            </div>

            {/* AMOUNT SECTION */}

            <div className="mb-3 mt-4 sm:mt-5">
              <h3 className="text-[13px] font-bold text-[#433932] sm:text-sm">
                Select donation amount
              </h3>

              <p className="mt-1 text-[10px] leading-5 text-[#8a8077] sm:text-xs">
                Choose an amount or enter your own.
              </p>
            </div>

            {/* PRESET AMOUNTS */}

            <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-3">
              {donationAmounts.map((item) => {
                const active = selectedAmount === item.value;

                return (
                  <button
                    type="button"
                    key={item.value}
                    aria-pressed={active}
                    onClick={() => handlePresetAmount(item.value)}
                    className={`
                      box-border flex min-h-[48px]
                      min-w-0 items-center justify-center
                      gap-1.5 rounded-xl border px-2 py-3
                      text-[13px] font-bold
                      transition-all duration-200
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#a71919]
                      focus-visible:ring-offset-2
                      active:scale-[0.98]
                      min-[375px]:text-sm
                      sm:min-h-[56px] sm:gap-2 sm:text-base
                      ${
                        active
                          ? "border-[#a71919] bg-[#fff0e7] text-[#a71919] shadow-[0_3px_12px_rgba(167,25,25,0.08)]"
                          : "border-[#eadbc5] bg-white text-[#514035] hover:border-[#c99435] hover:bg-[#fffaf1]"
                      }
                    `}
                  >
                    {active && (
                      <CheckCircle2
                        size={15}
                        strokeWidth={2}
                        className="shrink-0"
                      />
                    )}

                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* CUSTOM AMOUNT SELECTOR */}

            <button
              type="button"
              aria-pressed={selectedAmount === null}
              onClick={handleCustomAmount}
              className={`
                mt-3 flex min-h-[46px]
                w-full min-w-0 items-center
                justify-center gap-2
                rounded-xl border px-3 py-3
                text-[12px] font-semibold
                transition-all duration-200
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#a71919]
                focus-visible:ring-offset-2
                active:scale-[0.99]
                sm:min-h-[52px] sm:text-sm
                ${
                  selectedAmount === null
                    ? "border-[#a71919] bg-[#fff0e7] text-[#a71919]"
                    : "border-dashed border-[#d9c6ad] bg-white text-[#776d65] hover:border-[#c99435] hover:bg-[#fffaf1]"
                }
              `}
            >
              {selectedAmount === null && (
                <CheckCircle2 size={16} className="shrink-0" />
              )}

              {t("custom")}
            </button>

            {/* CUSTOM INPUT */}

            {selectedAmount === null && (
              <div className="mt-3 min-w-0">
                <label
                  htmlFor="custom-donation-amount"
                  className="mb-2 block text-[12px] font-semibold text-[#514035]"
                >
                  {t("enterDonationAmount")}
                </label>

                <div
                  className={`
                    box-border flex h-[48px]
                    w-full min-w-0 items-center
                    overflow-hidden rounded-xl border bg-white
                    transition-colors sm:h-[54px]
                    ${
                      amountError
                        ? "border-red-500"
                        : "border-[#d9c6ad] focus-within:border-[#a71919]"
                    }
                  `}
                >
                  <span
                    aria-hidden="true"
                    className="
                      flex h-full shrink-0 items-center
                      border-r border-[#efe5d7]
                      bg-[#fffaf1] px-3
                      text-sm font-bold text-[#641010]
                      sm:px-4 sm:text-base
                    "
                  >
                    ₹
                  </span>

                  <input
                    id="custom-donation-amount"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1"
                    max={Number.MAX_SAFE_INTEGER}
                    placeholder="Enter amount"
                    value={customAmount}
                    aria-invalid={Boolean(amountError)}
                    aria-describedby={
                      amountError
                        ? "donation-amount-error"
                        : undefined
                    }
                    onChange={(event) => {
                      setCustomAmount(event.target.value);
                      setAmountError("");
                    }}
                    className="
                      h-full min-w-0 flex-1
                      bg-transparent px-3
                      text-[14px] font-medium
                      text-[#332820] outline-none
                      placeholder:font-normal
                      placeholder:text-[#b2a69b]
                    "
                  />
                </div>

                {amountError && (
                  <p
                    id="donation-amount-error"
                    role="alert"
                    className="mt-2 break-words text-[11px] font-medium text-red-600"
                  >
                    {amountError}
                  </p>
                )}
              </div>
            )}

            {/* DONATION SUMMARY */}

            <div
              className="
                mt-4 flex min-w-0
                items-center justify-between gap-2
                rounded-xl bg-[#fff8eb]
                px-3 py-3
                sm:mt-5 sm:gap-3 sm:px-4 sm:py-4
                xl:px-5
              "
            >
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#8a8077] sm:text-xs">
                  Your offering
                </p>

                <p className="mt-1 break-words text-[11px] font-semibold text-[#514035] sm:text-sm">
                  {t(seva.titleKey)}
                </p>
              </div>

              <p
                className="
                  shrink-0 whitespace-nowrap
                  font-serif text-[20px] font-bold
                  text-[#641010]
                  min-[375px]:text-[22px]
                  sm:text-[26px]
                "
              >
                ₹
                {formatAmount(
                  selectedAmount !== null
                    ? selectedAmount
                    : Number(customAmount) || 0
                )}
              </p>
            </div>

            {/* DONATE BUTTON */}

            <button
              type="button"
              onClick={handleDonate}
              className="
                mt-3 flex min-h-[49px]
                w-full min-w-0 items-center
                justify-center gap-2
                rounded-xl bg-[#a71919]
                px-4 py-3
                text-[13px] font-bold text-white
                shadow-[0_5px_16px_rgba(167,25,25,0.18)]
                transition-all duration-200
                hover:bg-[#8f1414]
                hover:shadow-[0_8px_22px_rgba(167,25,25,0.22)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#a71919]
                focus-visible:ring-offset-2
                active:scale-[0.99]
                sm:mt-4 sm:min-h-[54px] sm:text-[15px]
              "
            >
              {t("donateNow")}
            </button>

            {/* FOOTNOTE */}

            <p
              className="
                mt-3 text-center text-[10px]
                leading-5 text-[#8a8077]
                sm:text-[11px]
              "
            >
              Thank you for supporting
              {" "}Shri Govardhannath Haveli.
            </p>
          </div>
        </div>

        {/* DECORATION */}

        <div
          aria-hidden="true"
          className="
            mt-7 text-center text-[14px]
            tracking-[7px] text-[#c99435]
            opacity-70 sm:mt-9 sm:text-[17px]
            lg:mt-10
          "
        >
          ❧ ❧ ❧
        </div>
      </section>

      {/* BOTTOM NAVIGATION */}

      <BottomNavigation />
    </main>
  );
}
