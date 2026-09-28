"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/images/thakurji-1.jpg",
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
    image: "/images/thakurji-2.jpg",
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
    image: "/images/thakurji-3.jpg",
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

        lg:grid
        lg:h-screen
        lg:grid-cols-[minmax(0,1.2fr)_minmax(420px,0.8fr)]
        lg:overflow-hidden
        lg:text-left

        2xl:grid-cols-[minmax(0,1.28fr)_minmax(500px,0.72fr)]
      "
    >
      {/* =====================================================
          IMAGE
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

          /* TABLET */
          md:h-[57%]

          /* DESKTOP */
          lg:relative
          lg:h-screen
        "
      >
        <img
          src={slide.image}
          alt="Shri Govardhannathji"
          className="
            block
            h-full
            w-full
            object-cover
            object-[center_top]

            md:object-[center_15%]

            lg:object-[center_top]
          "
        />

        {/* Gradient */}
  <div
  className="
    pointer-events-none
    absolute
    inset-x-0
    bottom-0
    h-[35%]

    bg-gradient-to-b
    from-transparent
    via-[#fff9ed]/70
    to-[#fff9ed]

    md:h-[40%]

    lg:inset-0
    lg:h-auto
    lg:bg-[linear-gradient(to_right,transparent_55%,rgba(255,249,237,0.12)_72%,#fff9ed_100%)]
  "
/>
      </div>

      {/* =====================================================
          CONTENT
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

          /* TABLET */
          md:bottom-0
          md:h-[48%]
          md:px-8
          md:pb-5
          md:pt-2
          md:flex
          md:items-center
          md:justify-center

          /* DESKTOP */
          lg:relative
          lg:bottom-auto
          lg:left-auto
          lg:right-auto
          lg:h-screen
          lg:w-full
          lg:px-[50px]
          lg:py-[60px]
          lg:flex
          lg:items-center
          lg:justify-center
          lg:bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.11),transparent_34%),#fff9ed]

          2xl:px-[70px]
          2xl:py-[70px]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[390px]

            min-[430px]:max-[599px]:max-w-[420px]

            /* TABLET CARD */
            md:max-w-[540px]
            md:rounded-[24px]
            md:border
            md:border-[#e7dccb]
            md:bg-[#fffdf8]
            md:px-10
            md:py-5
            md:shadow-[0_18px_45px_rgba(84,47,15,0.09)]

            /* DESKTOP CARD */
            lg:mx-0
            lg:max-w-[480px]
            lg:rounded-[28px]
            lg:p-[44px_42px]
            lg:text-center
            lg:shadow-[0_22px_55px_rgba(82,46,15,0.11)]

            2xl:max-w-[520px]
            2xl:p-[50px_48px]
          "
        >
          {/* =================================================
              MINI LOGO
          ================================================= */}

          <div
            className="
              hidden

              md:mx-auto
              md:mb-2
              md:grid
              md:h-[50px]
              md:w-[50px]
              md:place-items-center
              md:rounded-full
              md:border
              md:border-[#e3c98b]
              md:bg-[#fffaf0]
              md:text-[24px]

              lg:mb-[18px]
              lg:h-[68px]
              lg:w-[68px]
              lg:text-[32px]
              lg:shadow-[0_7px_20px_rgba(111,67,18,0.07)]

              2xl:h-[74px]
              2xl:w-[74px]
              2xl:text-[35px]
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

              md:text-[32px]

              lg:text-[38px]

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

              md:mt-2
              md:text-[15px]

              lg:mt-4

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

              md:mt-1
              md:text-[15px]

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

              md:my-2

              lg:my-[21px]
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

                  lg:h-[10px]
                  lg:w-[10px]
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

              lg:hover:-translate-y-px
              lg:hover:bg-[#4f0909]

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
              md:h-[26px]
              md:text-[13px]

              /* DESKTOP */
              lg:mt-[9px]
              lg:h-[34px]

              lg:hover:text-[#711111]
            "
          >
            Skip
          </button>
        </div>
      </section>

      {/* =====================================================
          GOLD DECORATION - LEFT
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
