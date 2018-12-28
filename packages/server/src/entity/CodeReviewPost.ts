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
import { CodeReviewQuestion } from "./CodeReviewQuestion";

@Entity()
@ObjectType()
export class CodeReviewPost extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => [String])
  @Column({ type: "text", array: true })
  topics: string[];

  @Field()
  @Column({ type: "text" })
  title: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ type: "text" })
  repo: string;

  @Field()
  @Column({ type: "text" })
  commitId: string;

  @Field()
  @Column({ type: "text" })
  repoOwner: string;

  @Field()
  @Column("uuid")
  creatorId: string;

  @OneToMany(() => CodeReviewQuestion, crq => crq.post)
  questions: Promise<CodeReviewQuestion[]>;

  @Field(() => User)
  @ManyToOne(() => User, user => user.codeReviewQuestions)
  creator: Promise<User>;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => Int)
  numQuestions: number;
}
