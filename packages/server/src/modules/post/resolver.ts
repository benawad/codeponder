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
import { Post } from "../../entity/Post";
import { PostRepository } from "../../repositories/PostRepo";
import { QuestionRepository } from "../../repositories/QuestionRepo";
import { MyContext } from "../../types/Context";
import { isAuthenticated } from "../shared/middleware/isAuthenticated";
import { CreatePostInput } from "./createInput";
import { FindPostInput } from "./findInput";
import { FindPostResponse } from "./findResponse";
import { PostResponse } from "./response";

const POST_LIMIT = 6;
@Resolver(Post)
export class PostResolvers {
  @InjectRepository(QuestionRepository)
  private readonly questionRepo: QuestionRepository;
  @InjectRepository(PostRepository)
  private readonly postRepo: PostRepository;

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuthenticated)
  async findOrCreatePost(
    @Arg("post") input: CreatePostInput,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
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
        creatorId: req.session && req.session.userId,
      });
    }

    return {
      post: value,
    };
  }

  @Query(() => Post, {
    nullable: true,
  })
  async getPostById(@Arg("id") id: string): Promise<Post | undefined> {
    return this.postRepo.findOne(id);
  }

  @FieldResolver()
  numQuestions(@Root() root: Post): Promise<number> {
    return this.questionRepo.count({ where: { postId: root.id } });
  }

  @Query(() => FindPostResponse)
  async findPost(@Arg("input")
  {
    cursor,
    topics,
  }: FindPostInput): Promise<FindPostResponse> {
    return this.postRepo.findByTopics({
      cursor,
      topics,
      limit: POST_LIMIT,
    });
  }
}
