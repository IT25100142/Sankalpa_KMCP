import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ProjectDetail from './pages/ProjectDetail'

function Grain() {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className="grain" aria-hidden />
  }
  return (
    <motion.div
      className="grain"
      aria-hidden
      animate={{ x: [0, -3, 2, -1, 0], y: [0, 2, -2, 1, 0] }}
      transition={{ duration: 4.2, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
    />
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen bg-appCanvas text-neutral-800">
      <Grain />
      <div className="relative z-10">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  )
}
