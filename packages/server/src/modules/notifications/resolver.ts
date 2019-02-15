import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../../entity/Comment";
import { QuestionCommentNotification } from "../../entity/QuestionCommentNotification";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";

@Resolver(Comment)
export class CommentResolver {
  constructor(
    @InjectRepository(QuestionCommentNotification)
    private readonly questionCommentNotificationRepo: Repository<
      QuestionCommentNotification
    >
  ) {}

  @Query(() => [QuestionCommentNotification])
  @UseMiddleware(isAuthenticated)
  async notifications(
    @Arg("read") read: boolean,
    @Ctx() { req }: MyContext
  ): Promise<QuestionCommentNotification[]> {
    return this.questionCommentNotificationRepo.find({
      where: { userToNotifyId: req.session!.userId, read },
      relations: ["comment", "question", "question.post"],
      order: { createdAt: "DESC" },
    });
  }
}
