"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "../../components/navigation/BottomNavigation";

const reels = [
  {
    id: 1,
    video: "/videos/reel1.mp4",
    title: "Today's Shringar Darshan",
    subtitle: "Jai Shrinathji 🙏",
    username: "@govardhannath_haveli",
    likes: "5.2K",
  },
  {
    id: 2,
    video: "/videos/reel2.mp4",
    title: "Divine Darshan",
    subtitle: "Shri Govardhannathji 🌸",
    username: "@govardhannath_haveli",
    likes: "3.8K",
  },
  {
    id: 3,
    video: "/videos/reel3.mp4",
    title: "Sandhya Aarti",
    subtitle: "Jai Shree Krishna 🙏",
    username: "@govardhannath_haveli",
    likes: "4.6K",
  },
  {
    id: 4,
    video: "/videos/reel4.mp4",
    title: "Evening Darshan",
    subtitle: "Shri Govardhannathji 🙏",
    username: "@govardhannath_haveli",
    likes: "4.6K",
  },
];

export default function Reels() {
  const router = useRouter();

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef(0);
  const isWheeling = useRef(false);
  const playIconTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [isMuted, setIsMuted] = useState(true);

  const [playing, setPlaying] = useState<boolean[]>(reels.map(() => true));

  const [liked, setLiked] = useState<number[]>([]);

  const [showPlayIcon, setShowPlayIcon] = useState<number | null>(null);

  /* ======================================================
     VIDEO CONTROL
  ====================================================== */

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = isMuted;

      if (index === current && playing[index]) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current, playing, isMuted]);

  /* ======================================================
     CLEANUP
  ====================================================== */

  useEffect(() => {
    return () => {
      if (playIconTimer.current) {
        clearTimeout(playIconTimer.current);
      }
    };
  }, []);

  /* ======================================================
     PLAY / PAUSE
  ====================================================== */

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];

    if (!video) return;

    const shouldPlay = video.paused;

    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }

    setPlaying((prev) => {
      const next = [...prev];
      next[index] = shouldPlay;
      return next;
    });

    setShowPlayIcon(index);

    if (playIconTimer.current) {
      clearTimeout(playIconTimer.current);
    }

    playIconTimer.current = setTimeout(() => {
      setShowPlayIcon(null);
    }, 700);
  };

  /* ======================================================
     SOUND
  ====================================================== */

  const toggleSound = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const muted = !isMuted;

    setIsMuted(muted);

    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = muted;
      }
    });
  };

  /* ======================================================
     LIKE
  ====================================================== */

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();

    setLiked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /* ======================================================
     SHARE
  ====================================================== */

  const handleShare = async (
    e: React.MouseEvent<HTMLButtonElement>,
    reel: (typeof reels)[number],
  ) => {
    e.stopPropagation();

    const shareData = {
      title: reel.title,
      text: `${reel.title} - ${reel.subtitle}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        window.prompt("Copy this link:", window.location.href);
      }
    } catch {
      console.log("Share cancelled");
    }
  };

  /* ======================================================
     TOUCH
  ====================================================== */

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    let diff = e.touches[0].clientY - touchStartY.current;

    if (current === 0 && diff > 0) {
      diff *= 0.25;
    }

    if (current === reels.length - 1 && diff < 0) {
      diff *= 0.25;
    }

    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (dragOffset < -50 && current < reels.length - 1) {
      setCurrent((prev) => prev + 1);
    }

    if (dragOffset > 50 && current > 0) {
      setCurrent((prev) => prev - 1);
    }

    setDragOffset(0);
  };

  /* ======================================================
     DESKTOP SCROLL
  ====================================================== */

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isWheeling.current) return;

    if (e.deltaY > 30 && current < reels.length - 1) {
      isWheeling.current = true;

      setCurrent((prev) => prev + 1);

      setTimeout(() => {
        isWheeling.current = false;
      }, 600);
    }

    if (e.deltaY < -30 && current > 0) {
      isWheeling.current = true;

      setCurrent((prev) => prev - 1);

      setTimeout(() => {
        isWheeling.current = false;
      }, 600);
    }
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#080605] text-white">
      {/* ==================================================
          DESKTOP BACKGROUND
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,#3a281c_0%,#17100c_40%,#080605_100%)]
        "
      />

      {/* ==================================================
          MAIN REEL AREA
      ================================================== */}

      <div
        className="
          relative
          mx-auto
          h-[calc(100dvh-64px)]
          w-full
          overflow-hidden
          bg-black
          touch-none
          select-none
          md:h-full
          md:max-w-[500px]
          lg:max-w-[540px]
          lg:border-x
          lg:border-white/10
          lg:shadow-[0_0_80px_rgba(0,0,0,0.7)]
        "
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* ==================================================
            BACK BUTTON
        ================================================== */}



        {/* ==================================================
            SLIDER
        ================================================== */}

        <div
          className={`
            flex
            h-full
            w-full
            flex-col
            ${isDragging ? "" : "transition-transform duration-300 ease-out"}
          `}
          style={{
            transform: `translateY(calc(-${current * 100}% + ${dragOffset}px))`,
          }}
        >
          {reels.map((reel, index) => {
            const isLiked = liked.includes(reel.id);
            const isPlaying = playing[index];

            return (
              <section
                key={reel.id}
                className="
                  relative
                  h-full
                  w-full
                  shrink-0
                  overflow-hidden
                  bg-black
                "
              >
                {/* ==================================================
                    VIDEO
                ================================================== */}

                <video
                  ref={(video) => {
                    videoRefs.current[index] = video;
                  }}
                  src={reel.video}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                  "
                  autoPlay={index === 0}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onClick={() => togglePlay(index)}
                />

                {/* ==================================================
                    GRADIENTS
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-52
                    bg-gradient-to-b
                    from-black/80
                    via-black/30
                    to-transparent
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-[420px]
                    bg-gradient-to-t
                    from-black
                    via-black/70
                    to-transparent
                  "
                />

                {/* ==================================================
                    SOUND
                ================================================== */}

                <button
                  type="button"
                  onClick={toggleSound}
                  aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
                  className="
                    group
                    absolute
                    right-4
                    top-[70px]
                    z-40
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-full
                    border
                    border-white/20
                    bg-black/40
                    text-white
                    shadow-xl
                    backdrop-blur-xl
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:bg-black/60
                    active:scale-90
                  "
                >
                  {isMuted ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      <path d="M19 5a10 10 0 0 1 0 14" />
                    </svg>
                  )}
                </button>

                {/* ==================================================
                    PLAY / PAUSE
                ================================================== */}

                {showPlayIcon === index && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-40
                      grid
                      place-items-center
                    "
                  >
                    <div
                      className="
                        grid
                        h-20
                        w-20
                        place-items-center
                        rounded-full
                        border
                        border-white/20
                        bg-black/45
                        shadow-2xl
                        backdrop-blur-xl
                      "
                    >
                      {isPlaying ? (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================================================
                    RIGHT ACTIONS
                ================================================== */}

                <div
                  className="
                    absolute
                    bottom-28
                    right-3
                    z-40
                    flex
                    flex-col
                    items-center
                    gap-5
                  "
                >
                  {/* LIKE */}

                  <button
                    type="button"
                    onClick={(e) => handleLike(e, reel.id)}
                    className="
                      group
                      flex
                      w-14
                      flex-col
                      items-center
                      gap-1
                      transition-transform
                      active:scale-90
                    "
                  >
                    <span
                      className={`
                        grid
                        h-12
                        w-12
                        place-items-center
                        rounded-full
                        border
                        bg-black/40
                        shadow-xl
                        backdrop-blur-xl
                        transition-all
                        duration-200
                        group-hover:scale-105
                        ${
                          isLiked
                            ? "border-red-400/30 bg-red-500/10 text-red-500"
                            : "border-white/15 text-white"
                        }
                      `}
                    >
                      {isLiked ? (
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 21s-7-4.35-9.33-8.28C.91 9.4 2.25 5 6.5 5c2.04 0 3.55 1.17 4.5 2.33C11.45 6.17 12.96 5 15 5c4.25 0 5.59 4.4 3.83 7.72C19 16.65 12 21 12 21z" />
                        </svg>
                      ) : (
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7z" />
                        </svg>
                      )}
                    </span>

                    <span className="text-[10px] font-semibold">
                      {isLiked ? "Liked" : reel.likes}
                    </span>
                  </button>

                  {/* SHARE */}

                  <button
                    type="button"
                    onClick={(e) => handleShare(e, reel)}
                    className="
                      group
                      flex
                      w-14
                      flex-col
                      items-center
                      gap-1
                      transition-transform
                      active:scale-90
                    "
                  >
                    <span
                      className="
                        grid
                        h-12
                        w-12
                        place-items-center
                        rounded-full
                        border
                        border-white/15
                        bg-black/40
                        shadow-xl
                        backdrop-blur-xl
                        transition-all
                        duration-200
                        group-hover:scale-105
                        group-hover:bg-black/60
                      "
                    >
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                      </svg>
                    </span>

                    <span className="text-[10px] font-semibold">Share</span>
                  </button>
                </div>

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-4
                    right-20
                    z-30
                  "
                >
                  {/* PROFILE */}

                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="
                        grid
                        h-10
                        w-10
                        shrink-0
                        place-items-center
                        rounded-full
                        border-2
                        border-white
                        bg-[#f4e6cc]
                        text-base
                        shadow-lg
                      "
                    >
                      🛕
                    </div>

                    <div className="min-w-0 flex-1">
                      <b className="block truncate text-[13px]">
                        {reel.username}
                      </b>

                      <span className="text-[9px] text-white/60">
                        Shrinathji Darshan
                      </span>
                    </div>

                  </div>

                  {/* TITLE */}

                  <h1
                    className="
                      font-serif
                      text-xl
                      font-semibold
                      leading-tight
                      drop-shadow-lg
                    "
                  >
                    {reel.title}
                  </h1>

                  {/* SUBTITLE */}

                  <p
                    className="
                      mt-1
                      font-serif
                      text-sm
                      drop-shadow-lg
                    "
                  >
                    {reel.subtitle}
                  </p>

                  {/* AUDIO */}

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      text-white/80
                    "
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>

                    <span>Original Audio</span>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* ==================================================
          BOTTOM NAV
      ================================================== */}

      <BottomNavigation />
    </main>
  );
}
