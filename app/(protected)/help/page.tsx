"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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
    setOpenFaq((current) => (current === id ? null : id));
  };

  return (
    <main
      className="
        min-h-[100dvh]
        overflow-x-hidden
        bg-[#fffaf1]
        pb-[80px]
        text-[#40372f]

        md:pb-[90px]

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:pb-10
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

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
            min-h-[56px]
            w-full
            max-w-[1400px]
            items-center
            gap-2.5
            px-3

            sm:min-h-[62px]
            sm:gap-3
            sm:px-5

            md:min-h-[66px]
            md:px-6

            lg:min-h-[72px]
            lg:px-8
          "
        >
          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            aria-label="Back to Dashboard"
            className="
    group
    grid
    h-9
    w-9
    shrink-0
    place-items-center
    rounded-full
    border
    border-[#ead7b8]
    bg-white
    text-[#641010]
    shadow-sm
    transition-all
    hover:border-[#b8893b]
    hover:bg-[#fff8eb]
    hover:shadow-sm
    active:scale-95

    sm:h-10
    sm:w-10
  "
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
               <ArrowLeft size={19} strokeWidth={1.8} />
            </span>
          </button>

          {/* HEADER TEXT */}

          <div className="min-w-0">
            <p
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#bd8b39]

                sm:text-[8px]
              "
            >
              Shri Govardhannath
            </p>

            <h1
              className="
                truncate
                font-serif
                text-[16px]
                font-bold
                leading-tight
                text-[#641010]

                sm:text-[19px]

                md:text-[21px]

                lg:text-[23px]
              "
            >
              Help & Support
            </h1>
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1200px]
          px-3
          py-3.5

          sm:px-5
          sm:py-5

          md:px-6
          md:py-6

          lg:px-8
          lg:py-7
        "
      >
        {/* =================================================
            HERO
        ================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[16px]
            bg-[linear-gradient(135deg,#701212_0%,#9e201a_55%,#c05b2c_100%)]
            px-4
            py-4.5
            text-white
            shadow-[0_8px_25px_rgba(94,28,17,0.14)]

            sm:rounded-[18px]
            sm:px-6
            sm:py-6

            md:px-7
            md:py-7

            lg:rounded-[22px]
            lg:px-8
            lg:py-8
          "
        >
          {/* DECORATION */}

          <div
            aria-hidden="true"
            className="
              absolute
              -right-16
              -top-20
              h-[180px]
              w-[180px]
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
              right-10
              h-[150px]
              w-[150px]
              rounded-full
              bg-[#f0c46c]/10

              sm:right-16
            "
          />

          <div className="relative z-10 max-w-[680px]">
            {/* SUPPORT ICON */}

            <div
              className="
                grid
                h-9
                w-9
                place-items-center
                rounded-[10px]
                border
                border-white/15
                bg-white/10
                text-[#ffe2a0]

                sm:h-11
                sm:w-11
              "
            >
              <SupportIcon />
            </div>

            {/* LABEL */}

            <p
              className="
                mt-2.5
                text-[7px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#f1cd82]

                sm:mt-3
                sm:text-[8px]
              "
            >
              DEVOTEE SUPPORT
            </p>

            {/* TITLE */}

            <h2
              className="
                mt-0.5
                font-serif
                text-[21px]
                font-bold
                leading-tight

                sm:text-[27px]

                md:text-[29px]

                lg:text-[32px]
              "
            >
              How can we help you?
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-1.5
                max-w-[620px]
                text-[8.5px]
                leading-4
                text-white/75

                sm:text-[10px]
                sm:leading-5

                md:text-[11px]

                lg:text-[12px]
              "
            >
              Get help with Seva, Darshan, Donations, Prasadam, bookings and
              other services of Shri Govardhannath Haveli.
            </p>

            {/* QUICK TAGS */}
          </div>
        </section>

        {/* =================================================
            CONTACT SUPPORT
        ================================================== */}

        <section
          className="
            mt-5

            sm:mt-6

            md:mt-7

            lg:mt-8
          "
        >
          {/* SECTION HEADING */}

          <div>
            <p
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#b4873e]

                sm:text-[8px]
              "
            >
              CONTACT US
            </p>

            <h2
              className="
                mt-0.5
                font-serif
                text-[17px]
                font-bold
                leading-tight
                text-[#641010]

                sm:text-xl

                md:text-[22px]

                lg:text-[24px]
              "
            >
              Contact Support
            </h2>

            <p
              className="
                mt-0.5
                text-[8.5px]
                leading-4
                text-[#8c7e72]

                sm:text-[10px]
              "
            >
              Choose a convenient way to contact the temple support team.
            </p>
          </div>

          {/* SUPPORT CARDS */}

          <div
            className="
              mt-2.5
              grid
              grid-cols-1
              gap-2

              sm:grid-cols-2
              sm:gap-2.5

              lg:grid-cols-3
              lg:gap-3
            "
          >
            {/* CALL */}

            <SupportCard
              icon={<PhoneIcon />}
              title="Call Us"
              description="Speak with our support team"
              buttonText="Call"
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
              buttonText="WhatsApp"
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
              buttonText="Email"
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

        {/* =================================================
            FAQ
        ================================================== */}

        <section
          className="
            mt-6

            sm:mt-7

            md:mt-8

            lg:mt-9
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-3.5

              md:gap-5

              lg:grid-cols-[270px_minmax(0,1fr)]
              lg:gap-7
          "
          >
            {/* FAQ INTRO */}

            <div>
              <p
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#b4873e]

                  sm:text-[8px]
                "
              >
                FAQ
              </p>

              <h2
                className="
                  mt-0.5
                  font-serif
                  text-[17px]
                  font-bold
                  leading-tight
                  text-[#641010]

                  sm:text-xl

                  md:text-[22px]

                  lg:text-[24px]
                "
              >
                Frequently Asked Questions
              </h2>

              <p
                className="
                  mt-1.5
                  max-w-[500px]
                  text-[8.5px]
                  leading-4
                  text-[#8c7e72]

                  sm:text-[10px]
                "
              >
                Find answers to common questions about temple services.
              </p>
            </div>

            {/* FAQ LIST */}

            <div className="space-y-1.5">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={`
                      overflow-hidden
                      rounded-[11px]
                      border
                      bg-[#fffdf9]
                      transition

                      ${
                        isOpen
                          ? "border-[#d8bd8d] shadow-[0_3px_12px_rgba(74,42,16,0.035)]"
                          : "border-[#eadfce]"
                      }
                    `}
                  >
                    {/* QUESTION */}

                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="
                        flex
                        min-h-[40px]
                        w-full
                        items-center
                        justify-between
                        gap-2.5
                        px-2.5
                        py-2
                        text-left

                        sm:min-h-[44px]
                        sm:px-4

                        md:min-h-[46px]
                      "
                    >
                      <span
                        className="
                          text-[9.5px]
                          font-bold
                          leading-4
                          text-[#54483e]

                          sm:text-[11px]

                          md:text-[11.5px]
                        "
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`
                          grid
                          h-5.5
                          w-5.5
                          shrink-0
                          place-items-center
                          rounded-full
                          bg-[#fff0d8]
                          text-[#a71919]
                          transition-transform
                          duration-200

                          sm:h-6
                          sm:w-6

                          ${isOpen ? "rotate-180" : ""}
                        `}
                      >
                        <ChevronIcon />
                      </span>
                    </button>

                    {/* ANSWER */}

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="
                          border-t
                          border-[#f1e6d6]
                          px-2.5
                          pb-2.5
                          pt-2

                          sm:px-4
                          sm:pb-3
                        "
                      >
                        <p
                          className="
                            text-[8.5px]
                            leading-4
                            text-[#887a6f]

                            sm:text-[10px]
                            sm:leading-5
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

        {/* =================================================
            STILL NEED HELP
        ================================================== */}

        <section
          className="
            mt-6
            overflow-hidden
            rounded-[15px]
            border
            border-[#e4d2b5]
            bg-[linear-gradient(135deg,#fff1da,#fff9ee)]
            p-3.5

            sm:mt-7
            sm:p-5

            md:flex
            md:items-center
            md:justify-between
            md:gap-5

            lg:mt-9
            lg:p-6
          "
        >
          {/* LEFT */}

          <div className="flex min-w-0 items-start gap-2.5">
            {/* ICON */}

            <div
              className="
                grid
                h-8
                w-8
                shrink-0
                place-items-center
                rounded-full
                bg-[#a71919]
                text-white

                sm:h-9
                sm:w-9
              "
            >
              <SupportIcon />
            </div>

            {/* TEXT */}

            <div className="min-w-0">
              <h3
                className="
                  font-serif
                  text-[14px]
                  font-bold
                  leading-tight
                  text-[#641010]

                  sm:text-[15px]

                  lg:text-lg
                "
              >
                Still need help?
              </h3>

              <p
                className="
                  mt-0.5
                  max-w-[600px]
                  text-[8.5px]
                  leading-4
                  text-[#88786c]

                  sm:text-[10px]
                "
              >
                Contact the temple support team for assistance with your query.
              </p>
            </div>
          </div>

          {/* CONTACT BUTTON */}

          <button
            type="button"
            onClick={() => {
              /*
                SUPPORT FORM BANANE KE BAAD:

                router.push("/help/contact");
              */
            }}
            className="
              mt-2.5
              h-8
              w-full
              rounded-lg
              bg-[#a71919]
              px-4
              text-[9px]
              font-bold
              text-white
              shadow-[0_5px_14px_rgba(167,25,25,0.14)]
              transition

              hover:bg-[#851313]
              active:scale-[0.98]

              sm:h-9

              md:mt-0
              md:w-auto

              lg:h-9
            "
          >
            Contact Support
          </button>
        </section>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div
          className="
            mt-5
            text-center

            sm:mt-6

            md:mt-7

            lg:mt-8
          "
        >
          <div className="flex items-center justify-center gap-1.5">
            <span className="h-px w-7 bg-[#ddc69b] sm:w-8" />

            <span className="text-[9px] text-[#b8893b]">❧</span>

            <span className="text-[9px] text-[#b8893b]">❧</span>

            <span className="text-[9px] text-[#b8893b]">❧</span>

            <span className="h-px w-7 bg-[#ddc69b] sm:w-8" />
          </div>

          <p
            className="
              mt-1.5
              font-serif
              text-[10px]
              font-semibold
              text-[#7b251e]

              sm:text-[11px]
            "
          >
            🙏 Jai Shree Krishna
          </p>

          <p
            className="
              mt-0.5
              text-[7px]
              text-[#a29487]

              sm:text-[8px]
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
  buttonText,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <article
      className="
        flex
        min-h-[72px]
        w-full
        items-center
        justify-between
        gap-2
        rounded-[12px]
        border
        border-[#eadfce]
        bg-[#fffdf9]
        px-2.5
        py-2
        shadow-[0_3px_12px_rgba(74,42,16,0.04)]

        sm:min-h-[80px]
        sm:px-3

        md:min-h-[82px]

        lg:min-h-[86px]
        lg:px-3.5
      "
    >
      {/* LEFT SIDE */}

      <div className="flex min-w-0 items-center gap-2">
        {/* ICON */}

        <div
          className="
            grid
            h-8
            w-8
            shrink-0
            place-items-center
            rounded-[8px]
            bg-[#fff0d8]
            text-[#a71919]

            sm:h-9
            sm:w-9
          "
        >
          {icon}
        </div>

        {/* TITLE + DESCRIPTION */}

        <div className="min-w-0">
          <h3
            className="
              font-serif
              text-[11.5px]
              font-bold
              leading-tight
              text-[#641010]

              sm:text-[13px]

              md:text-[13px]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-0.5
              max-w-[130px]
              truncate
              text-[7.5px]
              leading-3
              text-[#948579]

              sm:max-w-[170px]
              sm:text-[9px]
            "
          >
            {description}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE BUTTON */}

      <button
        type="button"
        onClick={onClick}
        className="
    h-5.5
    shrink-0
    rounded-[5px]
    border
    border-[#e2cba6]
    bg-[#fff6e8]
    px-1.5
    text-[6px]
    font-bold
    leading-none
    text-[#a71919]
    transition

    hover:border-[#cfae79]
    hover:bg-[#ffedd2]

    active:scale-[0.97]

    sm:h-6
    sm:px-2
    sm:text-[7px]
  "
      >
        {buttonText}
      </button>
    </article>
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
      className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]"
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
      className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px]"
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
      className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]"
    >
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .17 5.32.17 11.87c0 2.09.55 4.13 1.6 5.93L.1 24l6.35-1.66a11.87 11.87 0 0 0 5.6 1.42h.01c6.54 0 11.86-5.32 11.86-11.87 0-3.17-1.23-6.15-3.4-8.41ZM12.06 21.73h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.84 9.84 0 1 1 8.38 4.64Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
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
      className="h-[16px] w-[16px] sm:h-[17px] sm:w-[17px]"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />

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
      className="h-3 w-3 sm:h-3.5 sm:w-3.5"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
