import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";
import { CodeReview } from "./CodeReviewRequest";

/*

Number of days
Github url
Programming languages
Notes

*/

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: "boolean", default: false })
  accepted: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.offers)
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @Column()
  codeReviewId: String;

  @ManyToOne(() => CodeReview, crr => crr.offers)
  @JoinColumn({ name: "codeReviewId" })
  codeReview: Promise<CodeReview>;
}
