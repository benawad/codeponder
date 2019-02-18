import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
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

  @Field(() => Question)
  @ManyToOne(() => Question, { onDelete: "CASCADE" })
  question: Promise<Question>;
  @Field()
  @PrimaryColumn("uuid")
  questionId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userToNotifyId" })
  userToNotify: Promise<User>;
  @Field()
  @Column("uuid")
  userToNotifyId: string;

  @Field(() => String)
  @Column()
  type: "reply" | "mention";

  @Field()
  @Column("boolean", { default: "false" })
  read: boolean;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}
