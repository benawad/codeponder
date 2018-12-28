import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "./User";
import { QuestionReply } from "./QuestionReply";
import { CodeReviewPost } from "./CodeReviewPost";

@Entity()
@ObjectType()
export class CodeReviewQuestion extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
}
