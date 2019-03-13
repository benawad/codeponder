import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { FindOneOptions, LessThan, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../../entity/Comment";
import { QuestionCommentNotification } from "../../entity/QuestionCommentNotification";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { OkResponse } from "../shared/OkResponse";
import { NotificationsResponse } from "./response";

const NOTIF_LIMIT = 50;
@Resolver(Comment)
export class CommentResolver {
  @InjectRepository(QuestionCommentNotification)
  private readonly questionCommentNotificationRepo: Repository<
    QuestionCommentNotification
  >;

  @Query(() => NotificationsResponse)
  @UseMiddleware(isAuthenticated)
  async notifications(
    @Ctx() { req }: MyContext,
    @Arg("cursor", { nullable: true }) cursor?: string
  ): Promise<NotificationsResponse> {
    const where: FindOneOptions["where"] = {
      userToNotifyId: req.session && req.session.userId,
    };

    if (cursor) {
      where.createdAt = LessThan(cursor);
    }

    const notifs = await this.questionCommentNotificationRepo.find({
      where,
      relations: ["comment", "question", "question.post"],
      order: { read: "ASC", createdAt: "DESC" },
      take: NOTIF_LIMIT + 1,
    });

    return {
      notifications: notifs.slice(0, NOTIF_LIMIT),
      hasMore: notifs.length === NOTIF_LIMIT + 1,
    };
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
        userToNotifyId: req.session && req.session.userId,
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
        userToNotifyId: req.session && req.session.userId,
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
