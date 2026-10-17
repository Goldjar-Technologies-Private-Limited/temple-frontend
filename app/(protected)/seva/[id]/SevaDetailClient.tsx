"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageProvider";

import {
  SEVA_DETAILS_DATA as sevaData,
  SEVA_DONATION_AMOUNTS as donationAmounts,
} from "@/data/seva";

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

export default function SevaDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { t } = useLanguage();

  const rawId = params?.id;
  const id = Array.isArray(rawId)
    ? (rawId[0] ?? "go-seva")
    : (rawId ?? "go-seva");

  const seva = sevaData[id] ?? sevaData["go-seva"];

  const [selectedAmount, setSelectedAmount] = useState<number | null>(501);
  const [customAmount, setCustomAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const handlePresetAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setAmountError("");
  };

  const handleCustomAmount = () => {
    setSelectedAmount(null);
    setAmountError("");
  };

  // Save the amount in sessionStorage, never in the URL.
  const handleDonate = () => {
    const rawAmount =
      selectedAmount !== null ? String(selectedAmount) : customAmount.trim();

    if (!/^\d+$/.test(rawAmount)) {
      setAmountError(t("selectDonationAmount"));
      return;
    }

    const amount = Number(rawAmount);

    if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 10000000) {
      setAmountError(t("selectDonationAmount"));
      return;
    }

    setAmountError("");

    try {
      sessionStorage.setItem("donationAmount", String(amount));
      sessionStorage.setItem("donationSevaId", id);
      router.push(`/donate?seva=${encodeURIComponent(id)}`);
    } catch {
      setAmountError("Unable to continue. Please try again.");
    }
  };

  return (
    <main className="relative box-border min-h-screen min-h-[100dvh] w-full min-w-0 max-w-full overflow-x-clip bg-[#fff9ed] text-[#4b4039] pb-24 sm:pb-28 lg:pb-12 lg:pl-[92px]">
      <section className="mx-auto box-border w-full min-w-0 max-w-[1500px] px-3 py-4 min-[375px]:px-4 sm:px-5 sm:py-6 md:px-6 lg:px-8 lg:py-8 xl:px-10 xl:py-10 2xl:px-12">
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 xl:grid-cols-2 xl:gap-7 2xl:gap-10">
          <div className="w-full min-w-0">
            <div className="group relative isolate w-full min-w-0 overflow-hidden rounded-[14px] border border-[#eadbc5] bg-[#eadbc5] shadow-[0_8px_30px_rgba(80,40,10,0.07)] sm:rounded-[18px] xl:rounded-[22px]">
              <img
                src={seva.image}
                alt={t(seva.titleKey)}
                className="block h-auto w-full max-w-full aspect-[16/10] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] sm:aspect-[16/9] xl:aspect-[4/3]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#35160d]/40 via-transparent to-transparent"
              />
            </div>
          </div>

          <div className="box-border w-full min-w-0 rounded-[15px] border border-[#eadbc5] bg-[#fffdf8] p-3.5 shadow-[0_8px_30px_rgba(80,40,10,0.045)] min-[375px]:p-4 sm:rounded-[19px] sm:p-5 md:p-6 xl:rounded-[22px] xl:p-6 2xl:p-9">
            <div className="min-w-0 border-b border-[#efe5d7] pb-4 sm:pb-5">
              <h2 className="break-words text-[24px] font-bold leading-tight text-[#641010] min-[375px]:text-[26px] sm:text-[30px] xl:text-[34px] 2xl:text-[40px]">
                {t(seva.titleKey)}
              </h2>
              <p className="mt-2 break-words text-[12px] leading-5 text-[#806f63] sm:text-sm sm:leading-6">
                {t(seva.subtitleKey)}
              </p>
              <p className="mt-3 break-words text-[12px] leading-5 text-[#776d65] sm:mt-4 sm:text-sm sm:leading-6">
                {t(seva.descriptionKey)}
              </p>
            </div>

            <div className="mb-3 mt-4 sm:mt-5">
              <h3 className="text-[13px] font-bold text-[#433932] sm:text-sm">
                Select donation amount
              </h3>
              <p className="mt-1 text-[10px] leading-5 text-[#8a8077] sm:text-xs">
                Choose an amount or enter your own.
              </p>
            </div>

            <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-3">
              {donationAmounts.map((item) => {
                const active = selectedAmount === item.value;

                return (
                  <button
                    type="button"
                    key={item.value}
                    aria-pressed={active}
                    onClick={() => handlePresetAmount(item.value)}
                    className={`box-border flex min-h-[48px] min-w-0 items-center justify-center gap-1.5 rounded-xl border px-2 py-3 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.98] min-[375px]:text-sm sm:min-h-[56px] sm:gap-2 sm:text-base ${active ? "border-[#a71919] bg-[#fff0e7] text-[#a71919] shadow-[0_3px_12px_rgba(167,25,25,0.08)]" : "border-[#eadbc5] bg-white text-[#514035] hover:border-[#c99435] hover:bg-[#fffaf1]"}`}
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

            <button
              type="button"
              aria-pressed={selectedAmount === null}
              onClick={handleCustomAmount}
              className={`mt-3 flex min-h-[46px] w-full min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-[12px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.99] sm:min-h-[52px] sm:text-sm ${selectedAmount === null ? "border-[#a71919] bg-[#fff0e7] text-[#a71919]" : "border-dashed border-[#d9c6ad] bg-white text-[#776d65] hover:border-[#c99435] hover:bg-[#fffaf1]"}`}
            >
              {selectedAmount === null && (
                <CheckCircle2 size={16} className="shrink-0" />
              )}
              {t("custom")}
            </button>

            {selectedAmount === null && (
              <div className="mt-3 min-w-0">
                <label
                  htmlFor="custom-donation-amount"
                  className="mb-2 block text-[12px] font-semibold text-[#514035]"
                >
                  {t("enterDonationAmount")}
                </label>

                <div
                  className={`box-border flex h-[48px] w-full min-w-0 items-center overflow-hidden rounded-xl border bg-white transition-colors sm:h-[54px] ${amountError ? "border-red-500" : "border-[#d9c6ad] focus-within:border-[#a71919]"}`}
                >
                  <span className="flex h-full shrink-0 items-center border-r border-[#efe5d7] bg-[#fffaf1] px-3 text-sm font-bold text-[#641010] sm:px-4 sm:text-base">
                    ₹
                  </span>
                  <input
                    id="custom-donation-amount"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1"
                    max="10000000"
                    placeholder="Enter amount"
                    value={customAmount}
                    aria-invalid={Boolean(amountError)}
                    aria-describedby={
                      amountError ? "donation-amount-error" : undefined
                    }
                    onChange={(event) => {
                      setCustomAmount(event.target.value);
                      setAmountError("");
                    }}
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-[14px] font-medium text-[#332820] outline-none placeholder:font-normal placeholder:text-[#b2a69b]"
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

            <div className="mt-4 flex min-w-0 items-center justify-between gap-2 rounded-xl bg-[#fff8eb] px-3 py-3 sm:mt-5 sm:gap-3 sm:px-4 sm:py-4 xl:px-5">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#8a8077] sm:text-xs">
                  Your offering
                </p>
                <p className="mt-1 break-words text-[11px] font-semibold text-[#514035] sm:text-sm">
                  {t(seva.titleKey)}
                </p>
              </div>
              <p className="shrink-0 whitespace-nowrap text-[20px] font-bold text-[#641010] min-[375px]:text-[22px] sm:text-[26px]">
                ₹
                {formatAmount(
                  selectedAmount !== null
                    ? selectedAmount
                    : Number(customAmount) || 0,
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDonate}
              className="mt-3 flex min-h-[49px] w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-[#a71919] px-4 py-3 text-[13px] font-bold text-white shadow-[0_5px_16px_rgba(167,25,25,0.18)] transition-all duration-200 hover:bg-[#8f1414] hover:shadow-[0_8px_22px_rgba(167,25,25,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.99] sm:mt-4 sm:min-h-[54px] sm:text-[15px]"
            >
              {t("donateNow")}
            </button>

            {amountError && selectedAmount !== null && (
              <p
                role="alert"
                className="mt-2 text-[11px] font-medium text-red-600"
              >
                {amountError}
              </p>
            )}

            <p className="mt-3 text-center text-[10px] leading-5 text-[#8a8077] sm:text-[11px]">
              Thank you for supporting Shri Govardhannath Haveli.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-7 text-center text-[14px] tracking-[7px] text-[#c99435] opacity-70 sm:mt-9 sm:text-[17px] lg:mt-10"
        >
          ❧ ❧ ❧
        </div>
      </section>
    </main>
  );
}
