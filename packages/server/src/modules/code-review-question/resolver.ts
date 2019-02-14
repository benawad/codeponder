import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { FindConditions, getConnection, IsNull, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { QuestionReply } from "../../entity/QuestionReply";
import { DisplayError } from "../../errors/DisplayError";
import { CodeReviewQuestionRepository } from "../../repositories/CodeReviewQuestionRepo";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreateCodeReviewQuestionInput } from "./createInput";
import { CodeReviewQuestionResponse } from "./response";

const PAGE_SIZE = 6;
@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver {
  constructor(
    @InjectRepository(CodeReviewQuestionRepository)
    private readonly questionRepo: CodeReviewQuestionRepository,
    @InjectRepository(QuestionReply)
    private readonly replyRepo: Repository<CodeReviewQuestion>
  ) {}

  @FieldResolver()
  numReplies(@Root() root: CodeReviewQuestion) {
    return this.replyRepo.count({ where: { questionId: root.id } });
  }

  @Mutation(() => CodeReviewQuestionResponse)
  @UseMiddleware(isAuthenticated)
  async createCodeReviewQuestion(
    @Arg("codeReviewQuestion") input: CreateCodeReviewQuestionInput,
    @Ctx() ctx: MyContext
  ): Promise<CodeReviewQuestionResponse> {
    const q = await this.questionRepo.add({
      ...input,
      creatorId: ctx.req.session!.userId,
    });

    if (!q) {
      throw new DisplayError("someone already added a question on that line");
    }

    return {
      codeReviewQuestion: q,
    };
  }

  @Mutation(() => CodeReviewQuestion)
  async updateCodeReviewQuestionTitle(
    @Arg("id") id: string,
    @Arg("title") title: string
  ) {
    const q = await this.questionRepo.findOne(id);

    if (!q) {
      throw new Error("could not find question");
    }

    q.title = title;

    return q;
  }

  @Query(() => [CodeReviewQuestion])
  async findCodeReviewQuestions(
    @Arg("postId") postId: string,
    @Arg("path", () => String, { nullable: true }) path?: string
  ) {
    const where: FindConditions<CodeReviewQuestion> = {
      postId,
    };

    if (path === undefined) {
      where.path = IsNull();
    }

    if (path) {
      where.path = path;
    }

    return this.questionRepo.find({
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

    return questions;
  }

  @FieldResolver(() => [QuestionReply])
  async replies(@Root() root: CodeReviewQuestion, @Ctx() ctx: MyContext) {
    const replies = await ctx.questionReplyLoader.load(root.id);
    return replies || [];
  }
}
