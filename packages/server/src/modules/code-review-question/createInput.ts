import { InputType, Field, Int } from "type-graphql";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";

@InputType()
export class CreateCodeReviewQuestionInput
  implements Partial<CodeReviewQuestion> {
  @Field(() => Int)
  startingLineNum: number;

  @Field(() => Int)
  endingLineNum: number;

  @Field()
  text: string;

  @Field()
  postId: string;

  @Field(() => String, { nullable: true })
  path: string | null;

  @Field(() => String, { nullable: true })
  codeSnippet: string | null;

  @Field()
  programmingLanguage: string;
}
