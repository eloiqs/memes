import { Field, InputType } from 'type-graphql'
import TextBox from './text-box'

@InputType()
export default class CaptionMemeInput {
  @Field()
  public templateId!: string

  @Field({ nullable: true })
  public font?: string

  @Field({ nullable: true })
  public maxFontSize?: string

  @Field(type => [TextBox])
  public boxes!: TextBox[]
}
