import { Field, InputType, Int } from "type-graphql";

@InputType()
export class FindPostInput {
  @Field(() => [String], { nullable: true })
  topics: string[];

  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}
