import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
