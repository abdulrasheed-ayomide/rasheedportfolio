import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    // Keep images under 4 KB inline; larger files are emitted as separate cached assets.
    assetsInlineLimit: 4096,
  },
})
