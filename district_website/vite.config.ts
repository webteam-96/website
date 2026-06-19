import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base` makes every built asset URL resolve under /district_website/ so the
// app can be served from that sub-path on the shared demo deployment.
export default defineConfig({
  base: '/district_website/',
  plugins: [react()],
})
