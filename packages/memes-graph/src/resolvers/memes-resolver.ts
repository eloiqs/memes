import axios from 'axios'
import qs from 'querystring'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import CaptionMemeFailure from '../types/caption-meme-failure'
import CaptionMemeInput from '../types/caption-meme-input'
import CaptionMemeResponse from '../types/caption-meme-response'
import CaptionMemeSuccess from '../types/caption-meme-success'
import Meme from '../types/meme'
import TextBox from '../types/text-box'
import IContext from './context'

@Resolver()
export default class MemesResolver {
  @Query(returns => [Meme])
  public async memes() {
    const response = (await axios.get('https://api.imgflip.com/get_memes')).data
    return response.data.memes as Meme[]
  }

  @Mutation(returns => CaptionMemeResponse)
  public async captionMeme(
    @Arg('data')
    { templateId, font, maxFontSize, boxes: boxesArray }: CaptionMemeInput,
    @Ctx() ctx: IContext
  ): Promise<typeof CaptionMemeResponse> {
    try {
      const boxes = boxesArray.reduce(
        (bxs, box, boxIndex) => {
          type TextBoxKey = keyof TextBox

          const boxProps = (Object.keys(box) as Array<keyof TextBox>).reduce(
            (props, prop) => ({
              ...props,
              [`boxes[${boxIndex}][${prop}]`]: box[prop]
            }),
            {} as { [key in TextBoxKey]: TextBox[key] }
          )

          return {
            ...bxs,
            ...boxProps
          }
        },
        {} as { [key: string]: TextBox[keyof TextBox] }
      )

      const data = qs.stringify({
        ...boxes,
        font,
        max_font_size: maxFontSize,
        password: ctx.password,
        template_id: templateId,
        username: ctx.username
      })

      const response = (await axios.post<
        | { success: true; data: { url: string; page_url: string } }
        | { success: false; error_message: string }
      >('https://api.imgflip.com/caption_image', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })).data
      if (response.success) {
        const succesfullResponse = new CaptionMemeSuccess()
        succesfullResponse.url = response.data.url
        succesfullResponse.pageUrl = response.data.page_url
        return succesfullResponse
      }
      throw { message: response.error_message }
    } catch (err) {
      const response = new CaptionMemeFailure()
      response.errorMessage = err.message
      return response
    }
  }
}
