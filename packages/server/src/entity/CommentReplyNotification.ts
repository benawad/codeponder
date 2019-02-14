import { Field, ObjectType } from "type-graphql";
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
@ObjectType()
export class CommentReplyNotification {
  @Field(() => Comment)
  @OneToOne(() => Comment)
  reply: Promise<Comment>;
  @Field()
  @PrimaryColumn("uuid")
  replyId: string;

  @Field(() => Comment)
  @OneToOne(() => Comment)
  comment: Promise<Comment>;
  @Field()
  @PrimaryColumn("uuid")
  commentId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "targetId" })
  target: Promise<User>;
  @Field()
  @PrimaryColumn("uuid")
  targetId: string;
}
