import type { ReactNode, SVGProps } from "react";

/**
 * Shared building blocks for the home page: split-word headings, floating chat-bubble
 * tags, line icons and the illustrative "document cards" that stand in for
 * photography. All figures on cards are sample data.
 */

export const H2 =
  "text-[clamp(2.1rem,1.15rem+3.3vw,4.1rem)] font-medium leading-[1.04] tracking-[-0.042em]";

/* ------------------------------------------------------------------
   Words: splits copy into word spans for blur-in / scrub reveals.
   A string is plain text, a tuple is [text, className], null is a line break.
------------------------------------------------------------------- */
export type Part = string | [string, string] | null;

export function Words({ parts }: { parts: Part[] }) {
  const out: ReactNode[] = [];
  parts.forEach((part, pi) => {
    if (part === null) {
      out.push(<br key={`br-${pi}`} />);
      return;
    }
    const [text, cls] = typeof part === "string" ? [part, ""] : part;
    text
      .split(" ")
      .filter(Boolean)
      .forEach((w, wi) => {
        out.push(
          <span key={`${pi}-${wi}`} data-w="" className={`inline-block ${cls}`}>
            {w}
          </span>,
          " ",
        );
      });
  });
  return <>{out}</>;
}

export function Eyebrow({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-royal-deep">
      {children} {accent && <span className="text-brass-deep">{accent}</span>}
    </p>
  );
}

/* ------------------------------------------------------------------
   Floating chat-bubble tag. The outer span is positioned by the caller
   (and may be animated by GSAP); the inner span bobs via CSS.
------------------------------------------------------------------- */
const TAG_TONES = {
  royal: "bg-royal text-white",
  brass: "bg-brass text-royal-deep",
  blue: "bg-[#2f63d6] text-white",
  sage: "bg-sage-deep text-white",
  ink: "bg-royal-deep text-white",
  coral: "bg-coral text-white",
} as const;

