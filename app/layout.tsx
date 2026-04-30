import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JotaiProvider } from "@/ui/layout/JotaiProvider";
import { QueueLifecycleProvider } from "@/features/tracking/ui/components/QueueLifecycleProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "5늘 놀2 · 공감 유형 테스트",
  description:
    "오늘 놀자! 감성적 공감과 인지적 공감 중 당신은 어떤 공감을 하나요?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={{ colorScheme: "light" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#FFF7F8] text-zinc-900 antialiased`}
      >
        <QueueLifecycleProvider />
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
}
