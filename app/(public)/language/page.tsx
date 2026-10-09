"use client";

import { useRouter } from "next/navigation";

import {
  languageOptions,
} from "@/utils/i18n";

import {
  useLanguage,
} from "@/contexts/LanguageProvider";

export default function LanguagePage() {
  const router = useRouter();

  const {
    language,
    setLanguage,
    t,
  } = useLanguage();

  return (
    <main className="screen">
      {/* DECORATION */}

      <div className="flower flowerLeft">
        <i />
        <i />
        <i />
      </div>

      <div className="flower flowerRight">
        <i />
        <i />
        <i />
      </div>

      {/* CONTENT */}

      <section className="content">
        <div className="topIcon">
          🛕
        </div>

        <h1>
          {t("chooseLanguage")}
        </h1>

        <p className="subtitle">
          {t("chooseLanguageSub")}
        </p>

        {/* LANGUAGE OPTIONS */}

        <div className="list">
          {languageOptions.map(
            (item) => {
              const isSelected =
                language ===
                item.code;

              return (
                <button
                  key={item.code}
                  type="button"
                  className={`card ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setLanguage(
                      item.code
                    )
                  }
                >
                  <span className="flag">
                    {item.flag}
                  </span>

                  <span className="name">
                    {item.name}
                  </span>

                  <span
                    className="arrow"
                  >
                    {isSelected
                      ? "✓"
                      : "›"}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </section>

      {/* CONTINUE BUTTON */}

      <div className="bottom">
        <button
          type="button"
          className="continue"
          onClick={() =>
            router.push(
              "/login"
            )
          }
        >
          {t("continue")}
          <span>›</span>
        </button>
      </div>

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
              calc(100% - 40px),
              390px
            );

          margin: 0 auto;

          padding-top: 14vh;
        }

        .topIcon {
          width: 58px;
          height: 58px;

          display: grid;
          place-items: center;

          margin:
            0 auto 18px;

          border:
            1px solid
            #e7cc91;

          border-radius: 50%;

          background:
            #fffdf8;

          font-size: 29px;

          box-shadow:
            0 7px 20px
            rgba(
              114,
              68,
              19,
              0.08
            );
        }

        .content h1 {
          margin: 0;

          color:
            var(--maroon);

          font:
            700 30px/1.15
            Georgia,
            "Times New Roman",
            serif;
        }

        .subtitle {
          margin:
            8px 0 28px;

          color:
            var(--muted);

          font-size: 14px;
          line-height: 1.5;
        }

        /* ==========================================
           LANGUAGE LIST
        ========================================== */

        .list {
          display: grid;

          gap: 12px;
        }

        .card {
          width: 100%;
          min-height: 60px;

          padding:
            10px 15px;

          display: flex;
          align-items: center;

          gap: 13px;

          border:
            1px solid
            var(--border);

          border-radius:
            14px;

          background:
            rgba(
              255,
              253,
              248,
              0.94
            );

          color:
            var(--text);

          text-align: left;

          cursor: pointer;

          box-shadow:
            0 3px 12px
            rgba(
              91,
              55,
              17,
              0.04
            );

          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            background 0.18s ease,
            box-shadow 0.18s ease;
        }

        .card:active {
          transform:
            scale(0.98);
        }

        .selected {
          border-color:
            var(--maroon);

          background:
            #fff8ed;

          box-shadow:
            0 5px 16px
            rgba(
              167,
              25,
              25,
              0.09
            );
        }

        .flag {
          width: 36px;
          height: 36px;

          flex-shrink: 0;

          display: grid;
          place-items: center;

          border-radius: 50%;

          background:
            #f7eee0;

          font-size: 20px;
        }

        .name {
          flex: 1;

          color:
            #493e37;

          font-size: 15px;
          font-weight: 600;
        }

        .arrow {
          width: 30px;

          display: grid;
          place-items: center;

          color:
            var(--maroon);

          font-size: 24px;
          font-weight: 700;
        }

        /* ==========================================
           BOTTOM BUTTON
        ========================================== */

        .bottom {
          position: absolute;

          z-index: 5;

          left: 0;
          right: 0;
          bottom:
            calc(
              25px +
              env(
                safe-area-inset-bottom
              )
            );

          width: 100%;

          padding:
            0 24px;
        }

        .continue {
          width: min(
            100%,
            390px
          );

          height: 52px;

          display: inline-flex;

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
            0 8px 20px
            rgba(
              167,
              25,
              25,
              0.18
            );

          transition:
            transform 0.18s ease,
            background 0.18s ease;
        }

        .continue span {
          font-size: 22px;

          line-height: 1;
        }

        .continue:active {
          transform:
            scale(0.985);
        }

        /* ==========================================
           GOLD DECORATION
        ========================================== */

        .flower {
          position: absolute;

          bottom: 25px;

          width: 65px;
          height: 70px;

          opacity: 0.22;

          z-index: 1;

          pointer-events: none;
        }

        .flowerLeft {
          left: -8px;
        }

        .flowerRight {
          right: -8px;

          transform:
            scaleX(-1);
        }

        .flower::before,
        .flower::after,
        .flower i {
          content: "";

          position: absolute;

          display: block;

          border:
            2px solid
            #d5b66f;

          border-radius:
            100% 0 100% 0;
        }

        .flower::before {
          width: 21px;
          height: 38px;

          left: 6px;
          top: 17px;

          transform:
            rotate(-38deg);
        }

        .flower::after {
          width: 18px;
          height: 34px;

          left: 27px;
          top: 7px;

          transform:
            rotate(35deg);
        }

        .flower i:nth-child(1) {
          width: 17px;
          height: 30px;

          left: 39px;
          top: 30px;

          transform:
            rotate(52deg);
        }

        .flower i:nth-child(2) {
          width: 15px;
          height: 27px;

          left: 16px;
          top: 39px;

          transform:
            rotate(-65deg);
        }

        .flower i:nth-child(3) {
          width: 9px;
          height: 9px;

          left: 29px;
          top: 45px;

          border-radius:
            50%;
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
              10vh;
          }

          .topIcon {
            width: 50px;
            height: 50px;

            margin-bottom:
              13px;

            font-size: 24px;
          }

          .content h1 {
            font-size: 25px;
          }

          .subtitle {
            margin-bottom:
              20px;

            font-size: 12px;
          }

          .card {
            min-height: 55px;

            padding:
              8px 12px;
          }

          .flag {
            width: 32px;
            height: 32px;

            font-size: 18px;
          }

          .name {
            font-size: 14px;
          }

          .bottom {
            padding:
              0 14px;
          }

          .continue {
            height: 48px;
          }
        }

        /* ==========================================
           SHORT HEIGHT MOBILE
        ========================================== */

        @media (
          max-height: 700px
        ) and (
          max-width: 599px
        ) {
          .content {
            padding-top:
              7vh;
          }

          .topIcon {
            width: 48px;
            height: 48px;

            margin-bottom:
              10px;

            font-size: 23px;
          }

          .content h1 {
            font-size: 25px;
          }

          .subtitle {
            margin:
              6px 0 16px;
          }

          .list {
            gap: 8px;
          }

          .card {
            min-height: 52px;
          }

          .bottom {
            bottom:
              calc(
                15px +
                env(
                  safe-area-inset-bottom
                )
              );
          }

          .continue {
            height: 46px;
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
              15vh;
          }

          .content h1 {
            font-size: 32px;
          }

          .subtitle {
            font-size: 15px;
          }

          .card {
            min-height: 64px;
          }

          .name {
            font-size: 16px;
          }

          .bottom {
            padding:
              0 30px;
          }

          .continue {
            width: 420px;
            max-width: 100%;
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
            min-height:
              100vh;

            justify-content:
              center;

            padding:
              60px 24px;
          }

          .content {
            width: 480px;

            max-width:
              100%;

            margin: 0 auto;

            padding-top: 0;

            padding:
              42px 38px;

            border:
              1px solid
              #eadbc5;

            border-radius:
              24px;

            background:
              rgba(
                255,
                253,
                248,
                0.94
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

          .topIcon {
            width: 66px;
            height: 66px;

            font-size: 32px;
          }

          .content h1 {
            font-size: 34px;
          }

          .subtitle {
            margin-bottom:
              30px;

            font-size: 15px;
          }

          .card {
            min-height: 65px;
          }

          .bottom {
            position: static;

            width: 480px;

            max-width:
              calc(
                100% - 48px
              );

            margin:
              22px auto 0;

            padding: 0;
          }

          .continue {
            width: 100%;
          }

          .flower {
            width: 90px;
            height: 95px;

            opacity: 0.16;
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

            max-width:
              100%;

            margin: 0;

            padding:
              48px 46px
              42px;

            border:
              1px solid
              #eadbc5;

            border-radius:
              28px;

            background:
              rgba(
                255,
                253,
                248,
                0.96
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

          .topIcon {
            width: 72px;
            height: 72px;

            margin-bottom:
              20px;

            font-size: 35px;
          }

          .content h1 {
            font-size: 38px;
          }

          .subtitle {
            margin:
              10px 0 34px;

            font-size: 16px;
          }

          .list {
            gap: 14px;
          }

          .card {
            min-height: 68px;

            padding:
              12px 17px;

            border-radius:
              15px;
          }

          .card:hover {
            transform:
              translateY(-2px);

            border-color:
              #d0ad65;

            box-shadow:
              0 8px 22px
              rgba(
                83,
                48,
                14,
                0.08
              );
          }

          .selected:hover {
            border-color:
              var(--maroon);
          }

          .flag {
            width: 40px;
            height: 40px;

            font-size: 22px;
          }

          .name {
            font-size: 16px;
          }

          .arrow {
            font-size: 25px;
          }

          .bottom {
            position: absolute;

            width: 428px;

            left: 50%;
            right: auto;

            bottom:
              calc(
                50% - 305px
              );

            transform:
              translateX(-50%);

            padding: 0;
          }

          .continue {
            width: 100%;

            height: 54px;

            border-radius:
              14px;

            font-size: 16px;
          }

          .continue:hover {
            background:
              var(
                --dark-maroon
              );

            transform:
              translateY(-1px);
          }

          .flower {
            width: 120px;
            height: 125px;

            bottom: 35px;

            opacity: 0.13;
          }

          .flowerLeft {
            left: 30px;
          }

          .flowerRight {
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
              52px 50px
              45px;
          }

          .content h1 {
            font-size: 40px;
          }

          .bottom {
            width: 460px;

            bottom:
              calc(
                50% - 325px
              );
          }
        }
      `}</style>
    </main>
  );
}