import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class CaptionMemeResponse {
  @Field()
  public url!: string

  @Field()
  public pageUrl!: string

  constructor(init?: Partial<CaptionMemeResponse>) {
    Object.assign(this, init)
  }
}
