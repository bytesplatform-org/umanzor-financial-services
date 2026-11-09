"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CASE_STUDIES, CONSULT_URL, PROCESS, SERVICES } from "@/lib/content";
import { gsap, useMotion } from "@/lib/motion";
import { Arrow, Index } from "../ui";
import { Eyebrow, FinCard, H2, Icon, PILL_DARK, Tag, Words, type CardVariant } from "./kit";
import { sectionMotion } from "./motion";

/* ------------------------------------------------------------------
   Service carousel: snap-scrolling track, round arrows, progress bar.
   Each package gets an abstract cover in place of artwork.
------------------------------------------------------------------- */
function DotGrid() {
  const n = 9;
  return (
    <div className="grid h-full w-full grid-cols-9 place-items-center bg-royal-deep p-[10%]">
      {Array.from({ length: n * n }, (_, k) => {
        const x = (k % n) - 4;
        const y = Math.floor(k / n) - 4;
        const d = Math.hypot(x, y);
        const s = Math.max(0.12, 1 - d / 5.2);
        return <span key={k} className="aspect-square w-[46%] rounded-full bg-white" style={{ transform: `scale(${s.toFixed(2)})` }} />;
      })}
    </div>
  );
}

function Blocks() {
  const heights = [28, 44, 60, 78];
  return (
    <div className="flex h-full w-full items-end justify-center gap-[5%] bg-brass-light px-[14%] pb-[16%]">
      {heights.map((h, i) => (
        <span key={i} className="flex w-full flex-col gap-[6px]" style={{ height: `${h}%` }}>
          {Array.from({ length: i + 1 }, (_, j) => (
            <span key={j} className={`flex-1 rounded-[6px] ${j === i ? "bg-brass" : "bg-royal"}`} />
          ))}
        </span>
      ))}
    </div>
  );
}

function Bands() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-royal-deep">
      {["#cfe0f5", "#9fb9e6", "#5f86d4", "#2f4fd6", "#c9a24b", "#e8775a"].map((c, i) => (
        <span
          key={c}
          className="absolute left-[-20%] h-[30%] w-[140%] rounded-full"
          style={{ background: c, top: `${8 + i * 13}%`, transform: `rotate(${-14 + i * 2}deg)`, opacity: 0.95 }}
        />
      ))}
    </div>
  );
}

function CoverCard({ variant, bg }: { variant: CardVariant; bg: string }) {
  return (
    <div className={`grid h-full w-full place-items-center ${bg}`}>
      <div className="aspect-[4/5] w-[52%] rotate-[-5deg]">
        <FinCard variant={variant} />
      </div>
    </div>
  );
}

const COVERS: Record<string, ReactNode> = {
  "business-builder": <Blocks />,
  "essential-bookkeeping": <DotGrid />,
  "financial-management-reporting": <Bands />,
  "complete-financial-management-payroll": <CoverCard variant="payroll" bg="bg-coral" />,
  "backlog-bookkeeping": <CoverCard variant="receipts" bg="bg-lime" />,
};

