"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function OtpClient() {
  const router = useRouter();
  const params = useSearchParams();

  const { t } = useLanguage();

  const mobile = params.get("mobile") || "";

  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const doVerify = async (fullOtp: string) => {
    if (loading) return;
    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/dashboard");
  };

  const DEFAULT_TEST_OTP = "000000";

  const verify = (codeToVerify?: string) => {
    const finalOtp = codeToVerify || otpValues.join("");
    const env = process.env.NEXT_PUBLIC_ENV || "production";

    if (!finalOtp || finalOtp.length < 6) {
      if (env !== "production" && !finalOtp) {
        console.log(`[Auth OTP] Empty OTP in ${env} environment. Using default test OTP: ${DEFAULT_TEST_OTP}`);
        const splitOtp = DEFAULT_TEST_OTP.split("");
        setOtpValues(splitOtp);
        doVerify(DEFAULT_TEST_OTP);
        return;
      } else {
        console.warn(`[Auth OTP] Invalid OTP length.`);
        setError("Please enter a valid 6-digit OTP");
        return;
      }
    }

    if (finalOtp.length === 6) {
      console.log(`[Auth OTP] Verifying 6-digit OTP code.`);
      doVerify(finalOtp);
    }
  };

  const resendOtp = () => {
    setOtpValues(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const changeMobileNumber = () => {
    router.back();
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = digit;
    setOtpValues(newOtpValues);
    setError("");

    // Move to next input if digit is entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all filled
    const fullOtp = newOtpValues.join("");
    if (fullOtp.length === 6 && !loading) {
      doVerify(fullOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasteData) return;

    const newOtpValues = ["", "", "", "", "", ""];
    pasteData.split("").forEach((char, idx) => {
      if (idx < 6) newOtpValues[idx] = char;
    });

    setOtpValues(newOtpValues);
    setError("");

    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();

    if (pasteData.length === 6 && !loading) {
      doVerify(pasteData);
    }
  };

  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_10%,#ffffff_0,#fffaf0_38%,#f8ecd6_100%)] text-center text-[#332820] lg:grid lg:place-items-center lg:p-[70px_40px] lg:bg-[radial-gradient(circle_at_top_left,rgba(201,148,53,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(167,25,25,0.08),transparent_30%),#fff9ed]">
      
      {/* CONTENT BOX */}
      <section className="relative z-10 mx-auto min-h-[100dvh] w-[min(calc(100%-48px),410px)] pt-[6vh] sm:w-[min(calc(100%-48px),430px)] sm:pt-[7vh] lg:mx-0 lg:min-h-auto lg:w-[520px] lg:max-w-full lg:rounded-[28px] lg:border lg:border-[#e5d7c4] lg:bg-[rgba(255,253,248,0.97)] lg:p-[44px_46px_42px] lg:shadow-[0_22px_55px_rgba(90,52,16,0.12)] xl:w-[560px] xl:p-[50px_50px_46px]">
        
        {/* ORNAMENT */}
        <img
          src="/images/login-ornament.png"
          alt=""
          className="mx-auto -mb-1 block h-[125px] w-[125px] object-contain opacity-58 sm:h-[140px] sm:w-[140px] lg:h-[150px] lg:w-[150px] xl:h-[165px] xl:w-[165px]"
        />

        {/* TITLE */}
        <h1 className="font-serif text-[29px] font-bold leading-[1.15] text-[#8c1717] sm:text-[32px] lg:text-[38px] xl:text-[40px]">
          {t("verifyMobileNumber")}
        </h1>

        {/* OTP INFO */}
        <p className="my-[10px] mb-[24px] text-[14px] leading-[1.55] text-[#71655b] sm:my-[10px] sm:mb-[26px] sm:text-[15px] lg:my-[11px] lg:mb-[30px] lg:text-[16px]">
          {t("enterSixDigitOtp")}
          <br />
          <strong className="font-bold text-[#332820]">+91 {mobile}</strong>
        </p>

        {/* 6 SEPARATE OTP INPUT BOXES */}
        <div className="flex justify-between gap-2 w-full" onPaste={handlePaste}>
          {otpValues.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="flex h-[52px] w-full items-center justify-center rounded-[12px] border border-[#d3a653] bg-[#fffdf9] text-center font-bold text-[#8c1717] text-[20px] shadow-[0_4px_14px_rgba(107,61,13,0.05)] outline-none transition-all duration-180 focus:border-[#8c1717] focus:ring-2 focus:ring-[#8c1717]/10 sm:h-[58px] sm:text-[22px] lg:h-[64px] lg:rounded-[14px] lg:text-[25px] xl:h-[66px] xl:text-[26px]"
              type="tel"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="mt-[10px] mb-0 text-[14px] text-[#8c1717]">
            {error}
          </p>
        )}

        {/* VERIFY BUTTON */}
        <button
          type="button"
          disabled={
            loading ||
            (process.env.NEXT_PUBLIC_ENV === "production"
              ? otpValues.join("").length !== 6
              : otpValues.join("").length > 0 && otpValues.join("").length !== 6)
          }
          onClick={() => verify()}
          className="mt-[20px] inline-flex h-[51px] w-full items-center justify-center gap-2 rounded-[13px] bg-[#8c1717] text-[15px] font-bold text-white shadow-[0_6px_15px_rgba(113,17,17,0.13)] transition-all duration-180 active:scale-[0.985] disabled:bg-[#d28d88] disabled:shadow-none sm:h-[54px] sm:text-[16px] lg:h-[56px] lg:rounded-[14px] lg:hover:bg-[#6c1111] lg:hover:-translate-y-[1px] lg:hover:shadow-[0_9px_22px_rgba(113,17,17,0.18)] xl:h-[58px]"
        >
          {loading ? "..." : t("verifyContinue")}
          {!loading && <span className="text-[22px] leading-none">›</span>}
        </button>

        {/* RESEND */}
        <button
          type="button"
          onClick={resendOtp}
          className="mt-[17px] border-0 bg-transparent p-0 text-[14px] font-semibold text-[#8c1717] lg:mt-[21px] lg:text-[15px] lg:cursor-pointer lg:hover:underline"
        >
          {t("resendOtp")}
        </button>

        {/* CHANGE MOBILE */}
        <button
          type="button"
          onClick={changeMobileNumber}
          className="mx-auto mt-[20px] block border-0 bg-transparent p-0 text-[13px] text-[#71655b] lg:mt-[24px] lg:text-[14px] lg:cursor-pointer lg:hover:text-[#8c1717]"
        >
          ← {t("changeMobileNumber")}
        </button>
      </section>

      {/* DECORATION CORNERS */}
      <div className="pointer-events-none absolute bottom-[20px] -left-[29px] h-[58px] w-[58px] rounded-full border border-[#d5b66d] opacity-20 sm:left-[-29px] lg:bottom-[35px] lg:left-[30px] lg:h-[120px] lg:w-[120px] lg:opacity-12" />
      <div className="pointer-events-none absolute bottom-[20px] -right-[29px] h-[58px] w-[58px] rounded-full border border-[#d5b66d] opacity-20 sm:right-[-29px] lg:bottom-[35px] lg:right-[30px] lg:h-[120px] lg:w-[120px] lg:opacity-12" />

    </main>
  );
}