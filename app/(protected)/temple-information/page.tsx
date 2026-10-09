"use client";

import { useRouter } from "next/navigation";

/* =========================================================
   DATA
========================================================= */

const timings = [
  {
    title: "Mangla Darshan",
    time: "Morning",
    icon: "sunrise",
  },
  {
    title: "Shringar Darshan",
    time: "Morning",
    icon: "flower",
  },
  {
    title: "Rajbhog Darshan",
    time: "Afternoon",
    icon: "temple",
  },
  {
    title: "Sandhya Aarti",
    time: "Evening",
    icon: "diya",
  },
];

const facilities = [
  {
    icon: "darshan",
    title: "Darshan",
    description: "Sacred darshan for devotees",
  },
  {
    icon: "seva",
    title: "Seva",
    description: "Participate in temple seva",
  },
  {
    icon: "prasadam",
    title: "Prasadam",
    description: "Receive blessed prasadam",
  },
  {
    icon: "donation",
    title: "Donation",
    description: "Support temple activities",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function TempleInformationPage() {
  const router = useRouter();

  return (
    <main
      className="
        min-h-[100dvh]
        overflow-x-hidden
        bg-[#fffaf1]
        pb-[105px]
        text-[#40372f]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-12
      "
    >
      {/* ===================================================
          MOBILE HEADER
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

          lg:hidden
        "
      >
        <div
          className="
            flex
            min-h-[64px]
            items-center
            gap-3
            px-4
          "
        >
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
              active:scale-95
            "
          >
            <BackIcon />
          </button>

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
              "
            >
              Temple Information
            </h1>
          </div>
        </div>
      </header>

      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-[linear-gradient(145deg,#711313_0%,#941b18_50%,#bd5629_100%)]
          text-white

          lg:min-h-[330px]
        "
      >
        {/* BACKGROUND DECORATION */}

        <div
          aria-hidden="true"
          className="
            absolute
            -right-20
            -top-24
            h-[260px]
            w-[260px]
            rounded-full
            border
            border-white/10
            bg-white/[0.035]

            lg:h-[400px]
            lg:w-[400px]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            -bottom-28
            left-[12%]
            h-[230px]
            w-[230px]
            rounded-full
            bg-[#efc56f]/10
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            w-full
            max-w-[1400px]
            flex-col
            px-4
            py-8

            sm:px-6
            sm:py-10

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-12
            lg:px-10
            lg:py-14

            xl:px-12
          "
        >
          {/* HERO CONTENT */}

          <div className="max-w-[680px]">
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-white/10
                px-3
                py-1.5
                text-[9px]
                font-semibold
                tracking-[0.08em]
                text-[#ffe5af]

                lg:text-[10px]
              "
            >
              <span>🙏</span>
              JAI SHREE KRISHNA
            </div>

            <h1
              className="
                font-serif
                text-[29px]
                font-bold
                leading-tight

                sm:text-[34px]

                lg:text-[45px]

                xl:text-[50px]
              "
            >
              Shri Govardhannath
              <span
                className="
                  mt-1
                  block
                  text-[#f2cc7d]
                "
              >
                Haveli
              </span>
            </h1>

            <p
              className="
                mt-4
                max-w-[600px]
                text-[12px]
                leading-6
                text-white/80

                sm:text-[13px]

                lg:text-[15px]
                lg:leading-7
              "
            >
              A sacred place of devotion, seva and
              spiritual connection dedicated to
              Shri Govardhannathji.
            </p>

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              <button
                type="button"
                onClick={() =>
                  router.push("/live-darshan")
                }
                className="
                  flex
                  min-h-[44px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#f2c66d]
                  px-5
                  text-[11px]
                  font-bold
                  text-[#671515]
                  shadow-lg
                  transition

                  hover:bg-[#f7d384]
                  active:scale-[0.98]

                  lg:min-h-[48px]
                  lg:px-6
                  lg:text-xs
                "
              >
                <PlayIcon />
                Live Darshan
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/darshan-timings")
                }
                className="
                  flex
                  min-h-[44px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/25
                  bg-white/10
                  px-5
                  text-[11px]
                  font-bold
                  text-white
                  transition

                  hover:bg-white/15
                  active:scale-[0.98]

                  lg:min-h-[48px]
                  lg:px-6
                  lg:text-xs
                "
              >
                <ClockIcon />
                Darshan Timings
              </button>
            </div>
          </div>

          {/* TEMPLE SYMBOL */}

          <div
            className="
              mt-8
              hidden
              shrink-0

              lg:block
            "
          >
            <div
              className="
                grid
                h-[190px]
                w-[190px]
                place-items-center
                rounded-full
                border
                border-[#f1cd84]/30
                bg-white/[0.07]
                shadow-[0_20px_50px_rgba(40,10,5,0.2)]

                xl:h-[210px]
                xl:w-[210px]
              "
            >
              <div
                className="
                  grid
                  h-[150px]
                  w-[150px]
                  place-items-center
                  rounded-full
                  border
                  border-[#f1cd84]/30
                  bg-[#fff8e9]/10
                  text-[76px]

                  xl:h-[165px]
                  xl:w-[165px]
                  xl:text-[84px]
                "
              >
                🛕
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PAGE CONTENT
      =================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-3
          py-5

          sm:px-5
          sm:py-7

          md:px-6

          lg:px-8
          lg:py-9

          xl:px-10
        "
      >
        {/* =================================================
            QUICK INFO
        ================================================= */}

        <section
          className="
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-3

            lg:gap-5
          "
        >
          <QuickInfoCard
            icon="location"
            label="Location"
            value="Shri Govardhannath Haveli"
          />

          <QuickInfoCard
            icon="clock"
            label="Darshan"
            value="Daily Darshan Available"
          />

          <QuickInfoCard
            icon="phone"
            label="Contact"
            value="Temple Office"
          />
        </section>

        {/* =================================================
            ABOUT + TIMINGS
        ================================================= */}

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-5

            lg:mt-8
            lg:grid-cols-[minmax(0,1.4fr)_minmax(330px,0.6fr)]
            lg:items-start
            lg:gap-7
          "
        >
          {/* ABOUT */}

          <section
            className="
              rounded-[18px]
              border
              border-[#eadfce]
              bg-[#fffdf9]
              p-4
              shadow-[0_6px_24px_rgba(76,42,16,0.045)]

              sm:p-5

              lg:rounded-[20px]
              lg:p-7
            "
          >
            <SectionHeading
              eyebrow="ABOUT THE TEMPLE"
              title="Shri Govardhannath Haveli"
              icon="temple"
            />

            <div
              className="
                mt-4
                space-y-3
                text-[12px]
                leading-6
                text-[#71665d]

                sm:text-[13px]

                lg:text-sm
                lg:leading-7
              "
            >
              <p>
                Shri Govardhannath Haveli is a sacred
                place where devotees come together for
                darshan, seva, prayer and spiritual
                devotion.
              </p>

              <p>
                The Haveli provides devotees with access
                to darshan information, seva and donation
                services, prasadam, important temple
                updates and religious events.
              </p>

              <p>
                Devotees can use this application to stay
                connected with temple activities and
                access important services from one place.
              </p>
            </div>

            {/* QUOTE */}

            <div
              className="
                mt-5
                rounded-xl
                border-l-[3px]
                border-[#b52a20]
                bg-[#fff4e3]
                px-4
                py-3
              "
            >
              <p
                className="
                  font-serif
                  text-[13px]
                  font-semibold
                  leading-6
                  text-[#6e321d]

                  sm:text-sm
                "
              >
                “Seva, Bhakti and Darshan bring the
                devotee closer to Shri Govardhannathji.”
              </p>
            </div>
          </section>

          {/* TIMINGS */}

          {/* <section
            className="
              rounded-[18px]
              border
              border-[#eadfce]
              bg-[#fffdf9]
              p-4
              shadow-[0_6px_24px_rgba(76,42,16,0.045)]

              sm:p-5

              lg:sticky
              lg:top-6
              lg:rounded-[20px]
              lg:p-6
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <SectionHeading
                eyebrow="DAILY"
                title="Darshan Timings"
                icon="clock"
              />

              <button
                type="button"
                onClick={() =>
                  router.push("/darshan-timings")
                }
                className="
                  shrink-0
                  text-[10px]
                  font-bold
                  text-[#a71919]
                  transition

                  hover:text-[#7d1212]
                "
              >
                View All →
              </button>
            </div>

            <div className="mt-4">
              {timings.map(
                (item, index) => (
                  <div
                    key={item.title}
                    className={`
                      flex
                      items-center
                      gap-3
                      py-3

                      ${
                        index !==
                        timings.length - 1
                          ? "border-b border-[#f0e5d6]"
                          : ""
                      }
                    `}
                  >
                    <div
                      className="
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        rounded-xl
                        bg-[#fff1dc]
                        text-[#a71919]
                      "
                    >
                      <SmallIcon
                        name={item.icon}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          truncate
                          text-[11px]
                          font-bold
                          text-[#4d433a]

                          sm:text-xs
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          mt-[2px]
                          text-[9px]
                          text-[#95877a]
                        "
                      >
                        {item.time}
                      </p>
                    </div>

                    <span
                      className="
                        text-[18px]
                        text-[#c0b1a0]
                      "
                    >
                      ›
                    </span>
                  </div>
                )
              )}
            </div>
          </section> */}
        </div>

        {/* =================================================
            FACILITIES
        ================================================= */}

        <section className="mt-6 lg:mt-9">
          <div
            className="
              mb-4
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-[#b78a3d]
                "
              >
                TEMPLE SERVICES
              </p>

              <h2
                className="
                  mt-1
                  font-serif
                  text-xl
                  font-bold
                  text-[#641010]

                  lg:text-[27px]
                "
              >
                Facilities & Services
              </h2>
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-3

              md:grid-cols-4

              lg:gap-5
            "
          >
            {facilities.map(
              (facility) => (
                <div
                  key={facility.title}
                  className="
                    group
                    rounded-[16px]
                    border
                    border-[#eadfce]
                    bg-[#fffdf9]
                    p-3
                    shadow-[0_5px_18px_rgba(74,42,16,0.04)]
                    transition-all

                    sm:p-4

                    lg:min-h-[155px]
                    lg:p-5
                    lg:hover:-translate-y-1
                    lg:hover:border-[#d8bd89]
                    lg:hover:shadow-[0_12px_30px_rgba(74,42,16,0.08)]
                  "
                >
                  <div
                    className="
                      grid
                      h-10
                      w-10
                      place-items-center
                      rounded-xl
                      bg-[#fff0d9]
                      text-[#a71919]

                      lg:h-11
                      lg:w-11
                    "
                  >
                    <SmallIcon
                      name={facility.icon}
                    />
                  </div>

                  <h3
                    className="
                      mt-3
                      text-[12px]
                      font-bold
                      text-[#4d433a]

                      lg:text-sm
                    "
                  >
                    {facility.title}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[9px]
                      leading-4
                      text-[#918478]

                      sm:text-[10px]

                      lg:text-[11px]
                      lg:leading-5
                    "
                  >
                    {facility.description}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* =================================================
            IMPORTANT INFORMATION
        ================================================= */}

        <section
          className="
            mt-6
            rounded-[18px]
            border
            border-[#eadfce]
            bg-[#fffdf9]
            p-4

            sm:p-5

            lg:mt-9
            lg:p-7
          "
        >
          <SectionHeading
            eyebrow="FOR DEVOTEES"
            title="Important Information"
            icon="info"
          />

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-3

              md:grid-cols-2

              lg:grid-cols-3
              lg:gap-4
            "
          >
            <InformationItem
              number="01"
              title="Maintain Silence"
              description="Please maintain peace and silence inside the temple premises."
            />

            <InformationItem
              number="02"
              title="Respect Darshan Rules"
              description="Follow the instructions provided by the temple staff during darshan."
            />

            <InformationItem
              number="03"
              title="Keep Premises Clean"
              description="Help us maintain the cleanliness and sanctity of the Haveli."
            />

            <InformationItem
              number="04"
              title="Prasadam"
              description="Please receive and handle blessed prasadam with respect."
            />

            <InformationItem
              number="05"
              title="Personal Belongings"
              description="Please take care of your personal belongings during your visit."
            />

            <InformationItem
              number="06"
              title="Temple Assistance"
              description="Contact the temple help desk if you require assistance."
            />
          </div>
        </section>

        {/* =================================================
            CONTACT / LOCATION
        ================================================= */}

        <section
          className="
            mt-6
            overflow-hidden
            rounded-[20px]
            border
            border-[#e5d2b2]
            bg-[linear-gradient(135deg,#fff4df_0%,#fffaf1_100%)]

            lg:mt-9
          "
        >
          <div
            className="
              grid
              grid-cols-1

              lg:grid-cols-[1fr_0.8fr]
            "
          >
            {/* CONTACT */}

            <div
              className="
                p-5

                sm:p-6

                lg:p-8
              "
            >
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-[#b78a3d]
                "
              >
                VISIT US
              </p>

              <h2
                className="
                  mt-1
                  font-serif
                  text-xl
                  font-bold
                  text-[#641010]

                  lg:text-[28px]
                "
              >
                Temple Location
              </h2>

              <div
                className="
                  mt-5
                  space-y-4
                "
              >
                <ContactRow
                  icon="location"
                  label="Address"
                  value="Shri Govardhannath Haveli"
                />

                <ContactRow
                  icon="phone"
                  label="Contact"
                  value="Temple Office"
                />

                <ContactRow
                  icon="clock"
                  label="Temple"
                  value="Open according to daily darshan schedule"
                />
              </div>
            </div>

            {/* DECORATIVE SIDE */}

            <div
              className="
                relative
                hidden
                min-h-[270px]
                overflow-hidden
                bg-[linear-gradient(145deg,#7a1514,#ad3c20)]

                lg:grid
                lg:place-items-center
              "
            >
              <div
                className="
                  absolute
                  -right-14
                  -top-16
                  h-52
                  w-52
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                className="
                  relative
                  z-10
                  text-center
                  text-white
                "
              >
                <div
                  className="
                    mx-auto
                    grid
                    h-24
                    w-24
                    place-items-center
                    rounded-full
                    border
                    border-[#f0c878]/30
                    bg-white/10
                    text-5xl
                  "
                >
                  🛕
                </div>

                <p
                  className="
                    mt-4
                    font-serif
                    text-lg
                    font-bold
                  "
                >
                  Shri Govardhannath
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    tracking-[0.12em]
                    text-[#f4d99f]
                  "
                >
                  JAI SHREE KRISHNA
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FOOTER MESSAGE
        ================================================= */}

        <div
          className="
            mt-6
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
            <span
              className="
                h-px
                w-10
                bg-[#ddc69b]

                lg:w-20
              "
            />

            <span className="text-[#b8893b]">
              ❧
            </span>

            <span className="text-[#b8893b]">
              ❧
            </span>

            <span className="text-[#b8893b]">
              ❧
            </span>

            <span
              className="
                h-px
                w-10
                bg-[#ddc69b]

                lg:w-20
              "
            />
          </div>

          <p
            className="
              mt-3
              font-serif
              text-[13px]
              font-semibold
              text-[#7b251e]

              lg:text-sm
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
   QUICK INFO CARD
========================================================= */

function QuickInfoCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-[15px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        p-3
        shadow-[0_4px_16px_rgba(74,42,16,0.035)]

        sm:flex-col
        sm:items-start
        sm:p-4

        lg:min-h-[105px]
        lg:flex-row
        lg:items-center
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
          rounded-xl
          bg-[#fff0da]
          text-[#a71919]

          lg:h-11
          lg:w-11
        "
      >
        <SmallIcon name={icon} />
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.08em]
            text-[#9d8c7c]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-[2px]
            truncate
            text-[11px]
            font-bold
            text-[#4d433a]

            lg:text-xs
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  icon,
}: {
  eyebrow: string;
  title: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          grid
          h-10
          w-10
          shrink-0
          place-items-center
          rounded-xl
          bg-[#fff0da]
          text-[#a71919]
        "
      >
        <SmallIcon name={icon} />
      </div>

      <div>
        <p
          className="
            text-[8px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-[#b78a3d]
          "
        >
          {eyebrow}
        </p>

        <h2
          className="
            mt-[1px]
            font-serif
            text-[18px]
            font-bold
            text-[#641010]

            sm:text-xl

            lg:text-[23px]
          "
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

/* =========================================================
   INFORMATION
========================================================= */

function InformationItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex
        gap-3
        rounded-xl
        border
        border-[#f0e3d0]
        bg-[#fffaf2]
        p-3

        lg:p-4
      "
    >
      <span
        className="
          grid
          h-8
          w-8
          shrink-0
          place-items-center
          rounded-lg
          bg-[#a71919]
          text-[9px]
          font-bold
          text-white
        "
      >
        {number}
      </span>

      <div>
        <h3
          className="
            text-[11px]
            font-bold
            text-[#4d433a]

            lg:text-xs
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-[9px]
            leading-4
            text-[#918478]

            lg:text-[10px]
            lg:leading-5
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          grid
          h-9
          w-9
          shrink-0
          place-items-center
          rounded-xl
          bg-white
          text-[#a71919]
          shadow-sm
        "
      >
        <SmallIcon name={icon} />
      </div>

      <div>
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.08em]
            text-[#a08e7d]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-[2px]
            text-[11px]
            font-semibold
            leading-5
            text-[#51463d]

            lg:text-xs
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
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

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function SmallIcon({
  name,
}: {
  name: string;
}) {
  const className =
    "h-[18px] w-[18px]";

  if (name === "location") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "temple") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M3 21h18" />
        <path d="M5 21V10h14v11" />
        <path d="M3 10h18" />
        <path d="M6 10l6-6 6 6" />
        <path d="M9 21v-6h6v6" />
      </svg>
    );
  }

  if (name === "sunrise") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={className}
      >
        <path d="M3 18h18" />
        <path d="M5 14a7 7 0 0 1 14 0" />
        <path d="M12 3v3" />
        <path d="m4.2 6.2 2.1 2.1" />
        <path d="m19.8 6.2-2.1 2.1" />
      </svg>
    );
  }

  if (name === "flower") {
    return (
      <span className="text-base">
        ❀
      </span>
    );
  }

  if (name === "diya") {
    return (
      <span className="text-base">
        🪔
      </span>
    );
  }

  if (name === "darshan") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  }

  if (name === "seva") {
    return (
      <span className="text-base">
        🙏
      </span>
    );
  }

  if (name === "prasadam") {
    return (
      <span className="text-base">
        🪔
      </span>
    );
  }

  if (name === "donation") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}