"use client";

import { LanguageProvider } from "@/contexts/LanguageProvider";
import AppInit from "@/components/AppInit";
import PullToRefresh from "@/components/PullToRefresh";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppInit />
      <PullToRefresh>{children}</PullToRefresh>
    </LanguageProvider>
  );
}
