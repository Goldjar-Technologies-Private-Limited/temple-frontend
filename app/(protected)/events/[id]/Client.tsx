"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import type { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageProvider";
import {
  Calendar,
  Clock,
  MapPin,
  Hourglass,
  Share2,
  Heart,
  Play,
} from "lucide-react";

import {
  EVENTS_WITH_POSITIONS as events,
  EVENT_DETAILS as eventDetails,
} from "@/data/events";

export default function EventDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguage();

  const eventId = params?.id as string;
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <main className="flex min-h-dvh w-full items-center justify-center overflow-x-clip bg-[#fffaf0] px-4 py-8 sm:px-6 lg:ml-[92px] lg:w-[calc(100%-92px)]">
        <div className="w-full max-w-md rounded-3xl border border-[#ead9bf] bg-white p-6 text-center shadow-xl sm:p-8">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1d8] text-3xl">
            🪷
          </div>

          <h1 className="text-xl font-bold text-[#4b2921] sm:text-2xl">
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
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Event link copied!");
      } else {
        window.prompt("Copy this event link:", window.location.href);
      }
    } catch {
      // The user may cancel native share dialog
    }
  };

  const handleViewLocation = () => {
    const query = encodeURIComponent(
      `Shri Govardhannath Haveli ${details.location}`
    );

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main
      className="
        relative min-h-dvh w-full overflow-x-clip
        bg-[#fffaf0] text-[#4b4039]
        pb-12 px-3 sm:px-6 lg:px-8
        lg:ml-[92px] lg:w-[calc(100%-92px)]
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* BREADCRUMB */}
        <div className="hidden items-center gap-2 py-4 text-xs sm:flex sm:py-5">
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

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[24px] border border-[#ead8bd] bg-[#4d2119] shadow-[0_20px_60px_rgba(90,48,25,0.14)] sm:rounded-[32px] lg:rounded-[36px]">
          <div className="relative min-h-[420px] w-full sm:min-h-[500px] lg:min-h-[560px]">
            <Image
              src={event.image}
              alt={t(event.titleKey)}
              fill
              priority
              quality={95}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
              style={{
                objectPosition: event.imagePosition || "center center",
              }}
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#27110d]/95 via-[#27110d]/40 to-[#27110d]/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#26120e]/40 via-transparent to-transparent" />

            <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f3c76a]" />
                {details.category}
              </div>
            </div>

            <div className="absolute right-6 top-6 hidden h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl backdrop-blur-sm lg:flex">
              🪷
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
              <div className="max-w-4xl">
                <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
                  <span className="rounded-full bg-[#f4c76b] px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#5b321d] sm:py-1.5 sm:text-[10px]">
                    Sacred Event
                  </span>

                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-semibold text-white/90 backdrop-blur-md sm:py-1.5 sm:text-[10px]">
                    {details.duration}
                  </span>
                </div>

                <h1 className="text-2xl font-black leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  {t(event.titleKey)}
                </h1>

                <div className="mt-4 h-px w-16 bg-[#e6b95e] sm:mt-5 sm:w-20" />

                <p className="mt-4 max-w-3xl text-xs leading-6 text-white/85 sm:mt-5 sm:text-sm sm:leading-7 lg:text-base">
                  {details.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/25 px-3.5 py-2.5 backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-3">
                    <Calendar className="h-4 w-4 shrink-0 text-white/80 sm:h-5 sm:w-5" />
                    <span className="text-xs font-semibold text-white sm:text-sm">
                      {t(event.dateKey)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/25 px-3.5 py-2.5 backdrop-blur-md sm:rounded-2xl sm:px-4 sm:py-3">
                    <Clock className="h-4 w-4 shrink-0 text-white/80 sm:h-5 sm:w-5" />
                    <span className="text-xs font-semibold text-white sm:text-sm">
                      {details.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT AND SIDEBAR GRID */}
        <div className="mt-8 grid min-w-0 gap-8 sm:mt-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="min-w-0 space-y-10 sm:space-y-12 lg:space-y-14">
            
            {/* 1. ABOUT THE EVENT */}
            <section>
              <SectionHeading
                eyebrow="The Celebration"
                title="About the Event"
              />

              <div className="relative mt-5 overflow-hidden rounded-[22px] border border-[#eadcc8] bg-white p-5 shadow-[0_12px_40px_rgba(90,48,25,0.06)] sm:mt-6 sm:rounded-[26px] sm:p-8">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#a71919] via-[#d5a54c] to-transparent" />

                <div className="flex gap-4">
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff3dc] text-xl sm:flex">
                    🪷
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm leading-7 text-[#66574f] sm:text-base sm:leading-8">
                      {details.about}
                    </p>

                    <p className="text-sm leading-7 text-[#66574f] sm:text-base sm:leading-8">
                      Come together with fellow devotees to experience an
                      atmosphere filled with devotion, music, prayer and
                      peaceful darshan at Shri Govardhannath Haveli.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. MOBILE / TABLET ONLY: EVENT INFO & SHARE CARDS */}
            <div className="block lg:hidden space-y-5">
              <EventInfoCard
                title={t(event.titleKey)}
                date={t(event.dateKey)}
                time={details.time}
                location={details.location}
                duration={details.duration}
                onSevaClick={() => router.push("/seva-donation")}
              />

              <EventShareCard onShareClick={handleShare} />
            </div>

            {/* 3. HIGHLIGHTS */}
            <section>
              <SectionHeading eyebrow="Experience" title="Event Highlights" />

              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-3">
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

            {/* 4. LIVE DARSHAN BANNER */}
            <section>
              <div className="relative overflow-hidden rounded-[24px] bg-[#7e1717] p-5 shadow-[0_18px_45px_rgba(126,23,23,0.20)] sm:rounded-[28px] sm:p-8">
                <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#e9b94f]/15 blur-2xl" />

                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-xl">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffe7b0]">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#f4c76b]" />
                      Live Darshan
                    </div>

                    <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                      Experience Darshan from Anywhere
                    </h2>

                    <p className="mt-2 text-xs leading-6 text-white/75 sm:text-sm">
                      Join the sacred atmosphere of Shri Govardhannath Haveli
                      through our live darshan experience.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/live-darshan")}
                    className="group flex min-h-[50px] w-full shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-[#8c1717] shadow-lg transition hover:bg-[#fff8e8] active:scale-[0.98] sm:min-h-[54px] sm:px-5 lg:w-auto"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a71919] text-white sm:h-9 sm:w-9">
                      <Play className="h-3.5 w-3.5 fill-white sm:h-4 sm:w-4" />
                    </span>

                    <span>Watch Live Darshan</span>
                    <span className="text-lg transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* 5. SCHEDULE */}
            <section>
              <SectionHeading eyebrow="Program" title="Event Schedule" />

              <div className="relative mt-6 sm:mt-7">
                <div className="absolute bottom-5 left-[21px] top-5 w-px bg-gradient-to-b from-[#d9b56c] via-[#ead9bb] to-transparent sm:left-[27px]" />

                <div className="space-y-4 sm:space-y-5">
                  {details.schedule.map((item, index) => (
                    <div
                      key={`${item.time}-${item.title}`}
                      className="group relative flex min-w-0 gap-4 sm:gap-6"
                    >
                      <div className="relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-[#e5c98f] bg-[#fffaf0] sm:h-[54px] sm:w-[54px]">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#a71919] shadow-[0_0_0_4px_#fff3d8] transition group-hover:scale-125 sm:h-3 sm:w-3" />
                      </div>

                      <div className="min-w-0 flex-1 rounded-[20px] border border-[#eadcc8] bg-white p-4 shadow-[0_8px_30px_rgba(90,48,25,0.05)] transition duration-300 group-hover:-translate-y-0.5 sm:rounded-[22px] sm:p-6">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0 space-y-1 sm:space-y-1.5">
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#a71919] sm:text-[10px]">
                              Step {String(index + 1).padStart(2, "0")}
                            </p>

                            <h3 className="break-words text-sm font-bold text-[#4b2921] sm:text-base lg:text-lg">
                              {item.title}
                            </h3>

                            <p className="text-xs leading-5 text-[#7a6b62] sm:text-sm sm:leading-6">
                              {item.description}
                            </p>
                          </div>

                          <span className="w-fit shrink-0 rounded-full bg-[#fff3dc] px-3 py-1 text-[11px] font-bold text-[#805a27] sm:text-xs">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. VENUE */}
            <section>
              <SectionHeading eyebrow="Visit Us" title="Venue" />

              <div className="relative mt-5 overflow-hidden rounded-[24px] border border-[#eadcc8] bg-[#3f211b] shadow-[0_16px_40px_rgba(63,33,27,0.12)] sm:mt-6 sm:rounded-[28px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(230,185,94,0.18),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(167,25,25,0.25),transparent_35%)]" />

                <div className="relative grid gap-5 p-5 sm:gap-7 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl backdrop-blur-md sm:h-16 sm:w-16 sm:text-3xl">
                    🛕
                  </div>

                  <div className="min-w-0 space-y-1.5 sm:space-y-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e5c17a] sm:text-[10px]">
                      Sacred Venue
                    </p>

                    <h3 className="break-words text-lg font-bold text-white sm:text-xl lg:text-2xl">
                      Shri Govardhannath Haveli
                    </h3>

                    <div className="flex items-start gap-2 text-xs leading-5 text-white/70 sm:text-sm sm:leading-6">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                      <span>{details.location}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleViewLocation}
                    className="min-h-11 w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:text-sm md:w-auto"
                  >
                    View Location
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* DESKTOP ONLY SIDEBAR */}
          <aside className="hidden lg:sticky lg:top-6 lg:block xl:top-8">
            <div className="space-y-5">
              <EventInfoCard
                title={t(event.titleKey)}
                date={t(event.dateKey)}
                time={details.time}
                location={details.location}
                duration={details.duration}
                onSevaClick={() => router.push("/seva-donation")}
              />

              <EventShareCard onShareClick={handleShare} />
            </div>
          </aside>
        </div>

        {/* FOOTER DECORATION */}
        <div className="mt-14 flex items-center justify-center gap-4 sm:mt-20">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d9bd88] sm:w-16" />
          <div className="text-base text-[#b38a4c] sm:text-lg">🪷</div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d9bd88] sm:w-16" />
        </div>

        <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#aa9382]">
          Jai Shree Krishna
        </p>
      </div>
    </main>
  );
}

