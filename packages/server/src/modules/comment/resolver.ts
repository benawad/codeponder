import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../../entity/Comment";
import { Question } from "../../entity/Question";
import { QuestionCommentNotification } from "../../entity/QuestionCommentNotification";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreateCommentInput } from "./createInput";
import { CommentResponse } from "./response";

@Resolver(Comment)
export class CommentResolver {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(QuestionCommentNotification)
    private readonly questionCommentNotificationRepo: Repository<
      QuestionCommentNotification
    >
  ) {}

  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuthenticated)
  async createComment(
    @Arg("comment") input: CreateCommentInput,
    @Ctx() { req }: MyContext
  ): Promise<CommentResponse> {
    const comment = await this.commentRepo.save({
      ...input,
      creatorId: req.session!.userId,
    });

    const question = await this.questionRepo.findOne(input.questionId);

    await this.questionCommentNotificationRepo.save({
      commentId: comment.id,
      questionId: input.questionId,
      userToNotifyId: question!.creatorId,
      type: "reply",
    });

    return {
      comment,
    };
  }
}
