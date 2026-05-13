import { NavLink } from 'react-router-dom'
import { profile, activeSocialEntries } from '../data/profile'
import Container from './ui/Container'
import Card from './ui/Card'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

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
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {footerLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    [
                      'rounded-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                      isActive ? 'text-obsidian-950' : 'text-obsidian-950/55 hover:text-obsidian-950/80',
                    ].join(' ')
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="text-obsidian-950/45 sm:text-right">Vite • React • Tailwind • Motion</div>
          </div>
        </Card>
      </Container>
    </footer>
  )
}

