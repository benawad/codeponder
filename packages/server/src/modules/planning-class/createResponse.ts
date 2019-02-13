// createResponse - TypeGraphQL object type returned from server when 
// PlanningClass objects are specified.  Used as response from CreatePC resolver 
import { ObjectType, Field } from "type-graphql";
import { PlanningClass } from "../../entity/PlannnigClass";

@ObjectType()
export class CreatePlanningClassResponse {
  @Field()
  planningClass: PlanningClass;
}
