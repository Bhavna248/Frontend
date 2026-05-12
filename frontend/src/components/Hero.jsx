import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-28 overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36"
    >
      {/* Organic light / dark atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(96,108,56,0.2),transparent),radial-gradient(ellipse_45%_40%_at_95%_25%,rgba(221,161,94,0.18),transparent),radial-gradient(ellipse_40%_35%_at_5%_75%,rgba(96,108,56,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(221,161,94,0.12),transparent),radial-gradient(ellipse_50%_45%_at_100%_30%,rgba(96,108,56,0.2),transparent),radial-gradient(ellipse_45%_40%_at_0%_70%,rgba(40,54,24,0.9),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-earth-olive/10 blur-3xl dark:bg-earth-ochre/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-20 h-64 w-64 rounded-full bg-earth-ochre/15 blur-3xl dark:bg-earth-olive/10"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-5 inline-flex items-center justify-center gap-2 rounded-full border border-earth-olive/25 bg-earth-olive-muted px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-earth-olive dark:border-earth-ochre/35 dark:bg-earth-ochre/10 dark:text-earth-ochre lg:justify-start"
          >
            <Leaf className="h-3.5 w-3.5" strokeWidth={2} />
            Craft · Build · Ship
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-balance text-[2.65rem] font-semibold leading-[1.05] tracking-[-0.02em] text-earth-pine md:text-5xl lg:text-[3.5rem] dark:text-earth-cream"
          >
            Transforming Ideas into{' '}
            <span className="relative whitespace-nowrap text-earth-olive dark:text-earth-ochre">
              Digital Reality
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 mx-auto h-1 max-w-[min(100%,12rem)] rounded-full bg-earth-ochre/70 dark:bg-earth-ochre/50 lg:mx-0"
              />
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-earth-olive/90 lg:mx-0 dark:text-earth-cream/75"
          >
            We design and deliver fast, resilient products — from polished web
            experiences to cross-platform apps — with clarity, performance, and
            quiet confidence.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-11 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-2xl bg-earth-ochre px-9 py-4 text-sm font-semibold text-earth-pine shadow-[0_4px_24px_-4px_rgba(221,161,94,0.55)] ring-1 ring-earth-pine/10 transition hover:brightness-[1.03] hover:shadow-[0_8px_32px_-6px_rgba(221,161,94,0.5)] active:scale-[0.98] dark:ring-earth-cream/10"
            >
              Get in Touch
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById('services')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="rounded-2xl border-2 border-earth-olive/35 bg-earth-cream/50 px-9 py-4 text-sm font-semibold text-earth-pine backdrop-blur-sm transition hover:border-earth-olive hover:bg-earth-cream dark:border-earth-cream/20 dark:bg-earth-sage/40 dark:text-earth-cream dark:hover:border-earth-ochre/50 dark:hover:bg-earth-sage/70"
            >
              Explore Services
            </button>
          </motion.div>
        </div>

        <motion.div
          className="order-1 w-full max-w-[420px] shrink-0 lg:order-2"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-1 rounded-[2rem] bg-linear-to-br from-earth-ochre via-earth-ochre to-earth-olive/40 opacity-90 blur-sm dark:from-earth-ochre/80 dark:via-earth-olive/30"
            />
            <div className="relative rounded-[1.85rem] bg-earth-ochre p-1 shadow-2xl shadow-earth-pine/15 dark:shadow-black/40">
              <div className="flex flex-col gap-6 rounded-[1.65rem] bg-earth-pine px-8 py-10 text-center md:px-10 md:py-12">
                <span className="mx-auto w-fit rounded-full bg-earth-cream/12 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-earth-ochre ring-1 ring-earth-ochre/30">
                  Studio snapshot
                </span>
                <p className="font-display text-2xl font-semibold leading-snug text-earth-cream md:text-3xl">
                  Thoughtful interfaces. Reliable systems.
                </p>
                <p className="text-sm leading-relaxed text-earth-cream/65">
                  Strategy, product design, and full-stack delivery — one calm,
                  senior-led engagement from first sketch to production.
                </p>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-earth-ochre text-earth-pine shadow-inner ring-2 ring-earth-cream/10">
                  <Leaf size={30} strokeWidth={1.75} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
