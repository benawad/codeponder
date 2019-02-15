import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Question } from "./Question";
import { User } from "./User";

@Entity()
@ObjectType()
export class QuestionCommentNotification {
  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Promise<Comment>;
  @Field()
  @PrimaryColumn("uuid")
  commentId: string;

  @ManyToOne(() => Question)
  question: Promise<Question>;
  @Field()
  @PrimaryColumn("uuid")
  questionId: string;

  @ManyToOne(() => User, u => u.questionCommentNotifications)
  @JoinColumn({ name: "questionAskerId" })
  questionAsker: Promise<User>;
  @Field()
  @Column("uuid")
  questionAskerId: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}
