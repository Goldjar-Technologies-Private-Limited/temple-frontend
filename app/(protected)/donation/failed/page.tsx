"use client";

import { useRouter } from "next/navigation";

export default function DonationFailed() {
  const router = useRouter();

  return (
    <main
      className="
        relative flex min-h-[100dvh] w-full items-center justify-center
        overflow-hidden px-5 pt-5
        pb-[calc(20px+env(safe-area-inset-bottom))]
        text-[#4b4039]
        bg-[radial-gradient(circle_at_50%_5%,#ffffff_0%,#fffaf0_42%,#f6ead5_100%)]
        
        max-[359px]:p-[14px]

        min-[430px]:max-[599px]:p-7

        min-[600px]:max-[1023px]:px-6
        min-[600px]:max-[1023px]:py-[50px]

        min-[1024px]:min-h-screen
        min-[1024px]:px-10
        min-[1024px]:py-[60px]
        min-[1024px]:bg-[radial-gradient(circle_at_top_left,rgba(201,148,53,0.13),transparent_33%),radial-gradient(circle_at_bottom_right,rgba(167,25,25,0.08),transparent_30%),#fff9ed]
      "
    >
      {/* DECORATION */}

      <div
        className="
          pointer-events-none absolute
          h-[100px] w-[100px]
          rounded-full
          border border-[#d5b66d]
          opacity-[0.14]
          left-[-50px] bottom-[30px]

          min-[1024px]:h-[180px]
          min-[1024px]:w-[180px]
          min-[1024px]:left-[-70px]
          min-[1024px]:bottom-[55px]
          min-[1024px]:opacity-10
        "
      />

      <div
        className="
          pointer-events-none absolute
          h-[100px] w-[100px]
          rounded-full
          border border-[#d5b66d]
          opacity-[0.14]
          top-[35px] right-[-50px]

          min-[1024px]:h-[180px]
          min-[1024px]:w-[180px]
          min-[1024px]:top-[55px]
          min-[1024px]:right-[-70px]
          min-[1024px]:opacity-10
        "
      />

      {/* CARD */}

      <section
        className="
          relative z-[2]
          w-full max-w-[390px]
          rounded-2xl
          border border-[#eadbc5]
          bg-[#fffdf8]
          px-[18px] py-[30px]
          text-center
          shadow-[0_10px_30px_rgba(79,43,14,0.07)]

          max-[359px]:rounded-[14px]
          max-[359px]:px-[15px]
          max-[359px]:py-[25px]

          min-[430px]:max-[599px]:max-w-[420px]
          min-[430px]:max-[599px]:rounded-[18px]
          min-[430px]:max-[599px]:px-6
          min-[430px]:max-[599px]:py-[35px]

          min-[600px]:max-[1023px]:max-w-[500px]
          min-[600px]:max-[1023px]:rounded-[22px]
          min-[600px]:max-[1023px]:px-10
          min-[600px]:max-[1023px]:py-[42px]
          min-[600px]:max-[1023px]:shadow-[0_18px_45px_rgba(79,43,14,0.09)]

          min-[1024px]:max-w-[560px]
          min-[1024px]:rounded-[26px]
          min-[1024px]:px-[52px]
          min-[1024px]:pt-[50px]
          min-[1024px]:pb-[45px]
          min-[1024px]:bg-[rgba(255,253,248,0.98)]
          min-[1024px]:shadow-[0_22px_60px_rgba(79,43,14,0.11)]

          min-[1440px]:max-w-[600px]
          min-[1440px]:px-[58px]
          min-[1440px]:pt-[56px]
          min-[1440px]:pb-[50px]
        "
      >
        {/* FAILED ICON */}

        <div
          className="
            mx-auto mb-[14px]
            grid h-[72px] w-[72px] place-items-center
            rounded-full
            bg-[linear-gradient(145deg,#c84b42,#a92720)]
            font-[Arial,sans-serif]
            text-[43px] font-light leading-none text-white
            shadow-[0_7px_18px_rgba(184,58,50,0.2)]

            max-[359px]:mb-3
            max-[359px]:h-[62px]
            max-[359px]:w-[62px]
            max-[359px]:text-[37px]

            min-[430px]:max-[599px]:h-[78px]
            min-[430px]:max-[599px]:w-[78px]
            min-[430px]:max-[599px]:text-[46px]

            min-[600px]:max-[1023px]:mb-[18px]
            min-[600px]:max-[1023px]:h-[84px]
            min-[600px]:max-[1023px]:w-[84px]
            min-[600px]:max-[1023px]:text-[50px]

            min-[1024px]:mb-5
            min-[1024px]:h-[92px]
            min-[1024px]:w-[92px]
            min-[1024px]:text-[55px]
            min-[1024px]:shadow-[0_10px_25px_rgba(184,58,50,0.2)]

            min-[1440px]:h-[100px]
            min-[1440px]:w-[100px]
            min-[1440px]:text-[60px]
          "
        >
          ×
        </div>

        {/* TITLE */}

        <h1
          className="
            m-0
            font-[Georgia,'Times_New_Roman',serif]
            text-[22px] font-bold
            text-[#a71919]

            max-[359px]:text-[20px]

            min-[430px]:max-[599px]:text-[25px]

            min-[600px]:max-[1023px]:text-[30px]

            min-[1024px]:text-[34px]

            min-[1440px]:text-[38px]
          "
        >
          Payment Failed
        </h1>

        <h2
          className="
            my-[7px]
            font-[Georgia,'Times_New_Roman',serif]
            text-[15px] font-bold
            text-[#641010]

            max-[359px]:text-[14px]

            min-[430px]:max-[599px]:text-[16px]

            min-[600px]:max-[1023px]:mt-[9px]
            min-[600px]:max-[1023px]:text-[17px]

            min-[1024px]:mt-[10px]
            min-[1024px]:mb-0
            min-[1024px]:text-[18px]

            min-[1440px]:text-[19px]
          "
        >
          Jai Shree Krishna
        </h2>

        {/* DIVIDER */}

        <div
          className="
            my-[13px]
            flex items-center justify-center gap-2

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
              text-[9px] text-[#c99435]

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

        {/* MESSAGE */}

        <p
          className="
            mx-auto mb-5
            max-w-[310px]
            text-[12px]
            leading-[1.6]
            text-[#776d65]

            max-[359px]:mb-[17px]
            max-[359px]:text-[11px]

            min-[430px]:max-[599px]:text-[13px]

            min-[600px]:max-[1023px]:mb-[25px]
            min-[600px]:max-[1023px]:max-w-[360px]
            min-[600px]:max-[1023px]:text-[14px]

            min-[1024px]:mb-[29px]
            min-[1024px]:max-w-[400px]
            min-[1024px]:text-[14px]
            min-[1024px]:leading-[1.7]

            min-[1440px]:max-w-[420px]
            min-[1440px]:text-[15px]
          "
        >
          We could not complete your contribution.
          <br />
          Please try again.
        </p>

        {/* ACTIONS */}

        <div
          className="
            w-full

            min-[1024px]:mx-auto
            min-[1024px]:max-w-[390px]

            min-[1440px]:max-w-[420px]
          "
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="
              h-[46px] w-full
              rounded-[9px]
              border-0
              bg-[#a71919]
              text-[14px] font-bold
              text-white
              shadow-[0_6px_15px_rgba(113,17,17,0.14)]
              transition-all duration-200 ease-in-out

              active:scale-[0.985]

              max-[359px]:h-[44px]
              max-[359px]:text-[13px]

              min-[430px]:max-[599px]:h-[50px]
              min-[430px]:max-[599px]:text-[15px]

              min-[600px]:max-[1023px]:h-[53px]
              min-[600px]:max-[1023px]:rounded-[11px]
              min-[600px]:max-[1023px]:text-[15px]

              min-[1024px]:h-[54px]
              min-[1024px]:rounded-[12px]
              min-[1024px]:text-[15px]
              min-[1024px]:hover:-translate-y-px
              min-[1024px]:hover:bg-[#7f1111]
              min-[1024px]:hover:shadow-[0_9px_22px_rgba(113,17,17,0.18)]

              min-[1440px]:h-[56px]
              min-[1440px]:text-[16px]
            "
          >
            Try Again
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="
              mt-2
              h-[42px] w-full
              border-0
              bg-transparent
              text-[12px]
              text-[#776d65]
              transition-colors duration-200 ease-in-out

              max-[359px]:h-[38px]
              max-[359px]:text-[11px]

              min-[600px]:max-[1023px]:h-[44px]
              min-[600px]:max-[1023px]:text-[13px]

              min-[1024px]:mt-[9px]
              min-[1024px]:h-[44px]
              min-[1024px]:text-[13px]
              min-[1024px]:hover:text-[#a71919]
            "
          >
            ← Back to Home
          </button>
        </div>

        {/* SECURITY */}

        <div
          className="
            mt-[13px]
            text-[9px] font-semibold
            text-[#9b762f]

            max-[600px]:mt-[8px]

            min-[600px]:max-[1023px]:text-[10px]

            min-[1024px]:mt-[18px]
            min-[1024px]:text-[10px]
          "
        >
          🔒 Your payment information is secure
        </div>
      </section>
    </main>
  );
}
