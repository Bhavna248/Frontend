/**
 * API base URL.
 * - If VITE_API_URL is set → use it (production or explicit remote API).
 * - Otherwise → same-origin `/api...` (Vite dev + Vite preview proxy to the backend).
 */
export function resolveApiBase() {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.replace(/\/$/, '')
  }
  return ''
}

export const API_BASE = resolveApiBase()
