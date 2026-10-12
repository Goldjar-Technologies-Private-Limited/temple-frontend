"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DonationSuccess() {
  const router = useRouter();
  const params = useSearchParams();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }),
    );
  }, []);

  // Donation details
  const seva = params.get("seva") || "Annakut";
  const amount = params.get("amount") || "1001";
  const type = params.get("type") || "one-time";
  const frequency = params.get("frequency") || "monthly";
  const transactionId = params.get("transactionId") || "DON000000";

  const numericAmount = Number(amount);

  const formattedAmount = (
    Number.isFinite(numericAmount) && numericAmount >= 0 ? numericAmount : 0
  ).toLocaleString("en-IN");

  const formattedFrequency =
    frequency.charAt(0).toUpperCase() + frequency.slice(1);

  const sevaTitle = seva
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleReceipt = () => {
    alert("Receipt download will be connected to the backend.");
  };

  const handleShare = async () => {
    const shareData = {
      title: "Seva Contribution",
      text: `I contributed ₹${formattedAmount} towards ${sevaTitle}. Jai Shree Krishna 🙏`,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Sharing was cancelled by the user.
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.text);
        alert("Contribution message copied to clipboard.");
      } catch {
        alert("Sharing is not supported on this browser.");
      }
    }
  };

  return (
    <main
      className="
        relative isolate flex min-h-[100dvh] w-full
        items-center justify-center
        overflow-x-hidden
        bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#fffaf0_42%,#f6ead5_100%)]
        px-3 py-5
        text-[#4b4039]
        [padding-bottom:calc(20px+env(safe-area-inset-bottom))]
        min-[360px]:px-4
        sm:px-6 sm:py-8
        md:px-8
        lg:min-h-screen lg:px-10 lg:py-12
        lg:bg-[radial-gradient(circle_at_top_left,rgba(25,168,120,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(201,148,53,0.13),transparent_30%),#fff9ed]
        xl:px-12
        2xl:px-16
      "
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-12 -top-12
          h-32 w-32 rounded-full
          bg-[rgba(25,168,120,0.08)]
          min-[360px]:h-40 min-[360px]:w-40
          sm:-right-16 sm:-top-16 sm:h-56 sm:w-56
          lg:-right-24 lg:-top-24 lg:h-80 lg:w-80
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-14 -left-14
          h-36 w-36 rounded-full
          bg-[rgba(201,148,53,0.09)]
          min-[360px]:h-44 min-[360px]:w-44
          sm:-bottom-20 sm:-left-20 sm:h-56 sm:w-56
          lg:-bottom-28 lg:-left-28 lg:h-80 lg:w-80
        "
      />

      {/* Main success card */}
      <section
        aria-labelledby="success-title"
        className="
          relative z-10 my-auto
          w-full min-w-0 max-w-[390px]
          rounded-2xl border border-[#eadbc5]
          bg-[#fffdf8]
          px-3 py-5 text-center
          shadow-[0_10px_30px_rgba(79,43,14,0.07)]
          min-[360px]:rounded-[18px] min-[360px]:px-4
          min-[400px]:px-5 min-[400px]:py-6
          sm:max-w-[460px] sm:rounded-[22px]
          sm:px-8 sm:py-9
          md:max-w-[520px] md:px-10 md:py-10
          lg:max-w-[610px] lg:rounded-[28px]
          lg:px-[50px] lg:py-[44px]
          xl:max-w-[660px] xl:px-[62px] xl:py-[54px]
          2xl:max-w-[680px]
        "
      >
        {/* Success icon */}
        <div
          aria-hidden="true"
          className="
            mx-auto mb-3 grid
            h-14 w-14 place-items-center
            rounded-full
            bg-gradient-to-br from-[#21ba86] to-[#14895f]
            text-3xl font-bold text-white
            shadow-[0_8px_20px_rgba(25,168,120,0.2)]
            min-[360px]:h-16 min-[360px]:w-16 min-[360px]:text-4xl
            sm:mb-4 sm:h-20 sm:w-20 sm:text-5xl
            lg:mb-5 lg:h-24 lg:w-24 lg:text-6xl
          "
        >
          ✓
        </div>

        {/* Payment status */}
        <span
          className="
            inline-flex max-w-full items-center justify-center
            rounded-full border border-[#cfe8dd]
            bg-[#edf8f3] px-2.5 py-1.5
            text-[9px] font-bold uppercase tracking-[0.6px]
            text-[#248463]
            min-[360px]:px-3 min-[360px]:text-[10px]
            sm:text-[11px] sm:tracking-[0.8px]
          "
        >
          Payment Successful
        </span>

        {/* Heading */}
        <h1
          id="success-title"
          className="
            mt-3 break-words
            font-[Georgia,'Times_New_Roman',serif]
            text-[23px] font-bold leading-tight
            text-[#27634e]
            min-[360px]:text-[26px]
            min-[400px]:text-[28px]
            sm:text-[30px]
            md:text-[34px]
            lg:text-[38px]
            xl:text-[40px]
            [overflow-wrap:anywhere]
          "
        >
          {type === "auto"
            ? "Auto Seva Started!"
            : `${sevaTitle} Seva Successful!`}
        </h1>

        <h2
          className="
            mt-2
            font-[Georgia,'Times_New_Roman',serif]
            text-sm font-semibold text-[#a71919]
            min-[360px]:text-base
            sm:text-lg
            lg:text-xl
          "
        >
          Jai Shree Krishna 🙏
        </h2>

        {/* Decorative divider */}
        <div className="my-4 flex items-center justify-center gap-3 sm:my-5 lg:my-6">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d5b66d] min-[360px]:w-12 sm:w-20 lg:w-24" />
          <span className="text-xs text-[#c99435]">✦</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d5b66d] min-[360px]:w-12 sm:w-20 lg:w-24" />
        </div>

        {/* Thank-you message */}
        <p
          className="
            mx-auto mb-4 max-w-sm
            text-xs leading-relaxed text-[#776d65]
            min-[360px]:text-sm
            sm:mb-6 sm:text-base
          "
        >
          Thank you for your generous contribution towards {sevaTitle} Seva. May
          Shri Thakorji bless you and your family.
        </p>

        {/* Donation details */}
        <div
          className="
            w-full min-w-0
            rounded-xl border border-[#f0dfc4]
            bg-[#fff8eb] px-3 py-1
            text-left
            min-[360px]:px-3.5
            sm:rounded-2xl sm:px-5 sm:py-2
            lg:px-6
          "
        >
          {/* Seva */}
          <div
            className="
              flex min-w-0 items-start justify-between
              gap-3 border-b border-[#eee0cc]
              py-3 text-xs
              min-[360px]:text-sm
              sm:gap-4
            "
          >
            <span className="shrink-0 text-[#8a8077]">Seva</span>
            <strong className="min-w-0 text-right text-[#433932] [overflow-wrap:anywhere]">
              {sevaTitle}
            </strong>
          </div>

          {/* Amount */}
          <div
            className="
              flex min-w-0 items-center justify-between
              gap-3 border-b border-[#eee0cc]
              py-3 text-xs
              min-[360px]:text-sm
              sm:gap-4
            "
          >
            <span className="shrink-0 text-[#8a8077]">Amount</span>
            <strong className="min-w-0 text-right text-base text-[#a71919] sm:text-lg">
              ₹{formattedAmount}
            </strong>
          </div>

          {/* Recurring frequency */}
          {type === "auto" && (
            <div
              className="
                flex min-w-0 items-center justify-between
                gap-3 border-b border-[#eee0cc]
                py-3 text-xs
                min-[360px]:text-sm
                sm:gap-4
              "
            >
              <span className="shrink-0 text-[#8a8077]">Frequency</span>
              <strong className="min-w-0 text-right text-[#433932] [overflow-wrap:anywhere]">
                {formattedFrequency}
              </strong>
            </div>
          )}

          {/* Transaction ID */}
          <div
            className="
              flex min-w-0 items-start justify-between
              gap-3 border-b border-[#eee0cc]
              py-3 text-xs
              min-[360px]:text-sm
              sm:gap-4
            "
          >
            <span className="shrink-0 text-[#8a8077]">Transaction ID</span>
            <strong className="min-w-0 max-w-[65%] break-all text-right font-mono text-[#433932]">
              {transactionId}
            </strong>
          </div>

          {/* Current date */}
          <div
            className="
              flex min-w-0 items-center justify-between
              gap-3 py-3 text-xs
              min-[360px]:text-sm
              sm:gap-4
            "
          >
            <span className="shrink-0 text-[#8a8077]">Date</span>
            <strong className="text-right text-[#433932]">
              {currentDate || "Loading date..."}
            </strong>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mx-auto mt-4 w-full max-w-md sm:mt-6">
          <button
            type="button"
            onClick={handleReceipt}
            className="
              inline-flex min-h-11 w-full
              items-center justify-center gap-2
              rounded-xl bg-[#a71919]
              px-3 py-3
              text-xs font-bold text-white
              shadow-[0_6px_15px_rgba(113,17,17,0.13)]
              transition duration-200
              hover:bg-[#7f1111] hover:shadow-lg
              active:scale-[0.985]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#a71919]
              focus-visible:ring-offset-2
              min-[360px]:min-h-12 min-[360px]:text-sm
              sm:min-h-[52px] sm:text-base
            "
          >
            <span aria-hidden="true" className="text-lg">
              ⇩
            </span>
            Download Receipt
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="
              mt-3 inline-flex min-h-11 w-full
              items-center justify-center gap-2
              rounded-xl border border-[#eadbc5]
              bg-white px-3 py-3
              text-xs font-bold text-[#a71919]
              transition duration-200
              hover:border-[#a71919] hover:bg-[#fff5ed]
              active:scale-[0.985]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#a71919]
              focus-visible:ring-offset-2
              min-[360px]:min-h-12 min-[360px]:text-sm
              sm:min-h-[52px] sm:text-base
            "
          >
            <span aria-hidden="true">↗</span>
            Share Contribution
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="
              mt-2 min-h-11 w-full rounded-lg px-3
              text-xs font-bold text-[#776d65]
              transition-colors duration-200
              hover:text-[#a71919]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#a71919]
              focus-visible:ring-offset-2
              min-[360px]:text-sm
            "
          >
            Back to Home
          </button>
        </div>

        {/* Security note */}
        <p
          className="
            mt-4 text-[9px] font-medium leading-relaxed
            text-[#9b762f]
            min-[360px]:text-[10px]
            sm:mt-5 sm:text-xs
          "
        >
          🔒 Keep your transaction ID for future reference.
        </p>
      </section>
    </main>
  );
}
