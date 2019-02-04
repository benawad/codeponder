import { EntityRepository, Repository } from "typeorm";
import { CodeReviewPost } from "../entity/CodeReviewPost";

interface FindByTopicsOptions {
  topics: string[];
  offset: number;
  limit: number;
}

@EntityRepository(CodeReviewPost)
export class CodeReviewPostRepository extends Repository<CodeReviewPost> {
  async findByTopics({ topics, offset, limit }: FindByTopicsOptions) {
    const posts = await this.createQueryBuilder("crp")
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
