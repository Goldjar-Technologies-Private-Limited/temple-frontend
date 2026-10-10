"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageProvider";
import type { TranslationKey } from "@/utils/i18n";
import BottomNavigation from "@/components/navigation/BottomNavigation";

type SevaDetailData = {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  image: string;
  descriptionKey: TranslationKey;
  progress: number;
  progressTextKey: TranslationKey;
};

const sevaData: Record<string, SevaDetailData> = {
  "go-seva": {
    titleKey: "goSeva",
    subtitleKey: "careForGauMata",
    image: "/images/go-seva.jpg",
    descriptionKey: "goSevaDescription",
    progress: 72,
    progressTextKey: "goSevaProgress",
  },
  "nitya-bhog": {
    titleKey: "nityaBhogSeva",
    subtitleKey: "dailyFoodOffering",
    image: "/images/nitya-bhog.jpg",
    descriptionKey: "nityaBhogDescription",
    progress: 68,
    progressTextKey: "nityaBhogProgress",
  },
  flower: {
    titleKey: "flowerSeva",
    subtitleKey: "templeDecoration",
    image: "/images/flower-seva.jpg",
    descriptionKey: "flowerSevaDescription",
    progress: 54,
    progressTextKey: "flowerSevaProgress",
  },
  annakut: {
    titleKey: "annakutSeva",
    subtitleKey: "specialUtsavSeva",
    image: "/images/annakut.jpg",
    descriptionKey: "annakutDescription",
    progress: 82,
    progressTextKey: "annakutProgress",
  },
  "temple-maintenance": {
    titleKey: "templeMaintenance",
    subtitleKey: "supportTempleServices",
    image: "/images/temple-maintenance.jpg",
    descriptionKey: "templeMaintenanceDescription",
    progress: 45,
    progressTextKey: "templeMaintenanceProgress",
  },
};

const amounts = ["₹101", "₹501", "₹1,001", "₹5,001"];

