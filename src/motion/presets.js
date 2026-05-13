/**
 * Polished cubic-beziers for an editorial / Apple-Linear feel.
 * - easeSmooth: long, soft "marketing site" curve
 * - easeOutExpo: snappy entrance with a long tail
 * - easeOutStrong: confident exits and overlay reveals
 * - easeEditorial: dramatic 0.76/0/0.24/1 for hero typography
 * - easeInOutSoft: gentle two-sided ease for ambient loops
 */
export const easeSmooth = [0.16, 1, 0.3, 1]
export const easeOutSoft = [0.33, 1, 0.68, 1]
export const easeOutExpo = [0.16, 1, 0.3, 1]
export const easeOutStrong = [0.22, 1, 0.36, 1]
export const easeEditorial = [0.76, 0, 0.24, 1]
export const easeInOutSoft = [0.65, 0, 0.35, 1]

/** Spring used by magnetic buttons / cards. Tight but not rigid. */
export const magnetSpring = { stiffness: 180, damping: 18, mass: 0.6 }

/** Spring used by tilt rotation. */
export const tiltSpring = { stiffness: 220, damping: 22, mass: 0.5 }

export const transition = {
  pageEnter: { duration: 0.7, ease: easeOutExpo },
  pageExit: { duration: 0.45, ease: easeOutStrong },
  pageMaskIn: { duration: 0.55, ease: easeEditorial },
  pageMaskOut: { duration: 0.65, ease: easeEditorial, delay: 0.05 },
  navIntro: { duration: 0.6, ease: easeOutExpo },
  stagger: { staggerChildren: 0.08, delayChildren: 0.06 },
  heroStagger: { staggerChildren: 0.06, delayChildren: 0.15 },
  heroLine: { duration: 0.95, ease: easeEditorial },
  child: { duration: 0.6, ease: easeOutExpo },
  hoverCard: { duration: 0.35, ease: easeOutExpo },
  spotlight: { duration: 0.6, ease: easeOutExpo },
}
