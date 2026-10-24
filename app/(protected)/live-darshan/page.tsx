"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageProvider";
import { Send, Share2 } from "lucide-react";
import {
  liveDarshanStreams as streams,
  initialLiveChats as chats,
} from "@/data/darshan";

const PROFILE_STORAGE_KEY = "profile-data";

export default function LiveDarshan() {
  const { t } = useLanguage();

  const selected = 0;
  const stream = streams[selected];

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(chats);
  const [username, setUsername] = useState("You");

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // LOAD PROFILE NAME
  useEffect(() => {
    const loadProfileName = () => {
      try {
        const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

        if (storedProfile) {
          const profile = JSON.parse(storedProfile);

          setUsername(
            typeof profile.name === "string" && profile.name.trim()
              ? profile.name.trim()
              : "You",
          );
        } else {
          setUsername("You");
        }
      } catch (error) {
        console.error("Failed to load profile name:", error);
        setUsername("You");
      }
    };

    loadProfileName();

    window.addEventListener("profile-updated", loadProfileName);

    return () => {
      window.removeEventListener("profile-updated", loadProfileName);
    };
  }, []);

  // SCROLL ONLY INSIDE CHAT MESSAGES
  useEffect(() => {
    const container = chatMessagesRef.current;

    if (container && chatMessages.length > 0) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  // SHARE
  const handleShare = async () => {
    if (typeof navigator === "undefined" || !navigator.share) {
      return;
    }

    try {
      await navigator.share({
        title: t("liveDarshan"),
        text: t("haveliName"),
        url: window.location.href,
      });
    } catch {
      // Sharing was cancelled or failed.
    }
  };

  // SEND CHAT MESSAGE
  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setChatMessages((previous) => [
      ...previous,
      ["🙏", trimmedMessage, username],
    ]);

    setMessage("");
  };

  return (
    <main className="min-h-[100dvh] w-full overflow-x-clip bg-[#fffaf0] px-3 pb-[84px] pt-3 text-[#40372f] sm:px-4 md:px-6 md:pb-[90px] lg:ml-[92px] lg:w-[calc(100%-92px)] lg:px-8 lg:pb-12 xl:px-10 2xl:px-12">
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_370px] 2xl:grid-cols-[minmax(0,1fr)_390px] 2xl:gap-7">
          {/* LIVE VIDEO */}

          <div className="min-w-0">
            <section className="mt-1 overflow-hidden rounded-[14px] border border-[#eadbc5] bg-[#fffdf8] shadow-[0_5px_18px_rgba(70,40,10,0.08)] sm:rounded-2xl lg:rounded-[18px]">
              {/* VIDEO HEADER */}

              <div className="flex h-10 items-center justify-between bg-[#fff8e9] px-3 text-[10px] text-[#8f1515] sm:h-11 sm:px-4 sm:text-xs lg:h-12 lg:px-[17px] lg:text-[13px]">
                <div className="flex items-center">
                  <span className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full bg-[#d51b1b]" />
                  <strong>{t("liveDarshan")}</strong>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label={t("share")}
                  className="grid h-9 w-9 shrink-0 place-items-center text-[#ce3131] transition-colors hover:text-[#8d0b0b] active:scale-95"
                >
                  <Share2 size={19} strokeWidth={1.8} />
                </button>
              </div>

              {/* YOUTUBE PLAYER */}

              <div
                id="persistent-live-player-slot"
                className="relative aspect-video w-full overflow-hidden bg-[#111]"
              >
                {stream.id.startsWith("YOUR_") && (
                  <div className="absolute inset-0 flex items-center justify-center px-5 text-center text-white">
                    Live Darshan stream is not configured.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* LIVE CHAT */}

          <section
            className="
              flex min-h-[220px] min-w-0 flex-col
              overflow-hidden rounded-2xl border border-[#eadbc5]
              bg-[#fffdf8]
              shadow-[0_8px_30px_rgba(83,48,10,0.07)]
              transition-[height] duration-300
              lg:sticky lg:top-24 lg:min-h-[220px]
              lg:max-h-[calc(100dvh-120px)]
              lg:self-start
              lg:rounded-[20px]
            "
          >
            {/* CHAT HEADER */}

            <div className="relative flex shrink-0 items-center justify-between border-b border-[#eee1ce] bg-gradient-to-r from-[#fff8e9] via-[#fffaf1] to-[#fff5e2] px-4 py-3.5 sm:px-5 lg:py-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
                </span>

                <h2 className="text-sm font-bold tracking-wide text-[#8f1515] sm:text-[15px]">
                  {t("liveChat")}
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#e8dfce] bg-white/80 px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-medium text-[#766b5d]">
                  Community
                </span>
              </div>
            </div>

            {/* CHAT MESSAGES */}

            <div
              ref={chatMessagesRef}
              className={`chat-scrollbar min-h-0 flex-1 overflow-x-hidden overscroll-contain px-3 py-2 sm:px-4 sm:py-3 lg:px-4 ${
                chatMessages.length > 0
                  ? "overflow-y-auto"
                  : "overflow-y-hidden"
              }`}
            >
              {chatMessages.length === 0 ? (
                <div className="flex min-h-[100px] h-full flex-col items-center justify-center px-5 text-center">
                  <div className="mb-2 grid h-12 w-12 place-items-center rounded-full border border-[#efdfc3] bg-[#fff7e8] text-xl">
                    🙏
                  </div>

                  <p className="text-sm font-semibold text-[#6b4c2d]">
                    There are no live chats yet
                  </p>

                  <p className="mt-1 text-xs text-[#a39481]">
                    Be the first to share a prayer.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {chatMessages.map(([avatar, chatText, sender], index) => {
                    const isMine = sender === username || sender === "You";

                    return (
                      <div
                        key={`${chatText}-${sender}-${index}`}
                        className={`group flex items-start gap-2.5 rounded-xl px-2.5 py-3 transition-colors duration-200 hover:bg-[#fff8ec] sm:gap-3 sm:px-3 ${
                          isMine ? "bg-[#fffaf1]/70" : ""
                        }`}
                      >
                        {/* AVATAR */}

                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#eed9b5] bg-gradient-to-br from-[#fffaf0] to-[#fff0d5] text-[19px] shadow-sm sm:h-11 sm:w-11 sm:text-xl">
                          {avatar}
                        </div>

                        {/* MESSAGE CONTENT */}

                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <span className="max-w-full truncate text-[12px] font-bold text-[#493a2d] sm:text-[13px]">
                              {isMine ? username : sender}
                            </span>

                            {isMine && (
                              <span className="rounded-full bg-[#f6e8cc] px-1.5 py-0.5 text-[9px] font-semibold text-[#996719]">
                                You
                              </span>
                            )}
                          </div>

                          <p className="mt-1 break-words text-[12px] leading-relaxed text-[#766b60] sm:text-[13px]">
                            {chatText}
                          </p>

                          <span className="mt-1 block text-[9px] text-[#b1a394]">
                            {isMine ? "Your message" : "Devotee"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CHAT INPUT */}

            <div className="shrink-0 border-t border-[#eee1ce] bg-gradient-to-b from-[#fffdf8] to-[#fff9ee] p-3 sm:p-4">
              <form
                className="flex items-center gap-2 rounded-full border border-[#eadbc5] bg-white p-1.5 pl-3 shadow-[0_3px_12px_rgba(83,48,10,0.04)] transition-all focus-within:border-[#d4ad64] focus-within:ring-4 focus-within:ring-[#c99435]/10 sm:gap-2.5 sm:pl-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSendMessage();
                }}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={t("typeMessage")}
                  aria-label={t("typeMessage")}
                  className="h-9 min-w-0 flex-1 bg-transparent text-[12px] text-[#40372f] outline-none placeholder:text-[#b3a696] sm:h-10 sm:text-[13px]"
                />

                <button
                  type="submit"
                  disabled={!message.trim()}
                  aria-label={t("sendMessage")}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#a71919] text-white shadow-[0_3px_8px_rgba(167,25,25,0.20)] transition duration-200 hover:bg-[#8f1515] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
                >
                  <Send size={18} strokeWidth={2.3} />
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* DECORATIVE FOOTER */}

        <div className="flex h-12 items-center justify-center gap-2.5 text-[#c99435] lg:h-[70px]">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d8b66c] lg:w-24" />

          <strong className="text-sm font-normal lg:text-lg">ॐ</strong>

          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d8b66c] lg:w-24" />
        </div>
      </div>
    </main>
  );
}
