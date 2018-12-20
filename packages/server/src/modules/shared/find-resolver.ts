import { Resolver, Authorized, Arg, Query } from "type-graphql";

export function findResolver<ArgType extends Object, T extends Object>(
  suffix: string,
  argType: ArgType,
  entity: any,
  graphqlReturnType: T
) {
  const argAndReturnKeyName = suffix[0].toLowerCase() + suffix.slice(1);
  @Resolver(entity)
  class BaseResolver {
    @Authorized()
    @Query(() => graphqlReturnType, { name: `find${suffix}` })
    async find(@Arg(argAndReturnKeyName, () => argType)
    {
      offset,
      limit,
      ...input
    }: any) {
      let where: any = {};
      Object.entries(input).forEach(([k, v]) => {
        // maybe need to check if v in undefined and not set it
        where[k] = v;
      });

      return entity.findOne({ where, skip: offset, take: limit });
    }
  }

  return BaseResolver;
}
