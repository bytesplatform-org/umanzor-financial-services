"use client";

import { useRef } from "react";
import { CONSULT_URL, CONTACT } from "@/lib/content";
import { EASE, gsap, useMotion } from "@/lib/motion";
import FinancialOverviewVisual from "./FinancialOverviewVisual";
import { Arrow, MaskedLines } from "./ui";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({
      delay: 0.35,
      defaults: { ease: EASE.out },
      onComplete: () => {
        el.classList.add("is-ready");
        gsap.set(q("[data-hero]"), { clearProps: "transform,opacity,visibility" });
      },
    });

    tl.fromTo(q('[data-hero="line"]'), { yPercent: 108 }, { yPercent: 0, duration: 1.25, ease: EASE.expo, stagger: 0.11 })
      .fromTo(q('[data-hero="fade"][data-seq="copy"]'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.75")
      .fromTo(q('[data-hero="fade"][data-seq="cta"]'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, "-=0.55")
      .fromTo(q('[data-hero="panel"]'), { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 1.3, ease: EASE.expo }, 0.55)
      .fromTo(q('[data-hero="row"]'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.045 }, 0.95)
      .fromTo(q('[data-hero="bar"]'), { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: EASE.expo, stagger: 0.035 }, 1.15)
      .fromTo(q('[data-hero="card"]'), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1, ease: EASE.expo, stagger: 0.14 }, 1.35)
      .fromTo(q('[data-hero="fade"]:not([data-seq])'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.8);

    return () => tl.kill();
  });

  return (
    <section
      id="top"
      ref={root}
      data-hero-root
      tabIndex={-1}
      className="relative isolate overflow-hidden bg-ink text-paper outline-none"
    >
      {/* Ledger column guides: the page grid made visible, very faintly */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="shell grid h-full grid-cols-4 lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`border-l border-paper/[0.035] ${i >= 4 ? "max-lg:hidden" : ""}`} />
          ))}
        </div>
      </div>

      <div className="shell grid items-center gap-x-[clamp(32px,4vw,72px)] gap-y-16 pb-20 pt-[calc(var(--header-h)+56px)] lg:min-h-[min(100svh,1000px)] lg:grid-cols-[55fr_45fr] lg:pb-24 lg:pt-[calc(var(--header-h)+40px)]">
        <div className="max-w-[44rem]">
          <p data-hero="fade" data-seq="copy" className="t-label mb-8 flex items-center gap-3 text-paper/60 lg:mb-10">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {CONTACT.location}
            <span aria-hidden="true" className="text-paper/30 max-sm:hidden">|</span>
            <span className="normal-case tracking-normal text-[0.8125rem] text-paper/50 max-sm:hidden">{CONTACT.reach}</span>
          </p>

          <h1 className="t-display lg:text-[min(6.1vw,6rem)]">
            <MaskedLines
              hero
              lines={[
                "Your business",
                "deserves a clearer",
                <em key="em" className="text-gold-soft">
                  financial picture.
                </em>,
              ]}
            />
          </h1>

          <p data-hero="fade" data-seq="copy" className="t-lead mt-8 max-w-[34rem] text-paper/70 lg:mt-10">
            From everyday bookkeeping to payroll and financial reporting, we help you stay organized, understand your numbers,
            and move your business forward.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a data-hero="fade" data-seq="cta" href={CONSULT_URL} className="btn btn-gold group">
              Schedule a Free Consultation
              <Arrow />
            </a>
            <a data-hero="fade" data-seq="cta" href="#services" className="btn btn-ghost-dark group">
              Explore Our Services
              <Arrow className="rotate-90" />
            </a>
          </div>
          <p data-hero="fade" data-seq="cta" className="mt-6 text-[0.8125rem] text-paper/50">
            The first consultation is free. Or call{" "}
            <a href={CONTACT.phoneHref} className="link-line num text-paper/80">
              {CONTACT.phoneDisplay}
            </a>
          </p>
        </div>

        <FinancialOverviewVisual />
      </div>
    </section>
  );
}
