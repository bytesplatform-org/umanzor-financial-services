"use client";

import { EASE, gsap, revealOnScroll } from "@/lib/motion";

/**
 * Home page scroll vocabulary (on top of lib/motion's data-reveal):
 *  data-blur-group   words ([data-w]) rise out of a blur, one after another
 *  data-scrub-group  words darken from mist to ink as the block scrolls through
 *  data-pop-group    children ([data-pop]) pop in with a little overshoot
 */
export function blurWords(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-blur-group]", root).forEach((group) => {
    gsap.fromTo(
      group.querySelectorAll("[data-w]"),
      { autoAlpha: 0, filter: "blur(10px)", yPercent: 35 },
      {
        autoAlpha: 1,
        filter: "blur(0px)",
        yPercent: 0,
        duration: 0.9,
        ease: EASE.out,
        stagger: 0.045,
        scrollTrigger: { trigger: group, start: "top 86%", once: true },
      },
    );
  });
}

export function scrubWords(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-scrub-group]", root).forEach((group) => {
    // Each word scrubs to its own resting colour, so accents survive.
    const words = gsap.utils.toArray<HTMLElement>("[data-w]", group);
    const finals = words.map((w) => getComputedStyle(w).color);
    gsap.fromTo(
      words,
      { color: "#c4cad4" },
      {
        color: (i: number) => finals[i],
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: group, start: "top 78%", end: "bottom 48%", scrub: 0.6 },
      },
    );
  });
}

export function popIn(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-pop-group]", root).forEach((group) => {
    gsap.from(group.querySelectorAll("[data-pop]"), {
      scale: 0.4,
      autoAlpha: 0,
      duration: 0.7,
      ease: "back.out(2)",
      stagger: 0.06,
      scrollTrigger: { trigger: group, start: "top 82%", once: true },
    });
  });
}

/** Everything a typical section needs. */
export function sectionMotion(root: HTMLElement) {
  blurWords(root);
  scrubWords(root);
  popIn(root);
  revealOnScroll(root);
}
