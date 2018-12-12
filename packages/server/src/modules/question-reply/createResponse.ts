import { ObjectType, Field } from "type-graphql";
import { QuestionReply } from "../../entity/QuestionReply";

@ObjectType()
export class CreateQuestionReplyResponse {
  @Field()
  questionReply: QuestionReply;
}
