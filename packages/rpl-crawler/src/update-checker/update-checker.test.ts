import { expect, test } from 'vitest'
import updateChecker from './index'

test('The update checker returns true if there are updates for the given date', async () => {
  const hasUpdate = await updateChecker("2022-08-22")
  expect(hasUpdate).toBeTruthy()
})

test('The update checker returns false if there are non updates for the given date', async () => {
  const hasUpdate = await updateChecker("2022-08-23")
  expect(hasUpdate).toBeFalsy()
})
