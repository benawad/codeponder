import { CreatePlanningClassResponse } from "./createResponse";
import { CreatePlanningClassInput } from "./createInput";
import { createBaseResolver } from "../shared/createBaseResolver";
import { PlanningClass } from "../../entity/PlannnigClass";
import { Resolver, Query } from "type-graphql";

const PlanningClassBaseResolver = createBaseResolver(
  "PlanningClass",
  CreatePlanningClassInput,
  PlanningClass,
  CreatePlanningClassResponse
);

@Resolver(PlanningClass) // wrap typegraphql entity with resolver functions
export class PlanningClassResolver extends PlanningClassBaseResolver {
  // add methods here for behavior not in BaseResolver (e.g. one to many, etc.)
  @Query(() => [PlanningClass])
  async findPlanningClass() {
    return PlanningClass.find();
  }
}
