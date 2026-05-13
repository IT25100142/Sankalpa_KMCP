/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'Times New Roman', 'Times'],
      },
      colors: {
        obsidian: {
          950: '#0a0a0a',
          900: '#171717',
          850: '#1f1f1f',
          800: '#262626',
        },
        graphite: {
          500: '#737373',
          400: '#a3a3a3',
        },
        pearl: {
          50: '#fafafa',
          100: '#f4f4f5',
        },
        accent: {
          500: '#fb7185',
          600: '#e11d48',
        },
        sunset: {
          amber: '#f59e0b',
          rose: '#fb7185',
          magenta: '#c026d3',
        },
        semantic: {
          muted: 'rgba(10, 10, 10, 0.55)',
          body: 'rgba(10, 10, 10, 0.70)',
          fainter: 'rgba(10, 10, 10, 0.45)',
          borderSubtle: 'rgba(10, 10, 10, 0.10)',
          borderHairline: 'rgba(10, 10, 10, 0.08)',
        },
      },
      boxShadow: {
        lift:
          '0 1px 0 rgba(255,255,255,0.55), 0 14px 70px rgba(10,10,10,0.12), 0 28px 120px rgba(10,10,10,0.08)',
        hairline: 'inset 0 0 0 1px rgba(10,10,10,0.10)',
      },
      backgroundImage: {
        vignette:
          'radial-gradient(1100px circle at 18% 12%, rgba(115,115,115,0.08), transparent 48%), radial-gradient(900px circle at 76% 18%, rgba(10,10,10,0.04), transparent 55%), radial-gradient(1200px circle at 40% 88%, rgba(163,163,163,0.06), transparent 50%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        ambientDrift: {
          '0%, 100%': { transform: 'translate3d(-50%, 0, 0)' },
          '50%': { transform: 'translate3d(-50%, 12px, 0)' },
        },
        ambientDriftReverse: {
          '0%, 100%': { transform: 'translate3d(-50%, 0, 0)' },
          '50%': { transform: 'translate3d(-50%, -10px, 0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'ambient-drift': 'ambientDrift 24s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'ambient-drift-reverse': 'ambientDriftReverse 28s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      },
    },
  },
  plugins: [],
}
