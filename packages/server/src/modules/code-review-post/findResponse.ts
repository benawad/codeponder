import { ObjectType, Field } from "type-graphql";
import { CodeReviewPost } from "../../entity/CodeReviewPost";

/*

type FindCodeReviewPostResponse {
  hasMore: Boolean!
  posts: [CodeReviewPost!]!
}

*/

@ObjectType()
export class FindCodeReviewPostResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [CodeReviewPost])
  posts: CodeReviewPost[];
}
