import type { Metadata } from "next";
import { Geist_Mono, Ysabeau, Ysabeau_Infant } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const ysabeau = Ysabeau({
  variable: "--font-ysabeau",
  subsets: ["latin"],
});

const ysabeauInfant = Ysabeau_Infant({
  variable: "--font-ysabeau-infant",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samadhan.ai",
  description:
    "One citizen. One problem. One platform. Real change. AI-powered routing from citizen reports to universities and funders.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ysabeau.variable} ${ysabeauInfant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}