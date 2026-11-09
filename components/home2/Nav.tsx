"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSULT_URL, CONTACT } from "@/lib/content";
import logo from "@/public/brand/umanzor-logo.png";
import { Icon, PILL_DARK } from "./kit";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Client stories", href: "#stories" },
  { label: "How it works", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled || open
          ? "bg-silver/85 shadow-[0_1px_0_rgb(15_27_51/0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="shell flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="Umanzor Financial Services, home" className="shrink-0">
          <Image src={logo} alt="" preload sizes="64px" className="h-[54px] w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.8125rem] font-medium text-royal-deep/80">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-line py-1 transition-colors hover:text-royal-deep">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            aria-label={`Call ${CONTACT.phoneDisplay}`}
            className="grid size-10 place-items-center rounded-full bg-white text-royal-deep ring-1 ring-black/[0.06] transition-colors hover:bg-royal-tint"
          >
            <Icon name="phone" className="size-4" />
          </a>
          <a href={CONSULT_URL} className={`${PILL_DARK} !h-10 max-sm:hidden`}>
            Free consultation
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="h2-mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full bg-royal-deep text-white md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3 7h14M3 13h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="h2-mobile-nav" aria-label="Mobile" className="shell pb-6 md:hidden">
          <ul className="flex flex-col gap-1 text-[1.125rem] font-medium">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={CONSULT_URL} className={`${PILL_DARK} mt-4 w-full`}>
            Schedule a free consultation
          </a>
        </nav>
      )}
    </header>
  );
}
