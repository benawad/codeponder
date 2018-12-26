import {
  Resolver,
  Arg,
  Query,
  Root,
  FieldResolver,
  Ctx,
  Int,
} from "type-graphql";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { FindConditions, getConnection } from "typeorm";
import { CreateCodeReviewQuestionResponse } from "./createResponse";
import { CreateCodeReviewQuestionInput } from "./createInput";
import { createBaseResolver } from "../shared/createBaseResolver";
import { QuestionReply } from "../../entity/QuestionReply";
import { MyContext } from "../../types/Context";

const CodeReviewQuestionBaseResolver = createBaseResolver(
  "CodeReviewQuestion",
  CreateCodeReviewQuestionInput,
  CodeReviewQuestion,
  CreateCodeReviewQuestionResponse
);

const PAGE_SIZE = 6;
@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver extends CodeReviewQuestionBaseResolver {
  @Query(() => [CodeReviewQuestion])
  async findCodeReviewQuestions(
    @Arg("path", { nullable: true }) path: string,
    @Arg("postId") postId: string
  ) {
    const where: FindConditions<CodeReviewQuestion> = {
      postId,
    };

    if (path) {
      where.path = path;
    }

    return CodeReviewQuestion.find({
      where,
    });
  }

  @Query(() => [CodeReviewQuestion])
  async homeQuestions(
    @Arg("offset", () => Int, { nullable: true }) offset = PAGE_SIZE,
    @Arg("limit", () => Int, { nullable: true, description: "max of 18" })
    limit = PAGE_SIZE
  ) {
    if (limit > 18) {
      limit = 18;
    }

    const questions = await getConnection().query(
      `
      select * from code_review_question offset $1 limit $2;
    `,
      [offset, limit]
    );

    return questions.map((q: any) => CodeReviewQuestion.create(q));
  }

  @FieldResolver(() => [QuestionReply])
  async replies(@Root() root: CodeReviewQuestion, @Ctx() ctx: MyContext) {
    const replies = await ctx.questionReplyLoader.load(root.id);
    return replies || [];
  }
}
