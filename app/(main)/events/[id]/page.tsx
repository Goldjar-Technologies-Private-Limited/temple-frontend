"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useLanguage } from "../../../lib/LanguageProvider";
import type { TranslationKey } from "../../../lib/i18n";

type EventItem = {
  id: string;
  titleKey: TranslationKey;
  dateKey: TranslationKey;
  image: string;
  imagePosition?: string;
};

type EventDetail = {
  description: string;
  location: string;
  time: string;
  about: string;
  category: string;
  duration: string;
  schedule: {
    time: string;
    title: string;
    description: string;
  }[];
};

const events: EventItem[] = [
  {
    id: "janmashtami-utsav",
    titleKey: "janmashtamiUtsav",
    dateKey: "janmashtamiDate",
    image: "/images/janmashtami2.jpg",
    imagePosition: "center 35%",
  },
  {
    id: "annakut-mahotsav",
    titleKey: "annakutMahotsav",
    dateKey: "annakutEventDate",
    image: "/images/annakut-event.jpg",
    imagePosition: "center 40%",
  },
  {
    id: "sharad-purnima",
    titleKey: "sharadPurnima",
    dateKey: "sharadPurnimaDate",
    image: "/images/sharad-purnima.jpg",
    imagePosition: "center 35%",
  },
  {
    id: "haveli-sangeet",
    titleKey: "haveliSangeet",
    dateKey: "haveliSangeetDate",
    image: "/images/haveli-sangeet.jpg",
    imagePosition: "center 40%",
  },
];

