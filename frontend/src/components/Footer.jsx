import { Link } from 'react-router-dom'
import { MessageCircle, Share2, Users } from 'lucide-react'

const social = [
  { label: 'Social placeholder', icon: Share2, href: '#' },
  { label: 'Community placeholder', icon: Users, href: '#' },
  { label: 'Messages placeholder', icon: MessageCircle, href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-earth-olive/12 bg-earth-mist/60 px-4 py-16 dark:border-earth-cream/10 dark:bg-earth-forest/90">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <Link
            to="/"
            className="flex items-center gap-3 font-display text-xl font-semibold text-earth-pine dark:text-earth-cream"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-earth-ochre text-sm font-bold text-earth-pine shadow-sm">
              NX
            </span>
            Nexus Digital
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-earth-olive/90 dark:text-earth-cream/65">
            Product engineering with craft — prototypes, launches, and
            long-term platforms.
          </p>
          <Link
            to="/admin"
            className="text-xs font-semibold uppercase tracking-wider text-earth-olive underline-offset-4 hover:text-earth-pine hover:underline dark:text-earth-ochre dark:hover:text-earth-cream"
          >
            Admin inquiries (demo)
          </Link>
        </div>

        <nav
          aria-label="Social placeholders"
          className="flex items-center gap-3"
        >
          {social.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-earth-olive/15 bg-earth-cream text-earth-olive transition hover:border-earth-ochre hover:text-earth-pine dark:border-earth-cream/15 dark:bg-earth-sage/50 dark:text-earth-cream dark:hover:border-earth-ochre/50 dark:hover:text-earth-ochre"
            >
              <span className="sr-only">{label}</span>
              <Icon size={20} strokeWidth={1.75} />
            </a>
          ))}
        </nav>
      </div>

      <p className="mx-auto mt-12 max-w-6xl text-center text-xs text-earth-olive/70 dark:text-earth-cream/45">
        © {new Date().getFullYear()} Nexus Digital. All rights reserved.
      </p>
    </footer>
  )
}
