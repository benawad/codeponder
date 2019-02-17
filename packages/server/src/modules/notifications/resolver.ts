import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { LessThan, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../../entity/Comment";
import { QuestionCommentNotification } from "../../entity/QuestionCommentNotification";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { OkResponse } from "../shared/OkResponse";

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
    @Ctx() { req }: MyContext,
    @Arg("cursor") cursor?: string
  ): Promise<QuestionCommentNotification[]> {
    const where: any = {
      userToNotifyId: req.session!.userId,
    };

    if (cursor) {
      where.createdAt = LessThan(cursor);
    }

    return this.questionCommentNotificationRepo.find({
      where,
      relations: ["comment", "question", "question.post"],
      order: { read: "ASC", createdAt: "DESC" },
      take: 50,
    });
  }

  @Mutation(() => OkResponse)
  @UseMiddleware(isAuthenticated)
  async updateNotificationRead(
    @Arg("commentId") commentId: string,
    @Arg("questionId") questionId: string,
    @Arg("read") read: boolean,
    @Ctx() { req }: MyContext
  ): Promise<OkResponse> {
    await this.questionCommentNotificationRepo.update(
      {
        commentId,
        questionId,
        userToNotifyId: req.session!.userId,
      },
      {
        read,
      }
    );

    return {
      ok: true,
    };
  }

  @Mutation(() => OkResponse)
  @UseMiddleware(isAuthenticated)
  async markAllNotificationsAsRead(@Ctx() { req }: MyContext): Promise<
    OkResponse
  > {
    await this.questionCommentNotificationRepo.update(
      {
        userToNotifyId: req.session!.userId,
      },
      {
        read: true,
      }
    );

    return {
      ok: true,
    };
  }
}
