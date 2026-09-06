import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/rpl-crawler-cli',
  build: {
    ssr: './src/index.ts',
    sourcemap: true,
    rollupOptions: {
      external: [/^@libsql\/linux-/, /^@libsql\/darwin-/, /^@libsql\/win32-/],
    },
  },
  test: {
    name: '@mach/rpl-crawler-cli',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/rpl-crawler-cli',
      provider: 'v8' as const,
    },
    passWithNoTests: true,
  },
})
