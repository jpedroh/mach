import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/modules/shared/ui',
  plugins: [react()],
  test: {
    name: '@mach/web-shared-ui',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/modules/web-shared-ui',
      provider: 'v8' as const,
    },
    passWithNoTests: true,
    setupFiles: ['./vitest-setup.ts'],
  },
})
