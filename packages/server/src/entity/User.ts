import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import { CodeReview } from "./CodeReviewRequest";
import { Offer } from "./Offer";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => CodeReview, crr => crr.user)
  codeReviews: CodeReview[];

  @OneToMany(() => Offer, crr => crr.user)
  offers: Offer[];
}
