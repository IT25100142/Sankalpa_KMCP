import { profile, activeSocialEntries } from '../data/profile'
import Container from './ui/Container'
import Card from './ui/Card'

export default function Footer() {
  const socials = activeSocialEntries()

  return (
    <footer className="relative z-10 mt-20 border-t border-obsidian-950/10">
      <Container className="py-10">
        <Card className="p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-lg font-semibold tracking-tight text-obsidian-950">{profile.name}</div>
              <div className="text-sm text-obsidian-950/60">{profile.tagline}</div>
            </div>
            {socials.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                {socials.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost text-sm"
                  >
                    {key}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-obsidian-950/55">
            <div>© {new Date().getFullYear()} {profile.name}. All rights reserved.</div>
            <div className="text-obsidian-950/45">Vite • React • Tailwind • Motion</div>
          </div>
        </Card>
      </Container>
    </footer>
  )
}

