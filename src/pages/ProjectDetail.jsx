import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { profile } from '../data/profile'
import Tag from '../components/ui/Tag'
import Eyebrow from '../components/ui/Eyebrow'

function NotFound() {
  return (
    <PageTransition>
      <Container className="pt-12 sm:pt-16">
        <SectionHeading eyebrow="Projects" title="Project not found" subtitle="The link may be outdated." />
        <div className="mt-8">
          <Button to="/projects" variant="ghost">
            Back to projects
          </Button>
        </div>
      </Container>
    </PageTransition>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()

  const project = useMemo(() => profile.projects.find((p) => p.slug === slug), [slug])
  if (!project) return <NotFound />

  const coverSrc = String(project.coverSrc || '').trim()
  const coverAlt = String(project.coverAlt || project.title || '').trim() || project.title

  const meta = [
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
    { label: 'Stack', value: (project.stack || []).join(' • ') },
  ].filter((m) => m.value)

  return (
    <PageTransition>
      <Container className="pt-12 sm:pt-16">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link to="/projects" className="btn-link">
            <span aria-hidden>←</span> Projects
          </Link>
          <div className="flex items-center gap-2">
            {project.demoUrl ? (
              <Button href={project.demoUrl} target="_blank" size="sm">
                Live
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button href={project.githubUrl} target="_blank" variant="ghost" size="sm">
                GitHub
              </Button>
            ) : null}
          </div>
        </div>

        {coverSrc ? (
          <div className="mt-10 overflow-hidden rounded-3xl border border-semantic-borderHairline bg-white/60 shadow-sm">
            <div className="aspect-[21/9] min-h-[160px] w-full sm:aspect-[2.4/1]">
              <img
                src={coverSrc}
                alt={coverAlt}
                loading="eager"
                decoding="async"
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 text-obsidian-950">
            <Eyebrow className="text-neutral-500">{project.year}</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl tracking-[-0.03em] leading-tight text-obsidian-950">
              {project.title}
            </h1>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-600">
              {project.longDescription || project.description}
            </p>
          </div>

          <Card interactive className="lg:col-span-5 p-6 sm:p-8">
            <Eyebrow>Overview</Eyebrow>
            <div className="mt-5 space-y-4">
              {meta.map((m) => (
                <div key={m.label} className="flex items-start justify-between gap-6">
                  <div className="text-sm font-semibold text-obsidian-950/70">{m.label}</div>
                  <div className="text-sm text-obsidian-950/80 text-right">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {(project.tags || []).map((t) => (
                <Tag key={t}>
                  {t}
                </Tag>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <Card interactive className="lg:col-span-12 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <Eyebrow>Problem</Eyebrow>
                <p className="mt-4 text-sm leading-relaxed text-semantic-body">
                  {project.caseStudy?.problem ||
                    'Placeholder: a clear description of what was broken, missing, or unclear—and why it mattered.'}
                </p>
              </div>
              <div>
                <Eyebrow>Approach</Eyebrow>
                <p className="mt-4 text-sm leading-relaxed text-semantic-body">
                  {project.caseStudy?.approach ||
                    'Placeholder: constraints, decisions, and how you balanced design, engineering, and time.'}
                </p>
              </div>
              <div>
                <Eyebrow>Result</Eyebrow>
                <p className="mt-4 text-sm leading-relaxed text-semantic-body">
                  {project.caseStudy?.result ||
                    'Placeholder: what shipped, what improved, and how you measured success.'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 pb-2">
          {(project.gallery || []).map((g) => {
            const gallerySrc = String(g.src || '').trim()
            return (
              <Card key={g.alt} className="p-0 overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-obsidian-950/[0.04] to-transparent">
                  {gallerySrc ? (
                    <img
                      src={gallerySrc}
                      alt={g.alt}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full min-h-[10rem] w-full place-items-center text-neutral-500">
                      <Eyebrow className="text-neutral-500">Image placeholder</Eyebrow>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-obsidian-950">{g.alt}</div>
                  {g.caption ? <div className="mt-2 text-sm text-obsidian-950/65">{g.caption}</div> : null}
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </PageTransition>
  )
}

