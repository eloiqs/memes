import path from 'path'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import MemesResolver from './resolvers/memes-resolver'

export * from './types'

export default async function getSchema() {
  const schema = await buildSchema({
    emitSchemaFile: path.resolve(__dirname, '../schema.gql'),
    resolvers: [MemesResolver]
  })
  return schema
}
