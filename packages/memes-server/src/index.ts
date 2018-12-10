import dotenv from 'dotenv'
import getServer from './server/server'

export default async function main() {
  dotenv.config()
  const server = await getServer()
  await server.start({ debug: process.env.NODE_ENV === 'development' }, () => {
    // tslint:disable-next-line
    console.log(
      `${process.env.NODE_ENV!.toUpperCase()} Server is running on localhost:4000`
    )
  })
}

main()
