import { InputType, Field } from "type-graphql";
import { CodeReviewPost } from "../../entity/CodeReviewPost";

@InputType()
export class CreateCodeReviewPostInput implements Partial<CodeReviewPost> {
  @Field(() => [String])
  topics: string[];

  @Field()
  repo: string;

  @Field()
  description: string;

  @Field()
  commitId: string;

  @Field()
  repoOwner: string;
}
