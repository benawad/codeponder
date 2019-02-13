// PlanningClass
// is the planning type strategic or tactical

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";
import { ObjectType, Field, ID, } from "type-graphql";

@Entity()
@ObjectType()
export class PlanningClass extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column({
    type: "varchar",
    length: 50,
    comment: "Planning class name (typically either strategic or tactical)",
  })
  className: string;

  @Field(() => String)
  @Column({
    type: "varchar",
    length: 200,
    comment: "Planning class description",
  })
  description: string;
}
