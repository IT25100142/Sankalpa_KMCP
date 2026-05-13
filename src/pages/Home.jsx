import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { profile } from '../data/profile'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import ProjectCard from '../components/ProjectCard'
import Eyebrow from '../components/ui/Eyebrow'
import { easeEditorial, easeOutExpo } from '../motion/presets'

export default function Home() {
  const reduce = useReducedMotion()
  const heroRef = useRef(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroYRaw = useTransform(heroProgress, [0, 1], [0, -60])
  const heroOpacityRaw = useTransform(heroProgress, [0, 1], [1, 0.4])
  const blobAYRaw = useTransform(heroProgress, [0, 1], [0, -120])
  const blobBYRaw = useTransform(heroProgress, [0, 1], [0, 80])

  const heroY = reduce ? 0 : heroYRaw
  const heroOpacity = reduce ? 1 : heroOpacityRaw
  const blobAY = reduce ? 0 : blobAYRaw
  const blobBY = reduce ? 0 : blobBYRaw

  const nameWords = profile.name.split(' ')

  return (
    <PageTransition>
      <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
        <motion.div className="pointer-events-none absolute inset-0" style={{ y: blobAY }}>
          <div
            className="absolute -top-40 left-1/2 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-300/[0.16] via-rose-300/[0.12] to-transparent blur-3xl motion-safe:animate-ambient-drift"
            style={{ willChange: 'transform', transform: 'translate3d(-50%, 0, 0)' }}
          />
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-0" style={{ y: blobBY }}>
          <div
            className="absolute -bottom-40 left-1/2 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-stone-400/[0.14] via-amber-200/[0.12] to-transparent blur-3xl motion-safe:animate-ambient-drift-reverse"
            style={{ animationDelay: '-7s', willChange: 'transform', transform: 'translate3d(-50%, 0, 0)' }}
          />
        </motion.div>

        <Container
          fluid
          className="relative flex min-h-[100dvh] flex-col justify-center pt-24 pb-16 sm:pt-28 sm:pb-20"
        >
          <motion.div className="max-w-4xl" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.05 }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-obsidian-950/[0.09] bg-white/[0.78] px-4 py-2.5 text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-semantic-muted backdrop-blur-xl shadow-immersive">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500 shadow-[0_0_18px_rgba(251,113,133,0.6)]" />
                Portfolio & selected work
              </div>
            </motion.div>

            <h1 className="mt-8 font-serif text-[3.25rem] sm:text-7xl md:text-[7.5rem] leading-[0.92] tracking-[-0.045em] text-obsidian-950">
              {reduce
                ? profile.name
                : nameWords.map((w, i) => (
                    <span
                      key={`${w}-${i}`}
                      className="inline-block overflow-hidden align-bottom"
                      style={{ marginRight: '0.18em' }}
                    >
                      <motion.span
                        className="inline-block will-change-transform"
                        initial={{ y: '110%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        transition={{
                          duration: 0.95,
                          ease: easeEditorial,
                          delay: 0.25 + i * 0.08,
                        }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  ))}
            </h1>

            <motion.div
              className="mt-8 max-w-2xl overflow-hidden"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.55 + nameWords.length * 0.08 }}
            >
              <p className="font-sans text-base sm:text-lg md:text-xl tracking-[-0.005em] text-semantic-body font-light leading-snug">
                {profile.tagline} — a monochrome, editorial space for projects, craft, and how I like to build on
                the web.
              </p>
            </motion.div>

            <motion.div
              className="mt-11 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.7 + nameWords.length * 0.08 }}
            >
              <Button to="/projects" className="w-full sm:w-auto">
                View selected work
              </Button>
              <Button href={`mailto:${profile.email}`} variant="ghost" className="w-full sm:w-auto">
                Start a conversation
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section className="relative pb-16 sm:pb-20">
        <Container fluid className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <motion.div
              className="md:col-span-7"
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: easeOutExpo }}
            >
              <Card interactive spotlight className="h-full p-6 sm:p-8">
                <Eyebrow>Focus</Eyebrow>
                <div className="mt-4 font-serif text-2xl sm:text-3xl tracking-[-0.015em] leading-[1.15] text-obsidian-950">
                  Calm interfaces, clear hierarchy, and polish that survives real use
                </div>
                <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-semantic-body">
                  This portfolio highlights selected work and how I approach layout, motion, and detail—built to feel
                  intentional rather than loud.
                </p>
              </Card>
            </motion.div>
            <motion.div
              className="md:col-span-5"
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.1 }}
            >
              <Card interactive spotlight className="h-full p-6 sm:p-8">
                <Eyebrow>Capabilities</Eyebrow>
                <ul className="mt-4 space-y-3 text-sm font-light text-semantic-body">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    Product UI, component structure, and consistent spacing and type
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    Motion as feedback (Framer Motion, restrained micro-interactions)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                    Accessible, performant front ends with attention to finish
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="mt-10 pb-6">
        <Container>
          <SectionHeading
            eyebrow="Work"
            title="Selected projects"
            subtitle="Case-style entries you can swap for your own shipped work—layout, narrative, and motion kept tight."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {profile.projects.slice(0, 4).map((p, index) => (
              <ProjectCard key={p.slug} project={p} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
