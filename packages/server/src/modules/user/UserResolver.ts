import { Resolver, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ) {
    const { userId } = ctx.req.session!;
    return userId ? User.findOne(userId) : null;
  }
}
