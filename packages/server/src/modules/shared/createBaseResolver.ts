import { Resolver, Authorized, Mutation, Arg, Ctx } from "type-graphql";
import { MyContext } from "../../types/Context";

export function createBaseResolver<
  T extends Function,
  ArgType extends Function
>(suffix: string, argType: ArgType, entity: any, graphqlReturnType: T) {
  const argAndReturnKeyName = suffix[0].toLowerCase() + suffix.slice(1);
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Authorized()
    @Mutation(() => graphqlReturnType, { name: `create${suffix}` })
    async create(
      @Arg(argAndReturnKeyName, () => argType) input: ArgType,
      @Ctx()
      ctx: MyContext
    ) {
      const value = await entity
        .create({
          ...(input as any),
          creatorId: ctx.req.session!.userId
        })
        .save();
      return {
        [argAndReturnKeyName]: value
      };
    }
  }

  return BaseResolver;
}
