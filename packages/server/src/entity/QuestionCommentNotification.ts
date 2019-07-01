import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Question } from "./Question";
import { User } from "./User";
import { Lazy } from "../types/Lazy";

@Entity()
@ObjectType()
export class QuestionCommentNotification {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Comment)
  @ManyToOne(() => Comment)
  comment: Lazy<Comment>;
  @Field()
  @Column("uuid")
  commentId: string;

  @Field(() => Question)
  @ManyToOne(() => Question, { onDelete: "CASCADE" })
  question: Lazy<Question>;
  @Field()
  @Column("uuid")
  questionId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userToNotifyId" })
  userToNotify: Lazy<User>;
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
