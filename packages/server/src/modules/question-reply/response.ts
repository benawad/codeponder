import { Field, ObjectType } from "type-graphql";
import { QuestionReply } from "../../entity/QuestionReply";

@ObjectType()
export class QuestionReplyResponse {
  @Field()
  questionReply: QuestionReply;
}
