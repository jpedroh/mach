import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env.BASE_URL ?? 'http://localhost:4200'

export default defineConfig({
  ...nxE2EPreset(import.meta.url.substring('file://'.length), {
    testDir: './src/specs',
  }),
  globalSetup: import.meta
    .resolve('./src/setup/global-setup.ts')
    .substring('file://'.length),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm serve',
    port: 4200,
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  reporter: [[process.env.CI ? 'github' : 'list'], ['html', { open: 'never' }]],
})
