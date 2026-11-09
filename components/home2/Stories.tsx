"use client";

import { useRef, type ReactNode } from "react";
import { CASE_STUDIES, CONSULT_URL } from "@/lib/content";
import { gsap, useMotion } from "@/lib/motion";
import { Arrow } from "../ui";
import { Eyebrow, FinCard, H2, Icon, PILL_LIGHT, Tag, Words, type IconName } from "./kit";
import { sectionMotion } from "./motion";

/* ------------------------------------------------------------------
   Sound familiar: two rows of tiles riding a gentle wave in opposite
   directions around a centred headline.
------------------------------------------------------------------- */
type Tile = { label: string; icon: IconName; tone: string };

const ROW_A: Tile[] = [
  { label: "Books behind", icon: "clock", tone: "bg-royal text-white" },
  { label: "Unreconciled months", icon: "bank", tone: "bg-brass-light" },
  { label: "Duplicate charges", icon: "layers", tone: "bg-coral text-white" },
  { label: "Missing receipts", icon: "receipt", tone: "bg-sky" },
  { label: "Bank won't match", icon: "calculator", tone: "bg-royal-deep text-white" },
  { label: "Unclear profit", icon: "pie", tone: "bg-lime" },
  { label: "Slow payments", icon: "coins", tone: "bg-sage" },
  { label: "No monthly reports", icon: "doc", tone: "bg-brass" },
];
const ROW_B: Tile[] = [
  { label: "Doing it all yourself", icon: "users", tone: "bg-sky" },
  { label: "Payroll stress", icon: "coins", tone: "bg-royal text-white" },
  { label: "Growing fast", icon: "chart", tone: "bg-lime" },
  { label: "Wrong categories", icon: "ledger", tone: "bg-coral text-white" },
  { label: "No LLC yet", icon: "building", tone: "bg-brass-light" },
  { label: "Need an EIN", icon: "shield", tone: "bg-royal-deep text-white" },
  { label: "Cash flow gaps", icon: "pie", tone: "bg-sage" },
  { label: "Messy QuickBooks", icon: "calculator", tone: "bg-brass" },
];

