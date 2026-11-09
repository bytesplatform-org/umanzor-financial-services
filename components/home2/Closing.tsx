"use client";

import { Fragment, useRef } from "react";
import { CONSULT_URL, CONTACT } from "@/lib/content";
import { gsap, ScrollTrigger, useMotion } from "@/lib/motion";
import { Arrow } from "../ui";
import { FinCard, Icon, IconBubble, PILL_DARK, PILL_LIGHT, Words, type CardVariant, type IconName } from "./kit";
import { sectionMotion } from "./motion";

/* ------------------------------------------------------------------
   Brass banner: a big marquee line, then icon bubbles that drop in and
   bounce to rest on the floor of the panel.
------------------------------------------------------------------- */
const PHRASES: { text: string; thumbs: CardVariant[] }[] = [
  { text: "Books caught up", thumbs: ["recon", "receipts"] },
  { text: "Payroll handled", thumbs: ["payroll"] },
  { text: "Reports you understand", thumbs: ["pl", "cash", "balance"] },
  { text: "Free first consultation", thumbs: ["llc"] },
];

const DROPS: { name: IconName; pos: string }[] = [
  { name: "bank", pos: "left-[2%] bottom-0" },
  { name: "layers", pos: "left-[9%] bottom-[44px] sm:bottom-[56px]" },
  { name: "receipt", pos: "left-[13%] bottom-0" },
  { name: "shield", pos: "left-[20%] bottom-[44px] sm:bottom-[56px]" },
  { name: "pen", pos: "left-[25%] bottom-[88px] sm:bottom-[112px]" },
  { name: "chart", pos: "left-[28%] bottom-0" },
  { name: "coins", pos: "left-[58%] bottom-0" },
  { name: "calculator", pos: "left-[70%] bottom-0" },
  { name: "pie", pos: "left-[79%] bottom-0" },
  { name: "ledger", pos: "left-[88%] bottom-0 max-sm:hidden" },
];

export function Banner() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => {
    // Bubbles stay hidden above the panel until the drop begins.
    const drops = el.querySelectorAll("[data-drop]");
    gsap.set(drops, { y: -420, rotation: (i: number) => (i % 2 ? 40 : -40), autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: el.querySelector("[data-floor]"),
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(drops, {
          y: 0,
          rotation: 0,
          duration: 1.3,
          ease: "bounce.out",
          stagger: { each: 0.08, from: "random" },
          onStart: () => gsap.set(drops, { autoAlpha: 1 }),
        });
      },
    });
  });

  return (
    <section ref={root} aria-label="What you get" className="py-[clamp(40px,6vw,88px)]">
      <div className="shell">
        <div data-floor className="relative overflow-hidden rounded-[28px] bg-brass pb-6 pt-[clamp(28px,4vw,48px)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-[4%] top-[18%] text-[clamp(10rem,30vw,26rem)] font-semibold leading-none tracking-[-0.06em] text-transparent"
            style={{ WebkitTextStroke: "2px rgb(255 255 255 / 0.35)" }}
          >
            UF
          </span>
          <div className="h2-marquee-wrap relative overflow-hidden">
            <div className="h2-marquee flex w-max items-center gap-6 pr-6 text-[clamp(2rem,1.2rem+3.4vw,4.4rem)] font-medium tracking-[-0.045em] text-royal-deep [--dur:34s]">
              {[0, 1].map((k) => (
                <Fragment key={k}>
                  {PHRASES.map((p) => (
                    <span key={`${k}-${p.text}`} aria-hidden={k > 0} className="inline-flex items-center gap-6 whitespace-nowrap">
                      <span className="flex gap-1.5" aria-hidden="true">
                        {p.thumbs.map((t) => (
                          <span key={t} className="block aspect-[4/5] w-[0.8em] [&>div]:rounded-[6px] [&>div]:shadow-none">
                            <FinCard variant={t} />
                          </span>
                        ))}
                      </span>
                      {p.text}
                    </span>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="relative mt-[clamp(60px,10vw,150px)] h-[140px] sm:h-[180px]" aria-hidden="true">
            {DROPS.map((d) => (
              <span key={d.name} className={`absolute ${d.pos}`}>
                <span data-drop className="block">
                  <IconBubble name={d.name} />
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Contact: two cards, the reference's "Meets new people / Archive".
------------------------------------------------------------------- */
export function ContactCards() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, sectionMotion);

  return (
    <section ref={root} id="contact" aria-label="Get in touch" className="pb-[clamp(56px,8vw,120px)]">
      <div className="shell grid gap-5 md:grid-cols-2 md:gap-6">
        <article data-reveal className="relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[28px] bg-royal-deep p-7 text-white sm:p-9">
          <span aria-hidden="true" className="absolute -right-16 -top-20 -z-10 size-[340px] rounded-full bg-coral opacity-70 blur-[70px]" />
          <span aria-hidden="true" className="absolute right-[20%] top-[10%] -z-10 size-[220px] rounded-full bg-[#2f4fd6] opacity-80 blur-[60px]" />
          <h2 data-blur-group className="text-[clamp(2rem,1.4rem+2vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            <Words parts={["Schedule a", null, "free consultation"]} />
          </h2>
          <p className="mt-4 max-w-[24rem] text-[0.875rem] leading-relaxed text-white/70">
            Tell us how your business runs and where the books stand today. We&apos;ll recommend the right
            package.
          </p>
          <a href={CONSULT_URL} className={`${PILL_LIGHT} mt-6 self-start`}>
            Book my call <Arrow />
          </a>
        </article>

        <article data-reveal className="relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[28px] bg-white p-7 ring-1 ring-black/[0.04] sm:p-9">
          <svg aria-hidden="true" viewBox="0 0 400 300" className="absolute -right-10 -top-6 -z-10 w-[80%] text-brass" fill="none" stroke="currentColor" strokeWidth="22" strokeLinecap="round">
            <path d="M40 240 C 120 60, 260 40, 300 120 S 220 260, 380 60" opacity="0.85" />
          </svg>
          <h2 data-blur-group className="text-[clamp(2rem,1.4rem+2vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            <Words parts={["Talk to", null, "Umanzor"]} />
          </h2>
          <dl className="mt-5 grid gap-x-8 gap-y-3 text-[0.875rem] sm:grid-cols-2">
            <div>
              <dt className="text-steel">Phone</dt>
              <dd>
                <a href={CONTACT.phoneHref} className="link-line num font-medium">
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-steel">Email</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`} className="link-line font-medium break-all">
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            {CONTACT.hours.map((h) => (
              <div key={h.days}>
                <dt className="text-steel">{h.days}</dt>
                <dd className="font-medium">{h.time}</dd>
              </div>
            ))}
          </dl>
          <a href={CONTACT.phoneHref} className={`${PILL_DARK} mt-6 self-start`}>
            <Icon name="phone" className="size-4" /> Call now
          </a>
        </article>
      </div>
    </section>
  );
}
