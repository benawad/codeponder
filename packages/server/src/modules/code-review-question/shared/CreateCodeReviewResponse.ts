import { ObjectType, Field } from "type-graphql";
import { CodeReviewQuestion } from "../../../entity/CodeReviewQuestion";

@ObjectType()
export class CreateCodeReviewResponse {
  @Field()
  codeReviewQuestion: CodeReviewQuestion;
}
