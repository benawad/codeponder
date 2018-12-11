import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { User } from "./User";

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

  @Field()
  @Column({ type: "text" })
  path: string;

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

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
