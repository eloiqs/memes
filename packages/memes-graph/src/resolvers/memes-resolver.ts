import axios from 'axios'
import { Query, Resolver } from 'type-graphql'
import Meme from '../types/meme'

@Resolver()
export default class MemesResolver {
  @Query(returns => [Meme])
  public async memes() {
    const response = (await axios.get('https://api.imgflip.com/get_memes')).data
    return response.data.memes as Meme[]
  }
}
