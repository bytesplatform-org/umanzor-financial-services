"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CONSULT_URL, SERVICES, type Service } from "@/lib/content";
import { revealOnScroll, useMotion } from "@/lib/motion";
import { Arrow, Index, MaskedLines } from "./ui";

function ServiceDetail({ service, n }: { service: Service; n: number }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
        <span className="t-meta text-slate">
          Service <span className="num text-ink">{String(n).padStart(2, "0")}</span> of 05
        </span>
        <span className="t-label text-gold-deep">{service.name}</span>
      </div>
      <h3 className="t-h2 mt-8 max-w-[30rem]">{service.headline}</h3>
      <p className="mt-5 max-w-[34rem] text-[1rem] leading-relaxed text-slate-2">{service.description}</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="t-label text-slate">{service.includesLabel}</p>
          <ul className="mt-3">
            {service.includes.map((item) => (
              <li key={item} className="flex items-baseline gap-3 border-b border-[var(--line)] py-2.5 text-[0.9375rem] last:border-b-0">
                <span aria-hidden="true" className="size-[5px] shrink-0 translate-y-[-2px] rotate-45 bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <p className="t-label text-slate">Best for</p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed">{service.bestFor}</p>
          <a href={CONSULT_URL} className="btn btn-ink group mt-8 self-start md:mt-auto">
            Discuss this service
            <Arrow />
          </a>
        </div>
      </div>
    </>
  );
}

export default function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(1);
  const [openMobile, setOpenMobile] = useState<number | null>(1);
  const hoverTimer = useRef<number>(0);

  useMotion(root, (el) => revealOnScroll(el));

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = SERVICES.length - 1;
    const next =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // Hover previews with a short intent delay so a pass-through does not flicker the panel.
  const onHover = (i: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActive(i), 90);
  };

  const current = SERVICES[active];

  return (
    <section
      id="services"
      ref={root}
      tabIndex={-1}
      aria-labelledby="services-title"
      className="relative border-t border-[var(--line)] bg-paper pb-[clamp(96px,12vw,176px)] pt-[clamp(80px,9vw,140px)] outline-none"
    >
      <div className="shell">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 id="services-title" className="t-h1 lg:col-span-8" data-mask-group>
            <MaskedLines lines={["Financial support that", <em key="e">moves with your business.</em>]} />
          </h2>
          <p data-reveal className="max-w-[24rem] text-[0.9375rem] leading-relaxed text-slate-2 lg:col-span-4 lg:justify-self-end">
            Five packages, from forming your company to running payroll. Pricing reflects your activity and the condition of your
            books, and we recommend the right fit during your free consultation.
          </p>
        </header>

        {/* Desktop: index + detail panel */}
        <div className="mt-16 hidden gap-x-8 lg:mt-20 lg:grid lg:grid-cols-12" onMouseLeave={() => window.clearTimeout(hoverTimer.current)}>
          <div role="tablist" aria-orientation="vertical" aria-label="Services" className="col-span-5 border-t border-[var(--line-strong)]" data-reveal>
            {SERVICES.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.slug}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  role="tab"
                  id={`service-tab-${s.slug}`}
                  aria-selected={selected}
                  aria-controls="service-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => onHover(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className="group relative grid w-full grid-cols-[3.25rem_1fr_auto] items-center border-b border-[var(--line-strong)] py-6 text-left"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-full origin-left bg-card transition-transform duration-500 ease-[var(--ease-out-quart)] ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-[2px] bg-gold transition-opacity duration-500 ${selected ? "opacity-100" : "opacity-0"}`}
                  />
                  <Index
                    n={i + 1}
                    className={`t-meta relative pl-4 transition-colors duration-300 ${selected ? "text-gold-deep" : "text-slate"}`}
                  />
                  <span
                    className={`t-h3 relative transition-[color,transform] duration-500 ease-[var(--ease-out-quart)] ${
                      selected ? "translate-x-1.5 text-ink" : "text-slate-2 group-hover:text-ink"
                    }`}
                  >
                    {s.name}
                  </span>
                  <Arrow
                    className={`relative mr-4 transition-opacity duration-300 ${selected ? "opacity-100 text-gold-deep" : "opacity-0 group-hover:opacity-50"}`}
                  />
                </button>
              );
            })}
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${current.slug}`}
            tabIndex={0}
            className="col-span-7 col-start-6 min-h-[660px] border border-[var(--line)] bg-card p-10 xl:p-12"
            data-reveal
            data-reveal-delay="0.1"
          >
            <div key={current.slug} className="panel-in flex h-full flex-col">
              <ServiceDetail service={current} n={active + 1} />
            </div>
          </div>
        </div>

        {/* Mobile and tablet: accordion */}
        <ul className="mt-12 border-t border-[var(--line-strong)] lg:hidden">
          {SERVICES.map((s, i) => {
            const isOpen = openMobile === i;
            return (
              <li key={s.slug} className="border-b border-[var(--line-strong)]">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`service-acc-${s.slug}`}
                    onClick={() => setOpenMobile(isOpen ? null : i)}
                    className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-2 py-5 text-left"
                  >
                    <Index n={i + 1} className={`t-meta ${isOpen ? "text-gold-deep" : "text-slate"}`} />
                    <span className="text-[1.125rem] font-medium leading-snug tracking-[-0.015em]">{s.name}</span>
                    <span aria-hidden="true" className="relative size-3.5">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                      <span
                        className={`absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`service-acc-${s.slug}`}
                  role="region"
                  aria-label={s.name}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-quart)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                  inert={!isOpen}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pl-0 sm:pl-[2.5rem]">
                      <p className="font-serif text-[1.65rem] leading-[1.1]">{s.headline}</p>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-2">{s.description}</p>
                      <p className="t-label mt-6 text-slate">{s.includesLabel}</p>
                      <ul className="mt-2">
                        {s.includes.map((item) => (
                          <li key={item} className="flex items-baseline gap-3 border-b border-[var(--line)] py-2 text-[0.9375rem] last:border-b-0">
                            <span aria-hidden="true" className="size-[5px] shrink-0 translate-y-[-2px] rotate-45 bg-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-[0.875rem] leading-relaxed text-slate-2">
                        <span className="font-medium text-ink">Best for: </span>
                        {s.bestFor}
                      </p>
                      <a href={CONSULT_URL} className="btn btn-ink group mt-6 w-full sm:w-auto">
                        Discuss this service
                        <Arrow />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
