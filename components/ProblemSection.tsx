"use client";

import { useRef } from "react";
import { PROBLEMS } from "@/lib/content";
import { EASE, gsap, revealOnScroll, useMotion } from "@/lib/motion";
import { Index, MaskedLines } from "./ui";

export default function ProblemSection() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (el) => {
    revealOnScroll(el);
    gsap.utils.toArray<HTMLElement>("[data-row]", el).forEach((row) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 86%", once: true } });
      tl.from(row.querySelector("[data-row-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1.1, ease: EASE.expo })
        .from(row.querySelector("[data-row-problem]"), { x: -18, autoAlpha: 0, duration: 0.8, ease: EASE.out }, 0.1)
        .from(row.querySelector("[data-row-outcome]"), { x: 18, autoAlpha: 0, duration: 0.8, ease: EASE.out }, 0.25);
    });
  });

  return (
    <section ref={root} aria-labelledby="problem-title" className="relative bg-paper py-[clamp(96px,12vw,176px)]">
      <div className="shell grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <header className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="problem-title" className="t-h1" data-mask-group>
              <MaskedLines lines={["You run the business.", <em key="e">We&rsquo;ll make sense</em>, <em key="f">of the numbers.</em>]} />
            </h2>
            <p data-reveal className="t-lead mt-8 max-w-[26rem] text-slate-2">
              Running your business already takes enough of your time. Your bookkeeping should not be another source of stress.
            </p>
          </div>
        </header>

        <div className="lg:col-span-7">
          {/* Column heads: reads like a ledger */}
          <div
            data-reveal
            className="t-label hidden grid-cols-[3rem_1fr_1fr] gap-6 pb-4 text-slate md:grid"
            aria-hidden="true"
          >
            <span>No.</span>
            <span>What you are dealing with</span>
            <span>What changes</span>
          </div>

          <ol>
            {PROBLEMS.map((p, i) => (
              <li key={p.problem} data-row className="relative">
                <span data-row-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--line-strong)]" />
                <div className="grid gap-x-6 gap-y-4 py-7 md:grid-cols-[3rem_1fr_1fr] md:py-8">
                  <Index n={i + 1} className="t-meta pt-1.5 text-gold-deep" />
                  <div data-row-problem>
                    <h3 className="text-[1.125rem] font-medium leading-snug tracking-[-0.015em]">{p.problem}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{p.detail}</p>
                  </div>
                  <p data-row-outcome className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink md:pt-0.5">
                    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="mt-1 shrink-0 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M2 8h11M9 4l4 4-4 4" />
                    </svg>
                    <span>
                      <span className="sr-only">Outcome: </span>
                      {p.outcome}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div data-rule className="h-px bg-[var(--line-strong)]" aria-hidden="true" />

          <p data-reveal className="mt-10 max-w-[34rem] text-[0.9375rem] leading-relaxed text-slate-2">
            <span className="font-medium text-ink">You do not have to figure it out alone.</span> We help business owners get their
            books organized, understand their numbers, and build a financial process that is easier to maintain.
          </p>
        </div>
      </div>
    </section>
  );
}
