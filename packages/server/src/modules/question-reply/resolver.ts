import { Resolver, Ctx, Mutation, Arg, Authorized } from "type-graphql";

import { MyContext } from "../../types/Context";
import { QuestionReply } from "../../entity/QuestionReply";
import { CreateQuestionReplyResponse } from "./createResponse";
import { CreateQuestionReplyInput } from "./createInput";

@Resolver(QuestionReply)
export class QuestionReplyResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => CreateQuestionReplyResponse)
  async createQuestionReply(
    @Arg("reply") reply: CreateQuestionReplyInput,
    @Ctx()
    ctx: MyContext
  ) {
    const questionReply = await QuestionReply.create({
      ...reply,
      creatorId: ctx.req.session!.userId
    }).save();
    return {
      questionReply
    };
  }
}
