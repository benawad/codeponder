import { Field, InputType } from "type-graphql";
import { Comment } from "../../entity/Comment";

@InputType()
export class CreateCommentInput implements Partial<Comment> {
  @Field()
  text: string;

  @Field()
  questionId: string;
}
