import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { API_BASE } from '../config/api'

function isStrictEmail(email) {
  const s = email.trim()
  if (!s || /\s/.test(s)) return false
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  return re.test(s)
}

function fieldError(field, value) {
  const v = typeof value === 'string' ? value : ''
  if (field === 'fullName') {
    if (!v.trim()) return 'Full name is required'
    return undefined
  }
  if (field === 'email') {
    if (!v.trim()) return 'Email is required'
    if (!isStrictEmail(v)) return 'Enter a valid email address'
    return undefined
  }
  if (field === 'description') {
    if (!v.trim()) return 'Please describe your project'
    return undefined
  }
  return undefined
}

export default function ContactForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  function validateAll() {
    const next = {
      fullName: fieldError('fullName', fullName),
      email: fieldError('email', email),
      description: fieldError('description', description),
    }
    const cleaned = Object.fromEntries(
      Object.entries(next).filter(([, v]) => v !== undefined)
    )
    setErrors(cleaned)
    return Object.keys(cleaned).length === 0
  }

  function blurField(field, value) {
    setTouched((t) => ({ ...t, [field]: true }))
    const msg = fieldError(field, value)
    setErrors((prev) => {
      const next = { ...prev }
      if (msg) next[field] = msg
      else delete next[field]
      return next
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccessMsg('')
    setTouched({ fullName: true, email: true, description: true })
    if (!validateAll()) {
      toast.error('Please fix the highlighted fields.', { id: 'contact-validation' })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          description: description.trim(),
        }),
      })

      const rawText = await res.text()
      let data = {}
      try {
        data = rawText.trim() ? JSON.parse(rawText) : {}
      } catch {
        data = {}
      }

      if (!res.ok) {
        let backend =
          Array.isArray(data.errors) && data.errors.length > 0
            ? data.errors.join(', ')
            : typeof data.message === 'string' && data.message.trim() !== ''
              ? data.message.trim()
              : null

        if (!backend) {
          if (res.status === 502 || res.status === 504) {
            backend =
              'The API is not running or the proxy cannot reach it. In another terminal: cd backend → npm run dev (wait for “API listening”), then try again.'
          } else {
            const snip = rawText.replace(/\s+/g, ' ').trim().slice(0, 120)
            backend =
              snip && !snip.startsWith('<')
                ? `Request failed (${res.status}): ${snip}`
                : `Request failed (HTTP ${res.status}). Check the backend is running and watch its terminal for errors.`
          }
        }

        toast.error(backend, { id: 'contact-api-error' })
        return
      }

      toast.success(
        'Saved to database — no email is sent automatically from this demo.',
        { id: 'contact-success' }
      )
      setSuccessMsg(
        'Your inquiry was stored successfully. Check MongoDB (Atlas/Compass) or the demo admin table to see it.'
      )
      setFullName('')
      setEmail('')
      setDescription('')
      setErrors({})
      setTouched({})
    } catch (err) {
      const isNetwork =
        err instanceof TypeError &&
        (String(err.message).includes('fetch') ||
          String(err.message).includes('Failed to fetch'))
      toast.error(
        isNetwork
          ? 'Cannot reach the API. In a separate terminal run: cd backend → npm run dev (port 5000), then refresh this page.'
          : 'Something went wrong. Try again.',
        { id: 'contact-network' }
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-28 px-4 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-earth-olive/25 to-transparent dark:via-earth-ochre/20"
      />
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-earth-olive dark:text-earth-ochre/90">
            Reach out
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-earth-pine md:text-5xl dark:text-earth-cream">
            Contact
          </h2>
          <p className="mt-5 text-earth-olive/90 dark:text-earth-cream/70">
            Tell us about your timeline, goals, and links. Your message is{' '}
            <strong className="font-semibold text-earth-pine dark:text-earth-cream">
              saved to our database
            </strong>{' '}
            (MongoDB). This demo does{' '}
            <strong className="font-semibold">not</strong> send automatic emails — a
            human would follow up using the address you type below.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-3xl border border-earth-olive/12 bg-earth-cream/85 p-6 shadow-[0_12px_48px_-16px_rgba(40,54,24,0.2)] backdrop-blur-md dark:border-earth-cream/10 dark:bg-earth-sage/40 md:p-10"
          noValidate
        >
          <div className="grid gap-6">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-earth-olive dark:text-earth-cream/80"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  const next = e.target.value
                  setFullName(next)
                  if (touched.fullName) {
                    const err = fieldError('fullName', next)
                    setErrors((p) => {
                      const u = { ...p }
                      if (err) u.fullName = err
                      else delete u.fullName
                      return u
                    })
                  }
                }}
                onBlur={() => blurField('fullName', fullName)}
                aria-invalid={Boolean(errors.fullName)}
                className={`w-full rounded-xl border bg-earth-cream px-4 py-3.5 text-earth-pine shadow-inner outline-none transition focus:ring-2 dark:bg-earth-pine dark:text-earth-cream ${
                  errors.fullName
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/25'
                    : 'border-earth-olive/20 focus:border-earth-ochre focus:ring-earth-ochre/25 dark:border-earth-cream/15'
                }`}
                placeholder="Jane Doe"
              />
              {errors.fullName ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.fullName}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-earth-olive dark:text-earth-cream/80"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => {
                  const next = e.target.value
                  setEmail(next)
                  if (touched.email) {
                    const err = fieldError('email', next)
                    setErrors((p) => {
                      const u = { ...p }
                      if (err) u.email = err
                      else delete u.email
                      return u
                    })
                  }
                }}
                onBlur={() => blurField('email', email)}
                aria-invalid={Boolean(errors.email)}
                className={`w-full rounded-xl border bg-earth-cream px-4 py-3.5 text-earth-pine shadow-inner outline-none transition focus:ring-2 dark:bg-earth-pine dark:text-earth-cream ${
                  errors.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/25'
                    : 'border-earth-olive/20 focus:border-earth-ochre focus:ring-earth-ochre/25 dark:border-earth-cream/15'
                }`}
                placeholder="you@company.com"
              />
              {errors.email ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-earth-olive dark:text-earth-cream/80"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={description}
                onChange={(e) => {
                  const next = e.target.value
                  setDescription(next)
                  if (touched.description) {
                    const err = fieldError('description', next)
                    setErrors((p) => {
                      const u = { ...p }
                      if (err) u.description = err
                      else delete u.description
                      return u
                    })
                  }
                }}
                onBlur={() => blurField('description', description)}
                aria-invalid={Boolean(errors.description)}
                className={`min-h-[140px] w-full resize-y rounded-xl border bg-earth-cream px-4 py-3.5 text-earth-pine shadow-inner outline-none transition focus:ring-2 dark:bg-earth-pine dark:text-earth-cream ${
                  errors.description
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/25'
                    : 'border-earth-olive/20 focus:border-earth-ochre focus:ring-earth-ochre/25 dark:border-earth-cream/15'
                }`}
                placeholder="Project scope, budget range, milestones…"
              />
              {errors.description ? (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.description}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex justify-center rounded-2xl bg-earth-ochre px-9 py-4 text-sm font-semibold text-earth-pine shadow-[0_4px_24px_-4px_rgba(221,161,94,0.45)] transition hover:brightness-[1.03] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </div>
          {successMsg ? (
            <div
              role="status"
              className="mt-6 rounded-2xl border border-earth-olive/20 bg-earth-mist/50 p-5 text-left text-sm text-earth-pine dark:border-earth-cream/15 dark:bg-earth-pine/40 dark:text-earth-cream/90"
            >
              <p className="font-medium text-earth-pine dark:text-earth-cream">
                {successMsg}
              </p>
              <p className="mt-3 leading-relaxed text-earth-olive dark:text-earth-cream/75">
                In a real product you would plug in email (e.g. SendGrid, Resend) or
                Slack to notify the team. Here, data only goes to{' '}
                <strong className="text-earth-pine dark:text-earth-cream">MongoDB</strong>
                .
              </p>
              <p className="mt-3">
                <Link
                  to="/admin"
                  className="font-semibold text-earth-olive underline decoration-earth-ochre decoration-2 underline-offset-2 hover:text-earth-pine dark:text-earth-ochre dark:hover:text-earth-cream"
                >
                  Open Admin (demo) →
                </Link>{' '}
                to view saved messages in a table.
              </p>
            </div>
          ) : null}
        </motion.form>
      </div>
    </section>
  )
}
