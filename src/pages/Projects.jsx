import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { profile } from '../data/profile'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const showGithub = Boolean(profile.socials.github?.trim())
  const reduce = useReducedMotion()
  const pageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start end', 'end start'],
  })
  const headingYRaw = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const gridYRaw = useTransform(scrollYProgress, [0, 1], [10, -10])
  const headingY = reduce ? 0 : headingYRaw
  const gridY = reduce ? 0 : gridYRaw

  return (
    <PageTransition>
      <Container ref={pageRef} className="pt-12 sm:pt-16">
        <motion.div
          className="flex items-end justify-between gap-6 flex-wrap"
          style={{ y: headingY }}
        >
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            subtitle="Case studies that focus on the details that matter: hierarchy, rhythm, and product clarity."
          />
          {showGithub ? (
            <Button href={profile.socials.github} target="_blank" variant="ghost" size="sm">
              GitHub
            </Button>
          ) : null}
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          style={{ y: gridY }}
        >
          {profile.projects.map((p, index) => (
            <ProjectCard key={p.slug} project={p} index={index} />
          ))}
        </motion.div>
      </Container>
    </PageTransition>
  )
}
