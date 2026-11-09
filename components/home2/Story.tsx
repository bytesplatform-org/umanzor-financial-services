"use client";

import { useRef, useState } from "react";
import { DIFFERENTIATORS } from "@/lib/content";
import { gsap, useMotion } from "@/lib/motion";
import { Arrow } from "../ui";
import { FinCard, H2, Icon, IconBubble, Tag, Words, type CardVariant, type IconName } from "./kit";
import { sectionMotion } from "./motion";

/* ------------------------------------------------------------------
   Statement: a hand of cards opens above a paragraph whose words
   darken as it scrolls through the viewport.
------------------------------------------------------------------- */
const HAND: CardVariant[] = ["aging", "llc", "receipts", "invoice", "pl"];

function InlineIcon({ name, tone }: { name: IconName; tone: string }) {
  return (
    <span data-w="" className={`mx-[0.1em] inline-grid size-[0.95em] translate-y-[0.12em] place-items-center rounded-[0.28em] align-baseline ${tone}`}>
      <Icon name={name} className="size-[0.62em]" />
    </span>
  );
}

export function Statement() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => {
    sectionMotion(el);
    gsap.from(el.querySelectorAll("[data-hand]"), {
      rotation: 0,
      y: 40,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", end: "top 25%", scrub: 0.8 },
    });
  });

  return (
    <section ref={root} aria-label="What we do" className="overflow-hidden py-[clamp(72px,10vw,150px)]">
      <div className="shell relative text-center">
        <div className="relative mx-auto h-[clamp(150px,17vw,230px)] w-[clamp(120px,13vw,175px)]" aria-hidden="true">
          {HAND.map((v, i) => (
            <div
              key={v}
              data-hand
              className="absolute inset-x-0 bottom-0 aspect-[4/5] origin-[50%_140%]"
              style={{ transform: `rotate(${(i - 2) * 9}deg)`, zIndex: i }}
            >
              <FinCard variant={v} />
            </div>
          ))}
        </div>

        <Tag tone="ink" className="left-[8%] top-[12%] max-md:hidden lg:left-[24%]">
          @starting-out
        </Tag>
        <Tag tone="blue" tail="right" className="right-[8%] top-[22%] max-md:hidden lg:right-[24%]">
          @months-behind
        </Tag>

        <p
          data-scrub-group
          className="mx-auto mt-10 max-w-[21em] text-[clamp(1.55rem,0.95rem+2.6vw,3rem)] font-medium leading-[1.18] tracking-[-0.04em] text-royal-deep"
        >
          <Words parts={["Whether you're starting a business"]} />
          <InlineIcon name="building" tone="bg-brass text-royal-deep" />{" "}
          <Words parts={["or months behind on your books, Umanzor brings"]} />{" "}
          <span data-w="" className="inline-block text-brass-deep">order</span>{" "}
          <InlineIcon name="ledger" tone="bg-royal text-white" />{" "}
          <Words parts={["to your records and clarity"]} />{" "}
          <InlineIcon name="chart" tone="bg-sage text-sage-deep" />{" "}
          <Words parts={["to your numbers."]} />
        </p>

        <div data-pop-group className="mt-10 flex justify-center gap-3" aria-hidden="true">
          {(["receipt", "calculator", "pie"] as IconName[]).map((n) => (
            <span key={n} data-pop className="grid size-11 place-items-center rounded-full bg-white text-royal-deep ring-1 ring-black/[0.06]">
              <Icon name={n} className="size-5" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Vision: differentiators beside a two-tab folder of sample work.
------------------------------------------------------------------- */
const CLUSTER: { name: IconName; pos: string }[] = [
  { name: "pen", pos: "left-[16%] top-[0%]" },
  { name: "calculator", pos: "left-[0%] top-[34%]" },
  { name: "coins", pos: "left-[25%] top-[28%]" },
  { name: "receipt", pos: "left-[8%] top-[68%]" },
  { name: "layers", pos: "left-[33%] top-[64%]" },
  { name: "chart", pos: "left-[52%] top-[36%]" },
  { name: "bank", pos: "left-[72%] top-[16%]" },
  { name: "shield", pos: "left-[64%] top-[70%]" },
];

const TABS: { label: string; cards: CardVariant[]; items: string[] }[] = [
  {
    label: "Monthly books",
    cards: ["recon", "receipts", "invoice", "payroll", "balance", "llc"],
    items: ["Reconciliations", "Categorized expenses", "Invoices", "Payroll", "Balance sheet", "Business setup"],
  },
  {
    label: "Reports",
    cards: ["pl", "cash", "aging", "balance", "recon", "invoice"],
    items: ["Profit and Loss", "Cash flow", "Receivables aging", "Balance sheet", "Reconciliation review", "Billing"],
  },
];

/** Back tabs show only the tab; the front tab carries a sloped shoulder. */
const BACK_SHAPES = [
  "polygon(0 0, 42% 0, 49% 100%, 0 100%)",
  "polygon(51% 0, 100% 0, 100% 100%, 58% 100%)",
];
const FRONT_SHAPES = [
  "polygon(0 0, 42% 0, 47% 42%, 100% 42%, 100% 100%, 0 100%)",
  "polygon(0 42%, 53% 42%, 58% 0, 100% 0, 100% 100%, 0 100%)",
];

export function Vision() {
  const root = useRef<HTMLElement>(null);
  const [tab, setTab] = useState(0);
  useMotion(root, sectionMotion);

  return (
    <section ref={root} aria-labelledby="h2-vision-title" className="py-[clamp(56px,8vw,120px)]">
      <div className="shell grid items-start gap-16 lg:grid-cols-2">
        <div>
          <span className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-black/[0.06]" aria-hidden="true">
            <Icon name="spark" className="size-4" />
          </span>
          <h2 id="h2-vision-title" data-blur-group className={`${H2} mt-6`}>
            <Words parts={["Support beyond", null, "data entry."]} />
          </h2>
          <ul className="mt-6 max-w-[26rem] space-y-4">
            {DIFFERENTIATORS.map((d) => (
              <li key={d.title} data-reveal className="text-[0.9375rem] leading-relaxed text-steel">
                <span className="font-medium text-royal-deep">{d.title}.</span> {d.body}
              </li>
            ))}
          </ul>
          <a href="#stories" className="group mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium">
            <span className="link-line">See the results</span>
            <Arrow />
          </a>

          <div data-pop-group className="relative mt-12 h-[200px] max-w-[380px]">
            {CLUSTER.map((c) => (
              <span key={c.name} className={`absolute ${c.pos}`}>
                <span data-pop className="block">
                  <IconBubble name={c.name} />
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Folder */}
        <div data-reveal className="rounded-[26px] bg-white p-3 shadow-[0_30px_60px_-40px_rgb(15_27_51/0.5)] ring-1 ring-black/[0.04] sm:p-4">
          <div role="tablist" aria-label="Sample work" className="relative h-[92px]">
            {TABS.map((t, i) => {
              const active = tab === i;
              return (
                <button
                  key={t.label}
                  role="tab"
                  id={`h2-tab-${i}`}
                  aria-selected={active}
                  aria-controls="h2-tabpanel"
                  onClick={() => setTab(i)}
                  className={`absolute inset-x-0 flex h-[60px] rounded-t-[18px] px-5 pt-3.5 text-[1.0625rem] font-medium tracking-[-0.02em] transition-all duration-500 ease-[var(--ease-out-quart)] ${
                    i === 0 ? "justify-start" : "justify-end"
                  } ${active ? "top-[32px] z-10 bg-royal-deep text-white" : "top-0 z-0 bg-silver-2 text-royal-deep hover:bg-royal-tint"}`}
                  style={{ clipPath: active ? FRONT_SHAPES[i] : BACK_SHAPES[i] }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            id="h2-tabpanel"
            aria-labelledby={`h2-tab-${tab}`}
            className="relative z-10 -mt-[2px] rounded-b-[18px] bg-royal-deep p-3 sm:p-4"
          >
            <ul className="sr-only">
              {TABS[tab].items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <div key={tab} className="panel-in-stagger grid grid-cols-3 gap-2.5 sm:gap-3">
              {TABS[tab].cards.map((v, i) => (
                <div key={`${v}-${i}`} className="aspect-[4/5]">
                  <FinCard variant={v} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