/* =============================================================
   REUSABLE EVENT CARDS
============================================================= */

function EventInfoCard({
  title,
  date,
  time,
  location,
  duration,
  onSevaClick,
}: {
  title: string;
  date: string;
  time: string;
  location: string;
  duration: string;
  onSevaClick: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#eadcc8] bg-white shadow-[0_14px_40px_rgba(90,48,25,0.07)]">
      <div className="bg-gradient-to-br from-[#7f1717] to-[#a71919] p-6 text-white">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f7d99c]">
          Event Information
        </p>

        <h3 className="mt-2 text-xl font-bold">{title}</h3>
      </div>

      <div className="divide-y divide-[#f0e5d6]">
        <SideDetail
          icon={<Calendar className="h-5 w-5" />}
          label="Date"
          value={date}
        />

        <SideDetail
          icon={<Clock className="h-5 w-5" />}
          label="Time"
          value={time}
        />

        <SideDetail
          icon={<MapPin className="h-5 w-5" />}
          label="Venue"
          value={location}
        />

        <SideDetail
          icon={<Hourglass className="h-5 w-5" />}
          label="Duration"
          value={duration}
        />
      </div>

      <div className="p-5">
        <button
          type="button"
          onClick={onSevaClick}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#f3c66d] px-5 py-3.5 text-sm font-extrabold text-[#5a321f] shadow-sm transition hover:bg-[#e9b957]"
        >
          <Heart className="h-5 w-5" />
          Support Seva
        </button>
      </div>
    </div>
  );
}

