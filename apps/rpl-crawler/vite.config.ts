import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/modules/shared/ui',
  build: {
    ssr: './src/index.ts',
    sourcemap: true,
  },
  plugins: [nxViteTsPaths()],
  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../../coverage/apps/rpl-crawler',
      provider: 'v8',
    },
    passWithNoTests: true,
    setupFiles: './setup-test.ts',
  },
})
