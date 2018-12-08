import server from './server'

export default async function main() {
  // tslint:disable-next-line
  await server.start(() => console.log('Server is running on localhost:4000'))
}

main()
