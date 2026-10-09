"use client";

import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  useLanguage,
} from "@/contexts/LanguageProvider";

export default function OtpClient() {
  const router = useRouter();
  const params = useSearchParams();

  const { t } = useLanguage();

  const mobile =
    params.get("mobile") || "";

  const [otp, setOtp] =
    useState("");

  const verify = () => {
    if (otp.length === 6) {
      router.push("/dashboard");
    }
  };

  const resendOtp = () => {
    setOtp("");
  };

  const changeMobileNumber = () => {
    router.back();
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      e.target.value.replace(
        /\D/g,
        ""
      );

    if (value.length <= 6) {
      setOtp(value);
      
      if (value.length === 6) {
        router.push("/dashboard");
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
          {t(
            "verifyMobileNumber"
          )}
        </h1>

        {/* OTP INFO */}

        <p className="subtitle">
          {t(
            "enterSixDigitOtp"
          )}

          <br />

          <strong>
            +91 {mobile}
          </strong>
        </p>

        {/* OTP INPUT */}

        <input
          className="otpInput"
          type="tel"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="• • • • • •"
          value={otp}
          onChange={
            handleOtpChange
          }
          aria-label="OTP"
        />

        {/* VERIFY */}

        <button
          type="button"
          className="verify"
          disabled={
            otp.length !== 6
          }
          onClick={verify}
        >
          {t(
            "verifyContinue"
          )}

          <span>›</span>
        </button>

        {/* RESEND */}

        <button
          type="button"
          className="resend"
          onClick={resendOtp}
        >
          {t("resendOtp")}
        </button>

        {/* CHANGE MOBILE */}

        <button
          type="button"
          className="back"
          onClick={
            changeMobileNumber
          }
        >
          ←{" "}
          {t(
            "changeMobileNumber"
          )}
        </button>
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
            radial-gradient(
              circle at 50% 10%,
              #ffffff 0,
              #fffaf0 38%,
              #f8ecd6 100%
            );

          color:
            var(--text);

          text-align: center;
        }

        /* ==========================================
           CONTENT
        ========================================== */

        .content {
          position: relative;

          z-index: 2;

          width:
            min(
              calc(
                100% - 48px
              ),
              390px
            );

          min-height: 100dvh;

          margin: 0 auto;

          padding-top: 6vh;
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

          border: 0;

          border-radius: 0;

          background:
            transparent;

          box-shadow: none;
        }

        /* ==========================================
           TITLE
        ========================================== */

        .content h1 {
          margin: 0;

          color:
            var(--maroon);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 29px;

          line-height: 1.15;

          font-weight: 700;
        }

        /* ==========================================
           MESSAGE
        ========================================== */

        .subtitle {
          margin:
            10px 0 24px;

          color:
            var(--muted);

          font-size: 14px;

          line-height: 1.55;
        }

        .subtitle strong {
          color:
            var(--text);

          font-weight: 700;
        }

        /* ==========================================
           OTP INPUT
        ========================================== */

        .otpInput {
          width: 100%;

          height: 58px;

          padding:
            0 18px;

          border:
            1px solid #d3a653;

          border-radius:
            14px;

          outline: none;

          background:
            #fffdf9;

          color:
            var(--maroon);

          text-align: center;

          font-size: 22px;

          font-weight: 700;

          letter-spacing: 8px;

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

        .otpInput::placeholder {
          color:
            #c9c0b6;

          letter-spacing:
            5px;
        }

        .otpInput:focus {
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

        /* ==========================================
           VERIFY BUTTON
        ========================================== */

        .verify {
          width: 100%;

          height: 51px;

          margin-top:
            15px;

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

          font-size: 15px;

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

        .verify span {
          font-size: 22px;

          line-height: 1;
        }

        .verify:disabled {
          background:
            #d28d88;

          box-shadow: none;
        }

        .verify:not(
          :disabled
        ):active {
          transform:
            scale(0.985);
        }

        /* ==========================================
           RESEND
        ========================================== */

        .resend {
          margin-top: 17px;

          padding: 0;

          border: 0;

          background:
            transparent;

          color:
            var(--maroon);

          font-size: 14px;

          font-weight: 600;
        }

        /* ==========================================
           CHANGE MOBILE
        ========================================== */

        .back {
          display: block;

          margin:
            20px auto 0;

          padding: 0;

          border: 0;

          background:
            transparent;

          color:
            var(--muted);

          font-size: 13px;
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

            margin-bottom:
              -2px;
          }

          .content h1 {
            font-size: 25px;
          }

          .subtitle {
            margin:
              7px 0 16px;

            font-size: 12px;
          }

          .otpInput {
            height: 50px;

            font-size: 19px;

            letter-spacing:
              6px;
          }

          .verify {
            height: 47px;

            font-size: 14px;
          }

          .resend {
            margin-top:
              12px;

            font-size: 13px;
          }

          .back {
            margin-top:
              14px;

            font-size: 12px;
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
            padding-top:
              2vh;
          }

          .ornament {
            width: 92px;
            height: 92px;

            margin-bottom:
              -2px;
          }

          .content h1 {
            font-size: 25px;
          }

          .subtitle {
            margin:
              6px 0 15px;
          }

          .otpInput {
            height: 49px;
          }

          .verify {
            height: 45px;

            margin-top:
              12px;
          }

          .resend {
            margin-top:
              11px;
          }

          .back {
            margin-top:
              12px;
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
            margin:
              10px 0 26px;

            font-size: 15px;
          }

          .otpInput {
            height: 60px;

            font-size: 23px;
          }

          .verify {
            height: 54px;

            font-size: 16px;
          }

          .resend {
            font-size: 15px;
          }

          .back {
            font-size: 14px;
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

            place-items:
              center;

            padding:
              50px 24px;
          }

          .content {
            width: 480px;

            max-width: 100%;

            min-height: auto;

            margin: 0;

            padding:
              38px 38px
              36px;

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
              11px 0 27px;

            font-size: 15px;
          }

          .otpInput {
            height: 62px;

            font-size: 24px;
          }

          .verify {
            height: 54px;

            margin-top:
              18px;

            font-size: 16px;
          }

          .resend {
            margin-top:
              19px;

            font-size: 15px;
          }

          .back {
            margin-top:
              22px;

            font-size: 14px;
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
            min-height: 100vh;

            display: grid;

            place-items:
              center;

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
                transparent
                  34%
              ),
              radial-gradient(
                circle at bottom right,
                rgba(
                  167,
                  25,
                  25,
                  0.08
                ),
                transparent
                  30%
              ),
              #fff9ed;
          }

          .content {
            width: 520px;

            max-width: 100%;

            min-height: auto;

            margin: 0;

            padding:
              44px 46px
              42px;

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
              11px 0 30px;

            font-size: 16px;
          }

          .otpInput {
            height: 64px;

            border-radius:
              15px;

            font-size: 25px;

            letter-spacing:
              10px;
          }

          .verify {
            height: 56px;

            margin-top:
              18px;

            border-radius:
              14px;

            font-size: 16px;
          }

          .verify:not(
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

          .resend {
            margin-top:
              21px;

            font-size: 15px;

            cursor: pointer;
          }

          .resend:hover {
            text-decoration:
              underline;
          }

          .back {
            margin-top:
              24px;

            font-size: 14px;

            cursor: pointer;
          }

          .back:hover {
            color:
              var(--maroon);
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
              50px 50px
              46px;
          }

          .ornament {
            width: 165px;
            height: 165px;
          }

          .content h1 {
            font-size: 40px;
          }

          .otpInput {
            height: 66px;

            font-size: 26px;
          }

          .verify {
            height: 58px;
          }
        }
      `}</style>
    </main>
  );
}