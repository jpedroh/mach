import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './__mocks__/node'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
