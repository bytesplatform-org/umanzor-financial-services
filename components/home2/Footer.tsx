import Image from "next/image";
import { CONSULT_URL, CONTACT, SERVICES } from "@/lib/content";
import logo from "@/public/brand/umanzor-logo.png";

/** Cached so the static shell can prerender; refreshes with the cache lifetime. */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

/* ------------------------------------------------------------------
   Footer: soft grey panel.
------------------------------------------------------------------- */
export default function Footer2() {
  return (
    <footer className="shell pb-6">
      <div className="rounded-[28px] bg-silver-2/70 p-7 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image src={logo} alt="Umanzor Financial Services" sizes="72px" className="h-16 w-auto" />
            <p className="mt-5 text-[1.5rem] font-medium leading-tight tracking-[-0.04em]">
              Your business,
              <br />
              your numbers, made clear.
            </p>
            <p className="mt-3 max-w-[20rem] text-[0.8125rem] leading-relaxed text-steel">
              {CONTACT.location}. {CONTACT.reach}.
            </p>
            <ul className="mt-6 flex gap-2">
              {CONTACT.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center rounded-full bg-white px-4 text-[0.75rem] font-medium ring-1 ring-black/[0.06] transition-colors hover:bg-royal-tint"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Services">
            <p className="text-[0.8125rem] font-semibold">Services</p>
            <ul className="mt-4 space-y-2.5 text-[0.8125rem] text-steel">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a href="#services" className="link-line hover:text-royal-deep">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="text-[0.8125rem] font-semibold">Company</p>
            <ul className="mt-4 space-y-2.5 text-[0.8125rem] text-steel">
              <li><a href="#about" className="link-line hover:text-royal-deep">About</a></li>
              <li><a href="#stories" className="link-line hover:text-royal-deep">Client stories</a></li>
              <li><a href="#process" className="link-line hover:text-royal-deep">How it works</a></li>
              <li>
                <a href={CONSULT_URL} className="link-line hover:text-royal-deep">
                  Free consultation
                </a>{" "}
                <span className="ml-1 rounded-full bg-coral/15 px-2 py-0.5 text-[0.625rem] font-medium text-coral">Free</span>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[0.8125rem] font-semibold">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[0.8125rem] text-steel">
              <li>
                <a href={CONTACT.phoneHref} className="link-line num hover:text-royal-deep">{CONTACT.phoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="link-line break-all hover:text-royal-deep">{CONTACT.email}</a>
              </li>
              {CONTACT.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-royal-deep/10 pt-6 text-[0.75rem] text-steel">
          <p>&copy; <CopyrightYear /> Umanzor Financial Services LLC. All rights reserved.</p>
          <p>{CONTACT.location}</p>
        </div>
      </div>
    </footer>
  );
}
