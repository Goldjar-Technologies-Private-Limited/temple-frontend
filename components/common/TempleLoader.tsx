"use client";

interface TempleLoaderProps {
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

export default function TempleLoader({
  message = "Loading...",
  className = "",
  fullScreen = false,
}: TempleLoaderProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className}`}>
      {/* SACRED AURA & KALASH / LOTUS ICON */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
        {/* Animated glowing rings */}
        <div className="absolute inset-0 rounded-full border-2 border-[#d5a54c]/30 animate-ping opacity-60" />
        <div className="absolute -inset-2 rounded-full border border-[#a71919]/25 animate-pulse" />
        
        {/* Inner container */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#c99435] bg-gradient-to-br from-[#fff7e6] via-[#fffdf9] to-[#faeed2] shadow-[0_4px_20px_rgba(167,25,25,0.15)]">
          <span className="text-3xl select-none animate-bounce">🛕</span>
        </div>
      </div>

      {/* SACRED TEXT / CHANT */}
      <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#a71919]">
        Jai Shree Krishna
      </p>

      {/* MESSAGE */}
      <p className="mt-2 text-sm font-semibold text-[#665345]">
        {message}
      </p>

      {/* SUBTLE GOLDEN DIVIDER */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[#c99435] opacity-70">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c99435]" />
        <span className="text-[10px]">🪷</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c99435]" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <main className="flex min-h-dvh w-full items-center justify-center overflow-x-clip bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0,#fffaf0_42%,#f6ead5_100%)] px-4 py-8 lg:ml-[92px] lg:w-[calc(100%-92px)]">
        {content}
      </main>
    );
  }

  return content;
}
