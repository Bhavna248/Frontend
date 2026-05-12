import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import {
  Box,
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  Server,
  Wind,
} from 'lucide-react'

const tabs = [
  {
    id: 'fe',
    label: 'Frontend (FE)',
    icon: Layers,
    items: [
      { name: 'React', icon: Braces },
      { name: 'Angular', icon: Box },
      { name: 'Vue', icon: Wind },
      { name: 'Next.js', icon: Globe },
      { name: 'Tailwind CSS', icon: Wind },
      { name: 'HTML5 / CSS3', icon: Code2 },
    ],
  },
  {
    id: 'be',
    label: 'Backend (BE)',
    icon: Server,
    items: [
      { name: 'Node.js', icon: Box },
      { name: 'Express', icon: Server },
      { name: 'Python / Django', icon: Code2 },
      { name: 'Java Spring Boot', icon: Cpu },
      { name: 'Go', icon: Cpu },
    ],
  },
  {
    id: 'db',
    label: 'Database (DB)',
    icon: Database,
    items: [
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Redis', icon: Database },
    ],
  },
  {
    id: 'ops',
    label: 'Deployment / DevOps',
    icon: Cloud,
    items: [
      { name: 'Docker', icon: Box },
      { name: 'AWS', icon: Cloud },
      { name: 'Vercel', icon: Globe },
      { name: 'Heroku', icon: Cloud },
      { name: 'GitHub Actions', icon: GitBranch },
    ],
  },
]

export default function TechTabs() {
  const [active, setActive] = useState(tabs[0].id)
  const panel = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <section id="tech" className="relative scroll-mt-28 px-4 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-earth-olive/25 to-transparent dark:via-earth-ochre/20"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-earth-olive dark:text-earth-ochre/90">
            Toolkit
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-earth-pine md:text-5xl dark:text-earth-cream">
            Technology Stack
          </h2>
          <p className="mt-5 text-earth-olive/90 dark:text-earth-cream/70">
            Tools we reach for across the full product lifecycle.
          </p>
        </motion.div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-earth-olive/12 bg-earth-cream/70 shadow-[0_8px_40px_-12px_rgba(40,54,24,0.15)] backdrop-blur-md dark:border-earth-cream/10 dark:bg-earth-sage/30 dark:shadow-black/25">
          <div className="flex flex-wrap gap-2 border-b border-earth-olive/10 bg-earth-mist/50 p-3 dark:border-earth-cream/10 dark:bg-earth-forest/50 md:p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isOn = tab.id === active
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    isOn
                      ? 'bg-earth-pine text-earth-cream shadow-md dark:bg-earth-ochre dark:text-earth-pine'
                      : 'text-earth-olive hover:bg-earth-olive/10 dark:text-earth-cream/70 dark:hover:bg-earth-cream/10'
                  }`}
                >
                  <Icon size={16} strokeWidth={2} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>

          <div className="min-h-[200px] p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {panel.items.map(({ name, icon: ItemIcon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-2xl border border-earth-olive/10 bg-earth-cream/90 px-4 py-4 dark:border-earth-cream/10 dark:bg-earth-pine/50"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-earth-olive-muted text-earth-olive dark:bg-earth-ochre/15 dark:text-earth-ochre">
                      <ItemIcon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="font-medium text-earth-pine dark:text-earth-cream">
                      {name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
