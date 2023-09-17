import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'

import manifest from './manifest.json' assert { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    crx({ manifest }),
  ],
})
