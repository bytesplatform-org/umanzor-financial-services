"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CASE_STUDIES, CONSULT_URL } from "@/lib/content";
import { revealOnScroll, useMotion } from "@/lib/motion";
import { Arrow, Index, MaskedLines } from "./ui";

export default function CaseStudies() {
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  useMotion(root, (el) => revealOnScroll(el));

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = CASE_STUDIES.length - 1;
    const next =
      e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const c = CASE_STUDIES[active];

  return (
    <section
      id="success-stories"
      ref={root}
      tabIndex={-1}
      aria-labelledby="cases-title"
      className="relative bg-paper-2 py-[clamp(96px,11vw,168px)] outline-none"
    >
      <div className="shell">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 id="cases-title" className="t-h1 lg:col-span-7" data-mask-group>
            <MaskedLines lines={["Real businesses.", <em key="e">Documented results.</em>]} />
          </h2>
          <p data-reveal className="max-w-[26rem] text-[0.9375rem] leading-relaxed text-slate-2 lg:col-span-4 lg:col-start-9">
            How we have helped business owners get organized, gain financial clarity, and spend less time managing the books.
          </p>
        </header>

        {/* Selector */}
        <div role="tablist" aria-label="Client success stories" className="mt-14 grid grid-cols-1 sm:grid-cols-3 lg:mt-20" data-reveal>
          {CASE_STUDIES.map((cs, i) => {
            const selected = i === active;
            return (
              <button
                key={cs.id}
                ref={(n) => {
                  tabs.current[i] = n;
                }}
                role="tab"
                id={`case-tab-${cs.id}`}
                aria-selected={selected}
                aria-controls="case-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group relative border-t border-[var(--line-strong)] py-5 pr-6 text-left max-sm:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -top-px h-[2px] origin-left bg-ink transition-transform duration-700 ease-[var(--ease-out-expo)] ${
                    selected ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <span className="flex items-baseline gap-3">
                  <Index n={i + 1} className={`t-meta ${selected ? "text-gold-deep" : "text-slate"}`} />
                  <span
                    className={`text-[1.0625rem] font-medium tracking-[-0.015em] transition-colors duration-300 ${
                      selected ? "text-ink" : "text-slate-2 group-hover:text-ink"
                    }`}
                  >
                    {cs.client}
                  </span>
                </span>
                <span className="mt-1 block pl-[calc(1.6rem+0.75rem)] text-[0.8125rem] text-slate">{cs.sector}</span>
              </button>
            );
          })}
        </div>

        {/* Case file */}
        <article
          id="case-panel"
          role="tabpanel"
          aria-labelledby={`case-tab-${c.id}`}
          tabIndex={0}
          className="mt-2 bg-card"
          data-reveal
          data-reveal-delay="0.1"
        >
          <div key={c.id} className="panel-in-stagger grid lg:grid-cols-12">
            {/* Key figure */}
            <div className="flex flex-col border-b border-[var(--line)] p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r xl:p-12">
              <h3 className="font-serif text-[2.25rem] leading-[1.05] tracking-[-0.01em] sm:text-[2.75rem]">{c.client}</h3>
              <p className="mt-2 text-[0.875rem] text-slate">{c.sector}</p>
              <div className="mt-12 border-t border-[var(--line-strong)] pt-8 lg:mt-16">
                <p className="num font-serif text-[clamp(4rem,2.5rem+5vw,7.5rem)] leading-[0.9] tracking-[-0.03em]">{c.figure}</p>
                <p className="mt-4 max-w-[18rem] text-[0.9375rem] leading-relaxed text-slate-2">{c.figureCaption}</p>
              </div>
              <dl className="mt-10 text-[0.8125rem] lg:mt-auto lg:pt-10">
                <div className="border-t border-[var(--line)] pt-3">
                  <dt className="t-label text-slate">Service</dt>
                  <dd className="mt-1.5 font-medium text-gold-deep">{c.service}</dd>
                </div>
              </dl>
            </div>

            {/* Record */}
            <div className="p-7 sm:p-10 lg:col-span-7 xl:p-12">
              <dl className="text-[0.9375rem] leading-relaxed">
                <div className="grid gap-2 border-b border-[var(--line)] pb-6 md:grid-cols-[9rem_1fr] md:gap-6">
                  <dt className="t-label pt-1 text-slate">The situation</dt>
                  <dd>{c.situation}</dd>
                </div>
                <div className="grid gap-2 border-b border-[var(--line)] py-6 md:grid-cols-[9rem_1fr] md:gap-6">
                  <dt className="t-label pt-1 text-slate">What we did</dt>
                  <dd>
                    <ul className="space-y-2">
                      {c.work.map((w) => (
                        <li key={w} className="flex items-baseline gap-3">
                          <span aria-hidden="true" className="size-[5px] shrink-0 translate-y-[-2px] rotate-45 bg-gold" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="grid gap-2 pt-6 md:grid-cols-[9rem_1fr] md:gap-6">
                  <dt className="t-label pt-1 text-slate">Documented outcome</dt>
                  <dd className="font-medium">{c.outcome}</dd>
                </div>
              </dl>

              {c.quote && (
                <figure className="mt-8 border-l-2 border-gold bg-paper px-6 py-5">
                  <blockquote className="font-serif text-[1.25rem] leading-[1.35] text-ink">
                    <p>&ldquo;{c.quote.text}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-4 text-[0.8125rem] text-slate">
                    <span className="font-medium text-ink">{c.quote.name}</span>, {c.quote.role}
                  </figcaption>
                </figure>
              )}
            </div>
          </div>
        </article>

        <div data-reveal className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-[30rem] text-[0.875rem] text-slate">
            Outcomes are reported as documented by Umanzor Financial Services for each client engagement.
          </p>
          <a href={CONSULT_URL} className="group inline-flex items-center gap-3 text-[0.9375rem] font-medium">
            <span className="link-line">Talk to us about your books</span>
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
