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
  },
})
