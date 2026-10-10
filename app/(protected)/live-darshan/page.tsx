"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/contexts/LanguageProvider";
import { Send, Share2 } from "lucide-react";

/* =========================================================
   STREAM DATA
   Replace IDs with actual YouTube Live IDs
   ========================================================= */

const streams = [
  {
    id: "xVU2UDaFOfE",
    image: "/images/live-darshan-1.jpg",
    videoUrl:
      "https://www.youtube.com/watch?v=xVU2UDaFOfE&list=RDxVU2UDaFOfE&start_radio=1",
  },
  {
    id: "WTjZxav7naU",
    image: "/images/live-darshan-2.jpg",
    videoUrl:
      "https://www.youtube.com/watch?v=WTjZxav7naU&list=RDc441pyXlM4M&index=13",
  },
];

/* =========================================================
   CHAT DATA
   ========================================================= */

const chats = [
  ["🙏", "Jai Shree Krishna", "Ramesh Patel"],
  ["🌸", "Radhe Radhe", "Meena Shah"],
  ["🙏", "Jai Shrinathji", "Aarti Doshi"],
  ["🌺", "Beautiful Darshan", "Pooja Mehta"],
];

export default function LiveDarshan() {
  const router = useRouter();
  const { t } = useLanguage();

  const selected = 0;
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(chats);

  /* =========================================================
     VIDEO CONTROL
     ========================================================= */

  const playerRef = useRef<HTMLIFrameElement>(null);

  const stream = streams[selected];

  /* =========================================================
     SHARE
     ========================================================= */

  const handleShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: t("liveDarshan"),
        text: t("haveliName"),
        url: window.location.href,
      });
    } catch {
      // User cancelled share
    }
  };

  /* =========================================================
     SEND MESSAGE
     ========================================================= */

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setChatMessages((prev) => [...prev, ["🙏", trimmedMessage, "You"]]);

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  /* =========================================================
     PLAY / PAUSE VIDEO
     ========================================================= */

  // const handlePlayPause = () => {
  //   if (!playerRef.current?.contentWindow) return;

  //   const command = isPlaying
  //     ? "pauseVideo"
  //     : "playVideo";

  //   playerRef.current.contentWindow.postMessage(
  //     JSON.stringify({
  //       event: "command",
  //       func: command,
  //       args: [],
  //     }),
  //     "https://www.youtube.com"
  //   );

  //   setIsPlaying(!isPlaying);
  // };

  // /* =========================================================
  //    FULLSCREEN
  //    ========================================================= */

  // const handleFullscreen = async () => {
  //   const iframe = playerRef.current;

  //   if (!iframe) return;

  //   try {
  //     if (document.fullscreenElement) {
  //       await document.exitFullscreen();
  //       return;
  //     }

  //     await iframe.requestFullscreen();
  //   } catch {
  //     // Fullscreen request failed
  //   }
  // };

  return (
    <main
      className="
        min-h-[100dvh]
        w-full
        overflow-x-hidden
        bg-[#fffaf0]
        px-3
        pb-[84px]
        pt-2
        text-[#40372f]

        sm:px-4
        sm:pt-3

        md:px-6
        md:pb-[90px]
        md:pt-4

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:px-8
        lg:pb-12
        lg:pt-6

        xl:px-10
        2xl:px-12
      "
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* RESPONSIVE HEADER — MOBILE, TABLET & DESKTOP */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-4

            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:items-start
            lg:gap-6

            xl:grid-cols-[minmax(0,1fr)_370px]

            2xl:grid-cols-[minmax(0,1fr)_390px]
            2xl:gap-7
          "
        >
          <div className="min-w-0">
            {/* <section
              className="
                grid
                grid-cols-2
                gap-2

                sm:gap-3

                md:gap-4
              "
            >
              {streams.map((item, index) => {
                const active = selected === index;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelected(index)}
                    className={`
                      group
                      relative
                      h-[125px]
                      overflow-hidden
                      rounded-[13px]
                      border-2
                      bg-[#f8f2f1]
                      p-0
                      shadow-[0_4px_13px_rgba(70,40,10,0.10)]
                      transition-all
                      duration-200

                      sm:h-[155px]

                      md:h-[210px]
                      md:rounded-[17px]

                      lg:h-[190px]

                      xl:h-[220px]

                      2xl:h-[250px]

                      ${
                        active
                          ? "border-[#c95f35] shadow-[0_7px_20px_rgba(117,67,19,0.15)]"
                          : "border-transparent hover:-translate-y-0.5 hover:border-[#e0c28a]"
                      }
                    `}
                  >
                    <img
                      src={item.image}
                      alt={`${t("liveDarshan")} ${index + 1}`}
                      className="
                        block
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500

                        group-hover:scale-[1.025]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,0,0,0.58)_100%)]
                      "
                    />

                    <div
                      className="
                        absolute
                        right-2
                        top-2
                        text-[8px]
                        font-medium
                        text-red-600

                        sm:text-[9px]

                        md:right-3
                        md:top-3
                        md:text-[10px]
                      "
                    >
                      ◉ {t("live")}
                    </div>

                    <div
                      className="
                        absolute
                        bottom-2.5
                        left-3
                        text-left
                        text-[10px]
                        font-semibold
                        text-white

                        sm:text-xs

                        md:bottom-3
                        md:left-4
                        md:text-[13px]
                      "
                    >
                      {t("liveDarshan")} {index + 1}
                    </div>
                  </button>
                );
              })}
            </section> */}

            <section
              className="
                mt-2
                overflow-hidden
                rounded-[14px]
                border
                border-[#eadbc5]
                bg-[#fffdf8]
                shadow-[0_5px_18px_rgba(70,40,10,0.08)]

                sm:mt-2
                sm:rounded-2xl

                lg:mt-5
                lg:rounded-[18px]
              "
            >
              <div
                className="
                  flex
                  h-10
                  items-center
                  justify-between
                  bg-[#fff8e9]
                  px-3
                  text-[10px]
                  text-[#8f1515]

                  sm:h-11
                  sm:px-4
                  sm:text-xs

                  lg:h-12
                  lg:px-[17px]
                  lg:text-[13px]
                "
              >
                <div className="flex items-center">
                  <span
                    className="
                      mr-1.5
                      inline-block
                      h-[7px]
                      w-[7px]
                      rounded-full
                      bg-[#d51b1b]
                    "
                  />

                  <strong>{t("liveDarshan")}</strong>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label={t("share")}
                  className=" grid h-10 w-10 shrink-0 place-items-center text-[#ce3131] transition-colors hover:text-[#8d0b0b] active:scale-95">

                  <Share2 size={20} strokeWidth={1.8} />
                </button>
              </div>

              <div
                className="
                  relative
                  aspect-video
                  w-full
                  overflow-hidden
                  bg-[#111]
                "
              >
                {stream.id.startsWith("YOUR_") ? (
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      px-5
                      text-center
                      text-white
                    "
                  >
                    <span className="text-[34px] text-[#d51b1b]">▶</span>

                    <strong className="text-sm sm:text-base">
                      YouTube Live
                    </strong>

                    <small
                      className="
                        max-w-[260px]
                        text-[9px]
                        leading-relaxed
                        text-[#c9c9c9]

                        sm:text-[10px]
                      "
                    >
                      {t("youtubeLiveSetup")}
                    </small>
                  </div>
                ) : (
                  <iframe
                    ref={playerRef}
                    key={stream.id}
                    src={`https://www.youtube.com/embed/${stream.id}?playsinline=1&rel=0&controls=1`}
                    title={t("liveDarshan")}
                    className="block h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>

              {/* VIDEO CONTROLS */}

              {!stream.id.startsWith("YOUR_") && (
                <div
                  className="
                    flex
                    items-center
                    justify-end
                    gap-2
                    border-t
                    border-[#eadbc5]
                    bg-[#fff8e9]
                    px-3
                    py-2

                    sm:px-4

                    lg:px-[17px]
                    lg:py-2.5
                  "
                >
                  {/* PLAY / PAUSE BUTTON */}

                  {/* <button
                    type="button"
                    onClick={handlePlayPause}
                    aria-label={
                      isPlaying
                        ? "Pause video"
                        : "Play video"
                    }
                    className="
                      inline-flex
                      h-9
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-[#e7d3b2]
                      bg-[#fffdf8]
                      px-4
                      text-[11px]
                      font-semibold
                      text-[#9b1d1d]
                      shadow-[0_3px_8px_rgba(70,40,10,0.06)]
                      transition

                      hover:bg-white
                      active:scale-95

                      sm:text-xs
                    "
                  >
                    <span className="text-sm">
                      {isPlaying ? "❚❚" : "▶"}
                    </span>

                    {isPlaying ? "Pause" : "Play"}
                  </button> */}

                  {/* FULLSCREEN BUTTON */}

                  {/* <button
                    type="button"
                    onClick={handleFullscreen}
                    aria-label="Fullscreen"
                    className="
                      grid
                      h-9
                      w-9
                      place-items-center
                      rounded-full
                      border
                      border-[#e7d3b2]
                      bg-[#fffdf8]
                      text-[#9b1d1d]
                      shadow-[0_3px_8px_rgba(70,40,10,0.06)]
                      transition

                      hover:bg-white
                      active:scale-95
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  </button> */}
                </div>
              )}

              {/* PLAYER INFO */}

              {/* <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  px-3
                  py-3

                  sm:px-4

                  lg:px-[18px]
                  lg:py-[15px]
                "
              >
                <div className="min-w-0">
                  <h2
                    className="
                      m-0
                      truncate
                      font-serif
                      text-[15px]
                      font-bold
                      text-[#4a4038]

                      sm:text-lg

                      lg:text-xl
                    "
                  >
                    {t("liveDarshan")}
                  </h2>

                  <p
                    className="
                      mt-1
                      truncate
                      text-[9px]
                      text-[#8b8178]

                      sm:text-[10px]

                      lg:text-[11px]
                    "
                  >
                    {t("haveliName")}
                  </p>
                </div>

                <div
                  className="
                    shrink-0
                    rounded-full
                    bg-[#fff0eb]
                    px-3
                    py-1.5
                    text-[11px]
                    font-semibold
                    text-[#a71919]

                    sm:text-xs

                    lg:text-sm
                  "
                >
                  ♡ 2.1K
                </div>
              </div> */}
            </section>
          </div>

          {/* ===================================================
              LIVE CHAT
              =================================================== */}

          <section
            className="
              overflow-hidden
              rounded-[14px]
              border
              border-[#eadbc5]
              bg-[#fffdf8]
              shadow-[0_5px_18px_rgba(70,40,10,0.05)]

              sm:rounded-2xl

              lg:sticky
              lg:top-6
              lg:flex
              lg:min-h-[560px]
              lg:flex-col
              lg:rounded-[18px]

              2xl:min-h-[640px]
            "
          >
            {/* CHAT HEADER */}

            <div
              className="
                flex
                h-11
                shrink-0
                items-center
                gap-2
                border-b
                border-[#eadbc5]
                bg-[#fff8e9]
                px-3
                text-[11px]
                font-bold
                text-[#8f1515]

                sm:px-4
                sm:text-xs

                lg:h-[52px]
                lg:px-[17px]
                lg:text-[13px]
              "
            >
              <span
                className="
                  h-[7px]
                  w-[7px]
                  shrink-0
                  rounded-full
                  bg-[#d51b1b]
                "
              />

              {t("liveChat")}
            </div>

            {/* CHAT MESSAGES */}

            <div
              className="
                px-3
                py-1

                sm:px-4
                sm:py-2

                lg:flex-1
                lg:overflow-y-auto
                lg:px-[17px]
                lg:py-2
              "
            >
              {chatMessages.map(([avatar, name, user], index) => (
                <div
                  key={`${name}-${user}-${index}`}
                  className="
                      flex
                      items-center
                      gap-2.5
                      border-b
                      border-[#f1e5d3]
                      py-2

                      last:border-b-0

                      lg:py-3
                    "
                >
                  <div
                    className="
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        rounded-full
                        border
                        border-[#ead8ba]
                        bg-[#fff7e9]
                        text-base

                        lg:h-[42px]
                        lg:w-[42px]
                        lg:text-lg
                      "
                  >
                    {avatar}
                  </div>

                  <div className="min-w-0">
                    <strong
                      className="
                          block
                          truncate
                          text-[11px]
                          text-[#443b34]

                          sm:text-xs

                          lg:text-[13px]
                        "
                    >
                      {name}
                    </strong>

                    <span
                      className="
                          mt-0.5
                          block
                          truncate
                          text-[9px]
                          text-[#91877d]

                          sm:text-[10px]
                        "
                    >
                      {user}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* MESSAGE INPUT */}

            <div
              className="
                flex
                shrink-0
                gap-2
                border-t
                border-[#eadbc5]
                px-3
                pb-3
                pt-2

                sm:px-4

                lg:px-[15px]
                lg:pb-[15px]
                lg:pt-3
              "
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("typeMessage")}
                className="
                  h-10
                  min-w-0
                  flex-1
                  rounded-full
                  border
                  border-[#eadbc5]
                  bg-[#fffdf9]
                  px-4
                  text-[11px]
                  text-[#40372f]
                  outline-none
                  transition

                  placeholder:text-[#a99d92]

                  focus:border-[#c99435]
                  focus:ring-2
                  focus:ring-[#c99435]/10

                  lg:h-11
                  lg:text-xs
                "
              />

              <button
                type="button"
                onClick={handleSendMessage}
                aria-label={t("sendMessage")}
                className="
                  grid
                  h-10
                  w-10
                  shrink-0
                  place-items-center
                  rounded-full
                  border-0
                  bg-[#a71919]
                  text-white
                  shadow-[0_4px_10px_rgba(167,25,25,0.18)]
                  transition
                  duration-200
                  hover:bg-[#8f1515]
                  active:scale-95

                  lg:h-11
                  lg:w-11
                "
              >
                <Send size={21} strokeWidth={2.5} />
              </button>
            </div>
          </section>
        </div>

        {/* =====================================================
            DECORATION
            ===================================================== */}

        <div
          className="
            flex
            h-12
            items-center
            justify-center
            gap-2.5
            text-[#c99435]

            lg:h-[70px]
          "
        >
          <span
            className="
              h-px
              w-14
              bg-gradient-to-r
              from-transparent
              to-[#d8b66c]

              lg:w-24
            "
          />

          <strong
            className="
              font-serif
              text-sm
              font-normal

              lg:text-lg
            "
          >
            ॐ
          </strong>

          <span
            className="
              h-px
              w-14
              bg-gradient-to-l
              from-transparent
              to-[#d8b66c]

              lg:w-24
            "
          />
        </div>
      </div>
    </main>
  );
}
