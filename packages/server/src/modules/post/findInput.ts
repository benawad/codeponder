import { Field, InputType } from "type-graphql";

@InputType()
export class FindPostInput {
  @Field(() => [String], { nullable: true })
  topics: string[];

  @Field(() => String, { nullable: true })
  cursor?: string;
}
