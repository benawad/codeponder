import { Resolver, Arg, Query, Root, FieldResolver, Ctx } from "type-graphql"
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion"
import { FindConditions, getConnection } from "typeorm"
import { CreateCodeReviewQuestionResponse } from "./createResponse"
import { CreateCodeReviewQuestionInput } from "./createInput"
import { createBaseResolver } from "../shared/createBaseResolver"
import { QuestionReply } from "../../entity/QuestionReply"
import { MyContext } from "../../types/Context"

const CodeReviewQuestionBaseResolver = createBaseResolver(
  "CodeReviewQuestion",
  CreateCodeReviewQuestionInput,
  CodeReviewQuestion,
  CreateCodeReviewQuestionResponse
)
@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver extends CodeReviewQuestionBaseResolver {
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
      username,
    }

    if (path) {
      where.path = path
    }

    return CodeReviewQuestion.find({
      where,
    })
  }

  @Query(() => [CodeReviewQuestion])
  async homeQuestions() {
    const questions = await getConnection().query(`
      select distinct on (repo, username) * from code_review_question;
    `)

    return questions.map((q: any) => CodeReviewQuestion.create(q))
  }

  @FieldResolver(() => [QuestionReply])
  async replies(@Root() root: CodeReviewQuestion, @Ctx() ctx: MyContext) {
    const replies = await ctx.questionReplyLoader.load(root.id)
    return replies || []
  }
}
