import { Ctx, Field, ID, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MyContext } from "../types/Context";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
@ObjectType()
export class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", default: "" })
  title: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  lineNum?: number;

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

  @ManyToOne(() => User, user => user.Questions, { onDelete: "CASCADE" })
  creatorConnection: Promise<User>;

  @Field(() => User)
  creator(@Ctx() { userLoader }: MyContext): Promise<User> {
    return userLoader.load(this.creatorId);
  }

  @Field(() => Post)
  @ManyToOne(() => Post, crp => crp.questions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Promise<User>;
  @Field()
  @Column("uuid")
  postId: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, qr => qr.question)
  comments: Promise<Comment[]>;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Field(() => Int)
  numComments: number;
}
