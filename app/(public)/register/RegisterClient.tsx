"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";


function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* =========================================================
     MOBILE FROM LOGIN
     ========================================================= */

  const mobileFromLogin = searchParams.get("mobile") || "";

  /* =========================================================
     STATE
     ========================================================= */

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(
    mobileFromLogin.replace(/\D/g, "").slice(0, 10),
  );
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     MOBILE INPUT
     ========================================================= */

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setMobile(value);

    if (error) {
      setError("");
    }
  };

  /* =========================================================
     REGISTER
     ========================================================= */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const cleanedName = name.trim();
    const cleanedMobile = mobile.trim();

    /* ===============================
       VALIDATION
       =============================== */

    if (!cleanedName) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(cleanedMobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!accepted) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      /* =====================================================
         FRONTEND ONLY: Bypass API for signup and OTP
         ===================================================== */
      console.warn("Backend integration required for signup. Proceeding to OTP manually.");
      
      router.push(
        `/otp?mobile=${encodeURIComponent(cleanedMobile)}&mode=register`,
      );
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     UI
     ========================================================= */

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[#fffaf0]
        text-[#40372f]

        lg:grid
        lg:grid-cols-[1.05fr_0.95fr]
      "
    >
      {/* =====================================================
          DESKTOP LEFT SIDE
          ===================================================== */}

      <section
        className="
          relative
          hidden
          min-h-screen
          overflow-hidden
          bg-[#7f1717]

          lg:flex
          lg:flex-col
          lg:justify-between
          lg:p-12

          xl:p-16
        "
      >
        {/* BACKGROUND IMAGE */}

        <img
          src="/images/haveli.jpg"
          alt="Shri Govardhannath Haveli"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(135deg,rgba(73,8,8,0.92)_0%,rgba(116,18,18,0.76)_48%,rgba(73,31,12,0.70)_100%)]
          "
        />

        {/* DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -left-28
            -top-28
            h-[360px]
            w-[360px]
            rounded-full
            bg-[#e7b660]/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            right-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#f7d797]/10
            blur-3xl
          "
        />

        {/* BRAND */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              grid
              h-[58px]
              w-[58px]
              place-items-center
              rounded-full
              border
              border-[#f4d69c]/60
              bg-white/10
              text-[29px]
              backdrop-blur-md
            "
          >
            🛕
          </div>

          <div>
            <p
              className="
                m-0
                text-xs
                font-semibold
                text-[#f5d99e]
              "
            >
              🙏 Jai Shree Krishna
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-xl
                font-bold
                text-white
              "
            >
              Shri Govardhannath
            </h2>
          </div>
        </div>

        {/* DESKTOP CONTENT */}

        <div
          className="
            relative
            z-10
            max-w-[580px]
          "
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-[#f1d293]/30
              bg-white/10
              px-4
              py-2
              text-[11px]
              font-semibold
              tracking-wide
              text-[#ffe4aa]
              backdrop-blur-md
            "
          >
            SHRI GOVARDHANNATH HAVELI
          </span>

          <h1
            className="
              mt-6
              max-w-[520px]
              font-serif
              text-[44px]
              font-bold
              leading-[1.12]
              text-white

              xl:text-[52px]
            "
          >
            Stay connected with devotion every day.
          </h1>

          <p
            className="
              mt-5
              max-w-[500px]
              text-[15px]
              leading-7
              text-white/75
            "
          >
            Register to access Live Darshan, Seva, Prasadam, temple events and
            your devotional services.
          </p>

          <div
            className="
              mt-8
              flex
              items-center
              gap-3
              text-[#f4d69c]
            "
          >
            <span className="h-px w-16 bg-[#f4d69c]/60" />

            <span className="font-serif text-xl">ॐ</span>

            <span className="h-px w-16 bg-[#f4d69c]/60" />
          </div>
        </div>

        <p
          className="
            relative
            z-10
            text-xs
            text-white/55
          "
        >
          Shri Govardhannath Haveli
        </p>
      </section>

      {/* =====================================================
          REGISTER SIDE
          ===================================================== */}

      <section
        className="
          relative
          flex
          min-h-[100dvh]
          items-center
          justify-center
          px-4
          py-6

          sm:px-6

          lg:min-h-screen
          lg:px-10
          lg:py-10

          xl:px-16
        "
      >
        {/* DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            h-32
            w-32
            rounded-full
            border
            border-[#d5b66d]
            opacity-[0.14]

            lg:h-44
            lg:w-44
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-14
            -left-14
            h-32
            w-32
            rounded-full
            border
            border-[#d5b66d]
            opacity-[0.14]

            lg:h-44
            lg:w-44
          "
        />

        <div
          className="
            relative
            z-10
            w-full
            max-w-[460px]
          "
        >
          {/* =================================================
              MOBILE BRAND
              ================================================= */}

          <div className="mb-7 text-center lg:hidden">
            <div
              className="
                mx-auto
                grid
                h-[72px]
                w-[72px]
                place-items-center
                rounded-full
                border
                border-[#e4c78f]
                bg-[#fffdf8]
                text-[35px]
                shadow-[0_6px_20px_rgba(99,54,18,0.08)]
              "
            >
              🛕
            </div>

            <p
              className="
                mb-0
                mt-3
                text-[11px]
                font-semibold
                text-[#9c2821]
              "
            >
              🙏 Jai Shree Krishna
            </p>

            <h1
              className="
                mb-0
                mt-1
                font-serif
                text-[23px]
                font-bold
                text-[#6f1616]
              "
            >
              Shri Govardhannath
            </h1>

            <p
              className="
                mt-1
                text-[10px]
                text-[#94877b]
              "
            >
              Haveli
            </p>
          </div>

          {/* =================================================
              REGISTER CARD
              ================================================= */}

          <div
            className="
              rounded-[20px]
              border
              border-[#eadbc5]
              bg-[#fffdf9]
              px-5
              py-6
              shadow-[0_8px_28px_rgba(87,48,18,0.07)]

              sm:px-7
              sm:py-7

              lg:rounded-[24px]
              lg:px-9
              lg:py-9
              lg:shadow-[0_14px_45px_rgba(87,48,18,0.09)]
            "
          >
            {/* HEADER */}

            <div className="mb-7">
              <p
                className="
                  mb-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-[#b6823d]
                "
              >
                Create Account
              </p>

              <h2
                className="
                  m-0
                  font-serif
                  text-[26px]
                  font-bold
                  text-[#641010]

                  lg:text-[30px]
                "
              >
                Register
              </h2>

              <p
                className="
                  mb-0
                  mt-2
                  text-[12px]
                  leading-5
                  text-[#85786e]

                  lg:text-[13px]
                "
              >
                Enter your name and mobile number to create your account.
              </p>
            </div>

            {/* =================================================
                FORM
                ================================================= */}

            <form onSubmit={handleSubmit}>
              {/* NAME */}

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block
                    text-[12px]
                    font-semibold
                    text-[#554940]
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <span
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[17px]
                      text-[#b57939]
                    "
                  >
                    ♙
                  </span>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);

                      if (error) {
                        setError("");
                      }
                    }}
                    disabled={loading}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="
                      h-[50px]
                      w-full
                      rounded-xl
                      border
                      border-[#e5d7c3]
                      bg-[#fffaf5]
                      pl-11
                      pr-4
                      text-[13px]
                      text-[#40372f]
                      outline-none
                      transition-all

                      placeholder:text-[#b0a59b]

                      focus:border-[#c99435]
                      focus:bg-white
                      focus:ring-[3px]
                      focus:ring-[#c99435]/10

                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      lg:h-[52px]
                    "
                  />
                </div>
              </div>

              {/* MOBILE */}

              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="
                    mb-2
                    block
                    text-[12px]
                    font-semibold
                    text-[#554940]
                  "
                >
                  Mobile Number
                </label>

                <div
                  className="
                    flex
                    h-[50px]
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#e5d7c3]
                    bg-[#fffaf5]
                    transition-all

                    focus-within:border-[#c99435]
                    focus-within:bg-white
                    focus-within:ring-[3px]
                    focus-within:ring-[#c99435]/10

                    lg:h-[52px]
                  "
                >
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      border-r
                      border-[#e5d7c3]
                      px-3
                      text-[13px]
                      font-semibold
                      text-[#6c5e53]
                    "
                  >
                    🇮🇳 +91
                  </div>

                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={handleMobileChange}
                    disabled={loading}
                    placeholder="Enter mobile number"
                    autoComplete="tel"
                    className="
                      min-w-0
                      flex-1
                      border-0
                      bg-transparent
                      px-3
                      text-[13px]
                      text-[#40372f]
                      outline-none

                      placeholder:text-[#b0a59b]

                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    justify-between
                    text-[10px]
                  "
                >
                  <span className="text-[#95897e]">
                    OTP will be sent to this number
                  </span>

                  <span
                    className={
                      mobile.length === 10
                        ? "font-semibold text-[#4d7d50]"
                        : "text-[#a99d92]"
                    }
                  >
                    {mobile.length}/10
                  </span>
                </div>
              </div>

              {/* =================================================
                  TERMS
                  ================================================= */}

              <label
                className="
                  mt-5
                  flex
                  cursor-pointer
                  items-start
                  gap-2.5
                "
              >
                <input
                  type="checkbox"
                  checked={accepted}
                  disabled={loading}
                  onChange={(e) => {
                    setAccepted(e.target.checked);

                    if (error) {
                      setError("");
                    }
                  }}
                  className="
                    mt-[2px]
                    h-4
                    w-4
                    shrink-0
                    accent-[#a71919]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <span
                  className="
                    text-[11px]
                    leading-[18px]
                    text-[#786d64]
                  "
                >
                  I agree to the{" "}
                  <span
                    className="
                      font-semibold
                      text-[#a71919]
                    "
                  >
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span
                    className="
                      font-semibold
                      text-[#a71919]
                    "
                  >
                    Privacy Policy
                  </span>
                  .
                </span>
              </label>

              {/* =================================================
                  ERROR
                  ================================================= */}

              {error && (
                <div
                  role="alert"
                  className="
                    mt-4
                    rounded-lg
                    border
                    border-[#f1c6c2]
                    bg-[#fff0ee]
                    px-3
                    py-2.5
                    text-[11px]
                    font-medium
                    leading-5
                    text-[#a71919]
                  "
                >
                  {error}
                </div>
              )}

              {/* =================================================
                  REGISTER BUTTON
                  ================================================= */}

              <button
                type="submit"
                disabled={
                  loading || !name.trim() || mobile.length !== 10 || !accepted
                }
                className="
                  mt-6
                  flex
                  h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border-0
                  bg-[linear-gradient(135deg,#8f1717,#b52b22)]
                  text-[13px]
                  font-bold
                  text-white
                  shadow-[0_7px_18px_rgba(167,25,25,0.20)]
                  transition-all
                  duration-200

                  enabled:hover:-translate-y-[1px]
                  enabled:hover:shadow-[0_10px_24px_rgba(167,25,25,0.25)]

                  enabled:active:translate-y-0
                  enabled:active:scale-[0.99]

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  disabled:shadow-none

                  lg:h-[52px]
                  lg:text-sm
                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>

                    <span className="text-lg leading-none">›</span>
                  </>
                )}
              </button>
            </form>

            {/* =================================================
                LOGIN
                ================================================= */}

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#eadfce]" />

              <span
                className="
                  text-[10px]
                  font-medium
                  text-[#a3978c]
                "
              >
                Already registered?
              </span>

              <span className="h-px flex-1 bg-[#eadfce]" />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => router.push("/login")}
              className="
                h-[48px]
                w-full
                rounded-xl
                border
                border-[#d8b777]
                bg-[#fffaf0]
                text-[12px]
                font-bold
                text-[#971b1b]
                transition-all

                enabled:hover:bg-[#fff2dc]
                enabled:active:scale-[0.99]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Login to Existing Account
            </button>
          </div>

          {/* =================================================
              BOTTOM ORNAMENT
              ================================================= */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-[#c99435]
              opacity-60
            "
          >
            <span
              className="
                h-px
                w-12
                bg-gradient-to-r
                from-transparent
                to-[#c99435]
              "
            />

            <span className="font-serif text-sm">ॐ</span>

            <span
              className="
                h-px
                w-12
                bg-gradient-to-l
                from-transparent
                to-[#c99435]
              "
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function RegisterClient() {
  return (
    <Suspense fallback={null}>
      <RegisterPage />
    </Suspense>
  );
}
