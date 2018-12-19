import { Resolver, Authorized, Mutation, Arg, Ctx } from "type-graphql";
import { MyContext } from "../../types/Context";

export function findOrCreateResolver<ArgType extends Object, T extends Object>(
  suffix: string,
  argType: ArgType,
  entity: any,
  graphqlReturnType: T,
  fields: Array<keyof ArgType>
) {
  const argAndReturnKeyName = suffix[0].toLowerCase() + suffix.slice(1);
  @Resolver(entity)
  class BaseResolver {
    @Authorized()
    @Mutation(() => graphqlReturnType, { name: `findOrCreate${suffix}` })
    async findOrCreate(
      @Arg(argAndReturnKeyName, () => argType) input: ArgType,
      @Ctx() { req }: MyContext
    ) {
      let where: any = {};
      fields.forEach(field => {
        where[field] = input[field];
      });
      let value = await entity.findOne({
        where,
      });

      if (!value) {
        value = await entity
          .create({
            ...input,
            creatorId: req.session!.userId,
          })
          .save();
      }

      return {
        [argAndReturnKeyName]: value,
      };
    }
  }

  return BaseResolver;
}
