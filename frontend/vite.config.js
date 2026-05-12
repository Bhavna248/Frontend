import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const apiProxy = (target) => ({
  '/api': {
    target,
    changeOrigin: true,
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget =
    env.VITE_PROXY_TARGET?.trim() || 'http://127.0.0.1:5000'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: apiProxy(proxyTarget),
    },
    preview: {
      proxy: apiProxy(proxyTarget),
    },
  }
})
