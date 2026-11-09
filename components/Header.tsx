"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONSULT_URL, CONTACT, NAV } from "@/lib/content";
import { EASE, gsap, MOTION_OK } from "@/lib/motion";
import { Arrow, Index, Wordmark } from "./ui";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Entrance: the first beat of the hero choreography.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        header.querySelector("[data-header-inner]"),
        { autoAlpha: 0, y: -10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: EASE.out,
          delay: 0.1,
          onComplete: () => {
            setReady(true);
            gsap.set(header.querySelector("[data-header-inner]"), { clearProps: "all" });
          },
        },
      );
    });
    // Reduced motion needs no flag: without .motion-ok the pre-hide CSS never applies.
    return () => mm.revert();
  }, []);

  // Compact state.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Active section.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) menuButtonRef.current?.focus();
  }, []);

  // Menu: scroll lock, Escape, focus containment.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const panel = panelRef.current;
    // Wait for the panel to leave its inert/hidden state before moving focus into it.
    const focusTimer = window.setTimeout(() => panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(focusTimer);
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeMenu]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    closeMenu(false);
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: matchMedia(MOTION_OK).matches ? "smooth" : "auto" });
      history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
      target.focus({ preventScroll: true });
    });
  };

  const solid = scrolled;

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header ${ready ? "is-ready" : ""} fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500 ease-[var(--ease-out-quart)] ${
          solid ? "border-b border-[var(--line)] bg-paper text-ink" : "border-b border-transparent text-paper"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <div
          data-header-inner
          className={`shell flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out-quart)] ${
            solid ? "h-16" : "h-[var(--header-h)]"
          }`}
        >
          <a href="#top" onClick={(e) => goTo(e, "top")} aria-label="Umanzor Financial Services, home" className="shrink-0">
            <Wordmark tone={solid ? "dark" : "light"} className="origin-left transition-transform duration-500" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.875rem]">
              {NAV.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => goTo(e, item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative py-2 transition-colors duration-300 ${
                        isActive ? "" : solid ? "text-slate-2 hover:text-ink" : "text-paper/65 hover:text-paper"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-px h-px origin-left bg-gold transition-transform duration-500 ease-[var(--ease-out-quart)] ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CONSULT_URL}
              className={`btn group !h-10 !px-4 !text-[0.8125rem] max-sm:hidden ${solid ? "btn-ink" : "btn-gold"}`}
            >
              Schedule a Consultation
              <Arrow />
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 flex h-11 items-center gap-3 px-2 text-[0.8125rem] font-medium lg:hidden"
            >
              Menu
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed inset-0 z-[60] flex flex-col bg-ink text-paper transition-[clip-path,visibility] duration-700 ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between">
          <Wordmark tone="light" />
          <button
            type="button"
            data-autofocus
            onClick={() => closeMenu()}
            className="-mr-2 flex h-11 items-center gap-3 px-2 text-[0.8125rem] font-medium"
          >
            Close
            <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" stroke="currentColor" strokeWidth="1.3">
              <path d="M3 3l10 10M13 3 3 13" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center overflow-y-auto py-8">
          <ul className="border-t border-[var(--line-dark)]">
            {NAV.map((item, i) => (
              <li
                key={item.id}
                className="border-b border-[var(--line-dark)] transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]"
                style={{
                  transitionDelay: open ? `${180 + i * 55}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(18px)",
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => goTo(e, item.id)}
                  aria-current={active === item.id ? "location" : undefined}
                  className="group flex items-baseline gap-5 py-4"
                >
                  <Index n={i + 1} className="t-meta text-gold" />
                  <span className="font-display font-semibold text-[2.4rem] leading-none tracking-[-0.01em] sm:text-5xl">{item.label}</span>
                  <Arrow className="ml-auto self-center text-paper/50" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="shell flex flex-col gap-5 pb-8 transition-opacity duration-700"
          style={{ transitionDelay: open ? "480ms" : "0ms", opacity: open ? 1 : 0 }}
        >
          <a href={CONSULT_URL} className="btn btn-gold group w-full">
            Schedule a Free Consultation
            <Arrow />
          </a>
          <div className="flex items-center justify-between text-sm text-paper/65">
            <a href={CONTACT.phoneHref} className="link-line num">
              {CONTACT.phoneDisplay}
            </a>
            <span>{CONTACT.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
