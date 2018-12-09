const start = jest.fn()
jest.doMock('./server/server', () => {
  return jest.fn(() => Promise.resolve({ start }))
})

import { mocked } from 'ts-jest/utils'
import main from './index'
import _getServer from './server/server'

const getServer = mocked(_getServer)

describe('main', () => {
  it('should start the server', async () => {
    await main()
    expect(getServer).toHaveBeenCalled()
    expect(start).toHaveBeenCalled()
  })
})
