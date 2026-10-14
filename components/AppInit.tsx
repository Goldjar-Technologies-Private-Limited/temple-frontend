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

    let disposed = false;
    let backListenerHandle: { remove: () => Promise<void> } | null = null;
    let lastBackPressTime = 0;
    let isNavigatingBack = false;
    let navigationUnlockTimer: ReturnType<typeof setTimeout> | null = null;

    const ROOT_ROUTES = ["/", "/dashboard", "/login", "/onboarding"];

    // 1. Android hardware back-button handling
    if (isNative && platform === "android") {
      console.log(
        "[Govardhannath App] Native Android back-button handler initialized.",
      );

      const setupBackListener = async () => {
        const handle = await CapacitorApp.addListener(
          "backButton",
          ({ canGoBack }) => {
            const now = Date.now();

            // Ignore rapid duplicate events.
            if (now - lastBackPressTime < 400) {
              return;
            }

            // Avoid overlapping navigation operations.
            if (isNavigatingBack) {
              return;
            }

            lastBackPressTime = now;

            const currentPath =
              window.location.pathname.replace(/\/$/, "") || "/";

            console.log(
              `[Govardhannath App] Hardware back pressed at path: ${currentPath}`,
            );

            // Close an open modal or drawer before navigating.
            const openModal = document.querySelector(
              "[role='dialog'], [aria-modal='true']",
            );

            if (openModal) {
              window.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "Escape",
                  bubbles: true,
                }),
              );
              return;
            }

            // At designated root pages, minimize instead of navigating away.
            if (ROOT_ROUTES.includes(currentPath)) {
              console.log(
                "[Govardhannath App] Root route reached. Minimizing app.",
              );
              void CapacitorApp.minimizeApp();
              return;
            }

            // Do not call router.back() if the WebView reports no history.
            if (!canGoBack) {
              console.log(
                "[Govardhannath App] No WebView history. Minimizing app.",
              );
              void CapacitorApp.minimizeApp();
              return;
            }

            // Perform exactly one navigation action.
            isNavigatingBack = true;

            console.log("[Govardhannath App] Navigating back one step.");

            router.back();

            // Unlock after navigation has had time to settle.
            if (navigationUnlockTimer) {
              clearTimeout(navigationUnlockTimer);
            }

            navigationUnlockTimer = setTimeout(() => {
              isNavigatingBack = false;
              navigationUnlockTimer = null;
            }, 600);
          },
        );

        // Handle React Strict Mode cleanup or unmount during registration.
        if (disposed) {
          await handle.remove();
        } else {
          backListenerHandle = handle;
        }
      };

      void setupBackListener().catch((error) => {
        console.error(
          "[Govardhannath App] Failed to initialize back-button listener:",
          error,
        );
      });
    }

    // 2. Prevent copy, cut, and paste
    const handleCopyPaste = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    // 3. Block context menus outside editable fields
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        event.preventDefault();
        return;
      }

      const editableElement = target.closest(
        "input, textarea, [contenteditable='true']",
      );

      if (!editableElement) {
        event.preventDefault();
      }
    };

    // 4. Disable text selection globally while preserving form editing.
    const style = document.createElement("style");
    style.dataset.appInit = "true";
    style.textContent = `
      body {
        -webkit-user-select: none;
        user-select: none;
      }

      input,
      textarea,
      [contenteditable="true"] {
        -webkit-user-select: text;
        user-select: text;
      }
    `;

    document.head.appendChild(style);

    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      disposed = true;

      if (navigationUnlockTimer) {
        clearTimeout(navigationUnlockTimer);
      }

      if (backListenerHandle) {
        void backListenerHandle.remove();
      }

      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("contextmenu", handleContextMenu);

      style.remove();
    };
  }, [router]);

  return null;
}
