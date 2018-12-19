import { Resolver, Arg, Query } from "type-graphql";

export function getByIdResolver<T extends Object>(
  suffix: string,
  entity: any,
  graphqlReturnType: T
) {
  @Resolver(entity)
  class BaseResolver {
    @Query(() => graphqlReturnType, {
      name: `get${suffix}ById`,
      nullable: true,
    })
    async getById(@Arg("id", () => String) id: string) {
      return entity.findOne(id);
    }
  }

  return BaseResolver;
}
