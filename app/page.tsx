"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
        zIndex: 9999,
      }}
    >
      <picture
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        {/* Desktop */}
        <source media="(min-width: 1024px)" srcSet="/images/splash-desktop.png" />
        {/* Tablet */}
        <source media="(min-width: 640px)" srcSet="/images/splash-tablet.png" />
        {/* Mobile (Default) */}
        <img
          src="/images/splash-mobile.png"
          alt="Shri Govardhannath Haveli"
          fetchPriority="high"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
      </picture>
    </main>
  );
}
