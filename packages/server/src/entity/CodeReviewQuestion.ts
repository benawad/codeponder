import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "./User";
import { QuestionReply } from "./QuestionReply";

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

  @Field()
  @Column({ type: "text" })
  question: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  path: string | null;

  @Field()
  @Column({ type: "text" })
  repo: string;

  @Field()
  @Column({ type: "text" })
  branch: string;

  @Field()
  @Column({ type: "text" })
  username: string;

  @Field()
  @Column("uuid")
  creatorId: string;

  @ManyToOne(() => User, user => user.codeReviewQuestions)
  creator: Promise<User>;

  @OneToMany(() => QuestionReply, qr => qr.question)
  questionReply: Promise<QuestionReply[]>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
