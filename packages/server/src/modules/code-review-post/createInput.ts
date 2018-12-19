import { InputType, Field } from "type-graphql";
import { CodeReviewPost } from "../../entity/CodeReviewPost";

@InputType()
export class CreateCodeReviewPostInput implements Partial<CodeReviewPost> {
  @Field()
  programmingLanguages: string[];

  @Field()
  repo: string;

  @Field()
  commitId: string;

  @Field()
  repoOwner: string;
}
