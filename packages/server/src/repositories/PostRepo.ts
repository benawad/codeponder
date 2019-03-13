import { EntityRepository, Repository } from "typeorm";
import { Post } from "../entity/Post";

interface FindByTopicsOptions {
  topics: string[];
  cursor?: string;
  limit: number;
}

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findByTopics({
    topics,
    cursor,
    limit,
  }: FindByTopicsOptions): Promise<{
    hasMore: boolean;
    posts: Post[];
  }> {
    const qb = this.createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(limit + 1);

    if (topics.length) {
      qb.where("topics @> :topics", { topics });
    }

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor });
    }

    const posts = await qb.getMany();

    return {
      hasMore: posts.length === limit + 1,
      posts: posts.slice(0, limit),
    };
  }
}
