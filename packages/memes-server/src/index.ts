import getServer from './server/server'

export default async function main() {
  const server = await getServer()
  // tslint:disable-next-line
  await server.start(() => console.log('Server is running on localhost:4000'))
}

main()
