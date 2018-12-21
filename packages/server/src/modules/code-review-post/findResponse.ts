import { ObjectType, Field } from "type-graphql";
import { CodeReviewPost } from "../../entity/CodeReviewPost";

@ObjectType()
export class FindCodeReviewPostResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [CodeReviewPost])
  posts: CodeReviewPost[];
}
