import { EntityRepository, Repository } from "typeorm";
import { Post } from "../entity/Post";

interface FindByTopicsOptions {
  topics: string[];
  offset: number;
  limit: number;
}

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async findByTopics({ topics, offset, limit }: FindByTopicsOptions) {
    const posts = await this.createQueryBuilder("p")
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
