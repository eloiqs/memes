import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class CaptionMemeFailure {
  @Field()
  public errorMessage!: string
}
