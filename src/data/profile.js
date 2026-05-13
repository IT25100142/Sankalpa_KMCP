export const profile = {
  name: 'Sankalpa KMCP',
  tagline: 'Portfolio',
  location: '',
  email: 'sankalpa.kmcp@gmail.com',
  socials: {
    github: 'https://github.com/IT25100142',
    linkedin: '',
    twitter: '',
  },
  projects: [
    {
      slug: 'nocturne-dashboard',
      year: '2026',
      title: 'Neon Dashboard',
      description: 'A sleek analytics UI with motion and realtime charts.',
      longDescription:
        'A premium analytics surface designed for clarity under density—tight typography, careful spacing, and motion used only as feedback.',
      role: 'UI engineering, design system',
      stack: ['React', 'Tailwind', 'Motion'],
      tags: ['React', 'Motion', 'UI'],
      demoUrl: '',
      githubUrl: '',
      gallery: [
        { alt: 'Overview dashboard', caption: 'Placeholder — replace with a real screenshot and metric callouts.' },
        { alt: 'Detail view and filters', caption: 'Placeholder — show interaction states and density handling.' },
      ],
      caseStudy: {
        problem: 'Placeholder — the product needed a dashboard that stayed readable at high information density.',
        approach: 'Placeholder — established a spacing/typography system, then built components around repeatable patterns.',
        result: 'Placeholder — improved scanability, reduced visual noise, and made states consistent across the UI.',
      },
    },
    {
      slug: 'atelier-showcase',
      year: '2025',
      title: '3D Product Showcase',
      description: 'Interactive 3D viewer with lighting presets and hotspots.',
      longDescription:
        'A product storytelling page focused on restraint: quiet transitions, editorial layout, and a narrative that guides the eye.',
      role: 'Front-end engineering',
      stack: ['React', 'Tailwind'],
      tags: ['Three.js', 'R3F', 'UX'],
      demoUrl: '',
      githubUrl: '',
      gallery: [
        { alt: 'Hero section', caption: 'Placeholder — show the first impression and typography.' },
        { alt: 'Feature hotspots', caption: 'Placeholder — show interaction details and microcopy.' },
      ],
      caseStudy: {
        problem: 'Placeholder — the experience needed to feel premium without overwhelming the product.',
        approach: 'Placeholder — used a strict typographic grid and reduced effects to a few intentional moments.',
        result: 'Placeholder — a calmer, more confident presentation with improved performance.',
      },
    },
    {
      slug: 'writing-studio',
      year: '2025',
      title: 'AI Writing Studio',
      description: 'A writing tool with prompt workflows and export formats.',
      longDescription:
        'A tool designed around flow: structured editing, predictable states, and a UI that disappears behind the writing.',
      role: 'Product UI',
      stack: ['React', 'Router', 'Tailwind'],
      tags: ['Web', 'API', 'Design'],
      demoUrl: '',
      githubUrl: '',
      gallery: [
        { alt: 'Editor layout', caption: 'Placeholder — show focus states and hierarchy.' },
        { alt: 'Templates and export', caption: 'Placeholder — show workflow UX and system feedback.' },
      ],
      caseStudy: {
        problem: 'Placeholder — users needed a workflow that reduced cognitive load across drafts and exports.',
        approach: 'Placeholder — designed a consistent state model and UI primitives for each step.',
        result: 'Placeholder — faster completion time and fewer errors due to clearer feedback.',
      },
    },
    {
      slug: 'lux-portfolio',
      year: '2026',
      title: 'Portfolio Template',
      description: 'A premium starter with routes, motion, and 3D scenes.',
      longDescription:
        'A portfolio system that favors composition over effects: clear rhythm, strong typography, and clean navigation.',
      role: 'Design + build',
      stack: ['Vite', 'React', 'Tailwind'],
      tags: ['Vite', 'Tailwind', 'Pages'],
      demoUrl: '',
      githubUrl: '',
      gallery: [
        { alt: 'Homepage hero', caption: 'Placeholder — show layout rhythm and headline style.' },
        { alt: 'Project detail', caption: 'Placeholder — show case study structure.' },
      ],
      caseStudy: {
        problem: 'Placeholder — templates often look generic and “AI generated” due to repeated patterns.',
        approach: 'Placeholder — made a small set of bespoke components and enforced a deliberate spacing scale.',
        result: 'Placeholder — a site that feels composed and luxurious rather than flashy.',
      },
    },
    {
      slug: 'tiny-game',
      year: '2024',
      title: 'Tiny Game',
      description: 'A minimal arcade game with juicy micro-interactions.',
      longDescription:
        'A small build focused on feel: responsiveness, subtle feedback, and polish that makes simple interactions satisfying.',
      role: 'Engineering',
      stack: ['Web', 'Canvas'],
      tags: ['Canvas', 'Fun', 'Performance'],
      demoUrl: '',
      githubUrl: '',
      gallery: [
        { alt: 'Gameplay', caption: 'Placeholder — show the game and how inputs feel.' },
        { alt: 'Menus and states', caption: 'Placeholder — show the UI around the experience.' },
      ],
      caseStudy: {
        problem: 'Placeholder — the challenge was to make a small game feel “finished” with minimal scope.',
        approach: 'Placeholder — prioritized input latency, feedback, and a consistent visual language.',
        result: 'Placeholder — a tiny project that feels surprisingly premium for its size.',
      },
    },
  ],
}

/** Social entries with a non-empty URL (for nav, footer, contact). */
export function activeSocialEntries() {
  return Object.entries(profile.socials).filter(([, url]) => String(url || '').trim())
}

