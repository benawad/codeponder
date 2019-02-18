import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class OkResponse {
  @Field()
  ok: boolean;
}
