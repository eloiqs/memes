import { GraphQLServer } from 'graphql-yoga'
import getSchema from 'memes-graph'

export default async function getServer() {
  const schema = await getSchema()
  return new GraphQLServer({ schema })
}
