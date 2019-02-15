import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
@ObjectType()
export class CommentMentionNotification {
  @Field(() => Comment)
  @ManyToOne(() => Comment, { onDelete: "CASCADE" })
  comment: Promise<Comment>;
  @Field()
  @PrimaryColumn("uuid")
  commentId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userMentionedId" })
  userMentioned: Promise<User>;
  @Field()
  @Column("uuid")
  userMentionedId: string;

  @Field()
  @Column()
  read: boolean;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}
