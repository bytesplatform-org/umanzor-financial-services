/**
 * Hero composition: an art-directed monthly statement with two supporting
 * surfaces. All figures are illustrative and internally consistent
 * (Revenue − Expenses = Net income; statement balance = book balance).
 */

const MONTHS = [
  { m: "May", rev: 41300, exp: 31100 },
  { m: "Jun", rev: 43750, exp: 33050 },
  { m: "Jul", rev: 45900, exp: 34800 },
  { m: "Aug", rev: 47100, exp: 35260 },
  { m: "Sep", rev: 49650, exp: 35370 },
  { m: "Oct", rev: 48620, exp: 31940 },
];
const MAX = 52000;
const usd = (n: number) => n.toLocaleString("en-US");

function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" width="11" height="11" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 6.2 5 8.5l4.5-5" />
    </svg>
  );
}

export default function FinancialOverviewVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[600px] lg:mx-0 lg:max-w-none" aria-label="Illustrative monthly financial summary">
      {/* Primary statement panel */}
      <div
        data-hero="panel"
        className="group/panel relative bg-paper text-ink shadow-[0_1px_0_rgb(255_255_255/0.6)_inset,0_40px_80px_-40px_rgb(0_0_0/0.55)] transition-transform duration-700 ease-[var(--ease-out-quart)] hover:-translate-y-1 lg:ml-[7%]"
      >
        {/* Report header */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-5 pb-4 pt-5 sm:px-7">
          <div data-hero="row">
            <p className="text-[0.8125rem] font-medium tracking-[-0.01em]">Monthly financial summary</p>
            <p className="t-meta mt-1 text-slate">Sample Services Co.</p>
          </div>
          <div data-hero="row" className="text-right">
            <p className="num text-[0.8125rem] font-medium">October 2026</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-[0.6875rem] text-positive">
              <span className="size-1.5 rounded-full bg-positive" aria-hidden="true" />
              Month closed
            </p>
          </div>
        </div>

        {/* Overview figures */}
        <dl className="grid grid-cols-3 border-b border-[var(--line)]">
          {[
            { k: "Revenue", v: 48620 },
            { k: "Expenses", v: 31940 },
            { k: "Net income", v: 16680, strong: true },
          ].map((f, i) => (
            <div key={f.k} data-hero="row" className={`px-5 py-4 sm:px-7 ${i > 0 ? "border-l border-[var(--line)]" : ""}`}>
              <dt className="t-label text-slate">{f.k}</dt>
              <dd
                className={`num mt-2 tracking-[-0.02em] ${
                  f.strong ? "font-display font-semibold text-[1.65rem] leading-none sm:text-[2rem]" : "text-[1.05rem] font-medium leading-tight sm:text-[1.2rem]"
                }`}
              >
                <span className="text-slate">$</span>
                {usd(f.v)}
              </dd>
            </div>
          ))}
        </dl>

        {/* Revenue vs expenses */}
        <div className="px-5 pb-4 pt-5 sm:px-7">
          <div data-hero="row" className="mb-4 flex items-center justify-between">
            <p className="text-[0.75rem] font-medium">Revenue vs. expenses</p>
            <div className="flex items-center gap-4 text-[0.6875rem] text-slate">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 bg-ink" aria-hidden="true" /> Revenue
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 bg-mist" aria-hidden="true" /> Expenses
              </span>
            </div>
          </div>
          <div className="relative" aria-hidden="true">
            {/* Scale rules */}
            <div className="absolute inset-x-0 top-0 h-[104px]">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="absolute inset-x-0 h-px bg-[var(--line)]" style={{ top: `${(i / 3) * 100}%` }} />
              ))}
            </div>
            <div className="relative grid h-[104px] grid-cols-6 items-end gap-3 sm:gap-5">
              {MONTHS.map((d, i) => {
                const last = i === MONTHS.length - 1;
                return (
                  <div key={d.m} className="flex h-full items-end justify-center gap-[3px]">
                    <span
                      data-hero="bar"
                      className={`w-full max-w-[14px] origin-bottom ${last ? "bg-gold" : "bg-ink"}`}
                      style={{ height: `${(d.rev / MAX) * 100}%` }}
                    />
                    <span
                      data-hero="bar"
                      className="w-full max-w-[14px] origin-bottom bg-mist"
                      style={{ height: `${(d.exp / MAX) * 100}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-6 gap-3 sm:gap-5">
              {MONTHS.map((d, i) => (
                <span key={d.m} className={`t-meta text-center ${i === MONTHS.length - 1 ? "text-ink" : "text-slate"}`}>
                  {d.m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close checklist rows */}
        <ul className="border-t border-[var(--line)] px-5 pb-14 text-[0.8125rem] sm:px-7 sm:pb-16">
          {[
            { k: "Bank and card accounts", v: "4 of 4 reconciled" },
            { k: "Transactions categorized", v: "386" },
            { k: "Items needing review", v: "0" },
          ].map((r) => (
            <li key={r.k} data-hero="row" className="flex items-center justify-between border-b border-[var(--line)] py-2.5 last:border-b-0">
              <span className="text-slate-2">{r.k}</span>
              <span className="num inline-flex items-center gap-2 font-medium">
                {r.v}
                <Check className="text-positive" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Supporting surfaces */}
      <div className="relative -mt-10 grid grid-cols-1 items-start gap-3 px-4 sm:grid-cols-[1.25fr_1fr] sm:px-6 lg:-ml-[2%] lg:mr-[6%] lg:px-0">
        <div
          data-hero="card"
          className="bg-card p-5 text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] transition-transform duration-700 ease-[var(--ease-out-quart)] hover:-translate-y-1"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="text-[0.8125rem] font-medium">Books reconciled</p>
            <span className="t-meta text-slate">Checking ··4021</span>
          </div>
          <dl className="mt-4 space-y-1.5 text-[0.75rem]">
            <div className="flex justify-between">
              <dt className="text-slate">Bank statement</dt>
              <dd className="num">$58,904.12</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate">Books</dt>
              <dd className="num">$58,904.12</dd>
            </div>
            <div className="flex justify-between border-t border-[var(--line-strong)] pt-1.5 font-medium">
              <dt>Difference</dt>
              <dd className="num inline-flex items-center gap-1.5 text-positive">
                $0.00 <Check />
              </dd>
            </div>
          </dl>
        </div>

        <div
          data-hero="card"
          className="bg-blue p-5 text-paper shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-[var(--ease-out-quart)] hover:-translate-y-1 sm:mt-8"
        >
          <p className="text-[0.8125rem] font-medium">Reporting organized</p>
          <ul className="mt-3 space-y-1.5 text-[0.75rem] text-paper/80">
            {["Profit and Loss", "Balance Sheet", "Cash Flow"].map((r) => (
              <li key={r} className="flex items-center justify-between">
                {r}
                <Check className="text-gold-soft" />
              </li>
            ))}
          </ul>
          <p className="t-meta mt-3 border-t border-[var(--line-dark-strong)] pt-2 text-paper/55">Delivered Nov 6</p>
        </div>
      </div>

      <figcaption data-hero="fade" className="mt-5 text-[0.6875rem] text-paper/45 lg:ml-[7%]">
        Illustrative example. Figures do not represent client data.
      </figcaption>
    </figure>
  );
}