function WaveRow({ tiles, reverse = false, phase = 0 }: { tiles: Tile[]; reverse?: boolean; phase?: number }) {
  const all = [...tiles, ...tiles];
  return (
    <div className="h2-marquee-wrap h2-fade-x overflow-hidden py-6">
      <ul data-dir={reverse ? "rev" : undefined} className="h2-marquee flex w-max gap-[clamp(14px,2vw,28px)] pr-[clamp(14px,2vw,28px)] [--dur:46s]">
        {all.map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= tiles.length}
            className={`flex aspect-square w-[clamp(92px,9vw,128px)] shrink-0 flex-col justify-between rounded-[clamp(14px,1.4vw,22px)] p-3 shadow-[0_16px_30px_-22px_rgb(15_27_51/0.6)] ${t.tone}`}
            style={{ transform: `translateY(${(Math.sin(i * 0.9 + phase) * 22).toFixed(1)}px) rotate(${(Math.sin(i * 1.3 + phase) * 4).toFixed(2)}deg)` }}
          >
            <Icon name={t.icon} className="size-5 opacity-80" />
            <span className="text-[clamp(0.6875rem,0.6rem+0.2vw,0.8125rem)] font-medium leading-tight">{t.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Familiar() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, sectionMotion);
  return (
    <section ref={root} aria-labelledby="h2-familiar-title" className="overflow-hidden py-[clamp(40px,6vw,96px)]">
      <WaveRow tiles={ROW_A} />
      <div className="shell py-[clamp(24px,4vw,56px)] text-center">
        <span className="mx-auto grid size-9 place-items-center rounded-full bg-white ring-1 ring-black/[0.06]" aria-hidden="true">
          <Icon name="spark" className="size-4" />
        </span>
        <h2 id="h2-familiar-title" data-blur-group className={`${H2} mx-auto mt-5 max-w-[20ch]`}>
          <Words parts={["Sound familiar?", null, "You're in the right place."]} />
        </h2>
        <p data-reveal className="mx-auto mt-4 max-w-[26rem] text-[0.9375rem] leading-relaxed text-steel">
          Each of these has a fix. It starts with a free conversation about how your business runs today.
        </p>
      </div>
      <WaveRow tiles={ROW_B} reverse phase={1.7} />
    </section>
  );
}

/* ------------------------------------------------------------------
   Client stories: a two-column bento, the right column dropped lower.
------------------------------------------------------------------- */
const [REFYNED, TAMA, HOLLYS] = CASE_STUDIES;
const STORY_LINK = "https://umanzorfinancialservices.com/clientsucessstories";
const TICKER = ["Organized", "Reconciled", "Reported", "Understood", "On time", "Organized"];

function StoryCard({
  visual,
  title,
  body,
  cta,
  tone = "bg-white",
}: {
  visual: ReactNode;
  title: string;
  body: string;
  cta: string;
  tone?: string;
}) {
  return (
    <article data-story className={`overflow-hidden rounded-[26px] ${tone} ring-1 ring-black/[0.04]`}>
      {visual}
      <div className="p-6 sm:p-7">
        <h3 className="text-[1.25rem] font-medium tracking-[-0.03em]">{title}</h3>
        <p className="mt-2 max-w-[30rem] text-[0.875rem] leading-relaxed text-steel">{body}</p>
        <a href={STORY_LINK} className={`${PILL_LIGHT} mt-5 !h-9 !px-4 !text-[0.8125rem]`}>
          {cta}
        </a>
      </div>
    </article>
  );
}

export function Stories() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => {
    sectionMotion(el);
    el.querySelectorAll<HTMLElement>("[data-story]").forEach((card) => {
      gsap.from(card, {
        y: 70,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: card, start: "top 92%", once: true },
      });
    });
    // Animated bars on the TAMA card
    gsap.from(el.querySelectorAll("[data-ar-bar]"), {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: el.querySelector("[data-ar]"), start: "top 80%", once: true },
    });
    // Rolling word list on the dark card
    const list = el.querySelector<HTMLElement>("[data-ticker]");
    if (list) {
      const step = list.firstElementChild?.getBoundingClientRect().height ?? 0;
      const tl = gsap.timeline({ repeat: -1 });
      for (let i = 1; i < TICKER.length; i++) {
        tl.to(list, { y: -step * i, duration: 0.8, ease: "expo.inOut" }, `+=1.1`);
      }
      tl.set(list, { y: 0 });
    }
  });

  return (
    <section ref={root} id="stories" aria-labelledby="h2-stories-title" className="py-[clamp(56px,8vw,120px)]">
      <div className="shell">
        <div className="text-center" data-blur-group>
          <Eyebrow accent="Stories">Client</Eyebrow>
          <h2 id="h2-stories-title" className={`${H2} mx-auto mt-5 max-w-[16ch]`}>
            <Words parts={["Every business has a", null, "story in its numbers."]} />
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1080px] gap-5 md:grid-cols-2 md:gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-5 md:gap-6">
            <StoryCard
              title={`${REFYNED.figure} transactions, organized`}
              body={`${REFYNED.client}: ${REFYNED.figureCaption}, then moved to monthly bookkeeping, reporting and payroll.`}
              cta="How it worked"
              visual={
                <div className="relative h-[clamp(220px,24vw,280px)] overflow-hidden bg-white">
                  <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-silver px-3 py-1.5 text-[0.75rem] font-medium">
                    <Icon name="play" className="size-3 fill-current" /> Case study
                  </span>
                  <Tag tone="blue" className="right-[16%] top-[14%]">
                    @refyned
                  </Tag>
                  {(["receipts", "invoice", "recon"] as const).map((v, i) => (
                    <div
                      key={v}
                      className="absolute bottom-[-18%] left-1/2 aspect-[4/5] w-[34%]"
                      style={{ transform: `translateX(calc(-50% + ${(i - 1) * 22}%)) rotate(${(i - 1) * 8}deg)`, zIndex: i === 2 ? 3 : i }}
                    >
                      <FinCard variant={v} />
                    </div>
                  ))}
                </div>
              }
            />
            <StoryCard
              tone="bg-silver-2/60"
              title="A formal structure for a growing shop"
              body={`${HOLLYS.client}, a Houston mechanic shop: we opened an LLC so the business has a formal legal structure for its continued growth.`}
              cta="Read the story"
              visual={
                <div className="relative grid h-[clamp(220px,24vw,280px)] place-items-center overflow-hidden bg-coral">
                  <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.6px)", backgroundSize: "22px 22px" }} />
                  <div className="relative aspect-[4/5] w-[36%] -rotate-6">
                    <FinCard variant="llc" />
                  </div>
                  <Tag tone="ink" className="left-[12%] top-[16%]">
                    @hollys-garage
                  </Tag>
                </div>
              }
            />
          </div>

          {/* Right column, dropped */}
          <div className="flex flex-col gap-5 md:mt-28 md:gap-6">
            <StoryCard
              tone="bg-silver-2/60"
              title={`Paid in ${TAMA.figure}, not 30 to 60`}
              body={`${TAMA.client}: ${TAMA.outcome}`}
              cta="Read more"
              visual={
                <div data-ar className="relative h-[clamp(220px,24vw,280px)] overflow-hidden bg-[#2f4fd6] p-6 text-white">
                  <p className="text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white/70">Average days to get paid</p>
                  <div className="absolute inset-x-6 bottom-6 flex h-[62%] items-end gap-4">
                    {[
                      { label: "Before", h: 100, v: "30–60" },
                      { label: "After", h: 30, v: "~15" },
                    ].map((b) => (
                      <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                        <span className="num text-[clamp(1.4rem,1rem+1.4vw,2.2rem)] font-semibold tracking-[-0.04em]">{b.v}</span>
                        <span
                          data-ar-bar
                          className={`w-full rounded-t-[14px] ${b.label === "After" ? "bg-brass" : "bg-white/25"}`}
                          style={{ height: `${b.h * 0.62}%` }}
                        />
                        <span className="text-[0.75rem] text-white/75">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            <article data-story className="relative grid h-[clamp(320px,34vw,420px)] place-items-center overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.04]">
              <span className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-royal-deep text-white" aria-hidden="true">
                <Icon name="pen" className="size-4" />
              </span>
              <div className="relative h-[86%] w-[min(56%,260px)] translate-y-[14%] rounded-t-[34px] bg-royal-deep px-5 pt-10 text-center text-white">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/50">Your books, every month</p>
                <div className="relative mt-5 h-[3.9em] overflow-hidden text-[clamp(1.1rem,0.9rem+0.8vw,1.5rem)] font-medium leading-[1.3em] tracking-[-0.03em] [mask-image:linear-gradient(transparent,#000_30%,#000_70%,transparent)]">
                  <ul data-ticker className="pt-[1.3em]" aria-label="Organized, reconciled, reported, understood, on time">
                    {TICKER.map((w, i) => (
                      <li key={i} aria-hidden="true" className="h-[1.3em]">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href={CONSULT_URL} className="group mt-6 inline-flex items-center gap-2 text-[0.75rem] text-brass">
                  Start with a free call <Arrow />
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
