"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function DonationSuccess() {
  const router = useRouter();
  const params = useSearchParams();

  const seva = params.get("seva") || "Go Seva";
  const amount = params.get("amount") || "1001";
  const type = params.get("type") || "one-time";
  const frequency = params.get("frequency") || "monthly";

  // Get transaction ID from URL instead of Math.random()
  // This prevents Next.js hydration mismatch.
  const transactionId = params.get("transactionId") || "DON000000";

  const formattedAmount = Number(amount || 0).toLocaleString("en-IN");

  const formattedFrequency =
    frequency.charAt(0).toUpperCase() + frequency.slice(1);

  const handleReceipt = () => {
    alert("Receipt download will be connected to the backend.");
  };

  const handleShare = async () => {
    const shareData = {
      title: "Seva Contribution",
      text: `I contributed ₹${formattedAmount} towards ${seva}. Jai Shree Krishna 🙏`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <main
      className="
        relative flex min-h-[100dvh] w-full
        items-center justify-center
        overflow-hidden
        px-5 pt-5
        pb-[calc(20px+env(safe-area-inset-bottom))]
        text-[#4b4039]
        bg-[radial-gradient(circle_at_50%_0%,#ffffff_0%,#fffaf0_42%,#f6ead5_100%)]

        max-[359px]:p-[14px]

        min-[430px]:max-[599px]:p-7

        min-[600px]:max-[1023px]:px-6
        min-[600px]:max-[1023px]:py-[50px]

        min-[1024px]:min-h-screen
        min-[1024px]:px-10
        min-[1024px]:py-[65px]
        min-[1024px]:bg-[radial-gradient(circle_at_top_left,rgba(25,168,120,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(201,148,53,0.13),transparent_30%),#fff9ed]
      "
    >
      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute rounded-full
          h-[160px] w-[160px]
          -top-[70px] -right-[65px]
          bg-[rgba(25,168,120,0.08)]

          min-[1024px]:h-[290px]
          min-[1024px]:w-[290px]
          min-[1024px]:-top-[130px]
          min-[1024px]:-right-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute rounded-full
          h-[170px] w-[170px]
          -left-[85px] -bottom-[80px]
          bg-[rgba(201,148,53,0.09)]

          min-[1024px]:h-[280px]
          min-[1024px]:w-[280px]
          min-[1024px]:-left-[130px]
          min-[1024px]:-bottom-[120px]
        "
      />

      {/* SUCCESS CARD */}

      <section
        className="
          relative z-[2]
          w-full max-w-[390px]
          rounded-2xl
          border border-[#eadbc5]
          bg-[#fffdf8]
          px-[18px] py-[25px]
          text-center
          shadow-[0_10px_30px_rgba(79,43,14,0.07)]

          max-[359px]:rounded-[14px]
          max-[359px]:px-[14px]
          max-[359px]:py-[22px]

          min-[430px]:max-[599px]:max-w-[430px]
          min-[430px]:max-[599px]:rounded-[19px]
          min-[430px]:max-[599px]:px-6
          min-[430px]:max-[599px]:py-8

          min-[600px]:max-[1023px]:max-w-[520px]
          min-[600px]:max-[1023px]:rounded-[23px]
          min-[600px]:max-[1023px]:px-[42px]
          min-[600px]:max-[1023px]:pt-[42px]
          min-[600px]:max-[1023px]:pb-[38px]
          min-[600px]:max-[1023px]:shadow-[0_18px_45px_rgba(79,43,14,0.09)]

          min-[1024px]:max-w-[610px]
          min-[1024px]:rounded-[28px]
          min-[1024px]:px-[55px]
          min-[1024px]:pt-[52px]
          min-[1024px]:pb-[46px]
          min-[1024px]:bg-[rgba(255,253,248,0.98)]
          min-[1024px]:shadow-[0_24px_65px_rgba(79,43,14,0.11)]

          min-[1440px]:max-w-[660px]
          min-[1440px]:px-[62px]
          min-[1440px]:pt-[58px]
          min-[1440px]:pb-[52px]
        "
      >
        {/* CHECK ICON */}

        <div
          className="
            mx-auto mb-3
            grid h-[72px] w-[72px]
            place-items-center
            rounded-full
            bg-[linear-gradient(145deg,#21ba86,#14895f)]
            text-[42px] font-bold
            text-white
            shadow-[0_8px_20px_rgba(25,168,120,0.2)]

            max-[359px]:mb-[10px]
            max-[359px]:h-[62px]
            max-[359px]:w-[62px]
            max-[359px]:text-[36px]

            max-[599px]:max-[650px]:h-[56px]

            min-[430px]:max-[599px]:h-20
            min-[430px]:max-[599px]:w-20
            min-[430px]:max-[599px]:text-[46px]

            min-[600px]:max-[1023px]:mb-4
            min-[600px]:max-[1023px]:h-[88px]
            min-[600px]:max-[1023px]:w-[88px]
            min-[600px]:max-[1023px]:text-[51px]

            min-[1024px]:mb-[18px]
            min-[1024px]:h-[98px]
            min-[1024px]:w-[98px]
            min-[1024px]:text-[56px]
            min-[1024px]:shadow-[0_12px_28px_rgba(25,168,120,0.22)]

            min-[1440px]:h-[106px]
            min-[1440px]:w-[106px]
            min-[1440px]:text-[61px]
          "
        >
          ✓
        </div>

        {/* STATUS */}

        <span
          className="
            mb-[6px]
            inline-block
            rounded-full
            border border-[#cfe8dd]
            bg-[#edf8f3]
            px-[10px] py-[5px]
            text-[9px]
            font-bold
            uppercase
            tracking-[0.7px]
            text-[#248463]

            max-[359px]:text-[8px]

            min-[600px]:max-[1023px]:mb-2
            min-[600px]:max-[1023px]:px-3
            min-[600px]:max-[1023px]:py-1.5

            min-[1024px]:mb-[9px]
            min-[1024px]:px-[13px]
            min-[1024px]:py-1.5
            min-[1024px]:text-[10px]
          "
        >
          Payment Successful
        </span>

        {/* TITLE */}

        <h1
          className="
            m-0
            font-[Georgia,'Times_New_Roman',serif]
            text-[21px]
            leading-[1.2]
            text-[#27634e]

            max-[359px]:text-[19px]

            min-[430px]:max-[599px]:text-[25px]

            min-[600px]:max-[1023px]:text-[30px]

            min-[1024px]:text-[36px]

            min-[1440px]:text-[40px]
          "
        >
          {type === "auto" ? "Auto Seva Started!" : "Seva Successful!"}
        </h1>

        <h2
          className="
            mt-[7px]
            mb-0
            font-[Georgia,'Times_New_Roman',serif]
            text-[15px]
            text-[#a71919]

            max-[359px]:text-[14px]

            min-[430px]:max-[599px]:text-[16px]

            min-[600px]:max-[1023px]:mt-[9px]
            min-[600px]:max-[1023px]:text-[17px]

            min-[1024px]:mt-[10px]
            min-[1024px]:text-[19px]

            min-[1440px]:text-[20px]
          "
        >
          Jai Shree Krishna
        </h2>

        {/* DIVIDER */}

        <div
          className="
            my-3
            flex items-center justify-center gap-2

            max-[599px]:max-[650px]:my-2

            min-[600px]:max-[1023px]:my-[17px]

            min-[1024px]:my-5
          "
        >
          <span
            className="
              h-px w-[45px]
              bg-[linear-gradient(to_right,transparent,#d5b66d)]

              min-[600px]:max-[1023px]:w-[70px]

              min-[1024px]:w-[90px]
            "
          />

          <b
            className="
              text-[9px]
              text-[#c99435]

              min-[1024px]:text-[11px]
            "
          >
            ✦
          </b>

          <span
            className="
              h-px w-[45px]
              bg-[linear-gradient(to_left,transparent,#d5b66d)]

              min-[600px]:max-[1023px]:w-[70px]

              min-[1024px]:w-[90px]
            "
          />
        </div>

        {/* THANKS */}

        <p
          className="
            mx-auto
            mb-[17px]
            max-w-[300px]
            text-[12px]
            leading-[1.5]
            text-[#776d65]

            max-[359px]:mb-[14px]
            max-[359px]:text-[11px]

            min-[430px]:max-[599px]:text-[13px]

            min-[600px]:max-[1023px]:mb-[23px]
            min-[600px]:max-[1023px]:max-w-[380px]
            min-[600px]:max-[1023px]:text-[14px]

            min-[1024px]:mb-7
            min-[1024px]:max-w-[420px]
            min-[1024px]:text-[15px]
            min-[1024px]:leading-[1.6]

            min-[1440px]:text-[16px]
          "
        >
          Thank you for your
          <br />
          generous contribution.
        </p>

        {/* DETAILS */}

        <div
          className="
            rounded-[10px]
            border border-[#f0dfc4]
            bg-[#fff8eb]
            p-3
            text-left

            max-[359px]:p-[10px]

            min-[430px]:max-[599px]:p-[15px]

            min-[600px]:max-[1023px]:rounded-[13px]
            min-[600px]:max-[1023px]:px-[18px]
            min-[600px]:max-[1023px]:py-4

            min-[1024px]:rounded-[14px]
            min-[1024px]:px-[22px]
            min-[1024px]:py-[19px]
          "
        >
          {/* SEVA */}

          <div
            className="
              flex items-center justify-between
              gap-3
              border-b border-[#eee0cc]
              py-2
              text-[11px]

              max-[359px]:text-[10px]

              min-[430px]:max-[599px]:py-[9px]
              min-[430px]:max-[599px]:text-[12px]

              min-[600px]:max-[1023px]:py-[10px]
              min-[600px]:max-[1023px]:text-[13px]

              min-[1024px]:py-[11px]
              min-[1024px]:text-[13px]

              min-[1440px]:text-[14px]
            "
          >
            <span className="shrink-0 text-[#8a8077]">Seva</span>

            <b className="overflow-wrap-anywhere text-right text-[#433932]">
              {seva}
            </b>
          </div>

          {/* AMOUNT */}

          <div
            className="
              flex items-center justify-between
              gap-3
              border-b border-[#eee0cc]
              py-2
              text-[11px]

              max-[359px]:text-[10px]

              min-[430px]:max-[599px]:py-[9px]
              min-[430px]:max-[599px]:text-[12px]

              min-[600px]:max-[1023px]:py-[10px]
              min-[600px]:max-[1023px]:text-[13px]

              min-[1024px]:py-[11px]
              min-[1024px]:text-[13px]

              min-[1440px]:text-[14px]
            "
          >
            <span className="shrink-0 text-[#8a8077]">Amount</span>

            <b
              className="
                overflow-wrap-anywhere
                text-right
                text-[13px]
                text-[#a71919]

                min-[600px]:max-[1023px]:text-[15px]

                min-[1024px]:text-[16px]
              "
            >
              ₹{formattedAmount}
            </b>
          </div>

          {/* FREQUENCY */}

          {type === "auto" && (
            <div
              className="
                flex items-center justify-between
                gap-3
                border-b border-[#eee0cc]
                py-2
                text-[11px]

                max-[359px]:text-[10px]

                min-[430px]:max-[599px]:py-[9px]
                min-[430px]:max-[599px]:text-[12px]

                min-[600px]:max-[1023px]:py-[10px]
                min-[600px]:max-[1023px]:text-[13px]

                min-[1024px]:py-[11px]
                min-[1024px]:text-[13px]

                min-[1440px]:text-[14px]
              "
            >
              <span className="shrink-0 text-[#8a8077]">Frequency</span>

              <b className="overflow-wrap-anywhere text-right text-[#433932]">
                {formattedFrequency}
              </b>
            </div>
          )}

          {/* TRANSACTION ID */}

          <div
            className="
              flex items-center justify-between
              gap-3
              border-b border-[#eee0cc]
              py-2
              text-[11px]

              max-[359px]:text-[10px]

              min-[430px]:max-[599px]:py-[9px]
              min-[430px]:max-[599px]:text-[12px]

              min-[600px]:max-[1023px]:py-[10px]
              min-[600px]:max-[1023px]:text-[13px]

              min-[1024px]:py-[11px]
              min-[1024px]:text-[13px]

              min-[1440px]:text-[14px]
            "
          >
            <span className="shrink-0 text-[#8a8077]">
              Transaction ID
            </span>

            <b
              className="
                overflow-wrap-anywhere
                text-right
                font-mono
                tracking-[0.4px]
                text-[#433932]
              "
            >
              {transactionId}
            </b>
          </div>

          {/* DATE */}

          <div
            className="
              flex items-center justify-between
              gap-3
              py-2
              text-[11px]

              max-[359px]:text-[10px]

              min-[430px]:max-[599px]:py-[9px]
              min-[430px]:max-[599px]:text-[12px]

              min-[600px]:max-[1023px]:py-[10px]
              min-[600px]:max-[1023px]:text-[13px]

              min-[1024px]:py-[11px]
              min-[1024px]:text-[13px]

              min-[1440px]:text-[14px]
            "
          >
            <span className="shrink-0 text-[#8a8077]">Date</span>

            <b className="overflow-wrap-anywhere text-right text-[#433932]">
              14 Sep 2026
            </b>
          </div>
        </div>

        {/* ACTIONS */}

        <div
          className="
            w-full

            min-[1024px]:mx-auto
            min-[1024px]:max-w-[420px]

            min-[1440px]:max-w-[450px]
          "
        >
          {/* RECEIPT */}

          <button
            type="button"
            onClick={handleReceipt}
            className="
              mt-3
              inline-flex h-[45px] w-full
              items-center justify-center
              gap-2
              rounded-[9px]
              border-0
              bg-[#a71919]
              text-[13px] font-bold
              text-white
              shadow-[0_6px_15px_rgba(113,17,17,0.13)]
              transition-all duration-200 ease-in-out
              active:scale-[0.985]

              max-[359px]:mt-[9px]
              max-[359px]:h-[43px]
              max-[359px]:text-[12px]

              min-[430px]:max-[599px]:h-[49px]
              min-[430px]:max-[599px]:text-[14px]

              min-[600px]:max-[1023px]:h-[52px]
              min-[600px]:max-[1023px]:rounded-[11px]
              min-[600px]:max-[1023px]:text-[14px]

              min-[1024px]:mt-6
              min-[1024px]:h-[54px]
              min-[1024px]:rounded-[12px]
              min-[1024px]:text-[15px]
              min-[1024px]:hover:-translate-y-px
              min-[1024px]:hover:bg-[#7f1111]
              min-[1024px]:hover:shadow-[0_9px_22px_rgba(113,17,17,0.18)]

              min-[1440px]:h-[57px]
              min-[1440px]:text-[16px]
            "
          >
            <span className="text-[17px]">⇩</span>
            Download Receipt
          </button>

          {/* SHARE */}

          <button
            type="button"
            onClick={handleShare}
            className="
              mt-[9px]
              inline-flex h-[45px] w-full
              items-center justify-center
              gap-[7px]
              rounded-[9px]
              border border-[#eadbc5]
              bg-white
              text-[13px] font-bold
              text-[#a71919]
              transition-all duration-200 ease-in-out
              active:scale-[0.985]

              max-[359px]:h-[43px]
              max-[359px]:text-[12px]

              min-[430px]:max-[599px]:h-[49px]
              min-[430px]:max-[599px]:text-[14px]

              min-[600px]:max-[1023px]:h-[52px]
              min-[600px]:max-[1023px]:rounded-[11px]
              min-[600px]:max-[1023px]:text-[14px]

              min-[1024px]:mt-[10px]
              min-[1024px]:rounded-[12px]
              min-[1024px]:text-[14px]
              min-[1024px]:hover:-translate-y-px
              min-[1024px]:hover:border-[#a71919]
              min-[1024px]:hover:bg-[#fff5ed]

              min-[1440px]:text-[14px]
            "
          >
            <span className="text-[16px]">↗</span>
            Share
          </button>

          {/* HOME */}

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="
              mt-[5px]
              h-[42px] w-full
              border-0
              bg-transparent
              text-[12px]
              font-bold
              text-[#776d65]
              transition-colors duration-200
              hover:text-[#a71919]

              max-[359px]:h-[38px]
              max-[359px]:text-[11px]

              min-[600px]:max-[1023px]:h-[43px]
              min-[600px]:max-[1023px]:text-[13px]

              min-[1024px]:h-[44px]
              min-[1024px]:text-[13px]
            "
          >
            ← Back to Home
          </button>
        </div>

        {/* SECURE */}

        <div
          className="
            mt-[10px]
            text-[9px]
            font-semibold
            text-[#9b762f]

            min-[600px]:max-[1023px]:mt-[14px]
            min-[600px]:max-[1023px]:text-[10px]

            min-[1024px]:mt-[17px]
            min-[1024px]:text-[10px]
          "
        >
          🔒 Your payment was
          <br className="min-[430px]:hidden" />
          processed securely
        </div>
      </section>
    </main>
  );
}