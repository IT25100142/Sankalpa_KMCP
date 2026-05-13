import { motion, useReducedMotion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { profile } from '../data/profile'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import ProjectCard from '../components/ProjectCard'
import Eyebrow from '../components/ui/Eyebrow'
import { easeSmooth, transition as motionTransition } from '../motion/presets'

export default function Home() {
  const reduce = useReducedMotion()

  const heroContainer = {
    hidden: {},
    show: reduce
      ? {}
      : {
          transition: motionTransition.stagger,
        },
  }

  const heroItem = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: motionTransition.child,
    },
  }

  const cardsContainer = {
    hidden: {},
    show: reduce ? {} : { transition: { staggerChildren: 0.14, delayChildren: 0.12 } },
  }

  const cardItem = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeSmooth } },
  }

  return (
    <PageTransition>
      <section className="relative min-h-[100dvh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500/[0.07] via-rose-500/[0.045] to-transparent blur-2xl motion-safe:animate-ambient-drift"
            style={{ willChange: 'transform', transform: 'translate3d(-50%, 0, 0)' }}
          />
          <div
            className="absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/[0.06] via-rose-400/[0.035] to-transparent blur-2xl motion-safe:animate-ambient-drift-reverse"
            style={{ animationDelay: '-7s', willChange: 'transform', transform: 'translate3d(-50%, 0, 0)' }}
          />
        </div>

        <Container
          fluid
          className="relative flex min-h-[100dvh] flex-col justify-center pt-24 pb-16 sm:pt-28 sm:pb-20"
        >
          <motion.div
            className="max-w-3xl"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={heroItem}>
              <div className="inline-flex items-center gap-3 rounded-full border border-obsidian-950/10 bg-white/80 px-4 py-2 text-xs tracking-[0.18em] uppercase text-neutral-600 backdrop-blur-sm shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                Portfolio & selected work
              </div>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="mt-8 font-serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-[-0.03em] text-obsidian-950"
            >
              {profile.name}
              <span className="block font-sans mt-4 text-base sm:text-lg md:text-xl tracking-[-0.01em] text-neutral-600 font-normal">
                {profile.tagline} — a monochrome, editorial space for projects, craft, and how I like to build on the
                web.
              </span>
            </motion.h1>

            <motion.div
              variants={heroItem}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-4"
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={cardItem} className="md:col-span-7">
              <Card interactive className="h-full p-6 sm:p-8">
                <Eyebrow>Focus</Eyebrow>
                <div className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-obsidian-950">
                  Calm interfaces, clear hierarchy, and polish that survives real use
                </div>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-semantic-body">
                  This portfolio highlights selected work and how I approach layout, motion, and detail—built to feel
                  intentional rather than loud.
                </p>
              </Card>
            </motion.div>
            <motion.div variants={cardItem} className="md:col-span-5">
              <Card interactive className="h-full p-6 sm:p-8">
                <Eyebrow>Capabilities</Eyebrow>
                <ul className="mt-4 space-y-3 text-sm text-semantic-body">
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
          </motion.div>
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
