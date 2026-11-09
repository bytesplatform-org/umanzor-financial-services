import type { ReactNode } from "react";

/** Short arrow used across links and buttons. Direction is part of the meaning. */
export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      className={`arrow-nudge ${diagonal ? "arrow-nudge-diag" : ""} shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      {diagonal ? <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /> : <path d="M2 8h11M9 4l4 4-4 4" />}
    </svg>
  );
}

/** Splits a headline into masked lines for line-by-line reveals. */
export function MaskedLines({ lines, hero = false }: { lines: ReactNode[]; hero?: boolean }) {
  const attr = hero ? { "data-hero": "line" } : { "data-mask-line": "" };
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <span className="block" {...attr}>
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

/** Ledger-style index marker, e.g. "01". */
export function Index({ n, className = "" }: { n: number; className?: string }) {
  return <span className={`num ${className}`}>{String(n).padStart(2, "0")}</span>;
}

/** Brand lockup echoing the client's mark: name, brass rule with a diamond, "Financial Services". */
export function Wordmark({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const name = tone === "light" ? "text-paper" : "text-ink";
  const sub = tone === "light" ? "text-paper/60" : "text-slate-2";
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-display text-[1.6rem] font-semibold tracking-[0.005em] ${name}`}>Umanzor</span>
      <span className="mt-[5px] flex items-center gap-[6px]" aria-hidden="true">
        <span className="h-px flex-1 bg-gold/70" />
        <span className="size-[5px] rotate-45 bg-gold" />
        <span className="h-px flex-1 bg-gold/70" />
      </span>
      <span className={`mt-[5px] text-[0.5625rem] font-medium tracking-[0.26em] uppercase ${sub}`}>
        Financial Services
      </span>
    </span>
  );
}
