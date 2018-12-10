import { createUnionType } from 'type-graphql'
import CaptionMemeFailure from './caption-meme-failure'
import CaptionMemeSuccess from './caption-meme-success'

const CaptionMemeResponse = createUnionType({
  name: 'CaptionMemeResponse',
  types: [CaptionMemeSuccess, CaptionMemeFailure]
})

export default CaptionMemeResponse
