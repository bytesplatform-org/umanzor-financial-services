"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, revealOnScroll, ScrollTrigger, useMotion } from "@/lib/motion";
import { Index, MaskedLines } from "./ui";

/* ------------------------------------------------------------------
   Illustrative quarter for "Sample Services Co." Every total ties out:
   revenue 142,650 − expenses 105,430 = net income 37,220
   cash 46,180 + 136,900 − 109,560 − 12,000 = 61,520
------------------------------------------------------------------- */
type Row = { label: string; value: string; g: string; em?: boolean; total?: boolean; indent?: boolean };

const INCOME: Row[] = [
  { label: "Service revenue", value: "128,400", g: "pl", indent: true },
  { label: "Product sales", value: "14,250", g: "pl", indent: true },
  { label: "Total revenue", value: "142,650", g: "pl", em: true, total: true },
  { label: "Payroll and contractors", value: "58,300", g: "pl", indent: true },
  { label: "Materials and supplies", value: "21,480", g: "pl", indent: true },
  { label: "Rent and utilities", value: "9,600", g: "pl", indent: true },
  { label: "Vehicle and fuel", value: "6,240", g: "pl", indent: true },
  { label: "Other operating", value: "9,810", g: "pl", indent: true },
  { label: "Total expenses", value: "105,430", g: "pl", em: true, total: true },
];
const NET: Row = { label: "Net income", value: "37,220", g: "pl key", em: true, total: true };

const CASH: Row[] = [
  { label: "Beginning cash", value: "46,180", g: "cash" },
  { label: "Collected from customers", value: "136,900", g: "cash", em: true },
  { label: "Paid to vendors and payroll", value: "(109,560)", g: "cash", em: true },
  { label: "Owner distributions", value: "(12,000)", g: "cash", em: true },
  { label: "Ending cash", value: "61,520", g: "cash key", em: true, total: true },
];
const RECEIVABLES: Row[] = [
  { label: "Outstanding receivables", value: "18,340", g: "cash key" },
  { label: "Over 30 days", value: "4,120", g: "key", em: true },
];

const MONTHS = [
  { m: "Jul", rev: 45900, exp: 34800 },
  { m: "Aug", rev: 47100, exp: 35260 },
  { m: "Sep", rev: 49650, exp: 35370 },
];

const KEY = [
  { label: "Net margin", value: "26.1%" },
  { label: "Revenue, Jul to Sep", value: "+8.2%" },
  { label: "Cash on hand", value: "$61,520" },
];

const STEPS = [
  {
    title: "Understand your income and expenses.",
    body: "Every transaction categorized and every account reconciled, so your Profit and Loss reflects what actually happened. You see what came in, what went out, and what was left.",
    ref: "Profit and Loss Statement",
    note: "Revenue grew 8.2% from July to September while expenses held near $35,000 a month.",
  },
  {
    title: "See where your cash is going.",
    body: "Profit and cash are not the same thing. A Statement of Cash Flows shows what you collected, what you paid, and what you took out, so your bank balance stops being a surprise.",
    ref: "Statement of Cash Flows",
    note: "Cash grew $15,340 over the quarter, after $12,000 in owner distributions.",
  },
  {
    title: "Make decisions with confidence.",
    body: "With clean books and monthly reports, the figures that matter are easy to find: your margin, your cash on hand, and who still owes you. That is where better decisions start.",
    ref: "Executive financial summary",
    note: "$4,120 in receivables is past 30 days. Worth a follow-up before planning next quarter.",
  },
];

function Line({ row }: { row: Row }) {
  return (
    <div
      data-g={row.g}
      data-em={row.em ? "" : undefined}
      className={`-mx-2 flex items-baseline justify-between gap-3 px-2 py-[3px] xl:py-[4px] ${
        row.total ? "border-t border-[var(--line-strong)] font-medium" : ""
      }`}
    >
      <span className={`${row.indent ? "text-slate-2" : ""} truncate`}>{row.label}</span>
      <span data-figure className="num shrink-0">
        {row.value}
      </span>
    </div>
  );
}

