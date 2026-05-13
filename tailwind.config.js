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
          50: '#f7f5f2',
          100: '#ede8e0',
        },
        linen: {
          50: '#f3f0ea',
          100: '#e8e2d8',
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
          muted: 'rgba(18, 14, 10, 0.56)',
          body: 'rgba(18, 14, 10, 0.74)',
          fainter: 'rgba(18, 14, 10, 0.48)',
          borderSubtle: 'rgba(18, 14, 10, 0.11)',
          borderHairline: 'rgba(18, 14, 10, 0.085)',
        },
      },
      boxShadow: {
        soft: '0 28px 100px rgba(18, 14, 10, 0.045)',
        headerGlass:
          'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 0 rgba(255,255,255,0.45), 0 10px 36px rgba(10,8,6,0.045), 0 22px 56px rgba(10,8,6,0.05)',
        glassDeep:
          'inset 0 1px 0 rgba(255,255,255,0.92), inset 0 -1px 0 rgba(18,14,10,0.04), 0 1px 0 rgba(255,255,255,0.55), 0 10px 30px rgba(10,8,6,0.06), 0 28px 72px rgba(10,8,6,0.08), 0 60px 140px rgba(10,8,6,0.06)',
        elevated:
          'inset 0 1px 0 rgba(255,255,255,0.88), 0 1px 0 rgba(255,255,255,0.58), 0 10px 36px rgba(10,8,6,0.05), 0 28px 80px rgba(10,8,6,0.065)',
        lift:
          'inset 0 1px 0 rgba(255,255,255,0.45), 0 1px 0 rgba(255,255,255,0.52), 0 16px 64px rgba(10,8,6,0.12), 0 36px 110px rgba(10,8,6,0.09)',
        hairline: 'inset 0 0 0 1px rgba(18, 14, 10, 0.1)',
        cardHover:
          'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 0 rgba(255,255,255,0.65), 0 14px 52px rgba(10,8,6,0.12), 0 36px 92px rgba(10,8,6,0.1), 0 80px 180px rgba(10,8,6,0.08)',
        immersive:
          'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 0 rgba(255,255,255,0.5), 0 8px 28px rgba(10,8,6,0.06), 0 24px 64px rgba(10,8,6,0.08), 0 48px 120px rgba(10,8,6,0.08), 0 96px 220px rgba(10,8,6,0.06)',
        magnetic:
          'inset 0 1px 0 rgba(255,255,255,0.32), 0 1px 0 rgba(255,255,255,0.4), 0 10px 24px rgba(10,8,6,0.18), 0 26px 64px rgba(10,8,6,0.22), 0 52px 130px rgba(10,8,6,0.2)',
      },
      backgroundImage: {
        vignette:
          'radial-gradient(1100px circle at 18% 12%, rgba(120,100,80,0.06), transparent 48%), radial-gradient(900px circle at 76% 18%, rgba(10,10,10,0.035), transparent 55%), radial-gradient(1200px circle at 42% 90%, rgba(90,80,70,0.05), transparent 52%)',
        shellWash:
          'linear-gradient(180deg, #ffffff 0%, #f7f5f2 42%, #ede8e0 100%)',
        appCanvas:
          'radial-gradient(1100px circle at 18% 12%, rgba(120,100,80,0.06), transparent 48%), radial-gradient(900px circle at 76% 18%, rgba(10,10,10,0.035), transparent 55%), radial-gradient(1200px circle at 42% 90%, rgba(90,80,70,0.05), transparent 52%), linear-gradient(180deg, #ffffff 0%, #f7f5f2 42%, #ede8e0 100%)',
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
        bgMeshFlow: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)', filter: 'blur(80px) saturate(1.15) hue-rotate(0deg)' },
          '50%': { transform: 'translate3d(-1.5%,2%,0) scale(1.04)', filter: 'blur(96px) saturate(1.2) hue-rotate(6deg)' },
          '100%': { transform: 'translate3d(1.5%,-1.5%,0) scale(1.02)', filter: 'blur(88px) saturate(1.18) hue-rotate(-4deg)' },
        },
        grainShift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '25%': { transform: 'translate3d(-2px,1px,0)' },
          '50%': { transform: 'translate3d(1px,-2px,0)' },
          '75%': { transform: 'translate3d(-1px,2px,0)' },
        },
        shineSweep: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'ambient-drift': 'ambientDrift 24s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'ambient-drift-reverse': 'ambientDriftReverse 28s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'bg-mesh-flow': 'bgMeshFlow 32s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate',
        'grain-shift': 'grainShift 4s steps(4, end) infinite',
        'shine-sweep': 'shineSweep 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
