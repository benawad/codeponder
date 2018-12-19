import { ObjectType, Field } from "type-graphql";
import { CodeReviewPost } from "../../entity/CodeReviewPost";

@ObjectType()
export class CreateCodeReviewPostResponse {
  @Field()
  codeReviewPost: CodeReviewPost;
}
