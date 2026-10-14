"use client";

import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

type CommonHeaderProps = {
  title?: string;
  subtitle?: string;
  backHref?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
};

import { PAGE_INFO as pageInfo } from "@/data/commonHeader";

function formatPageName(pathname: string) {
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  if (!lastSegment) return "Dashboard";

  return decodeURIComponent(lastSegment)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CommonHeader({
  title,
  subtitle,
  backHref = "/dashboard",
  showBack = true,
  rightAction,
}: CommonHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = pageInfo[pathname] ?? {
    title: formatPageName(pathname),
    subtitle: "Manage your account and activities",
  };

  const pageTitle = title ?? currentPage.title;
  const pageSubtitle = subtitle ?? currentPage.subtitle;

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(backHref);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full min-w-0 border-b border-[#eadbc5] bg-[#fffdf8]/95 shadow-[0_2px_12px_rgba(80,40,10,0.035)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[60px] w-full min-w-0 max-w-[1500px] items-center gap-2 px-3 min-[375px]:px-4 sm:min-h-[68px] sm:gap-3 sm:px-5 md:px-6 lg:min-h-[76px] lg:px-8 xl:px-10 2xl:px-12">
        {/* Back button */}
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            title="Go back"
            className="group flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#ead7b8] bg-white text-[#641010] shadow-sm transition-all duration-200 hover:border-[#b8893b] hover:bg-[#fff4e4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-95 sm:size-10 lg:size-11"
          >
            <ArrowLeft
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </button>
        )}

        {/* Current page title and description */}
        <div className="min-w-0 flex-1">
          <h1 className="truncate uppercase text-[17px] font-bold leading-tight text-[#641010] min-[375px]:text-[19px] sm:text-[22px] lg:text-[25px]">
            {pageTitle}
          </h1>

          {pageSubtitle && (
            <p className="truncate text-[10px] leading-tight text-[#806f63] min-[375px]:text-[11px] sm:text-xs">
              {pageSubtitle}
            </p>
          )}
        </div>

        {/* Optional right-side action */}
        {rightAction && (
          <div className="flex shrink-0 items-center">{rightAction}</div>
        )}
      </div>
    </header>
  );
}

/* Reusable Save button for forms */
export function HeaderSaveButton({
  formId,
  disabled = false,
  isSaving = false,
}: {
  formId: string;
  disabled?: boolean;
  isSaving?: boolean;
}) {
  return (
    <button
      type="submit"
      form={formId}
      disabled={disabled || isSaving}
      className="inline-flex min-h-[36px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#a71919] px-3 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#8f1414] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a71919] focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none sm:min-h-[40px] sm:gap-2 sm:px-4 sm:text-sm lg:min-h-[44px] lg:px-5"
    >
      <Save size={16} />
      <span>{isSaving ? "Saving..." : "Save"}</span>
    </button>
  );
}