const eventDetails: Record<string, EventDetail> = {
  "janmashtami-utsav": {
    category: "Divine Celebration",
    duration: "3+ Hours",
    description:
      "Join us for a divine celebration of Shri Krishna Janmashtami with devotional prayers, darshan, bhajans and sacred festivities.",
    location: "Shri Govardhannath Haveli",
    time: "6:00 PM onwards",
    about:
      "Janmashtami is celebrated with devotion and joy as devotees come together to remember the divine appearance of Shri Krishna. The evening brings together special darshan, devotional singing, prayers and sacred celebrations in the peaceful atmosphere of the Haveli.",
    schedule: [
      {
        time: "6:00 PM",
        title: "Mangalacharan & Prayer",
        description:
          "Begin the evening with sacred prayers and devotional invocation.",
      },
      {
        time: "7:00 PM",
        title: "Bhajan & Kirtan",
        description:
          "Experience traditional devotional music and collective singing.",
      },
      {
        time: "8:00 PM",
        title: "Special Darshan",
        description:
          "Participate in the special darshan and devotional seva.",
      },
      {
        time: "9:00 PM",
        title: "Sacred Celebration",
        description:
          "Conclude the evening with prayers and festive devotional activities.",
      },
    ],
  },

  "annakut-mahotsav": {
    category: "Seva & Mahotsav",
    duration: "4+ Hours",
    description:
      "Experience the sacred Annakut Mahotsav with special darshan, devotional offerings and a beautiful celebration of gratitude.",
    location: "Shri Govardhannath Haveli",
    time: "5:00 PM onwards",
    about:
      "Annakut is a traditional celebration where devotees offer a grand variety of food preparations to the Lord. The festival expresses devotion, gratitude and community participation.",
    schedule: [
      {
        time: "5:00 PM",
        title: "Seva Begins",
        description:
          "Devotees gather for the beginning of the sacred seva.",
      },
      {
        time: "6:00 PM",
        title: "Annakut Darshan",
        description:
          "Witness the beautifully arranged devotional offerings.",
      },
      {
        time: "7:30 PM",
        title: "Bhajan Sandhya",
        description:
          "Enjoy an evening of devotional music and satsang.",
      },
      {
        time: "9:00 PM",
        title: "Prasad Seva",
        description:
          "Conclude the celebration with sacred prasad seva.",
      },
    ],
  },

  "sharad-purnima": {
    category: "Spiritual Gathering",
    duration: "3 Hours",
    description:
      "Celebrate the auspicious Sharad Purnima with devotional music, satsang and special darshan.",
    location: "Shri Govardhannath Haveli",
    time: "7:00 PM onwards",
    about:
      "Sharad Purnima is an important devotional occasion marked by prayers, music and spiritual gatherings. Devotees are invited to participate in the sacred atmosphere of the Haveli.",
    schedule: [
      {
        time: "7:00 PM",
        title: "Evening Prayer",
        description:
          "Start the celebration with peaceful evening prayers.",
      },
      {
        time: "7:45 PM",
        title: "Satsang",
        description:
          "Spend time in spiritual reflection and devotional discourse.",
      },
      {
        time: "8:30 PM",
        title: "Haveli Sangeet",
        description:
          "Listen to traditional devotional melodies.",
      },
      {
        time: "9:30 PM",
        title: "Special Darshan",
        description:
          "Complete the evening with special darshan.",
      },
    ],
  },

  "haveli-sangeet": {
    category: "Devotional Music",
    duration: "2+ Hours",
    description:
      "Immerse yourself in the traditional devotional melodies of Haveli Sangeet in a peaceful spiritual setting.",
    location: "Shri Govardhannath Haveli",
    time: "6:30 PM onwards",
    about:
      "Haveli Sangeet is a traditional devotional music practice associated with temple seva. Join us for an evening of bhajans and sacred melodies.",
    schedule: [
      {
        time: "6:30 PM",
        title: "Welcome & Prayer",
        description:
          "A peaceful beginning with traditional devotional prayers.",
      },
      {
        time: "7:00 PM",
        title: "Haveli Sangeet",
        description:
          "Experience traditional devotional compositions.",
      },
      {
        time: "8:00 PM",
        title: "Bhajan Sandhya",
        description:
          "Join fellow devotees in devotional singing.",
      },
      {
        time: "8:30 PM",
        title: "Closing Darshan",
        description:
          "Conclude the gathering with sacred darshan.",
      },
    ],
  },
};

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguage();

  const eventId = params?.id as string;
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#fffaf0] px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#ead9bf] bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1d8] text-3xl">
            🪷
          </div>

          <h1 className="text-2xl font-bold text-[#4b2921]">
            Event Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#806e63]">
            The event you are looking for could not be found.
          </p>

          <button
            type="button"
            onClick={() => router.push("/events")}
            className="mt-7 w-full rounded-2xl bg-[#a71919] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#851313]"
          >
            Back to Events
          </button>
        </div>
      </main>
    );
  }

  const details = eventDetails[event.id];

  const handleShare = async () => {
    const shareData = {
      title: t(event.titleKey),
      text: details.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Event link copied!");
      }
    } catch {}
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#fffaf0] text-[#4b4039] pb-[110px] lg:pb-10">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-[#eadcc8] bg-[#fffaf0]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#e7d8c2] bg-white text-[#6b5046] shadow-sm transition hover:border-[#c9aa7c] hover:bg-[#fff7e8]"
            aria-label="Go back"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 transition group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a71919]">
              Shri Govardhannath
            </p>

            <p className="mt-0.5 text-sm font-bold text-[#4b2921] sm:text-base">
              Event Details
            </p>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7d8c2] bg-white text-[#6b5046] shadow-sm transition hover:border-[#c9aa7c] hover:bg-[#fff7e8]"
            aria-label="Share event"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path d="m8.2 10.8 7.5-4.4" />
              <path d="m8.2 13.2 7.5 4.4" />
            </svg>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =======================================================
            BREADCRUMB
        ======================================================= */}
        <div className="hidden items-center gap-2 py-5 text-xs sm:flex">
          <button
            type="button"
            onClick={() => router.push("/events")}
            className="font-medium text-[#967e70] transition hover:text-[#a71919]"
          >
            Events
          </button>

          <span className="text-[#c8b5a0]">/</span>

          <span className="max-w-[300px] truncate font-semibold text-[#5d4339]">
            {t(event.titleKey)}
          </span>
        </div>

        {/* =======================================================
            HERO
        ======================================================= */}
        <section className="relative overflow-hidden rounded-[28px] border border-[#ead8bd] bg-[#4d2119] shadow-[0_20px_60px_rgba(90,48,25,0.14)] sm:rounded-[34px]">
          <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[590px]">
            <Image
              src={event.image}
              alt={t(event.titleKey)}
              fill
              priority
              quality={95}
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 100vw,
                1280px
              "
              style={{
                objectPosition: event.imagePosition || "center center",
              }}
              className="scale-[1.01] object-cover"
            />

            {/* Image overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#27110d]/95 via-[#27110d]/35 to-[#27110d]/5" />

            <div className="absolute inset-0 bg-gradient-to-r from-[#26120e]/35 via-transparent to-transparent" />

            {/* Top badge */}
            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f3c76a]" />
                {details.category}
              </div>
            </div>

            {/* Decorative lotus */}
            <div className="absolute right-5 top-5 hidden h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-3xl backdrop-blur-sm sm:flex">
              🪷
            </div>

            {/* Hero content */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
              <div className="max-w-4xl">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#f4c76b] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#5b321d]">
                    Sacred Event
                  </span>

                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white/90 backdrop-blur-md">
                    {details.duration}
                  </span>
                </div>

                <h1 className="max-w-4xl text-3xl font-black leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                  {t(event.titleKey)}
                </h1>

                <div className="mt-5 h-px w-20 bg-[#e6b95e]" />

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8 lg:text-lg">
                  {details.description}
                </p>

                {/* Hero info */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md">
                    <CalendarIcon />
                    <span className="text-xs font-semibold text-white sm:text-sm">
                      {t(event.dateKey)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 backdrop-blur-md">
                    <ClockIcon />
                    <span className="text-xs font-semibold text-white sm:text-sm">
                      {details.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================
            QUICK INFO
        ======================================================= */}
    

        {/* =======================================================
            MAIN CONTENT + SIDEBAR
        ======================================================= */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start xl:gap-12">
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}
          <div className="min-w-0">
            {/* ABOUT */}
            <section>
              <SectionHeading
                eyebrow="The Celebration"
                title="About the Event"
              />

              <div className="relative mt-6 overflow-hidden rounded-[26px] border border-[#eadcc8] bg-white p-6 shadow-[0_12px_40px_rgba(90,48,25,0.06)] sm:p-8">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#a71919] via-[#d5a54c] to-transparent" />

                <div className="flex gap-4">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff3dc] text-xl sm:flex">
                    🪷
                  </div>

                  <div>
                    <p className="text-[15px] leading-8 text-[#66574f] sm:text-base">
                      {details.about}
                    </p>

                    <p className="mt-5 text-[15px] leading-8 text-[#66574f] sm:text-base">
                      Come together with fellow devotees to experience an
                      atmosphere filled with devotion, music, prayer and
                      peaceful darshan at Shri Govardhannath Haveli.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="mt-12 sm:mt-14">
              <SectionHeading
                eyebrow="Experience"
                title="Event Highlights"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Highlight
                  icon="🙏"
                  title="Sacred Darshan"
                  text="Experience peaceful and devotional darshan."
                />

                <Highlight
                  icon="🎶"
                  title="Devotional Music"
                  text="Traditional bhajans, kirtan and sacred melodies."
                />

                <Highlight
                  icon="🪔"
                  title="Spiritual Gathering"
                  text="Join devotees in a meaningful sacred celebration."
                />
              </div>
            </section>

            {/* LIVE DARSHAN CTA */}
            <section className="mt-12 sm:mt-14">
              <div className="relative overflow-hidden rounded-[28px] bg-[#7e1717] p-6 shadow-[0_18px_45px_rgba(126,23,23,0.20)] sm:p-8">
                <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#e9b94f]/15 blur-2xl" />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffe7b0]">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#f4c76b]" />
                      Live Darshan
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      Experience Darshan from Anywhere
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Join the sacred atmosphere of Shri Govardhannath Haveli
                      through our live darshan experience.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/live-darshan")}
                    className="group flex min-h-[54px] shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-[#8c1717] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#fff8e8] active:scale-[0.98] sm:min-w-[205px]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a71919] text-white">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8ZM9.6 15.5v-7L16 12l-6.4 3.5Z" />
                      </svg>
                    </span>

                    <span>Watch Live Darshan</span>

                    <span className="text-lg transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* SCHEDULE */}
            <section className="mt-12 sm:mt-14">
              <SectionHeading
                eyebrow="Program"
                title="Event Schedule"
              />

              <div className="relative mt-7">
                {/* Timeline line */}
                <div className="absolute bottom-5 left-[21px] top-5 w-px bg-gradient-to-b from-[#d9b56c] via-[#ead9bb] to-transparent sm:left-[27px]" />

                <div className="space-y-5">
                  {details.schedule.map((item, index) => (
                    <div
                      key={`${item.time}-${item.title}`}
                      className="group relative flex gap-4 sm:gap-6"
                    >
                      {/* Dot */}
                      <div className="relative z-10 flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full border border-[#e5c98f] bg-[#fffaf0] sm:h-[55px] sm:w-[55px]">
                        <div className="h-3 w-3 rounded-full bg-[#a71919] shadow-[0_0_0_5px_#fff3d8] transition group-hover:scale-125" />
                      </div>

                      {/* Card */}
                      <div className="flex-1 rounded-[22px] border border-[#eadcc8] bg-white p-5 shadow-[0_8px_30px_rgba(90,48,25,0.05)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_35px_rgba(90,48,25,0.09)] sm:p-6">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#a71919]">
                              Step {String(index + 1).padStart(2, "0")}
                            </p>

                            <h3 className="mt-1.5 text-base font-bold text-[#4b2921] sm:text-lg">
                              {item.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#7a6b62]">
                              {item.description}
                            </p>
                          </div>

                          <span className="w-fit shrink-0 rounded-full bg-[#fff3dc] px-3 py-1.5 text-xs font-bold text-[#805a27]">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* VENUE */}
            <section className="mt-12 sm:mt-14">
              <SectionHeading
                eyebrow="Visit Us"
                title="Venue"
              />

              <div className="relative mt-6 overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#3f211b] shadow-[0_16px_40px_rgba(63,33,27,0.12)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(230,185,94,0.18),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(167,25,25,0.25),transparent_35%)]" />

                <div className="relative grid gap-7 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-3xl backdrop-blur-md">
                    🛕
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c17a]">
                      Sacred Venue
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                      Shri Govardhannath Haveli
                    </h3>

                    <div className="mt-3 flex items-start gap-2 text-sm leading-6 text-white/70">
                      <LocationIcon />

                      <span>{details.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                  >
                    View Location
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* =====================================================
              DESKTOP SIDEBAR
          ===================================================== */}
          <aside className="hidden lg:block lg:sticky lg:top-[92px]">
            <div className="space-y-5">
              {/* Event Info */}
              <div className="overflow-hidden rounded-[28px] border border-[#eadcc8] bg-white shadow-[0_14px_40px_rgba(90,48,25,0.07)]">
                <div className="bg-gradient-to-br from-[#7f1717] to-[#a71919] p-6 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f7d99c]">
                    Event Information
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {t(event.titleKey)}
                  </h3>
                </div>

                <div className="divide-y divide-[#f0e5d6]">
                  <SideDetail
                    icon={<CalendarIcon dark />}
                    label="Date"
                    value={t(event.dateKey)}
                  />

                  <SideDetail
                    icon={<ClockIcon dark />}
                    label="Time"
                    value={details.time}
                  />

                  <SideDetail
                    icon={<LocationIcon dark />}
                    label="Venue"
                    value={details.location}
                  />

                  <SideDetail
                    icon={<HourglassIcon />}
                    label="Duration"
                    value={details.duration}
                  />
                </div>

                <div className="p-5">
                  <button
                    type="button"
                    onClick={() => router.push("/seva-donation")}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f3c66d] px-5 py-3.5 text-sm font-extrabold text-[#5a321f] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e9b957]"
                  >
                    <HeartIcon />
                    Support Seva
                  </button>
                </div>
              </div>

              {/* Share */}
              <div className="rounded-[28px] border border-[#eadcc8] bg-white p-6 shadow-[0_14px_40px_rgba(90,48,25,0.06)]">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3dc] text-[#a71919]">
                    <ShareIcon />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#4b2921]">
                      Share this event
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#81736b]">
                      Invite your family and friends to join the celebration.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#e6d6c0] bg-[#fffaf0] px-4 py-3 text-sm font-bold text-[#68483b] transition hover:border-[#d0b17c] hover:bg-[#fff5e2]"
                >
                  <ShareIcon />
                  Share Event
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* =======================================================
            BOTTOM DECORATION
        ======================================================= */}
        <div className="mt-16 flex items-center justify-center gap-4 sm:mt-20">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d9bd88]" />

          <div className="text-lg text-[#b38a4c]">🪷</div>

          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d9bd88]" />
        </div>

        <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#aa9382]">
          Jai Shree Krishna
        </p>
      </div>

      {/* =========================================================
          MOBILE BOTTOM BAR
      ========================================================= */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8d8c1] bg-[#fffaf0]/95 p-3 shadow-[0_-12px_35px_rgba(65,35,20,0.12)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-xl gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-2xl border border-[#e2d1b9] bg-white text-[#6b4b3e]"
            aria-label="Share event"
          >
            <ShareIcon />
          </button>

          <button
            type="button"
            onClick={() => router.push("/seva-donation")}
            className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#f0c36a] px-4 text-sm font-extrabold text-[#5c351f] shadow-[0_8px_20px_rgba(201,154,63,0.18)] transition active:scale-[0.98]"
          >
            <HeartIcon />
            Support Seva
          </button>

          <button
            type="button"
            onClick={() => router.push("/live-darshan")}
            className="flex h-[54px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#a71919] px-4 text-sm font-extrabold text-white shadow-[0_8px_22px_rgba(167,25,25,0.20)] transition active:scale-[0.98]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#a71919]">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8ZM9.6 15.5v-7L16 12l-6.4 3.5Z" />
              </svg>
            </span>

            Live Darshan
          </button>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#a71919]">
        {eyebrow}
      </p>

      <div className="mt-2 flex items-center gap-3">
        <h2 className="text-2xl font-black tracking-[-0.025em] text-[#4b2921] sm:text-3xl">
          {title}
        </h2>

        <div className="hidden h-px max-w-[100px] flex-1 bg-gradient-to-r from-[#d9bd88] to-transparent sm:block" />
      </div>
    </div>
  );
}