function EventShareCard({ onShareClick }: { onShareClick: () => void }) {
  return (
    <div className="rounded-[28px] border border-[#eadcc8] bg-white p-6 shadow-[0_14px_40px_rgba(90,48,25,0.06)]">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3dc] text-[#a71919]">
          <Share2 className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-bold text-[#4b2921]">Share this event</h3>

          <p className="mt-1 text-xs leading-5 text-[#81736b]">
            Invite your family and friends to join the celebration.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onShareClick}
        className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[#e6d6c0] bg-[#fffaf0] px-4 py-3 text-sm font-bold text-[#68483b] transition hover:border-[#d0b17c] hover:bg-[#fff5e2]"
      >
        <Share2 className="h-5 w-5" />
        Share Event
      </button>
    </div>
  );
}

/* =============================================================
   HELPER COMPONENTS
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
        <h2 className="text-xl font-black tracking-[-0.025em] text-[#4b2921] sm:text-2xl lg:text-3xl">
          {title}
        </h2>

        <div className="hidden h-px max-w-[100px] flex-1 bg-gradient-to-r from-[#d9bd88] to-transparent sm:block" />
      </div>
    </div>
  );
}

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
    <div className="group rounded-[20px] border border-[#eadcc8] bg-white p-5 shadow-[0_8px_30px_rgba(90,48,25,0.045)] transition duration-300 hover:-translate-y-1 sm:rounded-[24px] sm:p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff3dc] text-xl transition group-hover:scale-105 sm:h-12 sm:w-12 sm:text-2xl">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-bold text-[#4b2921] sm:mt-5 sm:text-base">
        {title}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-[#7b6b62] sm:mt-2 sm:text-sm sm:leading-6">
        {text}
      </p>
    </div>
  );
}

function SideDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 p-4 sm:p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#fff4df] text-[#a71919]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#aa9585]">
          {label}
        </p>

        <p className="mt-1 break-words text-xs font-semibold leading-5 text-[#594139] sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}