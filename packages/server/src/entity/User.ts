import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { CodeReviewQuestion } from "./CodeReviewQuestion";
import { QuestionReply } from "./QuestionReply";
import { CodeReviewPost } from "./CodeReviewPost";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", unique: true })
  username: string;

  @Field()
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  githubId: string;

  @Field()
  @Column({ type: "text" })
  pictureUrl: string;

  @Field()
  @Column({ type: "text" })
  bio: string;

  @OneToMany(() => CodeReviewQuestion, crq => crq.creator)
  codeReviewQuestions: Promise<CodeReviewQuestion[]>;

  @OneToMany(() => CodeReviewPost, crp => crp.creator)
  codeReviewPosts: Promise<CodeReviewPost[]>;

  @OneToMany(() => QuestionReply, qr => qr.creator)
  questionReply: Promise<QuestionReply[]>;

  @Field(() => String, { nullable: true })
  accessToken: string | null;
}
