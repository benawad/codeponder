import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

/*

Number of days
Github url
Programming languages
Notes

*/

@Entity()
export class CodeReviewRequest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: "int" })
  numDays: number;

  @Column({ type: "text" })
  codeUrl: string;

  @Column({ type: "text", array: true })
  techTags: string[];

  @Column({ type: "text" })
  notes: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, user => user.codeReviewRequests)
  @JoinColumn({ name: "ownerId" })
  user: Promise<User>;
}
