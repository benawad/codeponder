import { InputType, Field, Int } from "type-graphql";
import { CodeReviewQuestion } from "../../../entity/CodeReviewQuestion";

@InputType()
export class CreateCodeReviewQuestionInput
  implements Partial<CodeReviewQuestion> {
  @Field(() => Int)
  startingLineNum: number;

  @Field(() => Int)
  endingLineNum: number;

  @Field()
  question: string;

  @Field()
  path: string;

  @Field()
  repo: string;

  @Field()
  branch: string;

  @Field()
  username: string;
}
