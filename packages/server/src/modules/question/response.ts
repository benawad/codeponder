import { Field, ObjectType } from "type-graphql";
import { Question } from "../../entity/Question";

@ObjectType()
export class QuestionResponse {
  @Field()
  question: Question;
}
