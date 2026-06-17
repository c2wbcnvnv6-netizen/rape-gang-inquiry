import type { Metadata } from "next";
import { Anton, Fraunces, IM_Fell_English_SC, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const imFell = IM_Fell_English_SC({
  variable: "--font-im-fell",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rape-gang-inquiry.vercel.app",
  ),
  title: "Rape Gang Inquiry — Testimony",
  description:
    "Survivor testimony and documented scale from the independent Rape Gang Inquiry report.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rape Gang Inquiry",
    description: "From the independent inquiry report.",
    type: "website",
    locale: "en_GB",
  },
  other: {
    "format-detection": "telephone=no, date=no, email=no, address=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${sourceSans.variable} ${anton.variable} ${imFell.variable} h-full`}>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
