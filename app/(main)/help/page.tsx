"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How can I book a Seva?",
    answer:
      "Go to the Seva section, select the Seva you want, choose the available option and continue with the booking process.",
  },
  {
    id: 2,
    question: "How can I make a donation?",
    answer:
      "Open the Donation section, select a donation purpose or enter your preferred amount, then continue to payment.",
  },
  {
    id: 3,
    question: "Where can I see my bookings?",
    answer:
      "Open Profile and select My Bookings to view your upcoming, completed and cancelled bookings.",
  },
  {
    id: 4,
    question: "Where can I find my donation receipt?",
    answer:
      "Open Profile → My Donations. Successful donations will show the receipt option when receipt generation is connected.",
  },
  {
    id: 5,
    question: "How can I order Prasadam?",
    answer:
      "Open Prasadam, add the items you want to your cart, open My Cart and continue to checkout.",
  },
  {
    id: 6,
    question: "How can I change the app language?",
    answer:
      "Open Profile → Settings and select English, Hindi or Gujarati. Your selected language will be saved automatically.",
  },
];

export default function HelpSupportPage() {
  const router = useRouter();

  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaq((current) =>
      current === id ? null : id
    );
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
      {/* ============================================
          HEADER
      ============================================ */}

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
              Help & Support
            </h1>
          </div>
        </div>
      </header>

      {/* ============================================
          CONTENT
      ============================================ */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1200px]
          px-3
          py-5

          sm:px-5
          sm:py-7

          lg:px-8
          lg:py-9
        "
      >
        {/* ==========================================
            HERO
        ========================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[22px]
            bg-[linear-gradient(135deg,#701212_0%,#9e201a_55%,#c05b2c_100%)]
            px-5
            py-7
            text-white
            shadow-[0_10px_30px_rgba(94,28,17,0.15)]

            sm:px-7
            sm:py-8

            lg:px-9
            lg:py-10
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              -right-16
              -top-20
              h-[210px]
              w-[210px]
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
              -bottom-24
              right-20
              h-[180px]
              w-[180px]
              rounded-full
              bg-[#f0c46c]/10
            "
          />

          <div className="relative z-10 max-w-[650px]">
            <div
              className="
                grid
                h-12
                w-12
                place-items-center
                rounded-[14px]
                border
                border-white/15
                bg-white/10
                text-[#ffe2a0]
              "
            >
              <SupportIcon />
            </div>

            <p
              className="
                mt-4
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#f1cd82]
              "
            >
              DEVOTEE SUPPORT
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-[25px]
                font-bold
                leading-tight

                sm:text-[30px]
                lg:text-[36px]
              "
            >
              How can we help you?
            </h2>

            <p
              className="
                mt-2
                max-w-[580px]
                text-[11px]
                leading-5
                text-white/75

                sm:text-xs

                lg:text-[13px]
                lg:leading-6
              "
            >
              Get help with Seva, Darshan, Donations,
              Prasadam, bookings and other services of
              Shri Govardhannath Haveli.
            </p>
          </div>
        </section>

        {/* ==========================================
            QUICK SUPPORT
        ========================================== */}

        <section className="mt-7">
          <div>
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#b4873e]
              "
            >
              CONTACT US
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-xl
                font-bold
                text-[#641010]

                lg:text-[26px]
              "
            >
              Contact Support
            </h2>

            <p
              className="
                mt-1
                text-[10px]
                text-[#8c7e72]

                lg:text-[11px]
              "
            >
              Choose a convenient way to contact the
              temple support team.
            </p>
          </div>

          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-3

              sm:grid-cols-2

              lg:grid-cols-3
              lg:gap-5
            "
          >
            {/* CALL */}

            <SupportCard
              icon={<PhoneIcon />}
              title="Call Us"
              description="Speak with our support team"
              value="Temple contact number"
              buttonText="Call Now"
              onClick={() => {
                /*
                  REAL NUMBER MILNE KE BAAD:

                  window.location.href =
                    "tel:+91XXXXXXXXXX";
                */
              }}
            />

            {/* WHATSAPP */}

            <SupportCard
              icon={<WhatsAppIcon />}
              title="WhatsApp"
              description="Chat with temple support"
              value="Temple WhatsApp number"
              buttonText="Open WhatsApp"
              onClick={() => {
                /*
                  REAL NUMBER MILNE KE BAAD:

                  window.open(
                    "https://wa.me/91XXXXXXXXXX",
                    "_blank"
                  );
                */
              }}
            />

            {/* EMAIL */}

            <SupportCard
              icon={<EmailIcon />}
              title="Email"
              description="Send your query by email"
              value="Temple support email"
              buttonText="Send Email"
              onClick={() => {
                /*
                  REAL EMAIL MILNE KE BAAD:

                  window.location.href =
                    "mailto:support@example.com";
                */
              }}
            />
          </div>
        </section>
      
        {/* ==========================================
            FAQ
        ========================================== */}

        <section className="mt-8 lg:mt-10">
          <div
            className="
              grid
              grid-cols-1
              gap-5

              lg:grid-cols-[320px_minmax(0,1fr)]
              lg:gap-8
            "
          >
            {/* FAQ INTRO */}

            <div>
              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#b4873e]
                "
              >
                FAQ
              </p>

              <h2
                className="
                  mt-1
                  font-serif
                  text-xl
                  font-bold
                  text-[#641010]

                  lg:text-[26px]
                "
              >
                Frequently Asked Questions
              </h2>

              <p
                className="
                  mt-2
                  text-[10px]
                  leading-5
                  text-[#8c7e72]

                  lg:text-[11px]
                "
              >
                Find answers to common questions about
                temple services.
              </p>
            </div>

            {/* FAQ LIST */}

            <div className="space-y-2.5">
              {faqs.map((faq) => {
                const isOpen =
                  openFaq === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`
                      overflow-hidden
                      rounded-[14px]
                      border
                      bg-[#fffdf9]
                      transition

                      ${
                        isOpen
                          ? "border-[#d8bd8d]"
                          : "border-[#eadfce]"
                      }
                    `}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        toggleFaq(faq.id)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-4
                        p-4
                        text-left

                        sm:p-5
                      "
                    >
                      <span
                        className="
                          text-[11px]
                          font-bold
                          text-[#54483e]

                          sm:text-xs
                        "
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`
                          grid
                          h-7
                          w-7
                          shrink-0
                          place-items-center
                          rounded-full
                          bg-[#fff0d8]
                          text-[#a71919]
                          transition-transform
                          duration-200

                          ${
                            isOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      >
                        <ChevronIcon />
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        className="
                          border-t
                          border-[#f1e6d6]
                          px-4
                          pb-4
                          pt-3

                          sm:px-5
                          sm:pb-5
                        "
                      >
                        <p
                          className="
                            text-[10px]
                            leading-5
                            text-[#887a6f]

                            sm:text-[11px]
                            sm:leading-6
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            STILL NEED HELP
        ========================================== */}

        <section
          className="
            mt-8
            overflow-hidden
            rounded-[20px]
            border
            border-[#e4d2b5]
            bg-[linear-gradient(135deg,#fff1da,#fff9ee)]
            p-5

            sm:p-6

            lg:mt-10
            lg:flex
            lg:items-center
            lg:justify-between
            lg:gap-6
            lg:p-7
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <div
              className="
                grid
                h-11
                w-11
                shrink-0
                place-items-center
                rounded-full
                bg-[#a71919]
                text-white
              "
            >
              <SupportIcon />
            </div>

            <div>
              <h3
                className="
                  font-serif
                  text-[17px]
                  font-bold
                  text-[#641010]

                  lg:text-xl
                "
              >
                Still need help?
              </h3>

              <p
                className="
                  mt-1
                  max-w-[520px]
                  text-[10px]
                  leading-5
                  text-[#88786c]

                  lg:text-[11px]
                "
              >
                Contact the temple support team for
                assistance with your query.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              /*
                SUPPORT FORM BANANE KE BAAD:
                router.push("/help/contact");
              */
            }}
            className="
              mt-4
              min-h-[44px]
              w-full
              rounded-xl
              bg-[#a71919]
              px-5
              text-[11px]
              font-bold
              text-white
              shadow-[0_6px_16px_rgba(167,25,25,0.14)]
              transition

              hover:bg-[#851313]
              active:scale-[0.98]

              lg:mt-0
              lg:w-auto
            "
          >
            Contact Support
          </button>
        </section>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div
          className="
            mt-8
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
            <span className="text-[#b8893b]">
              ❧
            </span>
            <span className="text-[#b8893b]">
              ❧
            </span>
            <span className="text-[#b8893b]">
              ❧
            </span>
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

          <p
            className="
              mt-1
              text-[9px]
              text-[#a29487]
            "
          >
            Shri Govardhannath Haveli
          </p>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SUPPORT CARD
========================================================= */

function SupportCard({
  icon,
  title,
  description,
  value,
  buttonText,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <article
      className="
        rounded-[17px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        p-4
        shadow-[0_5px_20px_rgba(74,42,16,0.04)]

        sm:p-5
      "
    >
      <div
        className="
          grid
          h-11
          w-11
          place-items-center
          rounded-[13px]
          bg-[#fff0d8]
          text-[#a71919]
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-4
          font-serif
          text-[16px]
          font-bold
          text-[#641010]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-[9px]
          text-[#948579]
        "
      >
        {description}
      </p>

      <p
        className="
          mt-3
          text-[10px]
          font-semibold
          text-[#62564c]
        "
      >
        {value}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="
          mt-4
          min-h-[40px]
          w-full
          rounded-xl
          border
          border-[#e2cba6]
          bg-[#fff6e8]
          px-4
          text-[10px]
          font-bold
          text-[#a71919]
          transition

          hover:border-[#cfae79]
          hover:bg-[#ffedd2]
          active:scale-[0.98]
        "
      >
        {buttonText}
      </button>
    </article>
  );
}

/* =========================================================
   HELP TOPIC
========================================================= */

function HelpTopic({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        min-h-[125px]
        rounded-[16px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        p-4
        text-left
        shadow-[0_4px_16px_rgba(74,42,16,0.035)]
        transition

        hover:-translate-y-1
        hover:border-[#d8bd8d]
        hover:shadow-[0_9px_24px_rgba(74,42,16,0.07)]
      "
    >
      <div
        className="
          grid
          h-10
          w-10
          place-items-center
          rounded-xl
          bg-[#fff0d8]
          text-[17px]
          text-[#a71919]
          transition

          group-hover:bg-[#a71919]
          group-hover:text-white
        "
      >
        {icon}
      </div>

      <h3
        className="
          mt-3
          text-[11px]
          font-bold
          text-[#55493f]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-1
          text-[8px]
          leading-4
          text-[#95877b]

          sm:text-[9px]
        "
      >
        {description}
      </p>
    </button>
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
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[21px] w-[21px]"
    >
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H4Z" />
      <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h3Z" />
      <path d="M17 19c0 1.1-.9 2-2 2h-3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.5 8.5c.5 3 2 4.5 5 5" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px]"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}