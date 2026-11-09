"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CONSULT_URL, CONTACT } from "@/lib/content";
import { EASE, gsap, useMotion } from "@/lib/motion";
import logo from "@/public/brand/umanzor-logo.png";
import { Arrow, MaskedLines } from "./ui";

/**
 * Light hero variant: headline and facts on the left, a collage of rounded
 * colour tiles on the right. Each tile frames an illustrative financial card
 * where a photograph would usually sit. All figures are sample data.
 */

const NAV_LINKS = [
  { label: "Services", href: "/home-1#services" },
  { label: "About", href: "/home-1#about" },
  { label: "Success Stories", href: "/home-1#success-stories" },
];

const BARS = [41300, 43750, 45900, 47100, 49650, 48620];

// Documented facts only (see lib/content.ts).
const FACTS = [
  { value: "1,000+", label: "Transactions organized" },
  { value: "5", label: "Core services" },
  { value: "Free", label: "First consultation" },
];

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      width="11"
      height="11"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

function Sparkle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

function Rings({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="10" cy="10" r="8" />
      <circle cx="22" cy="10" r="8" />
      <circle cx="34" cy="10" r="8" />
    </svg>
  );
}

const tile =
  "relative rounded-[28px] p-3 sm:p-4 transition-transform duration-700 ease-[var(--ease-out-quart)] hover:-translate-y-1";
const inner =
  "rounded-[18px] bg-white p-4 text-royal-deep shadow-[0_14px_32px_-22px_rgb(15_27_51/0.35)] sm:p-5";

