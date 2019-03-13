import { EntityRepository, Repository } from "typeorm";
import { Question } from "../entity/Question";

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  async add(
    input: Partial<Question>
  ): Promise<(Partial<Question> & Question) | null> {
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
