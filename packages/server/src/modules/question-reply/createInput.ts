import { InputType, Field } from "type-graphql";
import { QuestionReply } from "../../entity/QuestionReply";

@InputType()
export class CreateQuestionReplyInput implements Partial<QuestionReply> {
  @Field()
  text: string;

  @Field()
  questionId: string;
}
