import { type Page, test, expect } from '@playwright/test'

test('if I click search flights without selecting a filter it shows an error message', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: /search flights/i }).click()
  await expect(
    page.getByText(/at least one filter must be provided/i)
  ).toBeVisible()
})

test('if I select options and click search flights it redirects me to search results', async ({
  page,
}) => {
  await page.goto('/')

  await selectComboboxValue(page, /departure icao/i, 'SBSP')
  await selectComboboxValue(page, /arrival icao/i, 'SBRJ')
  await selectComboboxValue(page, /company/i, 'GLO')
  await selectComboboxValue(page, /aircraft/i, 'B738')
  await page.getByRole('button', { name: /search flights/i }).click()

  await expect(page).toHaveURL(
    '/search?cycle=2023-12-21&departureIcao=SBSP&arrivalIcao=SBRJ&company=GLO&aircraftIcaoCode=B738'
  )
})

async function selectComboboxValue(page: Page, name: RegExp, value: string) {
  await page.getByRole('combobox', { name }).fill(value)
  await page.getByRole('option', { name: value }).click()
}
