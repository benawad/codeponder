import { ObjectType, Field } from "type-graphql";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";

@ObjectType()
export class CreateCodeReviewQuestionResponse {
  @Field()
  codeReviewQuestion: CodeReviewQuestion;
}
