import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";
import { Question } from "./Question";

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

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  bio: string | null;

  @OneToMany(() => Question, crq => crq.creatorConnection)
  Questions: Promise<Question[]>;

  @OneToMany(() => Post, crp => crp.creatorConnection)
  Posts: Promise<Post[]>;

  @OneToMany(() => Comment, qr => qr.creatorConnection)
  comments: Promise<Comment[]>;

  // not in database....
  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => Boolean)
  hasUnreadNotifications: Promise<boolean>;
}
