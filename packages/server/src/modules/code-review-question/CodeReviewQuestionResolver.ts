import { Resolver, Ctx, Mutation, Arg, Authorized } from "type-graphql";
import { MyContext } from "../../types/Context";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { CreateCodeReviewQuestionInput } from "./shared/CreateCodeReviewQuestionInput";
import { CreateCodeReviewResponse } from "./shared/CreateCodeReviewResponse";

@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => CreateCodeReviewResponse, { nullable: true })
  async createCodeReviewQuestion(
    @Arg("question") question: CreateCodeReviewQuestionInput,
    @Ctx()
    ctx: MyContext
  ) {
    const codeReviewQuestion = await CodeReviewQuestion.create({
      ...question,
      creatorId: ctx.req.session!.userId
    }).save();
    return {
      codeReviewQuestion
    };
  }
}
