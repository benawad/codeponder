import { Ctx, Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MyContext } from "../types/Context";
import { CodeReviewQuestion } from "./CodeReviewQuestion";
import { User } from "./User";

@Entity()
@ObjectType()
export class QuestionReply {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  text: string;

  @ManyToOne(() => CodeReviewQuestion, crq => crq.replies)
  question: Promise<CodeReviewQuestion>;
  @Field()
  @Column("uuid")
  questionId: string;

  @ManyToOne(() => User, user => user.questionReply)
  @JoinColumn({ name: "creatorId" })
  creatorConnection: Promise<User>;
  @Field()
  @Column("uuid")
  creatorId: string;

  @Field(() => User)
  creator(@Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(this.creatorId);
  }

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}