export default function SevaDetail() {
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguage();

  const rawId = params.id;
  const id = Array.isArray(rawId)
    ? (rawId[0] ?? "go-seva")
    : (rawId ?? "go-seva");

  const seva = sevaData[id] ?? sevaData["go-seva"];

  const [selectedAmount, setSelectedAmount] = useState("₹501");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const amount =
      selectedAmount === "Custom"
        ? customAmount.trim()
        : selectedAmount.replace(/[₹,]/g, "");

    if (!amount || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      alert(t("selectDonationAmount"));
      return;
    }

    router.push(
      `/donate?seva=${encodeURIComponent(id)}&amount=${encodeURIComponent(amount)}`,
    );
  };

  return (
    <main className="min-h-screen bg-[#fff9ed] text-[#4b4039]">
      {/* HEADER */}
      <header
        className="
          relative z-20 flex h-[72px] w-full
          items-center justify-center
          border-b border-[#eadbc5]
          bg-[#fffdf8]
          lg:h-[82px]
        "
      >
        {/* BACK BUTTON: MOBILE + DESKTOP */}
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={t("back")}
          className="
            !absolute !left-4 !top-1/2 !z-50
            !flex !h-10 !w-10 !-translate-y-1/2
            shrink-0 items-center justify-center
            rounded-full border border-[#ead7b8]
            bg-white text-[#641010] shadow-sm
            transition-colors duration-200
            hover:border-[#b8893b]
            hover:bg-[#fff4e4]
            active:scale-95
            sm:!left-6
            lg:!left-8
            lg:!h-11 lg:!w-11
          "
        >
          <ArrowLeft size={21} strokeWidth={1.8} />
        </button>

        {/* CENTERED TITLE */}
        <h1
          className="
            m-0 text-center font-serif
            text-[22px] font-bold text-[#641010]
            sm:text-[24px] lg:text-[26px]
          "
        >
          {t("sevaDetail")}
        </h1>
      </header>

      {/* PAGE CONTENT */}
      <section
        className="
          mx-auto w-full px-[17px] pb-7 pt-[10px]
          sm:max-w-[720px] sm:px-6 sm:pb-10 sm:pt-5
          lg:max-w-[1100px] lg:px-8 lg:pb-14 lg:pt-8
          xl:max-w-[1250px]
        "
      >
        <div
          className="
            lg:grid
            lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]
            lg:items-start lg:gap-10
          "
        >
          {/* IMAGE */}
          <div>
            <img
              src={seva.image}
              alt={t(seva.titleKey)}
              className="
                block h-[116px] w-full rounded-[10px]
                bg-[#eadbc5] object-cover
                sm:h-[280px] sm:rounded-[14px]
                lg:h-[500px] lg:rounded-[18px]
                xl:h-[540px]
              "
            />
          </div>

          {/* DETAILS */}
          <div
            className="
              lg:rounded-[18px] lg:border
              lg:border-[#eadbc5] lg:bg-[#fffdf8]
              lg:p-7
              lg:shadow-[0_8px_30px_rgba(80,40,10,0.06)]
              xl:p-8
            "
          >
            <h2
              className="
                mb-[2px] mt-[10px] font-serif
                text-[22px] leading-[1.15] text-[#3b3029]
                sm:mt-4 sm:text-[27px]
                lg:mt-0 lg:text-[32px]
              "
            >
              {t(seva.titleKey)}
            </h2>

            <div className="text-[14px] text-[#776d65] sm:text-[15px] lg:text-[16px]">
              {t(seva.subtitleKey)}
            </div>

            <p
              className="
                mb-[14px] mt-[13px] text-[13px]
                leading-[1.4] text-[#665d55]
                sm:mb-5 sm:mt-4 sm:text-[14px] sm:leading-[1.6]
                lg:mb-7 lg:mt-5 lg:text-[15px] lg:leading-[1.7]
              "
            >
              {t(seva.descriptionKey)}
            </p>

            {/* PROGRESS */}
            <div
              className="
                mb-[6px] flex items-center justify-between
                text-[12px] text-[#776d65]
                sm:text-[13px] lg:mb-2 lg:text-[14px]
              "
            >
              <span>{t(seva.progressTextKey)}</span>
              <b className="text-[#a71919]">{seva.progress}%</b>
            </div>

            <div className="h-[9px] w-full overflow-hidden rounded-full bg-[#e6e1de] lg:h-[10px]">
              <div
                className="h-full rounded-full bg-[#a71919] transition-all duration-500"
                style={{ width: `${seva.progress}%` }}
              />
            </div>

            {/* DONATION AMOUNTS */}
            <div
              className="
                mt-[14px] grid grid-cols-3 gap-[9px]
                sm:mt-5 sm:grid-cols-5 sm:gap-3
                lg:mt-7 lg:grid-cols-3
              "
            >
              {amounts.map((amount) => {
                const active = selectedAmount === amount;

                return (
                  <button
                    type="button"
                    key={amount}
                    aria-pressed={active}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`
                      h-[45px] rounded-[9px] border
                      text-[15px] font-bold
                      transition-all duration-150
                      active:scale-[0.98] lg:h-[48px]
                      ${
                        active
                          ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
                          : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] hover:border-[#c99435]"
                      }
                    `}
                  >
                    {amount}
                  </button>
                );
              })}

              <button
                type="button"
                aria-pressed={selectedAmount === "Custom"}
                onClick={() => setSelectedAmount("Custom")}
                className={`
                  h-[45px] rounded-[9px] border
                  text-[15px] font-bold
                  transition-all duration-150
                  active:scale-[0.98] lg:h-[48px]
                  ${
                    selectedAmount === "Custom"
                      ? "border-[#a71919] bg-[#fff1e7] text-[#a71919]"
                      : "border-[#eadbc5] bg-[#fffdf8] text-[#433932] hover:border-[#c99435]"
                  }
                `}
              >
                {t("custom")}
              </button>
            </div>

            {/* CUSTOM AMOUNT */}
            {selectedAmount === "Custom" && (
              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                placeholder={t("enterDonationAmount")}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="
                  mt-[9px] h-[45px] w-full rounded-[9px]
                  border border-[#d9c6ad] bg-white px-[13px]
                  text-[15px] text-[#332820] outline-none
                  focus:border-[#a71919]
                  lg:mt-3 lg:h-[48px]
                "
              />
            )}

            {/* DONATE BUTTON */}
            <button
              type="button"
              onClick={handleDonate}
              className="
                mt-[13px] h-[48px] w-full rounded-[10px]
                border-0 bg-[#a71919] text-[15px]
                font-bold text-white
                shadow-[0_4px_10px_rgba(167,25,25,0.18)]
                transition-all duration-150
                hover:bg-[#8f1414] active:scale-[0.985]
                sm:mt-5 sm:h-[50px]
                lg:mt-6 lg:h-[52px] lg:text-[16px]
              "
            >
              {t("donateNow")}
            </button>
          </div>
        </div>
      </section>

      <BottomNavigation />
    </main>
  );
}
