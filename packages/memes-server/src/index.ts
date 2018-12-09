import bootsrap from './server'

export default async function main() {
  const server = await bootsrap()
  // tslint:disable-next-line
  await server.start(() => console.log('Server is running on localhost:4000'))
}

main()
