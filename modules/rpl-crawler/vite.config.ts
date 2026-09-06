import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/modules/rpl-crawler',
  test: {
    name: '@mach/rpl-crawler',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/modules/rpl-crawler',
      provider: 'v8' as const,
    },
    setupFiles: ['./vitest-setup.ts'],
  },
})
