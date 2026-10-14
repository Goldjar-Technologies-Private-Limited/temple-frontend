"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";

const PULL_THRESHOLD = 75; // px to trigger refresh
const MAX_PULL = 110; // maximum visual pull distance

export default function PullToRefresh({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = useRef(0);
  const isPullingRef = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Only start pull-to-refresh if window/document is scrolled to top
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollTop <= 1 && !isRefreshing) {
        startYRef.current = e.touches[0].clientY;
        isPullingRef.current = true;
      } else {
        isPullingRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPullingRef.current || isRefreshing) return;

      const currentY = e.touches[0].clientY;
      const diff = currentY - startYRef.current;

      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // If user scrolls down instead, or page is no longer at top, cancel pull
      if (scrollTop > 1 || diff <= 0) {
        setPullDistance(0);
        return;
      }

      // Add resistance damping to pull distance
      const distance = Math.min(MAX_PULL, diff * 0.45);
      setPullDistance(distance);
    };

    const handleTouchEnd = () => {
      if (!isPullingRef.current || isRefreshing) return;
      isPullingRef.current = false;

      setPullDistance((currentDistance) => {
        if (currentDistance >= PULL_THRESHOLD) {
          setIsRefreshing(true);
          // Trigger page reload
          setTimeout(() => {
            window.location.reload();
          }, 300);
          return PULL_THRESHOLD * 0.7; // keep indicator visible while reloading
        }
        return 0;
      });
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isRefreshing]);

  const rotation = Math.min(360, (pullDistance / PULL_THRESHOLD) * 360);
  const opacity = Math.min(1, pullDistance / (PULL_THRESHOLD * 0.6));

  return (
    <>
      {/* Pull to refresh visual indicator */}
      <div
        style={{
          position: "fixed",
          top: `${Math.max(12, pullDistance - 25)}px`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99999,
          opacity: isRefreshing ? 1 : opacity,
          transition: isPullingRef.current ? "none" : "all 0.25s ease-out",
          pointerEvents: "none",
        }}
        className="flex items-center justify-center rounded-full bg-[#fffaf0] p-2.5 shadow-[0_4px_16px_rgba(100,16,16,0.18)] border border-[#eadbc5]"
      >
        <Loader2
          className={`h-5 w-5 text-[#a71919] ${isRefreshing ? "animate-spin" : ""}`}
          style={{
            transform: isRefreshing ? undefined : `rotate(${rotation}deg)`,
          }}
        />
      </div>

      <div
        style={{
          transform:
            pullDistance > 0
              ? `translate3d(0, ${pullDistance * 0.4}px, 0)`
              : undefined,
          transition: isPullingRef.current
            ? "none"
            : "transform 0.25s ease-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
