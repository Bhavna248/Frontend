import { motion } from 'framer-motion'
import { LayoutGrid, MonitorSmartphone, Laptop } from 'lucide-react'

const services = [
  {
    title: 'Web Development',
    description:
      'Responsive, accessible interfaces with performance budgets, SEO-friendly structure, and delightful micro-interactions.',
    icon: LayoutGrid,
  },
  {
    title: 'Mobile App Development',
    description:
      'Native-feel experiences on iOS and Android — offline-aware flows, push-ready architecture, and analytics hooks.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Desktop Applications',
    description:
      'Cross-platform tools with secure updates, system integration, and workflows tuned for power users.',
    icon: Laptop,
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-28 px-4 py-20 md:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-earth-olive/25 to-transparent dark:via-earth-ochre/20"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-earth-olive dark:text-earth-ochre/90">
            What we do
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-earth-pine md:text-5xl dark:text-earth-cream">
            Services
          </h2>
          <p className="mt-5 text-earth-olive/90 dark:text-earth-cream/70">
            Full-spectrum engineering support from discovery to deployment.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map(({ title, description, icon: Icon }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-earth-olive/12 bg-earth-cream/80 p-7 shadow-[0_4px_24px_-8px_rgba(40,54,24,0.12)] backdrop-blur-sm transition-shadow hover:border-earth-olive/25 hover:shadow-[0_16px_40px_-12px_rgba(40,54,24,0.18)] dark:border-earth-cream/10 dark:bg-earth-sage/35 dark:shadow-black/20 dark:hover:border-earth-ochre/25"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-earth-olive-muted p-3.5 text-earth-olive dark:bg-earth-ochre/15 dark:text-earth-ochre">
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-xl font-semibold text-earth-pine dark:text-earth-cream">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-earth-olive/85 dark:text-earth-cream/65">
                {description}
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-earth-ochre transition-transform duration-300 group-hover:scale-x-100"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
