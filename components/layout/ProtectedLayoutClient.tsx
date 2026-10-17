"use client";

import { usePathname } from "next/navigation";
import CommonHeader from "@/components/layout/CommonHeader";
import MainNavigation from "@/components/navigation/MainNavigation";

export default function ProtectedLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldShowHeader = pathname !== "/dashboard" && pathname !== "/reels";

  return (
    <>
      {shouldShowHeader && <CommonHeader />}
      {children}
      <MainNavigation />
    </>
  );
}
