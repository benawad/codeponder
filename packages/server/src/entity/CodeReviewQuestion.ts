import { Ctx, Field, ID, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MyContext } from "../types/Context";
import { CodeReviewPost } from "./CodeReviewPost";
import { QuestionReply } from "./QuestionReply";
import { User } from "./User";

@Entity()
@ObjectType()
export class CodeReviewQuestion {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", default: "" })
  title: string;

  @Field(() => Int)
  @Column({ type: "int" })
  lineNum: number;

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

  @ManyToOne(() => User, user => user.codeReviewQuestions)
  creatorConnection: Promise<User>;

  @Field(() => User)
  creator(@Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(this.creatorId);
  }

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