export default function HeroLight() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({
      delay: 0.2,
      defaults: { ease: EASE.out },
      onComplete: () => {
        el.classList.add("is-ready");
        gsap.set(q("[data-hero]"), {
          clearProps: "transform,opacity,visibility",
        });
      },
    });
    tl.fromTo(
      q('[data-hero="fade"][data-seq="nav"]'),
      { autoAlpha: 0, y: -8 },
      { autoAlpha: 1, y: 0, duration: 0.8 },
    )
      .fromTo(
        q('[data-hero="line"]'),
        { yPercent: 108 },
        { yPercent: 0, duration: 1.15, ease: EASE.expo, stagger: 0.1 },
        0.15,
      )
      .fromTo(
        q('[data-hero="fade"][data-seq="copy"]'),
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.08 },
        0.6,
      )
      .fromTo(
        q('[data-hero="card"]'),
        { autoAlpha: 0, y: 36, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: EASE.expo,
          stagger: 0.12,
        },
        0.45,
      )
      .fromTo(
        q('[data-hero="bar"]'),
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: EASE.expo, stagger: 0.04 },
        0.95,
      )
      .fromTo(
        q('[data-hero="row"]'),
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.06 },
        1.1,
      )
      .fromTo(
        q('[data-hero="fade"]:not([data-seq])'),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 },
        1.4,
      );
    return () => tl.kill();
  });

  return (
    <section
      ref={root}
      data-hero-root
      aria-labelledby="hero-light-title"
      className="relative flex min-h-svh flex-col overflow-hidden bg-white text-royal-deep"
    >
      {/* Navigation */}
      <header
        data-hero="fade"
        data-seq="nav"
        className="shell flex items-center justify-between gap-6 py-4 lg:py-5"
      >
        <Link
          href="/"
          aria-label="Umanzor Financial Services, home"
          className="shrink-0"
        >
          <Image
            src={logo}
            alt=""
            preload
            sizes="104px"
            className="h-[68px] w-auto lg:h-[92px]"
          />
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9 text-[0.875rem] font-medium text-steel">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-line py-1 transition-colors hover:text-royal"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/home-1#contact"
          className="inline-flex h-10 items-center rounded-full border border-royal/25 px-5 text-[0.8125rem] font-medium text-royal transition-colors hover:border-royal hover:bg-royal hover:text-white"
        >
          Contact
        </Link>
      </header>

      <div className="shell grid flex-1 items-center gap-x-[clamp(32px,5vw,96px)] gap-y-16 pb-16 pt-8 lg:grid-cols-[1.1fr_1fr] lg:pb-20 lg:pt-4">
        {/* Copy */}
        <div className="max-w-[42rem]">
          <h1
            id="hero-light-title"
            className="text-balance font-display text-[clamp(2.15rem,1.4rem+3vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.012em] lg:text-[min(3.7vw,3.6rem)]"
          >
            <MaskedLines
              hero
              lines={["Your business deserves", "a clearer financial picture."]}
            />
          </h1>

          <p
            data-hero="fade"
            data-seq="copy"
            className="mt-7 max-w-[30rem] text-[1.0625rem] leading-relaxed text-steel"
          >
            Bookkeeping, payroll and financial reporting for small business
            owners in Houston and nationwide, so you can stay organized and
            understand your numbers.
          </p>

          <div
            data-hero="fade"
            data-seq="copy"
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={CONSULT_URL}
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-royal px-6 text-[0.9375rem] whitespace-nowrap font-medium text-white transition-colors hover:bg-royal-bright"
            >
              Schedule a Free Consultation
              <Arrow />
            </a>
            <Link
              href="/home-1#services"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-royal/25 px-6 text-[0.9375rem] whitespace-nowrap font-medium text-royal transition-colors hover:border-royal"
            >
              Explore Our Services
            </Link>
          </div>

          <dl
            data-hero="fade"
            data-seq="copy"
            className="mt-14 grid grid-cols-3 lg:mt-16"
          >
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col gap-2 ${i > 0 ? "border-l border-brass/50 pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}
              >
                <dt className="order-last text-[0.75rem] leading-snug text-steel">
                  {f.label}
                </dt>
                <dd className="num font-display text-[1.75rem] font-semibold leading-none text-royal sm:text-[2rem]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Collage */}
        <figure
          aria-label="Illustrative financial snapshots"
          className="relative mx-auto w-full max-w-[600px] lg:max-w-none"
        >
          <Sparkle
            className="absolute -left-2 top-[34%] size-5 text-brass max-sm:hidden lg:-left-8"
            data-hero="row"
          />
          <div className="grid grid-cols-[1.12fr_1fr] gap-3 sm:gap-4">
            {/* Left column */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <div data-hero="card" className={`${tile} bg-royal`}>
                <p className="px-1 pb-3 pt-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brass-light">
                  October 2026
                </p>
                <div className={inner}>
                  <p className="text-[0.75rem] text-steel">Net income</p>
                  <p className="num mt-1 font-display text-[1.9rem] font-semibold leading-none sm:text-[2.3rem]">
                    $16,680
                  </p>
                  <div
                    aria-hidden="true"
                    className="mt-5 flex h-16 items-end gap-1.5 sm:gap-2"
                  >
                    {BARS.map((v, i) => (
                      <span
                        key={i}
                        data-hero="bar"
                        className={`flex-1 origin-bottom rounded-t-[3px] ${i === BARS.length - 1 ? "bg-brass" : "bg-royal"}`}
                        style={{ height: `${(v / 52000) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[0.6875rem] text-steel">
                    <span>
                      Revenue{" "}
                      <span className="num text-royal-deep">$48,620</span>
                    </span>
                    <span className="max-sm:hidden">
                      Expenses{" "}
                      <span className="num text-royal-deep">$31,940</span>
                    </span>
                  </div>
                </div>
              </div>

              <div data-hero="card" className={`${tile} bg-royal-tint`}>
                <div className={inner}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[0.8125rem] font-medium">Payroll</p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-positive/10 px-2 py-0.5 text-[0.6875rem] text-positive">
                      <Check /> Paid
                    </span>
                  </div>
                  <dl className="mt-3 space-y-1.5 text-[0.75rem]">
                    {[
                      ["Pay date", "Nov 14"],
                      ["Employees", "6"],
                      ["Contractors", "2"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between border-b border-[var(--line)] pb-1.5 last:border-0 last:pb-0"
                      >
                        <dt className="text-steel">{k}</dt>
                        <dd className="num font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Right column, offset like the reference */}
            <div className="flex flex-col gap-3 pt-6 sm:gap-4 sm:pt-2">
              <div className="flex items-center justify-between px-1">
                <span
                  data-hero="row"
                  className="grid size-12 place-items-center rounded-full bg-brass text-royal-deep sm:size-14"
                >
                  <Arrow diagonal className="size-4 rotate-90" />
                </span>
                <span
                  data-hero="row"
                  className="mr-6 size-3 rounded-full bg-brass"
                  aria-hidden="true"
                />
              </div>

              <div data-hero="card" className={`${tile} bg-brass-light`}>
                <div className={inner}>
                  <p className="text-[0.8125rem] font-medium">
                    Books reconciled
                  </p>
                  <p className="t-meta mt-0.5 text-steel">Checking ··4021</p>
                  <dl className="mt-4 space-y-1.5 text-[0.75rem]">
                    <div className="flex justify-between gap-2">
                      <dt className="text-steel">Statement</dt>
                      <dd className="num">$58,904.12</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-steel">Books</dt>
                      <dd className="num">$58,904.12</dd>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-[var(--line-strong)] pt-1.5 font-medium">
                      <dt>Difference</dt>
                      <dd className="num inline-flex items-center gap-1 text-positive">
                        $0.00 <Check />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="relative flex items-center gap-3">
                <span
                  data-hero="row"
                  className="inline-flex h-12 items-center gap-2.5 rounded-full bg-royal-deep px-4 text-[0.75rem] font-medium text-white sm:-ml-10 sm:h-14 sm:px-5"
                >
                  <Rings className="h-4 w-9 text-brass" />
                  <span>3 reports ready</span>
                </span>
                <Sparkle
                  data-hero="row"
                  className="size-4 text-brass max-sm:hidden"
                />
              </div>
              <span
                data-hero="row"
                aria-hidden="true"
                className="ml-auto mr-8 size-5 rounded-full bg-royal-tint"
              />
            </div>
          </div>

          <figcaption
            data-hero="fade"
            className="mt-4 text-[0.6875rem] text-steel"
          >
            Illustrative example. Figures do not represent client data.
          </figcaption>
        </figure>
      </div>

      <div data-hero="fade" className="border-t border-silver-2">
        <p className="shell py-5 text-[0.8125rem] text-steel">
          {CONTACT.location}. {CONTACT.reach}. Call{" "}
          <a
            href={CONTACT.phoneHref}
            className="link-line num font-medium text-royal"
          >
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
