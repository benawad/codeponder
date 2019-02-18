import { Field, ObjectType } from "type-graphql";
import { QuestionCommentNotification } from "../../entity/QuestionCommentNotification";

@ObjectType()
export class NotificationsResponse {
  @Field(() => [QuestionCommentNotification])
  notifications: QuestionCommentNotification[];

  @Field()
  hasMore: boolean;
}
