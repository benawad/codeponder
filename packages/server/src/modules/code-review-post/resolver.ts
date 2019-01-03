import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { ApolloError } from "apollo-server-core";

import { CreateCodeReviewPostInput } from "./createInput";
import { CodeReviewPost } from "../../entity/CodeReviewPost";
import { CreateCodeReviewPostResponse } from "./createResponse";
import { findOrCreateResolver } from "../shared/find-or-create-resolver";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getByIdResolver } from "../shared/get-by-id-resolver";
import { FindCodeReviewPostInput } from "./findInput";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { FindCodeReviewPostResponse } from "./findResponse";

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

    let where: any = {};

    if (topics) {
      where.topics = topics;
    }

    const posts = await getConnection()
      .getRepository(CodeReviewPost)
      .createQueryBuilder("crp")
      .where("topics @> :topics", { topics })
      .skip(offset)
      .take(limit + 1)
      .orderBy('"createdAt"', "DESC")
      .getMany();

    return {
      hasMore: posts.length === limit + 1,
      posts: posts.slice(0, limit),
    };
  }
}
