"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { liveDarshanStreams as streams } from "@/data/darshan";

type YouTubePlayer = {
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
};

type YouTubeAPI = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, number>;
      events?: {
        onReady?: (event: { target: YouTubePlayer }) => void;
        onStateChange?: (event: { data: number }) => void;
      };
    },
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function PersistentLivePlayer() {
  const stream = streams[0];

  const playerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const playerApiRef = useRef<YouTubePlayer | null>(null);

  const hasStartedRef = useRef(false);
  const isClosedRef = useRef(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const updatePlayerPosition = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    const slot = document.getElementById("persistent-live-player-slot");

    // Live Darshan page: show the player in its normal video area.
    if (slot) {
      const rect = slot.getBoundingClientRect();

      Object.assign(player.style, {
        position: "fixed",
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        display: "block",
        opacity: "1",
        visibility: "visible",
        pointerEvents: "auto",
        zIndex: "40",
        borderRadius: "0px",
      });

      if (closeButtonRef.current) {
        closeButtonRef.current.style.display = "none";
      }

      return;
    }

    // Other pages: do not show anything until playback has started.
    if (!hasStartedRef.current || isClosedRef.current) {
      Object.assign(player.style, {
        display: "none",
        opacity: "0",
        visibility: "hidden",
        pointerEvents: "none",
      });

      return;
    }

    // Other pages: show the minimized player.
    Object.assign(player.style, {
      position: "fixed",
      left: "auto",
      top: "auto",
      right: "12px",
      bottom: "88px",
      width: "220px",
      height: "124px",
      display: "block",
      opacity: "1",
      visibility: "visible",
      pointerEvents: "auto",
      zIndex: "9999",
      borderRadius: "12px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.35)",
    });

    if (closeButtonRef.current) {
      closeButtonRef.current.style.display = "grid";
    }
  }, []);

  const closeMiniPlayer = () => {
    // Stop YouTube playback and mute immediately
    const player = playerApiRef.current;

    if (player) {
      try {
        // YouTube Player API: stop the video
        const iframe = player.getIframe();
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "stopVideo",
            args: [],
          }),
          "https://www.youtube.com",
        );
      } catch (error) {
        console.error("Could not stop Live Darshan playback:", error);
      }
    }

    // Hide the mini player
    isClosedRef.current = true;
    hasStartedRef.current = false;
    setIsClosed(true);
    setHasStarted(false);

    updatePlayerPosition();
  };

  useEffect(() => {
    if (!stream || stream.id.startsWith("YOUR_")) return;

    let disposed = false;
    let observer: MutationObserver | undefined;

    const initializePlayer = () => {
      if (disposed || !mountRef.current || !window.YT?.Player) {
        return;
      }

      // Avoid creating the same player twice.
      if (playerApiRef.current) return;

      playerApiRef.current = new window.YT.Player(mountRef.current, {
        videoId: stream.id,
        playerVars: {
          playsinline: 1,
          controls: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: () => {
            updatePlayerPosition();
          },
          onStateChange: (event) => {
            // 1 = playing, 2 = paused, 0 = ended.
            if (event.data === 1) {
              hasStartedRef.current = true;
              isClosedRef.current = false;
              setHasStarted(true);
              setIsClosed(false);
            }

            updatePlayerPosition();
          },
        },
      });
    };

    const apiScriptId = "youtube-iframe-api";
    let script = document.getElementById(
      apiScriptId,
    ) as HTMLScriptElement | null;

    if (window.YT?.Player) {
      initializePlayer();
    } else {
      // The official YouTube IFrame Player API.
      if (!script) {
        script = document.createElement("script");
        script.id = apiScriptId;
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }

      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        initializePlayer();
      };
    }

    observer = new MutationObserver(() => {
      updatePlayerPosition();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", updatePlayerPosition);
    window.addEventListener("scroll", updatePlayerPosition, true);

    updatePlayerPosition();

    return () => {
      disposed = true;
      observer?.disconnect();

      window.removeEventListener("resize", updatePlayerPosition);
      window.removeEventListener("scroll", updatePlayerPosition, true);

      // Keep the player alive across route changes.
      // This effect belongs to the persistent root-layout component.
    };
  }, [stream, updatePlayerPosition]);

  if (!stream || stream.id.startsWith("YOUR_")) {
    return null;
  }

  return (
    <div
      ref={playerRef}
      className="overflow-hidden bg-[#111]"
      style={{
        position: "fixed",
        left: "-10000px",
        top: 0,
        width: 200,
        height: 200,
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <div ref={mountRef} className="h-full w-full" />

      <button
        ref={closeButtonRef}
        type="button"
        onClick={closeMiniPlayer}
        aria-label="Close minimized Live Darshan"
        className="absolute right-2 top-2 z-50 hidden h-7 w-7 place-items-center rounded-full bg-black/75 text-white hover:bg-black"
      >
        <X size={18} strokeWidth={2.5} />
      </button>
    </div>
  );
}
