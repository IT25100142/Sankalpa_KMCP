/** Long, smooth “editorial” easing — similar to polished marketing / Figma-site motion */
export const easeSmooth = [0.16, 1, 0.3, 1]

export const easeOutSoft = [0.33, 1, 0.68, 1]

export const transition = {
  pageEnter: { duration: 0.55, ease: easeSmooth },
  pageExit: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
  navIntro: { duration: 0.55, ease: easeSmooth },
  stagger: { staggerChildren: 0.08, delayChildren: 0.04 },
  child: { duration: 0.55, ease: easeSmooth },
  hoverCard: { duration: 0.32, ease: easeSmooth },
}
