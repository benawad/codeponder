import { Field, InputType } from "type-graphql";
import { Post } from "../../entity/Post";

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field(() => [String])
  topics: string[];

  @Field()
  repo: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  commitId: string;

  @Field()
  repoOwner: string;
}
