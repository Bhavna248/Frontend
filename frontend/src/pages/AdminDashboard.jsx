import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, Moon, RefreshCw, Sun } from 'lucide-react'
import { API_BASE } from '../config/api'
import { useTheme } from '../context/useTheme'

export default function AdminDashboard() {
  const { dark, toggle } = useTheme()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/contact/getContactInfo`)
      const rawText = await res.text()
      if (!res.ok) {
        let msg = 'Could not load inquiries'
        if (res.status === 502 || res.status === 504) {
          msg =
            'API is not reachable. Start the backend (cd backend → npm run dev on port 5000).'
        } else {
          try {
            const j = JSON.parse(rawText)
            if (typeof j.message === 'string' && j.message.trim()) msg = j.message.trim()
          } catch {
            /* ignore */
          }
        }
        toast.error(msg, { id: 'admin-load-error' })
        setRows([])
        return
      }
      let data = []
      try {
        data = rawText.trim() ? JSON.parse(rawText) : []
      } catch {
        data = []
      }
      setRows(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Network error loading inquiries', { id: 'admin-network' })
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      load()
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="min-h-svh bg-earth-cream text-earth-pine antialiased dark:bg-earth-pine dark:text-earth-cream">
      <header className="border-b border-earth-olive/12 bg-earth-cream/90 px-4 py-5 backdrop-blur dark:border-earth-cream/10 dark:bg-earth-forest/95">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-earth-olive/20 px-3 py-2 text-sm font-medium text-earth-pine transition hover:bg-earth-olive/10 dark:border-earth-cream/15 dark:text-earth-cream dark:hover:bg-earth-cream/10"
            >
              <ArrowLeft size={16} />
              Back to site
            </Link>
            <h1 className="font-display text-lg font-semibold md:text-xl">
              Admin · Inquiries
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => toggle()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-earth-olive/20 bg-earth-mist text-earth-pine transition hover:bg-earth-cream dark:border-earth-cream/15 dark:bg-earth-sage dark:text-earth-ochre dark:hover:bg-earth-sage/80"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              onClick={() => load()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-earth-ochre px-4 py-2.5 text-sm font-semibold text-earth-pine shadow-sm transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="overflow-hidden rounded-2xl border border-earth-olive/12 bg-earth-cream shadow-[0_8px_32px_-12px_rgba(40,54,24,0.15)] dark:border-earth-cream/10 dark:bg-earth-sage/35 dark:shadow-black/25">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-earth-olive/12 bg-earth-mist/80 dark:border-earth-cream/10 dark:bg-earth-forest/80">
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    Full name
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    Email
                  </th>
                  <th className="min-w-[240px] px-4 py-3 font-semibold">
                    Description
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-earth-olive/70 dark:text-earth-cream/50">
                      Loading…
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-earth-olive/70 dark:text-earth-cream/50">
                      No submissions yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr
                      key={r._id ?? `${r.email}-${r.createdAt}`}
                      className="border-b border-earth-olive/8 odd:bg-earth-cream even:bg-earth-mist/40 dark:border-earth-cream/5 dark:odd:bg-earth-sage/25 dark:even:bg-earth-pine/40"
                    >
                      <td className="whitespace-nowrap px-4 py-3 align-top font-medium">
                        {r.fullName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-top text-earth-olive dark:text-earth-ochre">
                        {r.email}
                      </td>
                      <td className="max-w-xl px-4 py-3 align-top text-earth-olive/90 dark:text-earth-cream/75">
                        <span className="line-clamp-4">{r.description}</span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-top text-earth-olive/75 dark:text-earth-cream/55">
                        {r.createdAt
                          ? new Date(r.createdAt).toLocaleString()
                          : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-earth-olive/65 dark:text-earth-cream/45">
          Demo route — ordinarily protected behind authentication.
        </p>
      </main>
    </div>
  )
}
