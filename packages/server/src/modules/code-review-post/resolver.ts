import { ApolloError } from "apollo-server-core";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { CodeReviewPost } from "../../entity/CodeReviewPost";
import { CodeReviewPostRepository } from "../../repositories/CodeReviewPostRepo";
import { CodeReviewQuestionRepository } from "../../repositories/CodeReviewQuestionRepo";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreateCodeReviewPostInput } from "./createInput";
import { FindCodeReviewPostInput } from "./findInput";
import { FindCodeReviewPostResponse } from "./findResponse";
import { CodeReviewPostResponse } from "./response";

@Resolver(CodeReviewPost)
export class CodeReviewPostResolvers {
  constructor(
    @InjectRepository(CodeReviewQuestionRepository)
    private readonly questionRepo: CodeReviewQuestionRepository,
    @InjectRepository(CodeReviewPostRepository)
    private readonly postRepo: CodeReviewPostRepository
  ) {}

  @Mutation(() => CodeReviewPostResponse)
  @UseMiddleware(isAuthenticated)
  async findOrCreateCodeReviewPost(
    @Arg("codeReviewPost") input: CreateCodeReviewPostInput,
    @Ctx() { req }: MyContext
  ): Promise<CodeReviewPostResponse> {
    let value = await this.postRepo.findOne({
      where: {
        commitId: input.commitId,
        repo: input.repo,
        repoOwner: input.repoOwner,
      },
    });

    if (!value) {
      value = await this.postRepo.save({
        ...input,
        creatorId: req.session!.userId,
      });
    }

    return {
      codeReviewPost: value,
    };
  }

  @Query(() => CodeReviewPost, {
    nullable: true,
  })
  async getCodeReviewPostById(@Arg("id") id: string) {
    return this.postRepo.findOne(id);
  }

  @FieldResolver()
  numQuestions(@Root() root: CodeReviewPost) {
    return this.questionRepo.count({ where: { postId: root.id } });
  }

  @Query(() => FindCodeReviewPostResponse)
  async findCodeReviewPost(@Arg("input")
  {
    offset,
    limit,
    topics,
  }: FindCodeReviewPostInput): Promise<FindCodeReviewPostResponse> {
    if (limit > 6) {
      throw new ApolloError("max limit of 6");
    }

    return this.postRepo.findByTopics({
      limit,
      offset,
      topics,
    });
  }
}
