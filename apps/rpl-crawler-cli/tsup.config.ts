import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  platform: 'node',
  target: 'node18',
  bundle: true,
  sourcemap: true,
  clean: true,
  noExternal: [/^@mach\//],
  external: [
    /@libsql\//,
    /@opentelemetry\//,
    /@sentry\//,
    'form-data',
    'combined-stream',
    'asynckit',
    'mime-types',
    'mime-db',
    'adm-zip',
    'axios',
  ],
})
