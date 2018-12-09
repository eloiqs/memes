import { GraphQLServer } from 'graphql-yoga'
import getSchema from 'memes-graph'

export default async function bootstrap() {
  const schema = await getSchema()
  return new GraphQLServer({ schema })
}
