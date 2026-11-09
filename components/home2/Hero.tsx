"use client";

import { useRef } from "react";
import { CONSULT_URL } from "@/lib/content";
import { EASE, gsap, useMotion } from "@/lib/motion";
import { Arrow } from "../ui";
import { FinCard, PILL_DARK, Tag, Words, type CardVariant } from "./kit";

/** Seven cards fanned from the centre, like a hand of cards laid on a table. */
const FAN: CardVariant[] = ["receipts", "invoice", "payroll", "pl", "recon", "cash", "llc"];
const SPREAD = 64; // % of a card's width between neighbours

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const cards = q("[data-fan-card]");
    const tl = gsap.timeline({
      delay: 0.15,
      defaults: { ease: EASE.out },
      onComplete: () => {
        el.classList.add("is-ready");
        gsap.set([...q("[data-w]"), ...q("[data-h2]"), ...q("[data-tag]"), ...cards], { clearProps: "all" });
      },
    });

    tl.fromTo(
      q("[data-w]"),
      { autoAlpha: 0, filter: "blur(14px)", yPercent: 40 },
      { autoAlpha: 1, filter: "blur(0px)", yPercent: 0, duration: 1.1, stagger: 0.07 },
    )
      // Cards start stacked in the middle, then deal out to their places.
      .fromTo(
        cards,
        {
          autoAlpha: 0,
          scale: 0.86,
          yPercent: 18,
          xPercent: (i) => -(i - 3) * SPREAD,
          rotation: (i) => -(i - 3) * 5,
        },
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
          xPercent: 0,
          rotation: 0,
          duration: 1.35,
          ease: EASE.expo,
          stagger: { each: 0.05, from: "center" },
        },
        0.35,
      )
      .fromTo(
        q("[data-tag]"),
        { autoAlpha: 0, scale: 0.5, y: 10 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(2.2)", stagger: 0.15 },
        1.1,
      )
      .fromTo(
        q('[data-h2="fade"]'),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 },
        0.9,
      );

    // The fan drifts up and opens slightly as the page scrolls away.
    gsap.to(q("[data-fan]"), {
      yPercent: -10,
      scale: 1.05,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });

    return () => tl.kill();
  });

  return (
    <section
      ref={root}
      data-h2-hero
      aria-labelledby="h2-hero-title"
      className="relative overflow-hidden pb-[clamp(48px,6vw,88px)] pt-[calc(76px+clamp(40px,6vw,88px))]"
    >
      <div className="shell text-center">
        <h1
          id="h2-hero-title"
          className="mx-auto max-w-[15ch] text-[clamp(2.5rem,1.1rem+5.2vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.05em] text-royal-deep"
        >
          <Words parts={["A clearer picture of", null, "your business finances."]} />
        </h1>
      </div>

      {/* Card fan */}
      <div
        data-fan
        className="relative mx-auto mt-[clamp(28px,4vw,56px)] h-[clamp(180px,24vw,330px)] w-full [perspective:1400px]"
      >
        <Tag tone="blue" className="left-[calc(50%-clamp(150px,22vw,330px))] top-[-6%]">
          Books caught up
        </Tag>
        <Tag tone="sage" tail="right" className="right-[calc(50%-clamp(150px,24vw,360px))] top-[2%]">
          Payroll · Paid
        </Tag>
        {FAN.map((v, idx) => {
          const i = idx - 3;
          return (
            <div
              key={v}
              className={`absolute left-1/2 top-0 aspect-[4/5] w-[clamp(118px,15vw,236px)] ${Math.abs(i) === 3 ? "max-sm:hidden" : ""}`}
              style={{
                transform: `translateX(calc(-50% + ${i * SPREAD}%)) translateY(${Math.abs(i) * 7}%) rotateY(${-i * 7}deg) rotate(${i * 3.5}deg)`,
                zIndex: 10 - Math.abs(i),
              }}
            >
              <div
                data-fan-card
                className="h-full w-full transition-[translate] duration-500 ease-[var(--ease-out-quart)] hover:-translate-y-4"
              >
                <FinCard variant={v} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="shell mt-[clamp(36px,5vw,64px)] text-center">
        <p data-h2="fade" className="mx-auto max-w-[34rem] text-[0.9375rem] leading-relaxed text-steel">
          Bookkeeping, payroll and financial reporting for small business owners in Houston and
          nationwide, so you can stay organized and finally understand your numbers.
        </p>
        <div data-h2="fade" className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href={CONSULT_URL} className={PILL_DARK}>
            Schedule a free consultation
            <Arrow />
          </a>
          <a href="#services" className="link-line py-1 text-[0.875rem] font-medium text-royal-deep">
            Explore services
          </a>
        </div>
        <p data-h2="fade" className="mt-6 text-[0.6875rem] text-steel/80">
          Cards are illustrative. Figures do not represent client data.
        </p>
      </div>
    </section>
  );
}
