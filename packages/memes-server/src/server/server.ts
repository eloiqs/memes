import { GraphQLServer } from 'graphql-yoga'
import getSchema from 'memes-graph'

export default async function getServer() {
  const schema = await getSchema()
  return new GraphQLServer({
    context: {
      password: process.env.IMGFLIP_PASSWORD,
      username: process.env.IMGFLIP_USERNAME
    },
    schema
  })
}
