"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { REELS_DATA as reels } from "@/data/reels";

export default function Reels() {
  const router = useRouter();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartY = useRef(0);
  const isWheeling = useRef(false);
  const playIconTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [playing, setPlaying] = useState<boolean[]>(reels.map(() => true));
  const [liked, setLiked] = useState<number[]>([]);
  const [showPlayIcon, setShowPlayIcon] = useState<number | null>(null);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = false;

      if (index === current && playing[index]) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser autoplay policy blocks unmuted autoplay before interaction,
            // retry muted as fallback, and unmute on first user click
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } else {
        video.pause();
      }
    });
  }, [current, playing]);

  useEffect(() => {
    return () => {
      if (playIconTimer.current) {
        clearTimeout(playIconTimer.current);
      }
    };
  }, []);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    const shouldPlay = video.paused;

    if (shouldPlay) {
      video.muted = false;
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

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = async (
    e: React.MouseEvent<HTMLButtonElement>,
    reel: (typeof reels)[number]
  ) => {
    e.stopPropagation();

    const shareData = {
      title: reel.title,
      text: `${reel.title}\n${reel.subtitle}`,
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
    <main className="fixed inset-x-0 bottom-16 top-0 overflow-hidden bg-[#080605] text-white lg:bottom-0 lg:left-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,#3a281c_0%,#17100c_40%,#080605_100%)]" />

      <div
        className="relative mx-auto h-full w-full overflow-hidden bg-black touch-none select-none md:max-w-[500px] lg:max-w-[540px] lg:border-x lg:border-white/10 lg:shadow-[0_0_80px_rgba(0,0,0,0.7)]"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Back Button */}
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/dashboard");
            }
          }}
          aria-label="Go back"
          title="Go back"
          className="group absolute left-4 top-4 z-50 grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white shadow-xl backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:bg-black/60 active:scale-95"
        >
          <ArrowLeft
            size={20}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
        </button>

        <div
          className={`flex h-full w-full flex-col ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
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
                className="relative h-full w-full shrink-0 overflow-hidden bg-black"
              >
                <video
                  ref={(video) => {
                    videoRefs.current[index] = video;
                  }}
                  src={reel.video}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay={index === 0}
                  loop
                  playsInline
                  preload="metadata"
                  onClick={() => togglePlay(index)}
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-gradient-to-t from-black via-black/70 to-transparent" />

                {showPlayIcon === index && (
                  <div className="pointer-events-none absolute inset-0 z-40 grid place-items-center">
                    <div className="grid h-20 w-20 place-items-center rounded-full border border-white/20 bg-black/45 shadow-2xl backdrop-blur-xl">
                      {isPlaying ? (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}

                <div className="absolute bottom-28 right-5 z-40 flex flex-col items-center gap-5">
                  <button
                    type="button"
                    onClick={(e) => handleLike(e, reel.id)}
                    className="group flex flex-col items-center gap-1 transition-transform active:scale-90"
                  >
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full border bg-black/40 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:scale-105 ${
                        isLiked
                          ? "border-red-400/30 bg-red-500/10 text-red-500"
                          : "border-white/15 text-white"
                      }`}
                    >
                      {isLiked ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[10px] font-semibold text-white drop-shadow-md">
                      {isLiked ? "Liked" : reel.likes}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleShare(e, reel)}
                    className="group flex flex-col items-center gap-1 transition-transform active:scale-90"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/40 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:scale-105 group-hover:bg-black/60">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-semibold text-white drop-shadow-md">
                      Share
                    </span>
                  </button>
                </div>

                <div className="absolute bottom-5 left-4 right-20 z-30">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white bg-[#f4e6cc] text-base shadow-lg">
                      🛕
                    </div>
                    <div className="min-w-0 flex-1">
                      <b className="block truncate text-[13px]">{reel.username}</b>
                      <span className="text-[9px] text-white/60">Shrinathji Darshan</span>
                    </div>
                  </div>

                  <h1 className="text-xl font-semibold leading-tight drop-shadow-lg">
                    {reel.title}
                  </h1>

                  <p className="mt-1 text-sm drop-shadow-lg">{reel.subtitle}</p>

                  <div className="mt-3 flex items-center gap-2 text-[10px] text-white/80">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    </main>
  );
}