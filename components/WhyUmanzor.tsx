"use client";

import { useRef } from "react";
import { DIFFERENTIATORS, FOUNDER } from "@/lib/content";
import { revealOnScroll, useMotion } from "@/lib/motion";
import { Index, MaskedLines } from "./ui";

export default function WhyUmanzor() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => revealOnScroll(el));

  return (
    <section
      id="about"
      ref={root}
      tabIndex={-1}
      aria-labelledby="about-title"
      className="relative bg-paper py-[clamp(96px,12vw,184px)] outline-none"
    >
      <div className="shell">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-8">
          {/* Editorial statement */}
          <div className="lg:col-span-7">
            <h2 id="about-title" className="t-h1" data-mask-group>
              <MaskedLines lines={["Professional financial support.", <em key="e">A more personal approach.</em>]} />
            </h2>
            <p data-reveal className="mt-10 max-w-[36rem] font-display text-[clamp(1.4rem,1.1rem+0.9vw,1.9rem)] leading-[1.3] text-slate-2">
              Umanzor Financial Services was founded with a simple goal: to help business owners better understand their
              finances and spend less time worrying about their books.
            </p>
          </div>

          {/* Founder record */}
          <aside
            data-reveal
            data-reveal-delay="0.1"
            aria-label="About the founder"
            className="self-end border-t border-ink lg:col-span-4 lg:col-start-9"
          >
            <div className="flex items-center gap-4 py-6">
              <span
                aria-hidden="true"
                className="grid size-14 shrink-0 place-items-center bg-ink font-display font-semibold text-[1.5rem] text-gold-soft"
              >
                AU
              </span>
              <div>
                <p className="text-[1.0625rem] font-medium tracking-[-0.01em]">{FOUNDER.name}</p>
                <p className="text-[0.875rem] text-slate">{FOUNDER.title}</p>
              </div>
            </div>
            <dl className="text-[0.875rem]">
              {FOUNDER.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-[var(--line)] py-3.5">
                  <dt className="t-label pt-[3px] text-slate">{f.label}</dt>
                  <dd className="leading-relaxed">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* Differentiators: three ledger entries, offset to the content column */}
        <div className="mt-20 grid lg:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <p data-reveal className="t-label mb-8 text-slate lg:col-span-3 lg:mb-0 lg:pt-8">
            What working with us looks like
          </p>
          <ol className="lg:col-span-9">
            {DIFFERENTIATORS.map((d, i) => (
              <li key={d.title} className="relative">
                <span data-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--line-strong)]" />
                <div data-reveal className="grid gap-x-8 gap-y-3 py-8 md:grid-cols-[4rem_1fr_1.3fr]">
                  <Index n={i + 1} className="font-display font-semibold text-[2rem] leading-none text-gold-deep" />
                  <h3 className="t-h3">{d.title}</h3>
                  <p className="text-[1rem] leading-relaxed text-slate-2">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
