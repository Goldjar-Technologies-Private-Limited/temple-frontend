"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "../../lib/LanguageProvider";

type LanguageCode = "en" | "hi" | "gu";

type LanguageOption = {
  code: LanguageCode;
  name: string;
  nativeName: string;
  shortName: string;
};

const languages: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    shortName: "EN",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    shortName: "हि",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    shortName: "ગુ",
  },
];

export default function SettingsPage() {
  const router = useRouter();

  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
  };

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[#fffaf1]
        pb-[105px]
        text-[#40372f]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-[#eadfce]
          bg-[#fffaf1]/95
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[64px]
            w-full
            max-w-[1400px]
            items-center
            gap-3
            px-4

            sm:min-h-[70px]
            sm:px-6

            lg:min-h-[82px]
            lg:px-8
          "
        >
          {/* BACK */}

          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              border
              border-[#ead7b8]
              bg-white
              text-[#a71919]
              shadow-sm
              transition

              hover:bg-[#fff4e6]
              active:scale-95

              lg:h-11
              lg:w-11
            "
          >
            <BackIcon />
          </button>

          {/* TITLE */}

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#bd8b39]
              "
            >
              Shri Govardhannath
            </p>

            <h1
              className="
                truncate
                font-serif
                text-[19px]
                font-bold
                text-[#641010]

                lg:text-[25px]
              "
            >
              Settings
            </h1>
          </div>
        </div>
      </header>

      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1100px]
          px-3
          py-5

          sm:px-5
          sm:py-7

          lg:px-8
          lg:py-9
        "
      >
        {/* =================================================
            INTRO
        ================================================= */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[20px]
            bg-[linear-gradient(135deg,#741313_0%,#9d211a_55%,#bd5428_100%)]
            px-5
            py-6
            text-white
            shadow-[0_10px_30px_rgba(94,28,17,0.14)]

            sm:px-6
            sm:py-7

            lg:px-8
            lg:py-8
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              -right-16
              -top-20
              h-[190px]
              w-[190px]
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-20
              right-20
              h-[150px]
              w-[150px]
              rounded-full
              bg-[#f0c46c]/10
            "
          />

          <div className="relative z-10">
            <div
              className="
                grid
                h-11
                w-11
                place-items-center
                rounded-xl
                border
                border-white/15
                bg-white/10
                text-[#ffe3a7]
              "
            >
              <SettingsIcon />
            </div>

            <p
              className="
                mt-4
                text-[9px]
                font-bold
                uppercase
                tracking-[0.13em]
                text-[#f1cd82]
              "
            >
              APP PREFERENCES
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-[23px]
                font-bold

                sm:text-[27px]

                lg:text-[31px]
              "
            >
              Personalize your experience
            </h2>

            <p
              className="
                mt-2
                max-w-[620px]
                text-[11px]
                leading-5
                text-white/75

                sm:text-xs

                lg:text-[13px]
                lg:leading-6
              "
            >
              Choose the language you prefer while using Shri Govardhannath
              Haveli.
            </p>
          </div>
        </section>

        {/* =================================================
            LANGUAGE SECTION
        ================================================= */}

        <section
          className="
            mt-5
            overflow-hidden
            rounded-[18px]
            border
            border-[#eadfce]
            bg-[#fffdf9]
            shadow-[0_6px_24px_rgba(74,42,16,0.045)]

            lg:mt-7
            lg:rounded-[20px]
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
              border-b
              border-[#f0e5d6]
              px-4
              py-4

              sm:px-5

              lg:px-6
              lg:py-5
            "
          >
            <div
              className="
                grid
                h-10
                w-10
                shrink-0
                place-items-center
                rounded-xl
                bg-[#fff0d8]
                text-[#a71919]
              "
            >
              <LanguageIcon />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  font-serif
                  text-[17px]
                  font-bold
                  text-[#641010]

                  sm:text-lg

                  lg:text-xl
                "
              >
                App Language
              </h2>

              <p
                className="
                  mt-1
                  text-[9px]
                  leading-4
                  text-[#918479]

                  sm:text-[10px]

                  lg:text-[11px]
                "
              >
                Select the language you want to use across the application.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 lg:p-5">
            <div
              className="
                grid
                grid-cols-1
                gap-2.5

                sm:grid-cols-3

                lg:gap-4
              "
            >
              {languages.map((item) => {
                const selected = language === item.code;

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleLanguageChange(item.code)}
                    aria-pressed={selected}
                    className={`
                      group
                      relative
                      flex
                      min-h-[76px]
                      w-full
                      items-center
                      gap-3
                      overflow-hidden
                      rounded-[14px]
                      border
                      p-3
                      text-left
                      transition-all
                      duration-200

                      sm:min-h-[115px]
                      sm:flex-col
                      sm:items-start
                      sm:justify-center
                      sm:p-4

                      lg:min-h-[130px]
                      lg:p-5

                      ${
                        selected
                          ? `
                            border-[#b72c22]
                            bg-[#fff2e3]
                            shadow-[0_6px_18px_rgba(167,25,25,0.08)]
                          `
                          : `
                            border-[#eadfce]
                            bg-white

                            hover:border-[#d9bc8b]
                            hover:bg-[#fffaf1]
                            hover:shadow-[0_6px_18px_rgba(74,42,16,0.05)]
                          `
                      }
                    `}
                  >
                    {selected && (
                      <span
                        className="
                          absolute
                          bottom-0
                          left-0
                          top-0
                          w-[3px]
                          bg-[#a71919]

                          sm:bottom-auto
                          sm:h-[3px]
                          sm:w-full
                        "
                      />
                    )}

                    <div
                      className={`
                        grid
                        h-11
                        w-11
                        shrink-0
                        place-items-center
                        rounded-xl
                        border
                        text-[14px]
                        font-bold
                        transition

                        ${
                          selected
                            ? `
                              border-[#a71919]
                              bg-[#a71919]
                              text-white
                            `
                            : `
                              border-[#f0dfc5]
                              bg-[#fff4e3]
                              text-[#a71919]

                              group-hover:bg-[#ffedd2]
                            `
                        }
                      `}
                    >
                      {item.shortName}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-2
                        "
                      >
                        <div>
                          <p
                            className={`
                              text-[12px]
                              font-bold

                              lg:text-[13px]

                              ${
                                selected
                                  ? "text-[#8e1715]"
                                  : "text-[#51463d]"
                              }
                            `}
                          >
                            {item.nativeName}
                          </p>

                          {item.nativeName !== item.name && (
                            <p
                              className="
                                mt-[2px]
                                text-[9px]
                                text-[#9b8c80]
                              "
                            >
                              {item.name}
                            </p>
                          )}
                        </div>

                        {selected && (
                          <span
                            className="
                              grid
                              h-6
                              w-6
                              shrink-0
                              place-items-center
                              rounded-full
                              bg-[#a71919]
                              text-white

                              sm:hidden
                            "
                          >
                            <CheckIcon />
                          </span>
                        )}
                      </div>
                    </div>

                    {selected && (
                      <span
                        className="
                          absolute
                          right-3
                          top-3
                          hidden
                          h-6
                          w-6
                          place-items-center
                          rounded-full
                          bg-[#a71919]
                          text-white

                          sm:grid
                        "
                      >
                        <CheckIcon />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =================================================
            CURRENT LANGUAGE
        ================================================= */}

        <section
          className="
            mt-4
            flex
            items-center
            gap-3
            rounded-[16px]
            border
            border-[#ead8b8]
            bg-[#fff5e5]
            p-4

            lg:mt-5
            lg:p-5
          "
        >
          <div
            className="
              grid
              h-10
              w-10
              shrink-0
              place-items-center
              rounded-full
              bg-white
              text-[#a71919]
              shadow-sm
            "
          >
            <GlobeIcon />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#9e8b7a]
              "
            >
              Current Language
            </p>

            <p
              className="
                mt-[2px]
                text-[12px]
                font-bold
                text-[#5c3521]

                lg:text-[13px]
              "
            >
              {getCurrentLanguageName(language)}
            </p>
          </div>

          <span
            className="
              rounded-full
              border
              border-[#d9bd8d]
              bg-white
              px-3
              py-1
              text-[8px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#9a671d]
            "
          >
            Selected
          </span>
        </section>

        {/* =================================================
            NOTE
        ================================================= */}

        <div
          className="
            mt-4
            flex
            items-start
            gap-3
            rounded-[14px]
            border
            border-[#eee1ce]
            bg-[#fffdf9]
            p-4
          "
        >
          <div className="mt-[1px] text-[#a71919]">
            <InfoIcon />
          </div>

          <p
            className="
              text-[9px]
              leading-5
              text-[#8c7e72]

              sm:text-[10px]
            "
          >
            Your selected language is saved automatically. You do not need to
            press a separate Save button.
          </p>
        </div>

        {/* =================================================
            DELETE ACCOUNT
        ================================================= */}

        <section className="mt-4">
          <button
            type="button"
            onClick={() => router.push("/delete-account")}
            className="
              group
              flex
              min-h-[56px]
              w-full
              items-center
              gap-3
              rounded-[14px]
              border
              border-[#efc7c1]
              bg-[#fff3f1]
              px-3
              text-left
              text-[#b42318]
              transition-all
              hover:border-[#dfa69e]
              hover:bg-[#ffe9e5]
              active:scale-[0.99]
            "
          >
            <span
              className="
                grid
                h-10
                w-10
                shrink-0
                place-items-center
                rounded-xl
                bg-[#ffe3de]
                text-[#b42318]
                transition
                group-hover:bg-[#ffd9d2]
              "
            >
              <DeleteIcon />
            </span>

            <span className="min-w-0 flex-1">
              <strong
                className="
                  block
                  text-[12px]
                  font-bold
                  sm:text-[13px]
                "
              >
                Delete Account
              </strong>

              <span
                className="
                  mt-[2px]
                  block
                  text-[9px]
                  text-[#a66d67]
                "
              >
                Permanently delete your account
              </span>
            </span>

            <span
              className="
                text-lg
                transition-transform
                group-hover:translate-x-[2px]
              "
            >
              →
            </span>
          </button>
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div
          className="
            mt-7
            text-center

            lg:mt-10
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <span className="h-px w-10 bg-[#ddc69b]" />

            <span className="text-[#b8893b]">❧</span>
            <span className="text-[#b8893b]">❧</span>
            <span className="text-[#b8893b]">❧</span>

            <span className="h-px w-10 bg-[#ddc69b]" />
          </div>

          <p
            className="
              mt-3
              font-serif
              text-[12px]
              font-semibold
              text-[#7b251e]
            "
          >
            🙏 Jai Shree Krishna
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   CURRENT LANGUAGE NAME
========================================================= */

function getCurrentLanguageName(language: LanguageCode) {
  switch (language) {
    case "hi":
      return "हिन्दी (Hindi)";

    case "gu":
      return "ગુજરાતી (Gujarati)";

    default:
      return "English";
  }
}

/* =========================================================
   ICONS
========================================================= */

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[21px] w-[21px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />

      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20.3h-3v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.08 15a1.7 1.7 0 0 0-1.55-1H5.4v-3h.13a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V4.7h3v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.55 1h.13v3h-.13a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9" />
      <path d="M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[17px] w-[17px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}