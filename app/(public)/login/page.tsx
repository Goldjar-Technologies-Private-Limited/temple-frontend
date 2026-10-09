"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/contexts/LanguageProvider";

export default function Login() {
  const router = useRouter();

  const { t } = useLanguage();

  const [mobile, setMobile] = useState("");

  const sendOtp = () => {
    if (mobile.length === 10) {
      router.push(
        `/otp?mobile=${mobile}`
      );
    }
  };

  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.value.replace(
        /\D/g,
        ""
      );

    if (value.length <= 10) {
      setMobile(value);
      
      if (value.length === 10) {
        router.push(
          `/otp?mobile=${value}`
        );
      }
    }
  };

  return (
    <main className="screen">
      <section className="content">
        {/* ORNAMENT */}

        <img
          src="/images/login-ornament.png"
          alt=""
          className="ornament"
        />

        {/* TITLE */}

        <h1>
          {t("welcomeDevotee")}
        </h1>

        {/* SUBTITLE */}

        <p className="subtitle">
          {t("enterMobile")}
        </p>

        {/* MOBILE INPUT */}

        <div className="mobileInput">
          <span className="countryCode">
            🇮🇳 +91
          </span>

          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder={t(
              "mobileNumber"
            )}
            value={mobile}
            onChange={
              handleMobileChange
            }
            aria-label={t(
              "mobileNumber"
            )}
          />
        </div>

        {/* BOTTOM ACTION */}

        <div className="bottom">
          <button
            type="button"
            className="primary"
            disabled={
              mobile.length !== 10
            }
            onClick={sendOtp}
          >
            {t("sendOtp")}
            <span>›</span>
          </button>

          <small className="terms">
            {t("termsText")}
          </small>
        </div>
      </section>

      {/* DECORATION */}

      <div className="cornerLeft" />
      <div className="cornerRight" />

      <style jsx global>{`
        /* ==========================================
           PAGE
        ========================================== */

        .screen {
          position: relative;

          width: 100%;
          min-height: 100dvh;

          overflow: hidden;

          display: flex;
          flex-direction: column;

          background:
            linear-gradient(
              180deg,
              #fffaf0 0%,
              #fff7e9 100%
            );

          color: var(--text);

          text-align: center;
        }

        /* ==========================================
           CONTENT
        ========================================== */

        .content {
          position: relative;

          z-index: 3;

          width:
            min(
              calc(100% - 48px),
              390px
            );

          min-height: 100dvh;

          margin: 0 auto;

          padding-top: 5vh;
        }

        /* ==========================================
           ORNAMENT
        ========================================== */

        .ornament {
          width: 125px;
          height: 125px;

          display: block;

          margin:
            0 auto -4px;

          object-fit: contain;

          opacity: 0.58;
        }

        /* ==========================================
           TITLE
        ========================================== */

        .content h1 {
          margin: 0;

          color:
            var(--maroon);

          font:
            700 29px/1.15
            Georgia,
            "Times New Roman",
            serif;
        }

        .subtitle {
          margin:
            8px 0 20px;

          color:
            var(--muted);

          font-size: 14px;
          line-height: 1.5;
        }

        /* ==========================================
           MOBILE INPUT
        ========================================== */

        .mobileInput {
          width: 100%;
          height: 55px;

          display: flex;
          align-items: center;

          padding:
            0 15px;

          border:
            1px solid #d3a653;

          border-radius:
            14px;

          background:
            #fffdf9;

          box-shadow:
            0 4px 14px
            rgba(
              107,
              61,
              13,
              0.05
            );

          transition:
            border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .mobileInput:focus-within {
          border-color:
            var(--maroon);

          box-shadow:
            0 0 0 3px
            rgba(
              167,
              25,
              25,
              0.08
            );
        }

        .countryCode {
          white-space: nowrap;

          color:
            var(--text);

          font-size: 14px;
          font-weight: 600;
        }

        .mobileInput input {
          flex: 1;

          min-width: 0;
          height: 100%;

          padding:
            0 9px;

          border: 0;

          outline: 0;

          background:
            transparent;

          color:
            var(--text);

          font-size: 15px;
        }

        .mobileInput input::placeholder {
          color: #a49a91;
        }

        /* ==========================================
           BOTTOM ACTION
        ========================================== */

        .bottom {
          position: absolute;

          left: 0;
          right: 0;

          bottom:
            calc(
              32px +
              env(
                safe-area-inset-bottom
              )
            );
        }

        .primary {
          width: 100%;
          height: 52px;

          display:
            inline-flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          border: 0;

          border-radius:
            13px;

          background:
            var(--maroon);

          color: #fff;

          font-size: 16px;
          font-weight: 700;

          box-shadow:
            0 6px 15px
            rgba(
              113,
              17,
              17,
              0.13
            );

          transition:
            transform 0.18s ease,
            background 0.18s ease,
            box-shadow 0.18s ease;
        }

        .primary span {
          font-size: 22px;

          line-height: 1;
        }

        .primary:disabled {
          background:
            #d28d88;

          box-shadow: none;
        }

        .primary:not(
          :disabled
        ):active {
          transform:
            scale(0.985);
        }

        /* ==========================================
           TERMS
        ========================================== */

        .terms {
          display: block;

          margin-top: 14px;

          color: #776c63;

          font-size: 11px;
          line-height: 1.7;
        }

        /* ==========================================
           GOLD CORNERS
        ========================================== */

        .cornerLeft,
        .cornerRight {
          position: absolute;

          bottom: 20px;

          width: 58px;
          height: 58px;

          border:
            1px solid #d5b66d;

          border-radius: 50%;

          opacity: 0.2;

          pointer-events: none;
        }

        .cornerLeft {
          left: -29px;
        }

        .cornerRight {
          right: -29px;
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (
          max-width: 359px
        ) {
          .content {
            width:
              calc(
                100% - 28px
              );

            padding-top:
              3vh;
          }

          .ornament {
            width: 95px;
            height: 95px;
          }

          .content h1 {
            font-size: 25px;
          }

          .subtitle {
            margin:
              6px 0 16px;

            font-size: 12px;
          }

          .mobileInput {
            height: 50px;

            padding:
              0 12px;
          }

          .countryCode {
            font-size: 13px;
          }

          .mobileInput input {
            font-size: 14px;
          }

          .primary {
            height: 48px;

            font-size: 14px;
          }

          .terms {
            font-size: 10px;
          }
        }

        /* ==========================================
           SHORT MOBILE HEIGHT
        ========================================== */

        @media (
          max-height: 700px
        ) and (
          max-width: 599px
        ) {
          .content {
            padding-top: 2vh;
          }

          .ornament {
            width: 92px;
            height: 92px;
          }

          .content h1 {
            font-size: 25px;
          }

          .subtitle {
            margin:
              5px 0 14px;
          }

          .mobileInput {
            height: 49px;
          }

          .bottom {
            bottom:
              calc(
                16px +
                env(
                  safe-area-inset-bottom
                )
              );
          }

          .primary {
            height: 46px;
          }

          .terms {
            margin-top: 9px;
          }
        }

        /* ==========================================
           LARGE MOBILE
        ========================================== */

        @media (
          min-width: 430px
        ) and (
          max-width: 599px
        ) {
          .content {
            width:
              min(
                calc(
                  100% - 48px
                ),
                420px
              );

            padding-top:
              7vh;
          }

          .ornament {
            width: 140px;
            height: 140px;
          }

          .content h1 {
            font-size: 32px;
          }

          .subtitle {
            font-size: 15px;
          }

          .mobileInput {
            height: 59px;
          }

          .countryCode {
            font-size: 15px;
          }

          .mobileInput input {
            font-size: 16px;
          }

          .primary {
            height: 54px;

            font-size: 16px;
          }
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (
          min-width: 600px
        ) and (
          max-width: 1023px
        ) {
          .screen {
            min-height: 100vh;

            display: grid;

            place-items: center;

            padding:
              50px 24px;
          }

          .content {
            width: 480px;

            max-width: 100%;

            min-height: auto;

            margin: 0;

            padding:
              36px 38px
              34px;

            border:
              1px solid
              var(--border);

            border-radius:
              24px;

            background:
              rgba(
                255,
                253,
                248,
                0.96
              );

            box-shadow:
              0 18px 45px
              rgba(
                83,
                48,
                14,
                0.1
              );
          }

          .ornament {
            width: 145px;
            height: 145px;
          }

          .content h1 {
            font-size: 34px;
          }

          .subtitle {
            margin:
              10px 0 26px;

            font-size: 15px;
          }

          .mobileInput {
            height: 60px;
          }

          .countryCode {
            font-size: 15px;
          }

          .mobileInput input {
            font-size: 16px;
          }

          .bottom {
            position: static;

            margin-top: 32px;
          }

          .primary {
            height: 54px;

            font-size: 16px;
          }

          .terms {
            font-size: 11px;
          }

          .cornerLeft,
          .cornerRight {
            width: 90px;
            height: 90px;

            opacity: 0.15;
          }

          .cornerLeft {
            left: 25px;
          }

          .cornerRight {
            right: 25px;
          }
        }

        /* ==========================================
           DESKTOP WEBSITE
        ========================================== */

        @media (
          min-width: 1024px
        ) {
          .screen {
            min-height:
              100vh;

            display: grid;

            place-items: center;

            padding:
              70px 40px;

            background:
              radial-gradient(
                circle at top left,
                rgba(
                  201,
                  148,
                  53,
                  0.12
                ),
                transparent 34%
              ),
              radial-gradient(
                circle at bottom right,
                rgba(
                  167,
                  25,
                  25,
                  0.08
                ),
                transparent 30%
              ),
              #fff9ed;
          }

          .content {
            width: 520px;

            max-width: 100%;

            min-height: auto;

            margin: 0;

            padding:
              42px 46px
              38px;

            border:
              1px solid
              var(--border);

            border-radius:
              28px;

            background:
              rgba(
                255,
                253,
                248,
                0.97
              );

            box-shadow:
              0 22px 55px
              rgba(
                90,
                52,
                16,
                0.12
              );
          }

          .ornament {
            width: 150px;
            height: 150px;

            margin-bottom:
              -2px;
          }

          .content h1 {
            font-size: 38px;
          }

          .subtitle {
            margin:
              10px 0 30px;

            font-size: 16px;
          }

          .mobileInput {
            height: 62px;

            padding:
              0 18px;

            border-radius:
              15px;
          }

          .countryCode {
            font-size: 15px;
          }

          .mobileInput input {
            font-size: 16px;
          }

          .bottom {
            position: static;

            margin-top: 34px;
          }

          .primary {
            height: 56px;

            border-radius:
              14px;

            font-size: 16px;
          }

          .primary:not(
            :disabled
          ):hover {
            background:
              var(
                --dark-maroon
              );

            transform:
              translateY(-1px);

            box-shadow:
              0 9px 22px
              rgba(
                113,
                17,
                17,
                0.18
              );
          }

          .terms {
            margin-top: 16px;

            font-size: 11px;
          }

          .cornerLeft,
          .cornerRight {
            width: 120px;
            height: 120px;

            bottom: 35px;

            opacity: 0.12;
          }

          .cornerLeft {
            left: 30px;
          }

          .cornerRight {
            right: 30px;
          }
        }

        /* ==========================================
           LARGE DESKTOP
        ========================================== */

        @media (
          min-width: 1440px
        ) {
          .content {
            width: 560px;

            padding:
              48px 50px
              42px;
          }

          .ornament {
            width: 165px;
            height: 165px;
          }

          .content h1 {
            font-size: 40px;
          }

          .mobileInput {
            height: 64px;
          }

          .primary {
            height: 58px;
          }
        }
      `}</style>
    </main>
  );
}