import { describe, expect, test, vi } from 'vitest'
import makeUpdateChecker from './update-checker'

describe('update-checker', () => {
  let httpMock = {
    get: vi.fn(),
  }
  let updateChecker = makeUpdateChecker({ http: httpMock })

  describe('Given a date with no updates was given', () => {
    const date = '2020-08-02'

    describe('When request return 404 status', () => {
      httpMock.get.mockResolvedValueOnce({ status: 404 })

      test('Then update checker should return false', async () => {
        const hasUpdate = await updateChecker(date)
        expect(hasUpdate).toBeFalsy()
      })
    })
  })

  describe('Given a date with updates was given', () => {
    const date = '2020-08-02'

    describe('When request return 200 status', () => {
      httpMock.get.mockResolvedValueOnce({ status: 200 })

      test('Then update checker should return true', async () => {
        const hasUpdate = await updateChecker(date)
        expect(hasUpdate).toBeTruthy()
      })
    })
  })
})
