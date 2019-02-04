import { Field, InputType, Int } from "type-graphql";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";

@InputType()
export class CreateCodeReviewQuestionInput
  implements Partial<CodeReviewQuestion> {
  @Field(() => Int, { nullable: true })
  lineNum?: number;

  @Field()
  text: string;

  @Field()
  postId: string;

  @Field(() => String, { nullable: true })
  path: string | null;

  @Field(() => String, { nullable: true })
  codeSnippet: string | null;

  @Field(() => String, { nullable: true })
  programmingLanguage: string | null;
}
