import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export default class Meme {
  @Field()
  public id!: string

  @Field()
  public name!: string

  @Field()
  public url!: string

  @Field(type => Int)
  public width!: number

  @Field(type => Int)
  public height!: number
}
