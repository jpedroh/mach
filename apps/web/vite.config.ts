/// <reference types='vitest' />

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { reactRouter } from '@react-router/dev/vite'
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig } from 'vite'
import { envOnlyMacros } from 'vite-env-only'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/web',
  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      allow: ['../..'],
    },
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    cloudflareDevProxy(),
    reactRouter(),
    envOnlyMacros(),
    nxViteTsPaths(),
    sentryVitePlugin({
      org: 'jpedroh',
      project: 'mach-vq',
    }),
    viteStaticCopy({
      targets: [
        {
          src: '_headers',
          dest: './',
        },
      ],
    }),
    tailwindcss(),
  ],
  build: {
    outDir: '../../dist/apps/web',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
  },
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/web',
      provider: 'v8',
    },
  },
})
