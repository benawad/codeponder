import { InputType, Field } from "type-graphql";
import { QuestionReply } from "../../entity/QuestionReply";

@InputType()
export class CreateQuestionReplyInput implements Partial<QuestionReply> {
  @Field()
  reply: string;

  @Field()
  questionId: string;
}
