import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class CaptionMemeSuccess {
  @Field()
  public url!: string

  @Field()
  public pageUrl!: string
}
