"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Globe,
  Home,
  Info,
  LogOut,
  ShieldAlert,
  Trash2,
  X,
  LoaderCircle,
} from "lucide-react";

export default function DeleteAccountPage() {
  const router = useRouter();

  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const isConfirmed = confirmText === "DELETE";

  const handleDelete = async () => {
    if (!isConfirmed || deleting) return;

    setDeleting(true);
    setDeleteError("");

    try {
      /*
       * DEMO ONLY:
       * Replace this simulated operation with your real backend
       * account-deletion API before using this in production.
       *
       * Example:
       * const response = await fetch("/api/account", {
       *   method: "DELETE",
       *   headers: {
       *     Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
       *   },
       * });
       *
       * if (!response.ok) {
       *   throw new Error("Failed to delete account.");
       * }
       */

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear the local session token for this demo.
      localStorage.removeItem("auth-token");

      setDeleted(true);
      setShowConfirm(false);
    } catch (error) {
      console.error("Delete account error:", error);
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (!deleted) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [deleted]);

  /*
   * SUCCESS SCREEN
   */

  if (deleted) {
    return (
      <main className="min-h-[100dvh] bg-[#fffaf1] text-[#40372f]">
        <div className="flex min-h-[100dvh] items-center justify-center px-4 py-8 sm:px-6">
          <div className="w-full max-w-[520px]">
            <div
              className="
                overflow-hidden
                rounded-[28px]
                border
                border-[#eadfce]
                bg-[#fffdf9]
                shadow-[0_20px_60px_rgba(74,42,16,0.10)]
              "
            >
              {/* SUCCESS AREA */}
              <div
                className="
                  relative
                  overflow-hidden
                  bg-[linear-gradient(135deg,#fff8ed_0%,#fffdf9_100%)]
                  px-6
                  py-10
                  text-center
                  sm:px-10
                  sm:py-12
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -right-16
                    -top-16
                    h-[150px]
                    w-[150px]
                    rounded-full
                    bg-[#198754]/5
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-20
                    -left-10
                    h-[140px]
                    w-[140px]
                    rounded-full
                    bg-[#bd8b39]/5
                  "
                />

                <div className="relative z-10">
                  <div
                    className="
                      mx-auto
                      flex
                      h-[86px]
                      w-[86px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#e9f8ed]
                      text-[#198754]
                      shadow-[0_8px_25px_rgba(25,135,84,0.10)]
                    "
                  >
                    <CheckCircle2 size={42} strokeWidth={1.6} />
                  </div>

                  <p
                    className="
                      mt-6
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-[#bd8b39]
                    "
                  >
                    Shri Govardhannath
                  </p>

                  <h1
                    className="
                      mt-2
                      font-serif
                      text-[29px]
                      font-bold
                      text-[#641010]
                      sm:text-[34px]
                    "
                  >
                    Deletion Demo Complete
                  </h1>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-[390px]
                      text-[11px]
                      leading-6
                      text-[#82766b]
                      sm:text-[12px]
                    "
                  >
                    The demo flow has completed and your local authentication
                    token has been cleared. Your backend account has not been
                    deleted by this simulated operation.
                  </p>
                </div>
              </div>

              {/* SUCCESS DETAILS */}
              <div className="border-t border-[#f0e5d6] px-5 py-5 sm:px-7 sm:py-6">
                <div
                  className="
                    rounded-[16px]
                    border
                    border-[#eadfce]
                    bg-[#fffaf1]
                    p-4
                  "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        rounded-xl
                        bg-[#fff0d8]
                        text-[#a71919]
                      "
                    >
                      <Info size={18} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="text-[11px] font-bold text-[#51463d]">
                        Before going live
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          leading-5
                          text-[#8c7e72]
                          sm:text-[11px]
                        "
                      >
                        Connect this page to your backend deletion endpoint and
                        verify that the server has deleted the account before
                        displaying a permanent-deletion success message.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="
                    mt-5
                    flex
                    min-h-[50px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#a71919]
                    px-5
                    py-3
                    text-[11px]
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(167,25,25,0.12)]
                    transition
                    hover:bg-[#8f1515]
                    active:scale-[0.99]
                  "
                >
                  <Home size={17} strokeWidth={1.8} />
                  Return to Home
                </button>

                <p className="mt-4 text-center text-[9px] text-[#aa9d92]">
                  Thank you for using Shri Govardhannath.
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <Footer />
          </div>
        </div>
      </main>
    );
  }

  /*
   * MAIN DELETE PAGE
   */

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[#fffaf1]
        pb-10
        text-[#40372f]
        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
      "
    >
      {/* HEADER */}
      <header
        className="
          sticky
          top-0
          z-40
          border-b
          border-[#eadfce]
          bg-[#fffaf1]/95
          backdrop-blur-md
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[64px]
            w-full
            max-w-[1100px]
            items-center
            gap-3
            px-4
            sm:min-h-[70px]
            sm:px-6
            lg:min-h-[82px]
            lg:px-8
          "
        >
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            aria-label="Back to Dashboard"
            disabled={deleting}
            className="
              group
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              border
              border-[#ead7b8]
              bg-white
              text-[#641010]
              shadow-sm
              transition-all
              hover:border-[#b8893b]
              hover:bg-[#fff8eb]
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:h-10
              sm:w-10
              lg:h-11
              lg:w-11
            "
          >
            <ArrowLeft
              size={19}
              strokeWidth={1.8}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </button>

          <div className="min-w-0">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#bd8b39]
              "
            >
              Shri Govardhannath
            </p>

            <h1
              className="
                truncate
                font-serif
                text-[19px]
                font-bold
                text-[#641010]
                lg:text-[25px]
              "
            >
              Delete Account
            </h1>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div
        className="
          mx-auto
          w-full
          max-w-[900px]
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
          lg:py-10
        "
      >
        {/* HERO */}
        <section
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[#efc7c1]
            bg-[linear-gradient(135deg,#fff4f1_0%,#fff8f3_100%)]
            p-6
            text-center
            shadow-[0_8px_30px_rgba(167,25,25,0.05)]
            sm:p-8
            lg:p-10
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute
              -right-20
              -top-20
              h-[190px]
              w-[190px]
              rounded-full
              bg-[#b42318]/5
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              -bottom-24
              -left-14
              h-[170px]
              w-[170px]
              rounded-full
              bg-[#bd8b39]/5
            "
          />

          <div className="relative z-10">
            <div
              className="
                mx-auto
                flex
                h-[82px]
                w-[82px]
                items-center
                justify-center
                rounded-full
                border
                border-[#f0c9c2]
                bg-[#ffe4df]
                text-[#b42318]
                shadow-[0_8px_24px_rgba(180,35,24,0.08)]
              "
            >
              <Trash2 size={36} strokeWidth={1.6} />
            </div>

            <p
              className="
                mt-5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#b8893b]
              "
            >
              ACCOUNT MANAGEMENT
            </p>

            <h2
              className="
                mt-2
                font-serif
                text-[27px]
                font-bold
                text-[#641010]
                sm:text-[32px]
                lg:text-[38px]
              "
            >
              Delete your account?
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-[620px]
                text-[11px]
                leading-5
                text-[#82766b]
                sm:text-[12px]
                sm:leading-6
              "
            >
              Before continuing, please review what will happen to your account
              and associated information.
            </p>
          </div>
        </section>

        {/* WARNING */}
        <section
          className="
            mt-5
            rounded-[20px]
            border
            border-[#efc7c1]
            bg-[#fff3f1]
            p-5
            sm:p-6
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                grid
                h-11
                w-11
                shrink-0
                place-items-center
                rounded-xl
                bg-[#ffe1dc]
                text-[#b42318]
              "
            >
              <ShieldAlert size={22} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h3 className="text-[14px] font-bold text-[#9f1f17]">
                This action cannot be undone
              </h3>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-[#a66d67]
                  sm:text-[11px]
                  sm:leading-6
                "
              >
                Once your account is deleted, you may not be able to recover
                your account or associated data.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT HAPPENS */}
        <section
          className="
            mt-5
            rounded-[20px]
            border
            border-[#eadfce]
            bg-[#fffdf9]
            p-5
            shadow-[0_6px_24px_rgba(74,42,16,0.045)]
            sm:p-6
          "
        >
          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#bd8b39]
            "
          >
            Before you continue
          </p>

          <h3
            className="
              mt-1
              font-serif
              text-[20px]
              font-bold
              text-[#641010]
            "
          >
            What happens when you delete your account?
          </h3>

          <div className="mt-6 space-y-4">
            <InfoRow
              icon={<X size={17} strokeWidth={1.8} />}
              title="Account access"
              text="Your account access will be permanently removed once the backend confirms deletion."
            />

            <InfoRow
              icon={<Trash2 size={17} strokeWidth={1.8} />}
              title="Account data"
              text="Account-related data will be handled according to your application's data retention policy."
            />

            <InfoRow
              icon={<LogOut size={17} strokeWidth={1.8} />}
              title="Current session"
              text="Your current application session will be cleared."
            />
          </div>
        </section>

        {/* CONFIRMATION */}
        <section
          className="
            mt-5
            overflow-hidden
            rounded-[20px]
            border
            border-[#eadfce]
            bg-[#fffdf9]
            shadow-[0_6px_24px_rgba(74,42,16,0.045)]
          "
        >
          <div className="border-b border-[#f0e5d6] px-5 py-5 sm:px-6">
            <p
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#bd8b39]
              "
            >
              Final confirmation
            </p>

            <h3
              className="
                mt-1
                font-serif
                text-[21px]
                font-bold
                text-[#641010]
              "
            >
              Confirm account deletion
            </h3>

            <p
              className="
                mt-2
                text-[10px]
                leading-5
                text-[#82766b]
                sm:text-[11px]
                sm:leading-6
              "
            >
              Type <strong className="font-bold text-[#641010]">DELETE</strong>{" "}
              below to confirm this action.
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <label
              htmlFor="delete-confirmation"
              className="
                mb-2
                block
                text-[10px]
                font-bold
                text-[#51463d]
              "
            >
              Type DELETE
            </label>

            <div className="relative">
              <input
                id="delete-confirmation"
                type="text"
                value={confirmText}
                onChange={(event) => {
                  setConfirmText(event.target.value);
                  setDeleteError("");
                }}
                placeholder="DELETE"
                disabled={deleting}
                autoComplete="off"
                spellCheck={false}
                className="
                  h-[52px]
                  w-full
                  rounded-xl
                  border
                  border-[#dfd1c0]
                  bg-white
                  px-4
                  pr-12
                  text-[13px]
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-[#40372f]
                  outline-none
                  transition
                  placeholder:normal-case
                  placeholder:tracking-normal
                  placeholder:text-[#b4a89d]
                  focus:border-[#b42318]
                  focus:ring-4
                  focus:ring-[#b42318]/10
                  disabled:cursor-not-allowed
                  disabled:bg-[#f7f3ed]
                "
              />

              {confirmText.length > 0 && (
                <div
                  className={`
                    absolute
                    right-3
                    top-1/2
                    grid
                    h-7
                    w-7
                    -translate-y-1/2
                    place-items-center
                    rounded-full
                    ${
                      isConfirmed
                        ? "bg-[#e9f8ed] text-[#198754]"
                        : "bg-[#fff0ed] text-[#b42318]"
                    }
                  `}
                >
                  {isConfirmed ? (
                    <Check size={16} strokeWidth={2.5} />
                  ) : (
                    <X size={16} strokeWidth={2} />
                  )}
                </div>
              )}
            </div>

            {/* VALIDATION */}
            <div className="mt-3 min-h-[18px]" aria-live="polite">
              {confirmText.length > 0 && !isConfirmed && (
                <p className="text-[9px] font-medium text-[#b42318]">
                  Please type DELETE exactly as shown above.
                </p>
              )}

              {isConfirmed && (
                <p className="text-[9px] font-medium text-[#198754]">
                  Confirmation accepted. You can continue.
                </p>
              )}

              {deleteError && (
                <p className="text-[10px] font-medium text-[#b42318]">
                  {deleteError}
                </p>
              )}
            </div>

            {/* DELETE BUTTON */}
            <button
              type="button"
              onClick={() => {
                if (isConfirmed) {
                  setShowConfirm(true);
                  setDeleteError("");
                }
              }}
              disabled={!isConfirmed || deleting}
              className="
                mt-4
                flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#b42318]
                px-5
                py-3
                text-[11px]
                font-bold
                text-white
                shadow-[0_7px_18px_rgba(180,35,24,0.12)]
                transition
                hover:bg-[#991b12]
                hover:shadow-[0_9px_22px_rgba(180,35,24,0.16)]
                disabled:cursor-not-allowed
                disabled:bg-[#d9cec3]
                disabled:shadow-none
                active:scale-[0.99]
              "
            >
              <Trash2 size={17} strokeWidth={1.8} />
              Delete Account Permanently
            </button>

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              disabled={deleting}
              className="
                mt-3
                min-h-[50px]
                w-full
                rounded-xl
                border
                border-[#dfd1c0]
                bg-white
                px-5
                py-3
                text-[11px]
                font-bold
                text-[#65594f]
                transition
                hover:bg-[#fffaf1]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>
          </div>
        </section>

        <Footer />
      </div>

      {/* FINAL CONFIRMATION MODAL */}
      {showConfirm && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#2b1712]/45
            px-4
            py-6
            backdrop-blur-[3px]
          "
          onClick={() => {
            if (!deleting) {
              setShowConfirm(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="
              w-full
              max-w-[430px]
              overflow-hidden
              rounded-[24px]
              border
              border-[#eadfce]
              bg-[#fffdf9]
              shadow-[0_25px_80px_rgba(43,23,18,0.25)]
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 pb-2 pt-7 text-center sm:px-8">
              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#ffe4df]
                  text-[#b42318]
                "
              >
                <CircleAlert size={31} strokeWidth={1.7} />
              </div>

              <h2
                id="delete-dialog-title"
                className="
                  mt-5
                  font-serif
                  text-[23px]
                  font-bold
                  text-[#641010]
                "
              >
                Are you absolutely sure?
              </h2>

              <p
                className="
                  mt-2
                  text-[10px]
                  leading-5
                  text-[#82766b]
                  sm:text-[11px]
                  sm:leading-6
                "
              >
                Your account deletion cannot be undone. In the current demo, the
                operation is simulated and does not delete the backend account.
              </p>
            </div>

            <div className="p-5 sm:p-6">
              <div
                className="
                  rounded-xl
                  border
                  border-[#efc7c1]
                  bg-[#fff3f1]
                  p-3
                "
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-[1px] text-[#b42318]">
                    <ShieldAlert size={17} strokeWidth={1.8} />
                  </div>

                  <p className="text-[9px] leading-5 text-[#9f1f17]">
                    Make sure your real backend deletion API is connected before
                    enabling permanent account deletion in production.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="
                  mt-4
                  flex
                  min-h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#b42318]
                  px-5
                  py-3
                  text-[11px]
                  font-bold
                  text-white
                  transition
                  hover:bg-[#991b12]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {deleting ? (
                  <>
                    <LoaderCircle size={17} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} strokeWidth={1.8} />
                    Confirm Demo Deletion
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="
                  mt-3
                  min-h-[48px]
                  w-full
                  rounded-xl
                  border
                  border-[#dfd1c0]
                  bg-white
                  px-5
                  py-3
                  text-[11px]
                  font-bold
                  text-[#65594f]
                  transition
                  hover:bg-[#fffaf1]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                No, Keep My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   REUSABLE INFO ROW
========================================================= */

function InfoRow({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          mt-0.5
          grid
          h-9
          w-9
          shrink-0
          place-items-center
          rounded-xl
          bg-[#fff2e3]
          text-[#a71919]
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-bold text-[#51463d]">{title}</p>

        <p
          className="
            mt-1
            text-[10px]
            leading-5
            text-[#74685e]
            sm:text-[11px]
            sm:leading-6
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   REUSABLE FOOTER
========================================================= */

function Footer() {
  return (
    <div className="mt-7 text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="h-px w-10 bg-[#ddc69b]" />
        <span className="text-[#b8893b]">❧</span>
        <span className="text-[#b8893b]">❧</span>
        <span className="text-[#b8893b]">❧</span>
        <span className="h-px w-10 bg-[#ddc69b]" />
      </div>

      <p
        className="
          mt-3
          font-serif
          text-[12px]
          font-semibold
          text-[#7b251e]
        "
      >
        🙏 Jai Shree Krishna
      </p>
    </div>
  );
}
