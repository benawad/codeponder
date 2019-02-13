// createInput - TypeGrqphQL input type used on resolver to CreatePlanningClass 
// these are essentially required parameters needed to create new PlanningClass item. 
import { InputType, Field } from "type-graphql";
import { PlanningClass } from "../../entity/PlannnigClass";

@InputType()
export class CreatePlanningClassInput implements Partial<PlanningClass> {
  @Field(() => String)
  className: string;

  @Field(() => String)
  description: string;
}
