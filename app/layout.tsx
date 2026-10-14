import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Shri Govardhannath",
  description: "Shri Govardhannath Haveli",
};

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
