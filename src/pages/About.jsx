import PageTransition from '../components/PageTransition'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import Eyebrow from '../components/ui/Eyebrow'
import { easeSmooth } from '../motion/presets'

const skills = [
  { name: 'React + UI engineering', level: 92 },
  { name: 'Motion design', level: 86 },
  { name: 'Design systems', level: 84 },
  { name: 'Performance + accessibility', level: 88 },
]

export default function About() {
  const reduce = useReducedMotion()
  return (
    <PageTransition>
      <Container className="pt-12 sm:pt-16">
        <SectionHeading
          eyebrow="About"
          title="A calm approach to premium product UI"
          subtitle="I build interfaces with a deliberately restrained aesthetic—clear hierarchy, quiet motion, and details that feel considered rather than decorated."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <Card interactive className="lg:col-span-7 p-6 sm:p-10">
            <Eyebrow>Story</Eyebrow>
            <div className="mt-4 text-xl sm:text-2xl font-semibold tracking-tight text-obsidian-950">
              Design-forward engineering, built for real constraints
            </div>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-semantic-body">
              I like interfaces that feel inevitable: the spacing is confident, the typography is composed,
              and interaction patterns are predictable. The goal is to make a product feel expensive—without
              being loud.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-semantic-body">
              This portfolio uses placeholder copy for now; once you share your real projects, I can
              tailor the narrative and tone to match your work.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Design systems', 'Landing pages', 'Dashboards', 'Component architecture'].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-semantic-borderSubtle bg-white/60 px-4 py-3 text-sm text-obsidian-950/75"
                >
                  {t}
                </div>
              ))}
            </div>
          </Card>

          <Card interactive className="lg:col-span-5 p-6 sm:p-10">
            <Eyebrow>Principles</Eyebrow>
            <div className="mt-5 space-y-4 text-sm sm:text-base text-semantic-body">
              <p>
                <span className="text-obsidian-950 font-semibold">Clarity first.</span> Every element earns its
                place.
              </p>
              <p>
                <span className="text-obsidian-950 font-semibold">Motion with purpose.</span> Never noise—only
                feedback.
              </p>
              <p>
                <span className="text-obsidian-950 font-semibold">Durable engineering.</span> Accessibility and
                performance are part of the aesthetic.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <Card interactive className="lg:col-span-12 p-6 sm:p-10">
            <Eyebrow>Skills</Eyebrow>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-obsidian-950/80 font-semibold">{s.name}</span>
                    <span className="text-obsidian-950/45">{s.level}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-obsidian-950/[0.08] overflow-hidden">
                    {reduce ? (
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-600 to-pearl-50/70"
                        style={{ width: `${s.level}%` }}
                      />
                    ) : (
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent-600 to-pearl-50/70"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.05, ease: easeSmooth }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </PageTransition>
  )
}

