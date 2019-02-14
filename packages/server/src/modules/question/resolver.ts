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
import { Comment } from "../../entity/Comment";
import { Question } from "../../entity/Question";
import { DisplayError } from "../../errors/DisplayError";
import { QuestionRepository } from "../../repositories/QuestionRepo";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreateQuestionInput } from "./createInput";
import { QuestionResponse } from "./response";

const PAGE_SIZE = 6;
@Resolver(Question)
export class QuestionResolver {
  constructor(
    @InjectRepository(QuestionRepository)
    private readonly questionRepo: QuestionRepository,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>
  ) {}

  @FieldResolver()
  numComments(@Root() root: Question) {
    return this.commentRepo.count({ where: { questionId: root.id } });
  }

  @Mutation(() => QuestionResponse)
  @UseMiddleware(isAuthenticated)
  async createQuestion(
    @Arg("question") input: CreateQuestionInput,
    @Ctx() ctx: MyContext
  ): Promise<QuestionResponse> {
    const q = await this.questionRepo.add({
      ...input,
      creatorId: ctx.req.session!.userId,
    });

    if (!q) {
      throw new DisplayError("someone already added a question on that line");
    }

    return {
      question: q,
    };
  }

  @Mutation(() => Question)
  async updateQuestionTitle(
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

  @Query(() => [Question])
  async findQuestions(
    @Arg("postId") postId: string,
    @Arg("path", () => String, { nullable: true }) path?: string
  ) {
    const where: FindConditions<Question> = {
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

  @Query(() => [Question])
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

  @FieldResolver(() => [Comment])
  async comments(@Root() root: Question, @Ctx() ctx: MyContext) {
    const comments = await ctx.commentLoader.load(root.id);
    return comments || [];
  }
}
