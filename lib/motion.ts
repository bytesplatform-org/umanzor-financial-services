"use client";

import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** One tempo for the whole site. */
export const EASE = {
  out: "power3.out",
  soft: "power2.out",
  expo: "expo.out",
} as const;

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scoped GSAP setup with automatic cleanup. The callback only runs when the
 * visitor has not asked for reduced motion; everything it creates
 * (tweens, ScrollTriggers) is reverted on unmount.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (root: HTMLElement) => void | (() => void),
  deps: DependencyList = [],
) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(MOTION_OK, () => setup(root));
    return () => mm.revert();
  }, deps);
}

/**
 * Shared scroll vocabulary, driven by data attributes:
 *  data-reveal        soft rise and fade
 *  data-rule          hairline that draws from the left
 *  data-mask-line     masked line reveal (child of an overflow-hidden wrapper)
 */
export function revealOnScroll(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((el) => {
    gsap.from(el, {
      y: 22,
      autoAlpha: 0,
      duration: 0.95,
      ease: EASE.out,
      delay: Number(el.dataset.revealDelay ?? 0),
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-rule]", root).forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: EASE.expo,
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  const lineGroups = gsap.utils.toArray<HTMLElement>("[data-mask-group]", root);
  lineGroups.forEach((group) => {
    gsap.from(group.querySelectorAll("[data-mask-line]"), {
      yPercent: 108,
      duration: 1.1,
      ease: EASE.expo,
      stagger: 0.09,
      scrollTrigger: { trigger: group, start: "top 85%", once: true },
    });
  });
}
