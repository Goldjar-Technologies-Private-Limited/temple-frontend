
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageProvider";
import { authService } from "@/services/auth/auth.service";

const DEFAULT_TEST_MOBILE = "7498473263";
const APP_ENV = process.env.NEXT_PUBLIC_ENV || "production";
const IS_PRODUCTION = APP_ENV === "production";

export default function Login() {
  const router = useRouter();
  const { t } = useLanguage();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doSend = async (validNumber: string) => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await authService.loginInitiate({
        mobileNumber: validNumber,
      });

      if (response.success) {
        sessionStorage.setItem("otpMobile", validNumber);
        if (response.sessionId) {
          sessionStorage.setItem("otpSessionId", response.sessionId);
        }
        router.push("/otp");
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (err: any) {
      console.error("[Auth Login] Error initiating login:", err);
      setError(err?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = () => {
    if (!mobile) {
      if (!IS_PRODUCTION) {
        console.log(
          `[Auth Login] Empty mobile in ${APP_ENV} environment. Using default test mobile: ${DEFAULT_TEST_MOBILE}`
        );

        setMobile(DEFAULT_TEST_MOBILE);
        doSend(DEFAULT_TEST_MOBILE);
        return;
      }

      setError(t("enterMobile") || "Please enter a valid mobile number");
      return;
    }

    if (mobile.length === 10) {
      doSend(mobile);
    } else {
      setError(t("enterMobile") || "Please enter a valid 10-digit number");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendOtp();
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setMobile(value);
    setError("");

    if (value.length === 10 && !loading) {
      doSend(value);
    }
  };

  const isDisabled =
    loading ||
    (IS_PRODUCTION
      ? mobile.length !== 10
      : mobile.length > 0 && mobile.length !== 10);

  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fffaf0_0%,#fff7e9_100%)] px-5 py-6 text-center text-[var(--text)] sm:px-6 sm:py-10">

      {/* LOGIN CARD */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[390px] flex-col items-center pt-4 max-[360px]:px-0 sm:min-h-0 sm:max-w-[480px] sm:rounded-3xl sm:border sm:border-[var(--border)] sm:bg-[rgba(255,253,248,0.96)] sm:px-9 sm:py-9 sm:pt-9 sm:shadow-[0_18px_45px_rgba(83,48,14,0.1)] lg:max-w-[520px] lg:rounded-[28px] lg:px-[46px] lg:py-[42px] lg:shadow-[0_22px_55px_rgba(90,52,16,0.12)] xl:max-w-[560px] xl:px-[50px] xl:py-12">

        {/* ORNAMENT */}
        <img
          src="/images/login-ornament.png"
          alt=""
          className="-mb-1 h-[120px] w-[120px] object-contain opacity-[0.58] max-[360px]:h-[96px] max-[360px]:w-[96px] sm:h-[145px] sm:w-[145px] lg:h-[150px] lg:w-[150px] xl:h-[165px] xl:w-[165px]"
        />

        {/* HEADER */}
        <header className="w-full">
          <h1 className="m-0 font-[Georgia,'Times_New_Roman',serif] text-[29px] font-bold leading-[1.15] text-[var(--maroon)] max-[360px]:text-[25px] sm:text-[34px] lg:text-[38px] xl:text-[40px]">
            {t("welcomeDevotee")}
          </h1>

          <p className="mx-auto mt-2 mb-5 max-w-[34ch] text-sm leading-relaxed text-[var(--muted)] max-[360px]:text-xs sm:mt-2.5 sm:mb-7 sm:text-[15px] lg:mb-8 lg:text-base">
            {t("enterMobile")}
          </p>
        </header>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full flex-1 flex-col sm:flex-initial"
        >

          {/* MOBILE INPUT */}
          <div className="flex h-[55px] w-full items-center rounded-[14px] border border-[#d3a653] bg-[#fffdf9] px-4 shadow-[0_4px_14px_rgba(107,61,13,0.05)] transition-all focus-within:border-[var(--maroon)] focus-within:shadow-[0_0_0_3px_rgba(167,25,25,0.08)] max-[360px]:h-[50px] max-[360px]:px-3 sm:h-[60px] lg:h-[62px] lg:rounded-[15px] lg:px-[18px] xl:h-16">

            <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-[var(--text)] max-[360px]:text-[13px] sm:text-[15px]">
              🇮🇳 +91
            </span>

            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder={t("mobileNumber")}
              value={mobile}
              onChange={handleMobileChange}
              aria-label={t("mobileNumber")}
              aria-invalid={Boolean(error)}
              className="h-full min-w-0 flex-1 border-0 bg-transparent px-2.5 text-[15px] text-[var(--text)] outline-none placeholder:text-[#a49a91] max-[360px]:text-sm sm:text-base"
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="mt-2.5 mb-0 text-sm text-[var(--maroon)]"
            >
              {error}
            </p>
          )}

          {/* BOTTOM ACTION */}
          <div className="mt-auto w-full pt-8 pb-[max(8px,env(safe-area-inset-bottom))] sm:mt-8 sm:pt-0 sm:pb-0 lg:mt-[34px]">

            {/* SEND OTP BUTTON */}
            <button
              type="submit"
              disabled={isDisabled}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[13px] border-0 bg-[var(--maroon)] text-base font-bold text-white shadow-[0_6px_15px_rgba(113,17,17,0.13)] transition-all disabled:cursor-not-allowed disabled:bg-[#d28d88] disabled:shadow-none active:scale-[0.985] max-[360px]:h-12 max-[360px]:text-sm sm:h-[54px] lg:h-14 lg:rounded-[14px] lg:hover:-translate-y-px lg:hover:bg-[var(--dark-maroon)] lg:hover:shadow-[0_9px_22px_rgba(113,17,17,0.18)] xl:h-[58px]"
            >
              <span>{loading ? "..." : t("sendOtp")}</span>

              {!loading && (
                <span aria-hidden="true" className="text-[22px] leading-none">
                  ›
                </span>
              )}
            </button>

            {/* REGISTER LINK */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-sm">
              <span className="text-[var(--muted)]">
                New Devotee?
              </span>

              <Link
                href={`/register${mobile ? `?mobile=${encodeURIComponent(mobile)}` : ""}`}
                className="font-bold text-[var(--maroon)] underline underline-offset-4 transition-colors hover:text-[var(--dark-maroon)]"
              >
                Register Here
              </Link>
            </div>

            {/* TERMS */}
            <small className="mt-3.5 block text-[11px] leading-[1.7] text-[#776c63] max-[360px]:text-[10px] lg:mt-4">
              {t("termsText")}
            </small>

          </div>
        </form>
      </section>

      {/* DECORATIVE CIRCLES */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-7 bottom-5 h-[58px] w-[58px] rounded-full border border-[#d5b66d] opacity-20 sm:bottom-auto sm:left-6 sm:h-[90px] sm:w-[90px] sm:opacity-15 lg:bottom-9 lg:left-[30px] lg:h-[120px] lg:w-[120px] lg:opacity-[0.12]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-7 bottom-5 h-[58px] w-[58px] rounded-full border border-[#d5b66d] opacity-20 sm:bottom-auto sm:right-6 sm:h-[90px] sm:w-[90px] sm:opacity-15 lg:bottom-9 lg:right-[30px] lg:h-[120px] lg:w-[120px] lg:opacity-[0.12]"
      />

    </main>
  );
}
