import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env.BASE_URL ?? 'http://localhost:3000'

console.log(process.env)

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './e2e/specs' }),
  globalSetup: require.resolve('./e2e/setup/global-setup.ts'),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm serve --configuration=production',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
  reporter: process.env.CI ? 'github' : 'list',
})
