import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { FindConditions, getConnection } from "typeorm";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { QuestionReply } from "../../entity/QuestionReply";
import { MyContext } from "../../types/Context";
import { createBaseResolver } from "../shared/createBaseResolver";
import { CreateCodeReviewQuestionInput } from "./createInput";
import { CreateCodeReviewQuestionResponse } from "./createResponse";

const CodeReviewQuestionBaseResolver = createBaseResolver(
  "CodeReviewQuestion",
  CreateCodeReviewQuestionInput,
  CodeReviewQuestion,
  CreateCodeReviewQuestionResponse
);

const PAGE_SIZE = 6;
@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver extends CodeReviewQuestionBaseResolver {
  @FieldResolver()
  numReplies(@Root() root: CodeReviewQuestion) {
    return QuestionReply.count({ where: { questionId: root.id } });
  }

  @Mutation(() => CodeReviewQuestion)
  async updateCodeReviewQuestionTitle(
    @Arg("id") id: string,
    @Arg("title") title: string
  ) {
    const q = await CodeReviewQuestion.findOne(id);

    if (!q) {
      throw new Error("could not find question");
    }

    q.title = title;

    return q;
  }

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
