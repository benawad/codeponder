import { Resolver, Arg, Query } from "type-graphql";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { FindConditions } from "typeorm";
import { CreateCodeReviewQuestionResponse } from "./createResponse";
import { CreateCodeReviewQuestionInput } from "./createInput";
import { createBaseResolver } from "../shared/createBaseResolver";

const CodeReviewQuestionBaseResolver = createBaseResolver(
  "CodeReviewQuestion",
  CreateCodeReviewQuestionInput,
  CodeReviewQuestion,
  CreateCodeReviewQuestionResponse
);
@Resolver(CodeReviewQuestion)
export class CodeReviewQuestionResolver extends CodeReviewQuestionBaseResolver {
  @Query(() => [CodeReviewQuestion])
  async findCodeReviewQuestions(
    @Arg("path", { nullable: true }) path: string,
    @Arg("repo") repo: string,
    @Arg("branch") branch: string,
    @Arg("username") username: string
  ) {
    const where: FindConditions<CodeReviewQuestion> = {
      repo,
      branch,
      username
    };

    if (path) {
      where.path = path;
    }

    return CodeReviewQuestion.find({
      where
    });
  }
}