export function Tag({
  children,
  tone = "royal",
  className = "",
  tail = "left",
}: {
  children: ReactNode;
  tone?: keyof typeof TAG_TONES;
  className?: string;
  tail?: "left" | "right";
}) {
  return (
    <span data-tag="" aria-hidden="true" className={`pointer-events-none absolute z-30 ${className}`}>
      <span
        className={`h2-bob relative inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium shadow-[0_10px_24px_-12px_rgb(15_27_51/0.6)] ${TAG_TONES[tone]}`}
      >
        {children}
        <span
          className={`absolute -bottom-[3px] size-2.5 rotate-45 rounded-[2px] bg-inherit ${tail === "left" ? "left-4" : "right-4"}`}
        />
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------
   Line icons (24px grid, 1.5 stroke)
------------------------------------------------------------------- */
const ICONS = {
  ledger: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm0 13a3 3 0 0 1 3-3h11M9 8h6",
  calculator:
    "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 3h8v3H8V6Zm0 7h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01",
  receipt: "M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21V3Zm3 5h6m-6 4h6m-6 4h3",
  chart: "M4 4v16h16M8 16v-4m4 4V8m4 8v-6",
  bank: "M3 10 12 4l9 6M5 10v8m4.5-8v8m5-8v8M19 10v8M3 20h18",
  users:
    "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0m1.5-9a3 3 0 1 0-1-5.8M21 20a5 5 0 0 0-4-4.9",
  doc: "M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h5m-5 4h5",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-4-9 2.8 2.8L16 9.5",
  shield: "M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4",
  pen: "m4 20 4-1L19 8l-3-3L5 16l-1 4Zm10-13 3 3",
  coins:
    "M9 9c3.3 0 6-1.1 6-2.5S12.3 4 9 4 3 5.1 3 6.5 5.7 9 9 9Zm-6-2.5v4C3 11.9 5.7 13 9 13s6-1.1 6-2.5v-4M9 17c-3.3 0-6-1.1-6-2.5v-4m18 3c0 1.4-2.7 2.5-6 2.5m6-2.5v4c0 1.4-2.7 2.5-6 2.5s-6-1.1-6-2.5",
  building: "M5 21V5l7-2v18m0-12h7v12M3 21h18M8 8h1m-1 4h1m-1 4h1m6-3h1m-1 4h1",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  pie: "M12 3v9h9M12 3a9 9 0 1 0 9 9M15 3.5A9 9 0 0 1 20.5 9H15V3.5Z",
  phone:
    "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  mail: "M4 6h16v12H4V6Zm0 0 8 7 8-7",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M5.6 5.6l2.8 2.8m7.2 7.2 2.8 2.8m0-12.8-2.8 2.8m-7.2 7.2-2.8 2.8",
  layers: "m12 4 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5",
  pin: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  play: "M8 5v14l11-7L8 5Z",
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/** White circle with an icon, used in clusters and banners. */
export function IconBubble({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span
      data-bubble=""
      className={`grid size-14 place-items-center rounded-full bg-white text-royal-deep shadow-[0_12px_28px_-14px_rgb(15_27_51/0.45)] ring-1 ring-black/[0.04] sm:size-16 ${className}`}
    >
      <Icon name={name} className="size-6 sm:size-7" />
    </span>
  );
}

/* ------------------------------------------------------------------
   Illustrative document cards. Sized with container query units so the
   same card reads at 90px or 300px wide.
------------------------------------------------------------------- */
export type CardVariant =
  | "pl"
  | "recon"
  | "payroll"
  | "cash"
  | "invoice"
  | "llc"
  | "receipts"
  | "balance"
  | "aging";

const CARD_BG: Record<CardVariant, string> = {
  pl: "bg-royal text-white",
  recon: "bg-brass-light text-royal-deep",
  payroll: "bg-sky text-royal-deep",
  cash: "bg-brass text-royal-deep",
  invoice: "bg-coral text-white",
  llc: "bg-royal-deep text-white",
  receipts: "bg-sage text-royal-deep",
  balance: "bg-white text-royal-deep",
  aging: "bg-lime text-royal-deep",
};

const BARS = [52, 61, 58, 70, 76, 88];

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

function CardBody({ variant }: { variant: CardVariant }) {
  switch (variant) {
    case "pl":
      return (
        <>
          <p className="text-[6cqw] font-medium uppercase tracking-[0.14em] text-brass-light/90">P&amp;L · October</p>
          <p className="num mt-[4cqw] text-[15cqw] font-semibold leading-none tracking-[-0.04em]">$16,680</p>
          <p className="mt-[2cqw] text-[6.5cqw] text-white/60">Net income</p>
          <div className="mt-auto flex h-[36%] items-end gap-[3cqw]">
            {BARS.map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t-[1.5cqw] ${i === BARS.length - 1 ? "bg-brass" : "bg-white/25"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </>
      );
    case "recon":
      return (
        <>
          <span className="self-start rounded-full bg-white px-[5cqw] py-[1.8cqw] text-[6.5cqw] font-medium text-royal">
            Reconciled
          </span>
          <p className="mt-[5cqw] text-[6cqw] text-royal-deep/60">Checking ··4021</p>
          <div className="mt-auto space-y-[2.5cqw] rounded-[6cqw] bg-white p-[6cqw] text-[6.5cqw]">
            <div className="flex justify-between">
              <span className="text-steel">Statement</span>
              <span className="num">$58,904</span>
            </div>
            <div className="flex justify-between">
              <span className="text-steel">Books</span>
              <span className="num">$58,904</span>
            </div>
            <div className="flex items-center justify-between border-t border-royal-deep/15 pt-[2.5cqw] font-semibold">
              <span>Difference</span>
              <span className="num inline-flex items-center gap-[1.5cqw] text-sage-deep">
                $0.00 <Tick className="size-[6cqw]" />
              </span>
            </div>
          </div>
        </>
      );
    case "payroll":
      return (
        <>
          <div className="flex items-center justify-between">
            <span className="text-[9cqw] font-semibold tracking-[-0.03em]">Payroll</span>
            <span className="inline-flex items-center gap-[1.5cqw] rounded-full bg-white px-[4cqw] py-[1.5cqw] text-[6cqw] font-medium text-sage-deep">
              <Tick className="size-[5.5cqw]" /> Paid
            </span>
          </div>
          <div className="mt-[7cqw] flex">
            {["AM", "JR", "LT", "+3"].map((n, i) => (
              <span
                key={n}
                className={`grid size-[17cqw] place-items-center rounded-full border-[1cqw] border-sky text-[5.5cqw] font-semibold ${
                  ["bg-royal text-white", "bg-brass", "bg-coral text-white", "bg-white"][i]
                } ${i ? "-ml-[4cqw]" : ""}`}
              >
                {n}
              </span>
            ))}
          </div>
          <div className="mt-auto">
            <p className="text-[6cqw] text-royal-deep/60">Next pay date</p>
            <p className="num text-[14cqw] font-semibold leading-none tracking-[-0.04em]">Nov 14</p>
          </div>
        </>
      );
    case "cash":
      return (
        <>
          <p className="text-[8.5cqw] font-semibold tracking-[-0.03em]">Cash flow</p>
          <svg viewBox="0 0 100 60" className="mt-auto w-full" fill="none" preserveAspectRatio="none">
            <path d="M0 48 C 15 44, 22 30, 35 34 S 55 18, 66 22 S 85 6, 100 8" stroke="white" strokeWidth="3" />
            <path
              d="M0 48 C 15 44, 22 30, 35 34 S 55 18, 66 22 S 85 6, 100 8 V60 H0Z"
              fill="white"
              fillOpacity="0.22"
            />
            <circle cx="100" cy="8" r="4" fill="#0f1b33" />
          </svg>
          <div className="mt-[4cqw] flex justify-between text-[6cqw]">
            <span>
              In <span className="num font-semibold">$52.4k</span>
            </span>
            <span>
              Out <span className="num font-semibold">$38.1k</span>
            </span>
          </div>
        </>
      );
    case "invoice":
      return (
        <div className="relative mt-[4cqw] flex flex-1 -rotate-3 flex-col rounded-[5cqw] bg-white p-[7cqw] text-royal-deep shadow-lg">
          <p className="text-[7cqw] font-semibold">Invoice #1042</p>
          <p className="text-[5.5cqw] text-steel">Due on receipt</p>
          <div className="mt-[5cqw] space-y-[3cqw]">
            {[80, 64, 72].map((w) => (
              <span key={w} className="block h-[2.2cqw] rounded-full bg-silver-2" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="num mt-auto text-[11cqw] font-semibold tracking-[-0.03em]">$4,250</p>
          <span className="absolute right-[6cqw] top-[28%] rotate-[14deg] rounded-[2cqw] border-[0.9cqw] border-sage-deep px-[3cqw] py-[1cqw] text-[7cqw] font-bold tracking-[0.1em] text-sage-deep">
            PAID
          </span>
        </div>
      );
    case "llc":
      return (
        <>
          <p className="text-[6cqw] uppercase tracking-[0.16em] text-white/55">Business setup</p>
          <p
            className="mt-[2cqw] text-[34cqw] font-semibold leading-[0.9] tracking-[-0.05em] text-transparent"
            style={{ WebkitTextStroke: "0.8cqw var(--color-brass)" }}
          >
            LLC
          </p>
          <div className="mt-auto space-y-[2.5cqw] text-[6.5cqw]">
            {["Entity formed", "EIN assigned", "Books set up"].map((t) => (
              <p key={t} className="flex items-center gap-[2.5cqw]">
                <span className="grid size-[7cqw] place-items-center rounded-full bg-brass text-royal-deep">
                  <Tick className="size-[5cqw]" />
                </span>
                {t}
              </p>
            ))}
          </div>
        </>
      );
    case "receipts":
      return (
        <>
          <div className="relative flex-1">
            {[
              "left-[4%] top-[6%] -rotate-6",
              "left-[22%] top-[0%] rotate-3",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute w-[64%] bg-white p-[5cqw] shadow-md ${pos}`}
                style={{
                  clipPath:
                    "polygon(0 0,100% 0,100% 92%,90% 100%,80% 92%,70% 100%,60% 92%,50% 100%,40% 92%,30% 100%,20% 92%,10% 100%,0 92%)",
                }}
              >
                <p className="text-[5.5cqw] font-semibold">{i ? "Supplies" : "Fuel"}</p>
                <div className="mt-[3cqw] space-y-[2cqw] pb-[6cqw]">
                  {[90, 70, 80].map((w) => (
                    <span key={w} className="block h-[1.8cqw] rounded-full bg-silver-2" style={{ width: `${w}%` }} />
                  ))}
                  <p className="num pt-[1cqw] text-[6.5cqw] font-semibold">${i ? "312.40" : "86.15"}</p>
                </div>
              </div>
            ))}
          </div>
          <span className="inline-flex items-center gap-[2cqw] self-start rounded-full bg-sage-deep px-[4.5cqw] py-[1.8cqw] text-[6cqw] font-medium text-white">
            <Tick className="size-[5cqw]" /> Categorized
          </span>
        </>
      );
    case "balance":
      return (
        <>
          <p className="text-[8.5cqw] font-semibold tracking-[-0.03em]">Balance sheet</p>
          <div className="relative mx-auto mt-[6cqw] aspect-square w-[58%]">
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(var(--color-royal) 0 46%, var(--color-brass) 46% 74%, var(--color-sky) 74% 100%)",
              }}
            />
            <span className="absolute inset-[22%] rounded-full bg-white" />
          </div>
          <div className="mt-auto flex justify-between text-[5.5cqw] text-steel">
            {[
              ["bg-royal", "Assets"],
              ["bg-brass", "Liab."],
              ["bg-sky", "Equity"],
            ].map(([c, l]) => (
              <span key={l} className="inline-flex items-center gap-[1.5cqw]">
                <span className={`size-[3cqw] rounded-full ${c}`} />
                {l}
              </span>
            ))}
          </div>
        </>
      );
    case "aging":
      return (
        <>
          <p className="text-[8.5cqw] font-semibold tracking-[-0.03em]">Receivables</p>
          <p className="text-[6cqw] text-royal-deep/60">Aging by days</p>
          <div className="mt-auto space-y-[3.5cqw]">
            {[
              ["0–30", 86],
              ["31–60", 34],
              ["61+", 12],
            ].map(([l, w]) => (
              <div key={l} className="flex items-center gap-[3cqw] text-[5.5cqw]">
                <span className="w-[22%] shrink-0">{l}</span>
                <span className="h-[5cqw] rounded-full bg-royal-deep" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </>
      );
  }
}

export function FinCard({ variant, className = "" }: { variant: CardVariant; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`@container relative flex h-full w-full flex-col overflow-hidden rounded-[clamp(12px,1.4vw,20px)] p-[9%] shadow-[0_26px_50px_-30px_rgb(15_27_51/0.6)] ring-1 ring-black/[0.05] ${CARD_BG[variant]} ${className}`}
    >
      <CardBody variant={variant} />
    </div>
  );
}

/** Primary dark pill and a quiet text link, the reference's CTA pair. */
export const PILL_DARK =
  "group inline-flex h-11 items-center justify-center gap-2.5 rounded-full bg-royal-deep px-5 text-[0.875rem] font-medium whitespace-nowrap text-white transition-colors hover:bg-royal-bright";
export const PILL_LIGHT =
  "group inline-flex h-11 items-center justify-center gap-2.5 rounded-full bg-white px-5 text-[0.875rem] font-medium whitespace-nowrap text-royal-deep shadow-[0_6px_18px_-12px_rgb(15_27_51/0.45)] ring-1 ring-black/[0.06] transition-colors hover:bg-royal-tint";
