import { NavLink, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import Container from './ui/Container'
import { profile } from '../data/profile'
import { Button } from './ui/Button'
import { easeSmooth, transition as motionTransition } from '../motion/presets'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

const navLinkClass = ({ isActive }) =>
  cx(
    'relative rounded-full px-3 sm:px-4 py-2 text-sm font-semibold transition-[color,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl-50',
    'text-obsidian-950/70 hover:text-obsidian-950',
    isActive ? 'text-obsidian-950 bg-obsidian-950/[0.06] border border-obsidian-950/15' : 'border border-transparent',
  )

export default function Navbar() {
  const showGithub = Boolean(profile.socials.github?.trim())
  const location = useLocation()
  const reduce = useReducedMotion()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(80)
  const lastY = useRef(0)
  const scrollTicking = useRef(false)
  const shellRef = useRef(null)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)
  const menuPanelId = useId()

  const measureHeader = useCallback(() => {
    const el = shellRef.current
    if (!el) return
    setHeaderHeight(el.offsetHeight)
  }, [])

  useLayoutEffect(() => {
    measureHeader()
  }, [measureHeader, solid, menuOpen])

  useEffect(() => {
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureHeader) : null
    if (shellRef.current && ro) ro.observe(shellRef.current)
    window.addEventListener('resize', measureHeader)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measureHeader)
    }
  }, [measureHeader])

  useEffect(() => {
    lastY.current = window.scrollY || 0
    const onScroll = () => {
      if (scrollTicking.current) return
      scrollTicking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY || 0
        const dy = y - lastY.current
        const shouldHide = dy > 6 && y > 72
        const shouldShow = dy < -6
        if (shouldHide) setHidden(true)
        if (shouldShow) setHidden(false)
        setSolid(y > 12)
        lastY.current = y
        scrollTicking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setHidden(false)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [location.pathname, reduce])

  useEffect(() => {
    if (!menuOpen) return
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 0)
    return () => window.clearTimeout(t)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const hideOffset = Math.max(headerHeight + 8, 88)
  const translateY = hidden && !menuOpen ? -hideOffset : 0

  return (
    <motion.header
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={reduce ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={motionTransition.navIntro}
      className="sticky top-0 z-50"
      style={{
        transform: `translateY(${translateY}px)`,
        transition: reduce ? 'none' : `transform 520ms cubic-bezier(${easeSmooth.join(',')})`,
      }}
    >
      <div
        ref={shellRef}
        className={cx(
          'border-b',
          solid || menuOpen
            ? 'border-obsidian-950/10 bg-white/80 backdrop-blur-md'
            : 'border-transparent',
        )}
      >
        <Container className="py-4 flex items-center justify-between gap-4">
          <NavLink to="/" className="group flex min-w-0 max-w-[min(100%,18rem)] sm:max-w-none items-center gap-2 sm:gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl-50">
            <span className="relative inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-xl surface hairline px-1">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
              <span className="relative text-xs font-semibold tracking-tight text-obsidian-950">SK</span>
            </span>
            <span className="hidden sm:block truncate font-semibold tracking-tight text-obsidian-950 group-hover:text-obsidian-950">
              {profile.name}
            </span>
          </NavLink>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1 sm:gap-2" aria-label="Primary">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className={navLinkClass}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
            {showGithub ? (
              <>
                <div className="hidden md:block h-8 w-px bg-obsidian-950/15" />
                <Button
                  href={profile.socials.github}
                  target="_blank"
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex"
                >
                  GitHub
                </Button>
              </>
            ) : null}

            <button
              ref={menuButtonRef}
              type="button"
              className={cx(
                'md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-obsidian-950/15 bg-white text-obsidian-950 outline-none transition-colors hover:bg-obsidian-950/[0.04] focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl-50',
                menuOpen && 'bg-obsidian-950/[0.06] border-obsidian-950/20',
              )}
              aria-expanded={menuOpen}
              aria-controls={menuPanelId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? 'Close navigation' : 'Open navigation'}</span>
              <span aria-hidden className="relative block h-3 w-4">
                <span
                  className={cx(
                    'absolute left-0 right-0 top-0 h-0.5 rounded-full bg-obsidian-950 transition-all duration-200',
                    menuOpen && 'top-[5px] rotate-45',
                  )}
                />
                <span
                  className={cx(
                    'absolute left-0 right-0 top-[5px] h-0.5 rounded-full bg-obsidian-950 transition-opacity duration-200',
                    menuOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cx(
                    'absolute left-0 right-0 top-[10px] h-0.5 rounded-full bg-obsidian-950 transition-all duration-200',
                    menuOpen && 'top-[5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </Container>

        <div
          id={menuPanelId}
          role={menuOpen ? 'dialog' : undefined}
          aria-modal={menuOpen ? true : undefined}
          aria-label="Navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={cx(
            'md:hidden overflow-hidden border-t border-transparent transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            menuOpen ? 'max-h-[420px] opacity-100 border-obsidian-950/10' : 'max-h-0 opacity-0 pointer-events-none',
          )}
        >
          <Container className="pb-4 pt-2">
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              {links.map((l, i) => (
                <NavLink
                  key={l.to}
                  ref={i === 0 ? firstLinkRef : undefined}
                  to={l.to}
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
              {showGithub ? (
                <Button
                  href={profile.socials.github}
                  target="_blank"
                  variant="ghost"
                  size="sm"
                  className="mt-2 justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  GitHub
                </Button>
              ) : null}
            </nav>
          </Container>
        </div>
      </div>
    </motion.header>
  )
}