function Report({ step }: { step: number }) {
  return (
    <div
      className="report relative bg-paper px-6 py-5 text-[0.75rem] text-ink shadow-[0_50px_100px_-50px_rgb(0_0_0/0.7)] xl:p-8 xl:text-[0.8125rem]"
      data-step={step}
      aria-label="Illustrative quarterly financial report"
      role="img"
    >
      <div className="flex items-start justify-between border-b border-[var(--line-strong)] pb-4">
        <div>
          <p className="font-display font-semibold text-[1.5rem] leading-none xl:text-[1.75rem]">Quarterly financial report</p>
          <p className="t-meta mt-2 text-slate">Sample Services Co. · Q3 2026 · July to September</p>
        </div>
        <p className="t-meta text-right text-slate">
          USD
          <br />
          Illustrative
        </p>
      </div>

      {/* Monthly revenue vs expenses */}
      <div data-g="pl" className="-mx-2 mt-3 grid grid-cols-[auto_1fr] gap-x-6 px-2 py-2">
        <div className="flex flex-col justify-between">
          <p className="t-label text-slate">Monthly</p>
          <div className="space-y-1 text-[0.6875rem] text-slate">
            <p className="flex items-center gap-1.5">
              <span className="size-2 bg-ink" aria-hidden="true" /> Revenue
            </p>
            <p className="flex items-center gap-1.5">
              <span className="size-2 bg-mist" aria-hidden="true" /> Expenses
            </p>
          </div>
        </div>
        <div>
          <div className="grid h-[64px] grid-cols-3 items-end gap-8 border-b border-[var(--line-strong)]">
            {MONTHS.map((d) => (
              <div key={d.m} className="flex h-full items-end justify-center gap-1">
                <span className="chart-bar w-full max-w-7 bg-ink" style={{ height: `${(d.rev / 52000) * 100}%` }} />
                <span className="chart-bar w-full max-w-7 bg-mist" style={{ height: `${(d.exp / 52000) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-8">
            {MONTHS.map((d) => (
              <span key={d.m} className="t-meta text-center text-slate">
                {d.m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-8">
        <div>
          <p data-g="pl" className="t-label mb-1.5 text-slate">Income statement</p>
          {INCOME.map((r) => (
            <Line key={r.label} row={r} />
          ))}
          <div className="mt-1 border-t-2 border-double border-ink/40">
            <Line row={NET} />
          </div>
        </div>
        <div>
          <p data-g="cash" className="t-label mb-1.5 text-slate">Cash flow</p>
          {CASH.map((r) => (
            <Line key={r.label} row={r} />
          ))}
          <p data-g="cash key" className="t-label mb-1.5 mt-5 text-slate">Receivables</p>
          {RECEIVABLES.map((r) => (
            <Line key={r.label} row={r} />
          ))}
        </div>
      </div>

      {/* Summary strip */}
      <div className="mt-4 grid grid-cols-3 border-t border-[var(--line-strong)]">
        {KEY.map((k, i) => (
          <div key={k.label} data-g="key" data-em="" className={`px-3 pb-1 pt-3 ${i > 0 ? "border-l border-[var(--line)]" : "-ml-0"}`}>
            <p className="text-[0.6875rem] text-slate">{k.label}</p>
            <p data-figure className="num mt-1 font-display font-semibold text-[1.35rem] leading-none xl:text-[1.6rem]">
              {k.value}
            </p>
          </div>
        ))}
      </div>

      {/* Margin notes, one per step */}
      <div className="relative mt-4 h-[2.75rem]">
        {STEPS.map((s, i) => (
          <p key={i} data-note={i + 1} className="note absolute inset-0 flex items-center gap-3 bg-ink px-4 text-[0.75rem] leading-snug text-paper">
            <span className="t-meta shrink-0 pt-px text-gold-soft">Note {i + 1}</span>
            {s.note}
          </p>
        ))}
      </div>
    </div>
  );
}

/** Mobile: a focused excerpt of the report per step. */
function Excerpt({ i }: { i: number }) {
  const rows =
    i === 0
      ? [INCOME[2], INCOME[8], NET]
      : i === 1
        ? CASH
        : [...KEY.map((k) => ({ label: k.label, value: k.value, g: "key" })), RECEIVABLES[1]];
  return (
    <div className="mt-6 bg-paper p-5 text-[0.8125rem] text-ink">
      <p className="t-meta mb-2 text-slate">Sample Services Co. · Q3 2026 · Illustrative</p>
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between border-b border-[var(--line)] py-2 last:border-b-0">
          <span className="text-slate-2">{r.label}</span>
          <span className="num font-medium">{r.value}</span>
        </div>
      ))}
      <p className="mt-3 border-t border-[var(--line-strong)] pt-3 text-[0.75rem] leading-snug text-slate-2">{STEPS[i].note}</p>
    </div>
  );
}

export default function FinancialClarityStory() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  // State changes are not motion: they run for every visitor (reduced motion only removes the transitions).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const steps = gsap.utils.toArray<HTMLElement>("[data-step-trigger]", el);
    const triggers = steps.map((s, i) =>
      ScrollTrigger.create({
        trigger: s,
        start: "top 62%",
        end: "bottom 62%",
        onEnter: () => setStep(i + 1),
        onEnterBack: () => setStep(i + 1),
        onLeaveBack: i === 0 ? () => setStep(0) : undefined,
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  useMotion(root, (el) => {
    revealOnScroll(el);
    const progress = el.querySelector("[data-progress]");
    if (progress) {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el.querySelector("[data-steps]"), start: "top 62%", end: "bottom 62%", scrub: 0.4 },
        },
      );
    }
  });

  return (
    <section
      ref={root}
      aria-labelledby="clarity-title"
      className="relative bg-ink pb-[clamp(80px,10vw,160px)] pt-[clamp(96px,12vw,176px)] text-paper"
    >
      <div className="shell">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="clarity-title" className="t-h1 lg:col-span-7" data-mask-group>
            <MaskedLines lines={["Numbers are useful.", <em key="e" className="text-gold-soft">Clarity changes everything.</em>]} />
          </h2>
          <p data-reveal className="max-w-[26rem] self-end text-[0.9375rem] leading-relaxed text-paper/65 lg:col-span-4 lg:col-start-9">
            Here is what clear financial information can look like for a small service business. Scroll through one quarter,
            read the way we would walk you through it.
          </p>
        </header>

        <div className="mt-16 grid lg:mt-8 lg:grid-cols-12 lg:gap-x-8">
          {/* Narrative */}
          <div data-steps className="relative lg:col-span-5">
            <div aria-hidden="true" className="absolute bottom-[25vh] left-0 top-[25vh] hidden w-px bg-[var(--line-dark)] lg:block">
              <span data-progress className="absolute inset-0 origin-top bg-gold" />
            </div>
            <ol>
              {STEPS.map((s, i) => {
                const isActive = step === i + 1;
                return (
                  <li
                    key={s.title}
                    data-step-trigger
                    className="border-t border-[var(--line-dark)] py-12 first:border-t-0 lg:flex lg:min-h-[82vh] lg:items-center lg:last:min-h-[64vh] lg:border-t-0 lg:py-0 lg:pl-12"
                  >
                    <div
                      className={`transition-opacity duration-700 ${
                        isActive ? "lg:opacity-100" : "lg:opacity-35"
                      }`}
                    >
                      <p className="t-meta text-gold-soft">
                        <Index n={i + 1} /> <span className="text-paper/40">/ 03</span>
                      </p>
                      <h3 className="mt-5 font-display font-semibold text-[2rem] leading-[1.05] tracking-[-0.01em] xl:text-[2.5rem]">{s.title}</h3>
                      <p className="mt-5 max-w-[28rem] text-[1rem] leading-relaxed text-paper/70">{s.body}</p>
                      <p className="t-meta mt-6 text-paper/45">In the report: {s.ref}</p>
                      <div className="lg:hidden">
                        <Excerpt i={i} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Sticky report */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-[max(84px,calc(50vh-330px))] py-6">
              <Report step={step} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
