import { Field, InputType, Int } from "type-graphql";
import { Question } from "../../entity/Question";

@InputType()
export class CreateQuestionInput implements Partial<Question> {
  @Field(() => Int, { nullable: true })
  lineNum?: number;

  @Field()
  title: string;

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
