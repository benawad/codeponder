import { CreateCodeReviewPostInput } from "./createInput";
import { CodeReviewPost } from "../../entity/CodeReviewPost";
import { CreateCodeReviewPostResponse } from "./createResponse";
import { findOrCreateResolver } from "../shared/find-or-create-resolver";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getByIdResolver } from "../shared/get-by-id-resolver";
import { FindCodeReviewPostInput } from "./findInput";
import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";

const suffix = "CodeReviewPost";

export const findOrCreateCodeReviewPost = findOrCreateResolver(
  suffix,
  CreateCodeReviewPostInput,
  CodeReviewPost,
  CreateCodeReviewPostResponse,
  ["commitId", "repo", "repoOwner"] as any
);

export const loadCreatorForCodeReviewPost = loadCreatorResolver(CodeReviewPost);

export const getCodeReviewPostById = getByIdResolver(
  suffix,
  CodeReviewPost,
  CodeReviewPost
);

@Resolver(CodeReviewPost)
export class CodeReviewPostResolvers {
  @FieldResolver()
  numQuestions(@Root() root: CodeReviewPost) {
    return CodeReviewQuestion.count({ where: { postId: root.id } });
  }

  @Query(() => [CodeReviewPost], { name: "findCodeReviewPost" })
  async findCodeReviewPost(@Arg("input")
  {
    offset,
    limit,
    topics,
  }: FindCodeReviewPostInput) {
    let where: any = {};

    if (topics) {
      where.topics = topics;
    }

    return getConnection()
      .getRepository(CodeReviewPost)
      .createQueryBuilder("crp")
      .where("topics @> :topics", { topics })
      .skip(offset)
      .take(limit)
      .orderBy('"createdAt"', "DESC")
      .getMany();
  }
}
