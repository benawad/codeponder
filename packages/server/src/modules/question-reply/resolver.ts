import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { QuestionReply } from "../../entity/QuestionReply";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreateQuestionReplyInput } from "./createInput";
import { QuestionReplyResponse } from "./response";

@Resolver(QuestionReply)
export class QuestionReplyResolver {
  constructor(
    @InjectRepository(QuestionReply)
    private readonly replyRepo: Repository<QuestionReply>
  ) {}

  @Mutation(() => QuestionReplyResponse)
  @UseMiddleware(isAuthenticated)
  async createQuestionReply(
    @Arg("questionReply") input: CreateQuestionReplyInput,
    @Ctx() { req }: MyContext
  ): Promise<QuestionReplyResponse> {
    return {
      questionReply: await this.replyRepo.save({
        ...input,
        creatorId: req.session!.userId,
      }),
    };
  }
}
