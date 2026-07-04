import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/nefely/omnia-job-offer/parse/freecash-creative/',
  plugins: [react()],
})