export function ServicesCarousel() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useMotion(root, (el) => {
    sectionMotion(el);
    gsap.from(el.querySelectorAll("[data-slide]"), {
      x: 120,
      autoAlpha: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: { trigger: track.current, start: "top 85%", once: true },
    });
  });

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const update = () => {
      const max = t.scrollWidth - t.clientWidth;
      setProgress(max > 0 ? t.scrollLeft / max : 1);
      setEdges({ start: t.scrollLeft < 4, end: t.scrollLeft > max - 4 });
    };
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: number) => {
    const t = track.current;
    const card = t?.querySelector("li");
    if (!t || !card) return;
    t.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  return (
    <section ref={root} id="services" aria-labelledby="h2-services-title" className="overflow-hidden py-[clamp(56px,8vw,120px)]">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(300px,0.34fr)_1fr]">
        <div className="flex flex-col">
          <div data-blur-group>
            <Eyebrow accent="Organized">Get more</Eyebrow>
            <h2 id="h2-services-title" className="mt-5 text-[clamp(2rem,1.3rem+2.2vw,3.3rem)] font-medium leading-[1.04] tracking-[-0.042em]">
              <Words parts={["Services for", null, "every stage."]} />
            </h2>
          </div>
          <p data-reveal className="mt-5 max-w-[20rem] text-[0.875rem] leading-relaxed text-steel">
            From forming your LLC to running payroll, choose the package that fits where your
            business is today. Pricing reflects your activity, accounts and the condition of your books.
          </p>
          <div className="mt-8 flex gap-2 lg:mt-auto">
            <button
              type="button"
              aria-label="Previous service"
              disabled={edges.start}
              onClick={() => scrollBy(-1)}
              className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-black/[0.08] transition-opacity disabled:opacity-40"
            >
              <Arrow className="rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Next service"
              disabled={edges.end}
              onClick={() => scrollBy(1)}
              className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-black/[0.08] transition-opacity disabled:opacity-40"
            >
              <Arrow />
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-6 flex justify-end">
            <a href={CONSULT_URL} className="inline-flex h-9 items-center rounded-full bg-brass px-4 text-[0.8125rem] font-medium text-royal-deep transition-colors hover:bg-brass-deep hover:text-white">
              Find my package
            </a>
          </div>
          <ul
            ref={track}
            className="-mr-[var(--gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pr-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICES.map((s) => (
              <li key={s.slug} data-slide className="w-[clamp(230px,24vw,300px)] shrink-0 snap-start">
                <div className="aspect-[1.05] overflow-hidden rounded-[18px]" aria-hidden="true">
                  {COVERS[s.slug]}
                </div>
                <h3 className="mt-4 text-[1rem] font-medium tracking-[-0.02em]">{s.name}</h3>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-steel">{s.headline}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 h-[2px] w-full bg-silver-2" aria-hidden="true">
            <span
              className="block h-full bg-royal-deep transition-[width] duration-300"
              style={{ width: `${Math.max(0.2, progress) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Testimonial: a field of small cards that settles around one quote.
------------------------------------------------------------------- */
const FIELD: CardVariant[] = [
  "recon", "aging", "pl", "receipts", "balance",
  "cash", "invoice", "pl", "payroll", "llc",
  "balance", "payroll", "recon", "cash", "aging",
];
const QUOTE = CASE_STUDIES[0].quote!;

export function Testimonial() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => {
    sectionMotion(el);
    const st = { trigger: el, start: "top 85%", end: "center 55%", scrub: 0.8 };
    gsap.from(el.querySelectorAll("[data-field]"), {
      scale: 0.55,
      autoAlpha: 0.2,
      stagger: { each: 0.02, from: "center", grid: [3, 5] },
      ease: "power2.out",
      scrollTrigger: st,
    });
    gsap.from(el.querySelector("[data-quote]"), { scale: 0.8, yPercent: 10, ease: "power2.out", scrollTrigger: st });
  });

  return (
    <section ref={root} aria-label="Client testimonial" className="overflow-hidden py-[clamp(40px,6vw,96px)]">
      <div className="shell relative">
        <div className="mx-auto grid max-w-[1080px] grid-cols-5 gap-[clamp(10px,2vw,28px)] max-md:hidden" aria-hidden="true">
          {FIELD.map((v, i) => (
            <div key={i} data-field className={`aspect-[4/5] ${i === 7 ? "invisible" : ""} ${i % 2 ? "translate-y-6" : ""}`}>
              <FinCard variant={v} />
            </div>
          ))}
        </div>

        <figure
          data-quote
          className="relative z-10 mx-auto flex w-full max-w-[400px] flex-col rounded-[28px] bg-coral p-7 text-white shadow-[0_40px_80px_-30px_rgb(15_27_51/0.6)] md:absolute md:left-1/2 md:top-1/2 md:w-[clamp(320px,34vw,420px)] md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <div className="flex items-center justify-between">
            <span className="relative">
              <Tag tone="ink" className="!relative">
                @refyned
              </Tag>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[0.75rem] font-medium text-royal-deep">
              <Icon name="check" className="size-3.5" /> Client story
            </span>
          </div>
          <blockquote className="mt-6 text-[clamp(1.05rem,0.95rem+0.4vw,1.25rem)] font-medium leading-snug tracking-[-0.02em]">
            “{QUOTE.text}”
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3 border-t border-white/25 pt-5">
            <span className="grid size-10 place-items-center rounded-full bg-white text-[0.8125rem] font-semibold text-coral">VN</span>
            <span className="text-[0.8125rem] leading-tight">
              <span className="block font-medium">{QUOTE.name}</span>
              <span className="text-white/75">{QUOTE.role}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Process: three tilted cards that deal out from a stack.
------------------------------------------------------------------- */
const STEP_STYLE = [
  { tilt: -5, lift: 18, tone: "bg-brass text-royal-deep", badge: "Free" },
  { tilt: 2, lift: -10, tone: "bg-white text-royal-deep", badge: "" },
  { tilt: 6, lift: 22, tone: "bg-white text-royal-deep", badge: "" },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  useMotion(root, (el) => {
    sectionMotion(el);
    gsap.from(el.querySelectorAll("[data-step]"), {
      xPercent: (i) => (1 - i) * 90,
      rotation: 0,
      y: 40,
      ease: "power2.out",
      scrollTrigger: { trigger: el.querySelector("[data-steps]"), start: "top 90%", end: "top 40%", scrub: 0.8 },
    });
  });

  return (
    <section ref={root} id="process" aria-labelledby="h2-process-title" className="overflow-hidden py-[clamp(72px,9vw,140px)]">
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-black/[0.06]" aria-hidden="true">
            <Icon name="calculator" className="size-4" />
          </span>
          <h2 id="h2-process-title" data-blur-group className={`${H2} mt-6`}>
            <Words parts={["How it works"]} />
          </h2>
          <p data-reveal className="mt-5 max-w-[24rem] text-[0.9375rem] leading-relaxed text-steel">
            Three steps from scattered records to clear reports every month. The first conversation is
            on us.
          </p>
          <a data-reveal href={CONSULT_URL} className={`${PILL_DARK} mt-8`}>
            Schedule a free consultation <Arrow />
          </a>
        </div>

        <ol data-steps className="grid gap-4 sm:grid-cols-3 sm:gap-0">
          {PROCESS.map((p, i) => {
            const s = STEP_STYLE[i];
            return (
              <li
                key={p.title}
                data-step
                className={`relative flex min-h-[260px] flex-col rounded-[22px] p-6 shadow-[0_30px_60px_-34px_rgb(15_27_51/0.55)] ring-1 ring-black/[0.05] sm:-mx-2 ${s.tone}`}
                style={{ transform: `rotate(${s.tilt}deg) translateY(${s.lift}px)`, zIndex: [1, 3, 2][i] }}
              >
                <div className="flex items-center justify-between">
                  <Index n={i + 1} className="text-[0.8125rem] font-medium opacity-70" />
                  {s.badge && (
                    <span className="rounded-full bg-royal-deep px-2.5 py-1 text-[0.6875rem] font-medium text-white">{s.badge}</span>
                  )}
                </div>
                <h3 className="mt-5 text-[1.2rem] font-medium leading-tight tracking-[-0.03em]">{p.title}</h3>
                <p className={`mt-auto pt-6 text-[0.8125rem] leading-relaxed ${i === 0 ? "text-royal-deep/75" : "text-steel"}`}>
                  {p.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
