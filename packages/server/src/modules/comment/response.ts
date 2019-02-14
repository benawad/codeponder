import { Field, ObjectType } from "type-graphql";
import { Comment } from "../../entity/Comment";

@ObjectType()
export class QuestionReplyResponse {
  @Field()
  comment: Comment;
}
