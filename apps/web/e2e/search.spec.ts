import { expect, test } from '@playwright/test'

test('if I open search flights without selecting a filter it shows an error message', async ({
  page,
}) => {
  await page.goto('/search')
  await expect(
    page.getByText(/at least one filter.*must be provided/i)
  ).toBeVisible()
})

test('if there are no results for the search query it shows a friendly message', async ({
  page,
}) => {
  await page.goto('/search?departureIcao=ABCD&arrivalIcao=EFGH')
  await expect(
    page.getByText(/there are no results for your search/i)
  ).toBeVisible()
})

test('if there are results for the search it shows them on the table', async ({
  page,
}) => {
  // Unless something really weird is going on, there will always be flights from SBSP to SBRJ
  await page.goto('/search?departureIcao=SBSP&arrivalIcao=SBRJ')

  await expect(page.getByText(/there are \d+ results/i)).toBeVisible()
  await expect(page.getByRole('table')).toBeVisible()
})

test('when i click in view details it shows me the flight details modal', async ({
  page,
}) => {
  // Unless something really weird is going on, there will always be flights from SBSP to SBRJ
  await page.goto('/search?departureIcao=SBSP&arrivalIcao=SBRJ')

  await page.click('text=View details')
  await expect(page.getByRole('dialog')).toBeVisible()

  await page.click('text=Close')
  await expect(page.getByRole('dialog')).not.toBeVisible()
})
