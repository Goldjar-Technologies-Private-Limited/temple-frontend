"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();

  const navigateNext = () => {
    try {
      router.replace("/onboarding");
    } catch (_) {}
    setTimeout(() => {
      if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
        window.location.assign("/onboarding");
      }
    }, 400);
  };

  useEffect(() => {
    console.log("[Splash] Screen mounted. Setting automatic transition timer...");
    const timer = setTimeout(() => {
      console.log("[Splash] Auto transition triggered.");
      navigateNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      onClick={navigateNext}
      role="button"
      tabIndex={0}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
        zIndex: 9999,
        cursor: "pointer",
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
