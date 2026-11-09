import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Umanzor Financial Services | Bookkeeping, Reporting & Payroll Support in Houston",
  description:
    "Houston-based bookkeeping, financial reporting, payroll support, backlog cleanup, and business formation help for small business owners. Schedule a free consultation.",
  openGraph: {
    title: "Umanzor Financial Services",
    description:
      "Bookkeeping, financial reporting, and payroll support for Houston small businesses and entrepreneurs nationwide.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1730",
};

/** Runs before first paint: enables the hero entrance only when motion is welcome. */
const motionScript = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ok')}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
