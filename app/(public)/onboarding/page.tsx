"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/images/thakurji-6.png",
    title: (
      <>
        Experience
        <br />
        the Divine Grace
      </>
    ),
    tags: "Live Darshan • Seva • Satsang",
    text: (
      <>
        Stay connected with
        <br />
        Shri Govardhannathji
      </>
    ),
  },
  {
    image: "/images/thakurji-1.jpg",
    title: (
      <>
        Daily
        <br />
        Divine Darshan
      </>
    ),
    tags: "Darshan • Aarti • Utsav",
    text: (
      <>
        Feel the divine presence
        <br />
        wherever you are
      </>
    ),
  },
  {
    image: "/images/thakurji-5.jpg",
    title: (
      <>
        Be a Part
        <br />
        of Seva
      </>
    ),
    tags: "Seva • Bhog • Vandan",
    text: (
      <>
        Participate in sacred seva
        <br />
        with devotion
      </>
    ),
  },
  {
    image: "/images/thakurji-4.jpg",
    title: (
      <>
        Stay Connected
        <br />
        with Haveli
      </>
    ),
    tags: "Satsang • Events • Updates",
    text: (
      <>
        Everything about
        <br />
        Shri Govardhannath Haveli
      </>
    ),
  },
];

export default function Onboarding() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const slide = slides[index];

  const next = () => {
    if (index === slides.length - 1) {
      router.push("/language");
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const skip = () => {
    router.push("/language");
  };

  return (
    <main
      className="
        relative
        h-dvh
        min-h-0
        w-full
        overflow-hidden
        bg-[#fff9ed]
        text-center
        text-[#3d2920]

        /* =====================================
           TABLET + DESKTOP
        ===================================== */
        md:grid
        md:h-screen
        md:grid-cols-2
        md:text-left
      "
    >
   
{/* =====================================================
    IMAGE SECTION
===================================================== */}

<div
  className="
    absolute
    left-0
    top-0
    h-[61%]
    w-full
    overflow-hidden

    max-[359px]:h-[58%]

    max-h-[700px]:max-[599px]:h-[57%]

    min-[430px]:max-[599px]:h-[63%]

    /* TABLET + DESKTOP */
    md:relative
    md:h-screen
    md:w-full
    md:bg-[#fff9ed]
  "
>
  {/* =================================================
      BLURRED BACKGROUND
      Tablet + Desktop only
  ================================================= */}

  <img
    src={slide.image}
    alt=""
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      inset-0
      hidden
      h-full
      w-full
      scale-110
      object-cover
      blur-[22px]
      opacity-60

      md:block
    "
  />

  {/* =================================================
      BLURRED OVERLAY
  ================================================= */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      hidden
      bg-[#fff9ed]/10

      md:block
    "
  />

  {/* =================================================
      MAIN IMAGE
      MOBILE = COVER
      TABLET/DESKTOP = CONTAIN
  ================================================= */}

  <img
    src={slide.image}
    alt="Shri Govardhannathji"
    className="
      relative
      z-[1]
      block
      h-full
      w-full

      /* MOBILE */
      object-cover
      object-[center_top]

      max-[767px]:block

      /* TABLET + DESKTOP */
      md:object-contain
      md:object-center
    "
  />

  {/* =================================================
      MOBILE BOTTOM GRADIENT
  ================================================= */}

  <div
    className="
      pointer-events-none
      absolute
      inset-x-0
      bottom-0
      z-[2]
      h-[35%]

      bg-gradient-to-b
      from-transparent
      via-[#fff9ed]/70
      to-[#fff9ed]

      /* TABLET + DESKTOP */
      md:inset-y-0
      md:right-0
      md:left-auto
      md:h-full
      md:w-[25%]
      md:bg-[linear-gradient(to_right,transparent,rgba(255,249,237,0.35),#fff9ed)]
    "
  />
</div>



      {/* =====================================================
          CONTENT SECTION
      ===================================================== */}

      <section
        className="
          absolute
          bottom-[calc(14px+env(safe-area-inset-bottom))]
          left-0
          right-0
          z-[5]
          px-12

          max-[359px]:px-[22px]

          max-h-[700px]:max-[599px]:bottom-[calc(8px+env(safe-area-inset-bottom))]
          max-h-[700px]:max-[599px]:px-[30px]

          min-[430px]:max-[599px]:px-10

          /* =====================================
             TABLET
          ===================================== */

          md:relative
          md:bottom-auto
          md:left-auto
          md:right-auto
          md:flex
          md:h-screen
          md:w-full
          md:items-center
          md:justify-center
          md:px-6
          md:py-8

          /* =====================================
             DESKTOP
          ===================================== */

          lg:px-10
          lg:py-10

          /* =====================================
             LARGE DESKTOP
          ===================================== */

          2xl:px-16
          2xl:py-16

          bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.11),transparent_34%),#fff9ed]
        "
      >
        {/* =================================================
            CARD
        ================================================= */}

        <div
          className="
            mx-auto
            w-full
            max-w-[390px]

            min-[430px]:max-[599px]:max-w-[420px]

            /* =====================================
               TABLET
            ===================================== */

            md:max-w-[440px]
            md:rounded-[24px]
            md:border
            md:border-[#e7dccb]
            md:bg-[#fffdf8]
            md:px-8
            md:py-8
            md:text-center
            md:shadow-[0_18px_45px_rgba(84,47,15,0.09)]

            /* =====================================
               DESKTOP
            ===================================== */

            lg:max-w-[480px]
            lg:rounded-[28px]
            lg:px-10
            lg:py-10
            lg:shadow-[0_22px_55px_rgba(82,46,15,0.11)]

            /* =====================================
               LARGE DESKTOP
            ===================================== */

            2xl:max-w-[520px]
            2xl:px-12
            2xl:py-12
          "
        >
          {/* =================================================
              MINI LOGO
          ================================================= */}

          <div
            className="
              hidden

              md:mx-auto
              md:mb-4
              md:grid
              md:h-[54px]
              md:w-[54px]
              md:place-items-center
              md:rounded-full
              md:border
              md:border-[#e3c98b]
              md:bg-[#fffaf0]
              md:text-[26px]

              lg:h-[64px]
              lg:w-[64px]
              lg:text-[30px]

              2xl:h-[70px]
              2xl:w-[70px]
              2xl:text-[34px]
            "
          >
            🛕
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h1
            className="
              m-0
              font-serif
              text-[29px]
              font-bold
              leading-[1.08]
              text-[#711111]

              max-[359px]:text-[25px]

              max-h-[700px]:max-[599px]:text-[25px]

              min-[430px]:max-[599px]:text-[32px]

              /* TABLET */
              md:text-[32px]

              /* DESKTOP */
              lg:text-[38px]

              /* LARGE DESKTOP */
              2xl:text-[42px]
            "
          >
            {slide.title}
          </h1>

          {/* =================================================
              TAGS
          ================================================= */}

          <div
            className="
              mt-[11px]
              text-[13px]
              font-bold
              leading-[1.4]
              text-[#514941]

              max-[359px]:mt-[7px]
              max-[359px]:text-[11px]

              max-h-[700px]:max-[599px]:mt-[7px]

              min-[430px]:max-[599px]:mt-3
              min-[430px]:max-[599px]:text-sm

              /* TABLET */
              md:mt-3
              md:text-[14px]

              /* DESKTOP */
              lg:mt-4
              lg:text-[15px]

              2xl:text-base
            "
          >
            {slide.tags}
          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              m-0
              mt-[6px]
              text-[14px]
              leading-[1.55]
              text-[#756b62]

              max-[359px]:text-xs

              max-h-[700px]:max-[599px]:mt-1
              max-h-[700px]:max-[599px]:text-xs

              min-[430px]:max-[599px]:text-[15px]

              /* TABLET */
              md:mt-2
              md:text-[14px]

              /* DESKTOP */
              lg:mt-[9px]
              lg:text-base

              2xl:text-[17px]
            "
          >
            {slide.text}
          </p>

          {/* =================================================
              DOTS
          ================================================= */}

          <div
            className="
              my-3
              flex
              items-center
              justify-center
              gap-2

              max-[359px]:my-2

              max-h-[700px]:max-[599px]:my-[7px]

              /* TABLET */
              md:my-4

              /* DESKTOP */
              lg:my-5

              2xl:my-6
            "
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`
                  h-[9px]
                  w-[9px]
                  shrink-0
                  rounded-full
                  border-0
                  p-0
                  transition-all
                  duration-200
                  ease-in-out

                  ${
                    i === index
                      ? "w-[22px] rounded-full bg-[#711111]"
                      : "bg-[#d2cdc4]"
                  }

                  md:h-[10px]
                  md:w-[10px]
                `}
              />
            ))}
          </div>

          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={next}
            className="
              inline-flex
              h-[50px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-[14px]
              border-0
              bg-[#711111]
              p-0
              text-base
              font-bold
              text-white
              shadow-[0_7px_18px_rgba(113,17,17,0.16)]
              transition-all
              duration-200

              active:scale-[0.985]

              max-[359px]:h-[46px]
              max-[359px]:text-sm

              max-h-[700px]:max-[599px]:h-[44px]

              min-[430px]:max-[599px]:h-[52px]

              /* TABLET */
              md:h-[50px]
              md:text-[15px]

              /* DESKTOP */
              lg:h-[56px]
              lg:text-base
              lg:hover:-translate-y-px
              lg:hover:bg-[#4f0909]

              /* LARGE DESKTOP */
              2xl:h-[58px]
            "
          >
            {index === slides.length - 1 ? "Get Started" : "Next"}

            <span className="text-[23px] leading-none">›</span>
          </button>

          {/* =================================================
              SKIP
          ================================================= */}

          <button
            type="button"
            onClick={skip}
            className="
              mt-[6px]
              block
              h-[30px]
              w-full
              border-0
              bg-transparent
              p-0
              text-sm
              text-[#6c625b]
              transition-colors
              duration-200

              max-[359px]:h-[26px]
              max-[359px]:text-[13px]

              max-h-[700px]:max-[599px]:mt-[3px]
              max-h-[700px]:max-[599px]:h-6

              /* TABLET */
              md:mt-1
              md:h-[28px]
              md:text-[13px]

              /* DESKTOP */
              lg:mt-[9px]
              lg:h-[34px]
              lg:text-sm
              lg:hover:text-[#711111]
            "
          >
            Skip
          </button>
        </div>
      </section>

      {/* =====================================================
          GOLD DECORATION - LEFT
          MOBILE + TABLET
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[52px]
          left-1
          z-[3]
          h-[55px]
          w-[50px]
          opacity-[0.28]

          max-[359px]:bottom-[42px]

          max-h-[700px]:max-[599px]:bottom-[38px]

          md:bottom-[20px]
          md:h-[70px]
          md:w-[65px]
          md:opacity-[0.18]

          lg:hidden
        "
      >
        <i
          className="
            absolute
            left-1
            top-3
            block
            h-8
            w-[18px]
            rotate-[-38deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-5
            top-1
            block
            h-7
            w-4
            rotate-[35deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-[29px]
            top-[25px]
            block
            h-[25px]
            w-[14px]
            rotate-[52deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-3
            top-8
            block
            h-[22px]
            w-[13px]
            rotate-[-65deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-[23px]
            top-[38px]
            block
            h-2
            w-2
            rounded-full
            border-2
            border-[#d5b66f]
          "
        />
      </div>

      {/* =====================================================
          GOLD DECORATION - RIGHT
          MOBILE + TABLET
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[52px]
          right-1
          z-[3]
          h-[55px]
          w-[50px]
          -scale-x-100
          opacity-[0.28]

          max-[359px]:bottom-[42px]

          max-h-[700px]:max-[599px]:bottom-[38px]

          md:bottom-[20px]
          md:h-[70px]
          md:w-[65px]
          md:opacity-[0.18]

          lg:hidden
        "
      >
        <i
          className="
            absolute
            left-1
            top-3
            block
            h-8
            w-[18px]
            rotate-[-38deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-5
            top-1
            block
            h-7
            w-4
            rotate-[35deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-[29px]
            top-[25px]
            block
            h-[25px]
            w-[14px]
            rotate-[52deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-3
            top-8
            block
            h-[22px]
            w-[13px]
            rotate-[-65deg]
            rounded-[100%_0_100%_0]
            border-2
            border-[#d5b66f]
          "
        />

        <i
          className="
            absolute
            left-[23px]
            top-[38px]
            block
            h-2
            w-2
            rounded-full
            border-2
            border-[#d5b66f]
          "
        />
      </div>
    </main>
  );
}
