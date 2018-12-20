import { InputType, Field, Int } from "type-graphql";

@InputType()
export class FindCodeReviewPostInput {
  @Field(() => [String], { nullable: true })
  topics: string[];

  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}
