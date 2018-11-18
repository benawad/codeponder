import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";
import { CodeReviewRequest } from "./CodeReviewRequest";

/*

Number of days
Github url
Programming languages
Notes

*/

@Entity()
export class Offer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column()
  accepted: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.offers)
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @Column()
  codeReviewRequestId: String;

  @ManyToOne(() => CodeReviewRequest, crr => crr.offers)
  @JoinColumn({ name: "codeReviewRequestId" })
  codeReviewRequest: Promise<CodeReviewRequest>;
}
