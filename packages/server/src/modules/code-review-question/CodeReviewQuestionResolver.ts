import { Resolver, Ctx, Mutation, Arg, Authorized, Query } from "type-graphql";
import { MyContext } from "../../types/Context";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { CreateCodeReviewQuestionInput } from "./shared/CreateCodeReviewQuestionInput";
import { CreateCodeReviewResponse } from "./shared/CreateCodeReviewResponse";
import { FindConditions } from "typeorm";

@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => CreateCodeReviewResponse)
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

  @Query(() => [CodeReviewQuestion])
  async findCodeReviewQuestions(
    @Arg("path", { nullable: true }) path: string,
    @Arg("repo") repo: string,
    @Arg("branch") branch: string,
    @Arg("username") username: string
  ) {
    const where: FindConditions<CodeReviewQuestion> = {
      repo,
      branch,
      username
    };

    if (path) {
      where.path = path;
    }

    return CodeReviewQuestion.find({
      where
    });
  }
}
