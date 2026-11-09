"use client";

import { useRef } from "react";
import { CONSULT_URL, CONTACT } from "@/lib/content";
import { revealOnScroll, useMotion } from "@/lib/motion";
import { Arrow, MaskedLines } from "./ui";

export default function ClosingCTA() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => revealOnScroll(el));

  return (
    <section
      id="contact"
      ref={root}
      tabIndex={-1}
      aria-labelledby="cta-title"
      className="relative bg-ink pb-[clamp(80px,9vw,140px)] pt-[clamp(112px,13vw,200px)] text-paper outline-none"
    >
      <div className="shell grid gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-8">
          <h2 id="cta-title" className="t-display" data-mask-group>
            <MaskedLines lines={["Let’s put your", <em key="e" className="text-gold-soft">numbers to work.</em>]} />
          </h2>
          <p data-reveal className="t-lead mt-10 max-w-[32rem] text-paper/70">
            Get the financial organization and ongoing support your business needs to move forward with confidence.
          </p>
          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href={CONSULT_URL} className="btn btn-gold group">
              Schedule a Free Consultation
              <Arrow />
            </a>
            <a href={CONTACT.phoneHref} className="btn btn-ghost-dark num group">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        <dl data-reveal data-reveal-delay="0.15" className="self-end text-[0.875rem] lg:col-span-3 lg:col-start-10">
          <div className="border-t border-[var(--line-dark-strong)] py-4">
            <dt className="t-label text-paper/45">Email</dt>
            <dd className="mt-2">
              <a href={`mailto:${CONTACT.email}`} className="link-line break-all">
                {CONTACT.email}
              </a>
            </dd>
          </div>
          <div className="border-t border-[var(--line-dark-strong)] py-4">
            <dt className="t-label text-paper/45">Hours</dt>
            {CONTACT.hours.map((h) => (
              <dd key={h.days} className="mt-2 flex justify-between gap-4 text-paper/80">
                <span>{h.days}</span>
                <span className="num">{h.time}</span>
              </dd>
            ))}
          </div>
          <div className="border-t border-[var(--line-dark-strong)] py-4">
            <dt className="t-label text-paper/45">Based in</dt>
            <dd className="mt-2 text-paper/80">
              {CONTACT.location}. {CONTACT.reach}.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
