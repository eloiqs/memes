const schema = 'some schema'
jest.doMock('memes-graph', () => jest.fn(() => Promise.resolve(schema)))
const graphqlServer = {}
jest.doMock('graphql-yoga', () => ({
  GraphQLServer: jest.fn(() => graphqlServer)
}))

import { GraphQLServer as _GraphQLServer } from 'graphql-yoga'
import _getSchema from 'memes-graph'
import { mocked } from 'ts-jest/utils'
import getServer from './server'

const GraphQLServer = mocked(_GraphQLServer)
const getSchema = mocked(_getSchema)

describe('getServer', () => {
  it('should create and return a graphql server', async () => {
    const server = await getServer()
    expect(getSchema).toHaveBeenCalled()
    expect(GraphQLServer).toHaveBeenCalledWith({ schema })
    expect(server).toBe(graphqlServer)
  })
})
