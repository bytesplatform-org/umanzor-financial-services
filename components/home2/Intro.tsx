"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CASE_STUDIES, CONSULT_URL, FOUNDER } from "@/lib/content";
import { gsap, useMotion } from "@/lib/motion";
import logo from "@/public/brand/umanzor-logo.png";
import { Arrow } from "../ui";
import { Eyebrow, FinCard, H2, Icon, PILL_DARK, PILL_LIGHT, Tag, Words, type CardVariant, type IconName } from "./kit";
import { sectionMotion } from "./motion";

/* ------------------------------------------------------------------
   Intro: copy on the left, cards cascading off the right edge.
------------------------------------------------------------------- */
const CASCADE: { v: CardVariant; pos: string }[] = [
  { v: "pl", pos: "left-[0%] top-[8%] z-[1]" },
  { v: "payroll", pos: "left-[22%] top-[22%] z-[2]" },
  { v: "recon", pos: "left-[44%] top-[34%] z-[3]" },
  { v: "balance", pos: "left-[64%] top-[44%] z-[4]" },
  { v: "cash", pos: "left-[82%] top-[54%] z-[5]" },
];

export function Intro() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => {
    sectionMotion(el);
    const cards = el.querySelectorAll("[data-cascade]");
    gsap.from(cards, {
      xPercent: 60,
      yPercent: 20,
      rotation: 8,
      autoAlpha: 0,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: "top 80%", end: "top 15%", scrub: 0.8 },
    });
    gsap.from(el.querySelectorAll("[data-tag]"), {
      scale: 0.4,
      autoAlpha: 0,
      ease: "back.out(2)",
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: { trigger: el, start: "top 45%", once: true },
    });
  });

  return (
    <section ref={root} aria-labelledby="h2-intro-title" className="relative overflow-hidden py-[clamp(56px,8vw,120px)]">
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-blur-group>
          <Eyebrow>Bookkeeping · Reporting · Payroll</Eyebrow>
          <h2 id="h2-intro-title" className={`${H2} mt-5`}>
            <Words parts={["Organize, reconcile,", null, ["& understand", "text-brass-deep"], null, "your numbers."]} />
          </h2>
          <p data-reveal className="mt-6 max-w-[24rem] text-[0.9375rem] leading-relaxed text-steel">
            We handle the day-to-day bookkeeping that keeps your records accurate, then turn it into
            reports that show where your money is going.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <a href={CONSULT_URL} className={PILL_DARK}>
              Get started free
            </a>
            <a href="#services" className={PILL_LIGHT}>
              See packages
            </a>
          </div>
        </div>

        <div className="relative -mr-[var(--gutter)] aspect-[1.35] max-lg:max-w-[640px] lg:-mr-[12%]">
          <Tag tone="coral" className="left-[24%] top-[6%]">
            @owner
          </Tag>
          <Tag tone="ink" className="left-[58%] top-[24%]">
            Reconciled ✓
          </Tag>
          {CASCADE.map((c) => (
            <div key={c.v} data-cascade className={`absolute aspect-[4/5] w-[31%] ${c.pos}`}>
              <FinCard variant={c.v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Founder banner: a wide panel that grows into place, with a small
   fact slider in the corner (the reference's "Watch" + arrows).
------------------------------------------------------------------- */
export function FounderBanner() {
  const root = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const facts = FOUNDER.facts;
  const go = (d: number) => setSlide((s) => (s + d + facts.length) % facts.length);

  useMotion(root, (el) => {
    sectionMotion(el);
    gsap.fromTo(
      el.querySelector("[data-banner]"),
      { scale: 0.9, borderRadius: "48px" },
      {
        scale: 1,
        borderRadius: "28px",
        ease: "none",
        scrollTrigger: { trigger: el.querySelector("[data-banner]"), start: "top 95%", end: "top 35%", scrub: true },
      },
    );
    gsap.from(el.querySelector("[data-seal]"), {
      rotation: -40,
      scale: 0.8,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 60%", scrub: true },
    });
  });

  return (
    <section ref={root} id="about" aria-labelledby="h2-founder-title" className="py-[clamp(40px,6vw,88px)]">
      <div className="shell">
        <div className="relative flex flex-wrap items-end justify-between gap-6" data-blur-group>
          <div>
            <Eyebrow>Founded by {FOUNDER.name}</Eyebrow>
            <h2 id="h2-founder-title" className={`${H2} mt-5`}>
              <Words parts={["Real support from", null, "a real accountant."]} />
            </h2>
          </div>
          <Tag tone="ink" className="!relative max-sm:hidden">
            @alder
          </Tag>
        </div>

        <div
          data-banner
          className="relative mt-10 grid min-h-[clamp(380px,42vw,560px)] overflow-hidden rounded-[28px] bg-gradient-to-br from-royal via-royal-bright to-royal-deep text-white"
        >
          {/* Decorative rings */}
          <svg aria-hidden="true" viewBox="0 0 600 600" className="absolute -right-[10%] top-1/2 w-[min(80vw,760px)] -translate-y-1/2 text-white/10" fill="none" stroke="currentColor">
            {[120, 180, 240, 296].map((r) => (
              <circle key={r} cx="300" cy="300" r={r} />
            ))}
          </svg>

          <div className="absolute left-6 top-6 flex flex-col gap-1.5 sm:left-8 sm:top-8" aria-hidden="true">
            <span className="h-7 w-9 rounded-t-xl rounded-b-sm bg-white" />
            <span className="h-7 w-9 rounded-t-sm rounded-b-xl bg-royal-deep ring-1 ring-white/15" />
          </div>
          <div className="absolute right-6 top-7 flex gap-1.5 sm:right-8" aria-hidden="true">
            {facts.map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
            ))}
          </div>

          <div
            data-seal
            className="absolute right-[6%] top-1/2 grid aspect-square w-[clamp(180px,30vw,380px)] -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] max-sm:right-[-14%] max-sm:top-[38%]"
          >
            <Image src={logo} alt="Umanzor Financial Services monogram" sizes="(max-width: 640px) 180px, 30vw" className="w-[72%]" />
          </div>

          <div className="relative z-10 mt-auto flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[26rem]" aria-live="polite">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brass">
                {facts[slide].label}
              </p>
              <p key={slide} className="panel-in mt-2 text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] font-medium leading-snug tracking-[-0.02em]">
                {facts[slide].value}
              </p>
              <a href={CONSULT_URL} className={`${PILL_LIGHT} mt-5 !h-9 !px-4 !text-[0.8125rem]`}>
                Meet Alder
              </a>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Previous fact" className="grid size-10 place-items-center rounded-full bg-white text-royal-deep transition-transform hover:scale-105">
                <Arrow className="rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next fact" className="grid size-10 place-items-center rounded-full bg-white text-royal-deep transition-transform hover:scale-105">
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Trusted by: client names drifting past, edges faded.
------------------------------------------------------------------- */
const CLIENT_MARKS: { name: string; icon: IconName }[] = CASE_STUDIES.map((c, i) => ({
  name: c.client,
  icon: (["spark", "building", "shield"] as IconName[])[i % 3],
}));
const SECTORS: { name: string; icon: IconName }[] = [
  { name: "Auto detailing", icon: "layers" },
  { name: "General contracting", icon: "building" },
  { name: "Mechanic shops", icon: "coins" },
];

export function Trusted() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, sectionMotion);
  const row = CLIENT_MARKS.flatMap((c, i) => [c, SECTORS[i]]);

  return (
    <section ref={root} aria-labelledby="h2-trusted-title" className="py-[clamp(56px,7vw,104px)]">
      <div className="shell">
        <h2 id="h2-trusted-title" data-blur-group className="text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-medium tracking-[-0.04em]">
          <Words parts={["Trusted by growing", ["businesses.", "text-mist"]]} />
        </h2>
        <p data-reveal className="mt-2 text-[0.875rem] text-steel">
          Owners across Houston who wanted their books handled and their numbers clear.
        </p>
      </div>
      <div className="h2-marquee-wrap h2-fade-x mt-10 overflow-hidden" aria-label="Clients and industries we work with">
        <ul className="h2-marquee flex w-max items-center gap-14 pr-14 [--dur:38s]">
          {[0, 1, 2, 3].flatMap((k) =>
            row.map((c, i) => (
              <li
                key={`${k}-${i}`}
                aria-hidden={k > 0}
                className="flex items-center gap-2.5 whitespace-nowrap text-[clamp(1.05rem,0.9rem+0.6vw,1.4rem)] font-semibold tracking-[-0.03em] text-steel/55"
              >
                <Icon name={c.icon} className="size-6" />
                {c.name}
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
