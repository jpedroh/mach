import { expect, test } from '@playwright/test'

test('it shows the home page content', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('h1').innerText()).toContain('mach')
})
