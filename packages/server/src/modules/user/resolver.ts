import {
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  @FieldResolver()
  accessToken(@Ctx() ctx: MyContext) {
    return ctx.req.session!.accessToken;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
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
    return userId ? this.userRepo.findOne(userId) : null;
  }
}
