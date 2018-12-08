import { mocked } from 'ts-jest/utils'
import main from './index'
import _server from './server'

jest.mock('./server')
const server = mocked(_server)

describe('main', () => {
  it('should start the server', async () => {
    await main()
    expect(server.start).toHaveBeenCalled()
  })
})
