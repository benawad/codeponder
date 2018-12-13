import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { CodeReviewQuestion } from "./CodeReviewQuestion";

@Entity()
@ObjectType()
export class QuestionReply extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  text: string;

  @Field()
  @Column("uuid")
  questionId: string;

  @ManyToOne(() => CodeReviewQuestion, crq => crq.replies)
  question: Promise<CodeReviewQuestion>;

  @Field()
  @Column("uuid")
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.questionReply)
  creator: Promise<User>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
