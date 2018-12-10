import { Field, InputType, Int } from 'type-graphql'

@InputType()
export default class TextBox {
  @Field()
  public text!: string

  @Field(type => Int, { nullable: true })
  public x?: number

  @Field(type => Int, { nullable: true })
  public y?: number

  @Field(type => Int, { nullable: true })
  public width?: number

  @Field(type => Int, { nullable: true })
  public height?: number

  @Field({ nullable: true })
  public color?: string

  @Field({ nullable: true })
  public outlineColor?: string
}
