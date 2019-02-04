import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { QuestionReply } from "../../entity/QuestionReply";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreateQuestionReplyInput } from "./createInput";
import { QuestionReplyResponse } from "./response";

@Resolver(QuestionReply)
export class QuestionReplyResolver {
  constructor(
    @InjectRepository(QuestionReply)
    private readonly replyRepo: Repository<CodeReviewQuestion>
  ) {}

  @Mutation(() => QuestionReplyResponse)
  @UseMiddleware(isAuthenticated)
  async createQuestionReply(
    @Arg("input") input: CreateQuestionReplyInput,
    @Ctx() { req }: MyContext
  ) {
    return this.replyRepo.save({
      ...input,
      creatorId: req.session!.userId,
    });
  }
}
