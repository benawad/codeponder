import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeReviewPost } from "./CodeReviewPost";
import { CodeReviewQuestion } from "./CodeReviewQuestion";
import { QuestionReply } from "./QuestionReply";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  name: string | null;

  @Column({ type: "text", unique: true })
  githubId: string;

  @Field()
  @Column({ type: "text" })
  pictureUrl: string;

  @Field()
  @Column({ type: "text" })
  bio: string;

  @OneToMany(() => CodeReviewQuestion, crq => crq.creatorConnection)
  codeReviewQuestions: Promise<CodeReviewQuestion[]>;

  @OneToMany(() => CodeReviewPost, crp => crp.creatorConnection)
  codeReviewPosts: Promise<CodeReviewPost[]>;

  @OneToMany(() => QuestionReply, qr => qr.creatorConnection)
  questionReply: Promise<QuestionReply[]>;

  @Field(() => String, { nullable: true })
  accessToken: string | null;
}
