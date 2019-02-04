import { Field, ObjectType } from "type-graphql";
import { CodeReviewPost } from "../../entity/CodeReviewPost";

@ObjectType()
export class CodeReviewPostResponse {
  @Field()
  codeReviewPost: CodeReviewPost;
}
