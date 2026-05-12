import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/useTheme'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'contact', label: 'Contact' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const { dark, toggle } = useTheme()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center pt-6"
    >
      <nav className="pointer-events-auto flex max-w-[92vw] items-center gap-1 rounded-full border border-earth-olive/15 bg-earth-cream/80 px-2 py-2 shadow-[0_8px_32px_-8px_rgba(40,54,24,0.18)] backdrop-blur-xl dark:border-earth-cream/10 dark:bg-earth-forest/85 dark:shadow-black/30 md:gap-4 md:px-4">
        <Link
          to="/"
          className="mr-1 flex shrink-0 items-center gap-2 rounded-full px-2 py-1 font-display text-sm font-semibold text-earth-pine dark:text-earth-cream sm:mr-2 sm:px-3 sm:py-1.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-earth-ochre text-xs font-bold text-earth-pine shadow-sm">
            NX
          </span>
          <span className="hidden sm:inline md:hidden">NX</span>
          <span className="hidden md:inline">Nexus Digital</span>
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-0.5 md:gap-1">
          {links.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className="rounded-full px-3 py-2 text-sm font-medium text-earth-olive transition hover:bg-earth-olive/10 hover:text-earth-pine dark:text-earth-cream/70 dark:hover:bg-earth-cream/10 dark:hover:text-earth-cream"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ml-2 flex items-center gap-1 border-l border-earth-olive/20 pl-2 dark:border-earth-cream/15">
          <button
            type="button"
            onClick={() => toggle()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-earth-mist text-earth-pine shadow-sm transition hover:bg-earth-cream dark:bg-earth-sage/80 dark:text-earth-ochre dark:hover:bg-earth-sage"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
