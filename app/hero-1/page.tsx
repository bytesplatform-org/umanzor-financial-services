import type { Metadata } from "next";
import HeroLight from "@/components/HeroLight";

export const metadata: Metadata = {
  title: "Hero 1 | Umanzor Financial Services",
  robots: { index: false },
};

export default function HeroOnePage() {
  return (
    <main className="bg-white">
      <HeroLight />
    </main>
  );
}
