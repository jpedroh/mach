import makeUpdateChecker from '../../src/update-checker/update-checker'

describe('update-checker', () => {
  let httpMock = {
    get: jest.fn()
  }
  let updateChecker = makeUpdateChecker({ http: httpMock })

  describe('Given a date with no updates was given', () => {
    const date = '2020-08-02'

    describe('When request return 404 status', () => {
      httpMock.get.mockResolvedValueOnce({ status: 404 })

      test('Then update checker should return false', async done => {
        const hasUpdate = await updateChecker(date)
        expect(hasUpdate).toBeFalsy()
        done()
      })
    })
  })

  describe('Given a date with updates was given', () => {
    const date = '2020-08-02'

    describe('When request return 200 status', () => {
      httpMock.get.mockResolvedValueOnce({ status: 200 })

      test('Then update checker should return true', async done => {
        const hasUpdate = await updateChecker(date)
        expect(hasUpdate).toBeTruthy()
        done()
      })
    })
  })
})
