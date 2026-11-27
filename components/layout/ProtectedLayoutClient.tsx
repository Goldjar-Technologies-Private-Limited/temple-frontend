"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CommonHeader from "@/components/layout/CommonHeader";
import MainNavigation from "@/components/navigation/MainNavigation";
import { authService } from "@/services/auth/auth.service";

export default function ProtectedLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      setIsAuthorized(false);
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (isAuthorized === null || !isAuthorized) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#fffaf1]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#b42318] border-t-transparent" />
      </div>
    );
  }

  const shouldShowHeader = pathname !== "/dashboard" && pathname !== "/reels";

  return (
    <>
      {shouldShowHeader && <CommonHeader />}
      {children}
      <MainNavigation />
    </>
  );
}
