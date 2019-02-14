import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../../entity/Comment";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreateCommentInput } from "./createInput";
import { QuestionReplyResponse } from "./response";

@Resolver(Comment)
export class CommentResolver {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>
  ) {}

  @Mutation(() => QuestionReplyResponse)
  @UseMiddleware(isAuthenticated)
  async createQuestionReply(
    @Arg("questionReply") input: CreateCommentInput,
    @Ctx() { req }: MyContext
  ): Promise<QuestionReplyResponse> {
    return {
      comment: await this.commentRepo.save({
        ...input,
        creatorId: req.session!.userId,
      }),
    };
  }
}
