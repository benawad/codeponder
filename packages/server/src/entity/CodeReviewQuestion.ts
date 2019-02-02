import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CodeReviewPost } from "./CodeReviewPost";
import { QuestionReply } from "./QuestionReply";
import { User } from "./User";

@Entity()
@ObjectType()
export class CodeReviewQuestion extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", default: "" })
  title: string;

  @Field(() => Int)
  @Column({ type: "int" })
  startingLineNum: number;

  @Field(() => Int)
  @Column({ type: "int" })
  endingLineNum: number;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  programmingLanguage: string | null;

  @Field()
  @Column({ type: "text" })
  text: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  codeSnippet: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  path: string | null;

  @Field()
  @Column("uuid")
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.codeReviewQuestions)
  creator: Promise<User>;

  @Field()
  @Column("uuid")
  postId: string;

  @Field(() => CodeReviewPost)
  @ManyToOne(() => CodeReviewPost, crp => crp.questions)
  post: Promise<User>;

  @Field(() => [QuestionReply])
  @OneToMany(() => QuestionReply, qr => qr.question)
  replies: Promise<QuestionReply[]>;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => Int)
  numReplies: number;
}
