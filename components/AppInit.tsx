"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

export default function AppInit() {
  const router = useRouter();

  useEffect(() => {
    const env = process.env.NEXT_PUBLIC_ENV || "production";
    const isNative = Capacitor.isNativePlatform();
    const platform = Capacitor.getPlatform();

    console.log(
      `%c[Govardhannath App]%c Env: ${env} | Platform: ${platform} | Native: ${isNative}`,
      "background: #a71919; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
      "color: #c99435; font-weight: bold;",
    );

    // 1. Setup hardware back button listener for Android
    let backListenerHandle: { remove: () => Promise<void> | void } | null =
      null;

    if (isNative) {
      console.log("[Govardhannath App] Native back-button handler initialized.");
      CapacitorApp.addListener("backButton", (event) => {
        console.log(`[Govardhannath App] Hardware back pressed. canGoBack: ${event.canGoBack}`);
        if (event.canGoBack) {
          router.back();
        } else {
          CapacitorApp.minimizeApp();
        }
      }).then((handle) => {
        backListenerHandle = handle;
      });
    }

    // 2. Prevent copy/paste interactions
    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu on input/textarea but block it elsewhere
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }
      e.preventDefault();
    };

    // Add CSS user-select: none globally but allow on inputs
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        -webkit-user-select: none;
        user-select: none;
      }
      input, textarea {
        -webkit-user-select: auto;
        user-select: auto;
      }
    `;
    document.head.appendChild(style);

    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      if (backListenerHandle && backListenerHandle.remove) {
        backListenerHandle.remove();
      }
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.head.removeChild(style);
    };
  }, [router]);

  return null;
}
