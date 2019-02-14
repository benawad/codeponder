import { Field, ObjectType } from "type-graphql";
import { Post } from "../../entity/Post";

/*

type FindPostResponse {
  hasMore: Boolean!
  posts: [Post!]!
}

*/

@ObjectType()
export class FindPostResponse {
  @Field()
  hasMore: boolean;

  @Field(() => [Post])
  posts: Post[];
}
