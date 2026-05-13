import PageTransition from '../components/PageTransition'
import { profile } from '../data/profile'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const showGithub = Boolean(profile.socials.github?.trim())

  return (
    <PageTransition>
      <Container className="pt-12 sm:pt-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
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
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {profile.projects.map((p, index) => (
            <ProjectCard key={p.slug} project={p} index={index} />
          ))}
        </div>
      </Container>
    </PageTransition>
  )
}

