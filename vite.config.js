import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@modyfi/vite-plugin-yaml'

export default defineConfig({
  plugins: [react(), yaml()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) return 'three';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
})
