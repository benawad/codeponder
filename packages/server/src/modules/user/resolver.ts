import {
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { QuestionCommentNotification } from "../../entity/QuestionCommentNotification";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";

@Resolver(User)
export class UserResolver {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;
  @InjectRepository(QuestionCommentNotification)
  private readonly questionCommentNotificationRepo: Repository<
    QuestionCommentNotification
  >;

  @FieldResolver()
  async hasUnreadNotifications(
    @Root() user: User,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    if (!ctx.req.session || ctx.req.session.userId !== user.id) {
      throw new Error("not authorized");
    }

    const qc = await this.questionCommentNotificationRepo.findOne({
      where: { questionAskerId: user.id, read: false },
    });

    return !!qc;
  }

  @FieldResolver()
  accessToken(@Ctx() ctx: MyContext): string | undefined {
    return ctx.req.session && ctx.req.session.accessToken;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async logout(
    @Ctx()
    ctx: MyContext
  ): Promise<{}> {
    return new Promise(res => {
      ctx.req.session
        ? ctx.req.session.destroy(err => {
            console.log(err);
            res(!!err);
          })
        : res(true);
    });
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ): Promise<User | null | undefined> {
    const { userId = "" } = ctx.req.session || {};
    return userId ? this.userRepo.findOne(userId) : null;
  }
}
