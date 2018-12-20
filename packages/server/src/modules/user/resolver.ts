import {
  Resolver,
  Query,
  Ctx,
  FieldResolver,
  Mutation,
  Authorized,
} from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";

@Resolver(User)
export class UserResolver {
  constructor() {}

  @FieldResolver()
  accessToken(@Ctx() ctx: MyContext) {
    return ctx.req.session!.accessToken;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(
    @Ctx()
    ctx: MyContext
  ) {
    return new Promise(res =>
      ctx.req.session!.destroy(err => {
        console.log(err);
        res(!!err);
      })
    );
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ) {
    const { userId } = ctx.req.session!;
    return userId ? User.findOne(userId) : null;
  }
}
