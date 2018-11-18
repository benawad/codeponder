import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
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
  @Column({ type: "boolean", default: false })
  accepted: boolean;

  @PrimaryColumn()
  userId: string;
  @PrimaryColumn()
  codeReviewId: String;

  @ManyToOne(() => User, user => user.offers)
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(() => CodeReview, crr => crr.offers)
  @JoinColumn({ name: "codeReviewId" })
  codeReview: Promise<CodeReview>;
}
