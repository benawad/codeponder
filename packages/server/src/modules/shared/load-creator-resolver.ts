import { Resolver, Ctx, FieldResolver, Root } from "type-graphql";
import { MyContext } from "../../types/Context";
import { User } from "../../entity/User";

export function loadCreatorResolver(entity: any) {
  @Resolver(entity, { isAbstract: true })
  abstract class BaseResolver {
    @FieldResolver(() => User)
    creator(@Root() root: any, @Ctx() ctx: MyContext) {
      return ctx.userLoader.load(root.creatorId);
    }
  }

  return BaseResolver;
}
