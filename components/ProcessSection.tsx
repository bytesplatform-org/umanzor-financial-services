"use client";

import { useRef } from "react";
import { CONSULT_URL, PROCESS } from "@/lib/content";
import { EASE, gsap, revealOnScroll, useMotion } from "@/lib/motion";
import { Arrow, Index, MaskedLines } from "./ui";

export default function ProcessSection() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (el) => {
    revealOnScroll(el);
    // The rail fills as the reader moves through the steps: progress, not decoration.
    const rail = el.querySelector("[data-rail-fill]");
    const steps = el.querySelector("[data-process-steps]");
    if (rail && steps) {
      gsap.fromTo(
        rail,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: steps, start: "top 80%", end: "bottom 60%", scrub: 0.5 } },
      );
    }
    gsap.utils.toArray<HTMLElement>("[data-step]", el).forEach((s, i) => {
      gsap.from(s, {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.out,
        delay: i * 0.12,
        scrollTrigger: { trigger: steps, start: "top 78%", once: true },
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="process-title" className="relative border-t border-[var(--line)] bg-paper py-[clamp(96px,11vw,168px)]">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="process-title" className="t-h1 lg:col-span-7" data-mask-group>
            <MaskedLines lines={["Getting organized starts", <em key="e">with a conversation.</em>]} />
          </h2>
          <div data-reveal className="flex flex-col items-start gap-6 self-end lg:col-span-4 lg:col-start-9">
            <p className="text-[0.9375rem] leading-relaxed text-slate-2">
              No software to learn and no long onboarding. A short call, a clear recommendation, and then the work begins.
            </p>
            <a href={CONSULT_URL} className="group inline-flex items-center gap-3 text-[0.9375rem] font-medium">
              <span className="link-line">Book the first step</span>
              <Arrow />
            </a>
          </div>
        </div>

        <div data-process-steps className="relative mt-16 lg:mt-24">
          {/* Rail */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-[var(--line-strong)] md:block">
            <span data-rail-fill className="absolute inset-0 origin-left bg-ink" />
          </div>

          <ol className="grid md:grid-cols-3 md:gap-x-8">
            {PROCESS.map((p, i) => (
              <li
                key={p.title}
                data-step
                className="relative border-t border-[var(--line-strong)] py-8 md:border-t-0 md:pt-10 lg:pr-8"
              >
                <span aria-hidden="true" className="absolute left-0 top-[-3px] hidden h-[7px] w-px bg-ink md:block" />
                <div className="flex items-baseline justify-between md:block">
                  <Index n={i + 1} className="font-display font-semibold text-[3.25rem] leading-none tracking-[-0.02em] text-ink md:text-[4.5rem]" />
                  <span className="t-meta text-slate md:mt-3 md:block">Step {i + 1} of 3</span>
                </div>
                <h3 className="t-h3 mt-6 md:mt-8">{p.title}</h3>
                <p className="mt-3 max-w-[22rem] text-[0.9375rem] leading-relaxed text-slate-2">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
