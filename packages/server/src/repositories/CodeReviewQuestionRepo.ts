import { EntityRepository, Repository } from "typeorm";
import { CodeReviewQuestion } from "../entity/CodeReviewQuestion";

@EntityRepository(CodeReviewQuestion)
export class CodeReviewQuestionRepository extends Repository<
  CodeReviewQuestion
> {
  async add(input: Partial<CodeReviewQuestion>) {
    const q = await this.findOne({
      where: {
        lineNum: input.lineNum,
        path: input.path,
        postId: input.postId,
      },
    });

    if (q) {
      return null;
    }

    return this.save(input);
  }
}
