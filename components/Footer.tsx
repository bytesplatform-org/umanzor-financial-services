import { CONSULT_URL, CONTACT, SERVICES } from "@/lib/content";
import { Wordmark } from "./ui";

/** Cached so the static shell can prerender; refreshes with the cache lifetime. */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const COMPANY = [
  { label: "About", href: "#about" },
  { label: "Success Stories", href: "#success-stories" },
  { label: "Services", href: "#services" },
  { label: "Schedule a Consultation", href: CONSULT_URL },
];

export default function Footer() {
  return (
    <footer className="bg-ink-3 text-paper">
      <div className="shell">
        <div className="grid gap-12 border-t border-[var(--line-dark)] py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:py-20">
          <div className="lg:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-6 max-w-[22rem] text-[0.875rem] leading-relaxed text-paper/55">
              Bookkeeping, financial reporting, payroll support, and business formation help for small business owners who want
              to understand their numbers.
            </p>
          </div>

          <nav aria-label="Services" className="lg:col-span-3 lg:col-start-6">
            <h2 className="t-label text-paper/40">Services</h2>
            <ul className="mt-5 space-y-2.5 text-[0.875rem] text-paper/75">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="link-line hover:text-paper">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="t-label text-paper/40">Company</h2>
            <ul className="mt-5 space-y-2.5 text-[0.875rem] text-paper/75">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="link-line hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="t-label text-paper/40">Contact</h2>
            <address className="mt-5 space-y-2.5 text-[0.875rem] not-italic text-paper/75">
              <p>
                <a href={CONTACT.phoneHref} className="link-line num hover:text-paper">
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className="link-line break-all hover:text-paper">
                  {CONTACT.email}
                </a>
              </p>
              <p>{CONTACT.location}</p>
            </address>
            <ul className="mt-6 flex gap-5 text-[0.8125rem] text-paper/55">
              {CONTACT.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line hover:text-paper">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--line-dark)] py-8 text-[0.75rem] text-paper/40 sm:flex-row sm:justify-between">
          <p>&copy; <CopyrightYear /> Umanzor Financial Services LLC. All rights reserved.</p>
          <p>
            {CONTACT.location} | {CONTACT.reach}
          </p>
        </div>
      </div>
    </footer>
  );
}