/* =============================================================
   QUICK INFO
============================================================= */

function QuickInfo({
  icon,
  label,
  value,
  border = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 p-5 sm:p-6 ${
        border ? "border-t border-[#eee3d4] sm:border-l sm:border-t-0" : ""
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fff4df] text-[#a71919]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#a28c7d]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-bold text-[#4f3830]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   HIGHLIGHT
============================================================= */

function Highlight({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-[24px] border border-[#eadcc8] bg-white p-5 shadow-[0_8px_30px_rgba(90,48,25,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(90,48,25,0.08)] sm:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3dc] text-2xl transition group-hover:scale-105">
        {icon}
      </div>

      <h3 className="mt-5 text-base font-bold text-[#4b2921]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#7b6b62]">{text}</p>
    </div>
  );
}

/* =============================================================
   SIDEBAR DETAIL
============================================================= */

function SideDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff4df] text-[#a71919]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#aa9585]">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold leading-5 text-[#594139]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* =============================================================
   ICONS
============================================================= */

function CalendarIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`h-5 w-5 shrink-0 ${
        dark ? "text-[#a71919]" : "text-white/80"
      }`}
    >
      <rect x="3" y="4.5" width="18" height="17" rx="3" />
      <path d="M16 2.5v4M8 2.5v4M3 9.5h18" />
    </svg>
  );
}

function ClockIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`h-5 w-5 shrink-0 ${
        dark ? "text-[#a71919]" : "text-white/80"
      }`}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function LocationIcon({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={`h-5 w-5 shrink-0 ${
        dark ? "text-[#a71919]" : "text-white/70"
      }`}
    >
      <path d="M20 10.5c0 5.5-8 10.5-8 10.5S4 16 4 10.5a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M6 3h12M6 21h12" />
      <path d="M8 3c0 4 4 5 4 6s-4 2-4 6M16 3c0 4-4 5-4 6s4 2 4 6" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.5-4.4" />
      <path d="m8.2 13.2 7.5 4.4" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.5Z" />
    </svg>
  );
}