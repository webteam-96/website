import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Strip the `crossorigin` attribute Vite adds to the emitted <script>/<link>
// asset tags. The assets are same-origin, so crossorigin (CORS mode) is
// unnecessary — and Safari can fail to apply a same-origin stylesheet/script
// loaded in CORS mode on a cache-bypassing hard reload, leaving the page
// unstyled. Removing it makes them load in plain same-origin mode.
function stripCrossorigin() {
  return {
    name: 'strip-crossorigin',
    enforce: 'post',
    transformIndexHtml(html) {
      return html.replace(/(<(?:script|link)\b[^>]*?)\s+crossorigin(=("|')(?:.*?)\3)?/g, '$1')
    },
  }
}

export default defineConfig({
  plugins: [react(), stripCrossorigin()],
  server: {
    watch: {
      // Screenshot/preview PNGs live in the project root and can be locked while
      // being written (e.g. dropping in a new screenshot), which throws an
      // uncaught EBUSY error and crashes the dev-server file watcher. No local
      // PNGs are imported in src (all images are remote URLs), so it is safe to
      // exclude them from watching entirely.
      ignored: ['**/*.png'],
    },
    // Dev proxy → the Rotary public API. The API has no CORS headers, so the
    // browser can't call it directly; the dev server proxies same-origin
    // requests at /club-api/* to https://rizones45678.org/API/api/*.
    // (Production uses the matching Vercel rewrite — see vercel.json.)
    proxy: {
      '/club-api': {
        target: 'https://rizones45678.org/API/api',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/club-api/, ''),
      },
    },
  },
})
