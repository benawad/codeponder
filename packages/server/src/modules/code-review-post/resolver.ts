import { Resolver } from "type-graphql";
import { CodeReviewQuestion } from "../../entity/CodeReviewQuestion";
import { createBaseResolver } from "../shared/createBaseResolver";
import { CreateCodeReviewPostInput } from "./createInput";
import { CodeReviewPost } from "../../entity/CodeReviewPost";
import { CreateCodeReviewPostResponse } from "./createResponse";

const CodeReviewPostBaseResolver = createBaseResolver(
  "CodeReviewPost",
  CreateCodeReviewPostInput,
  CodeReviewPost,
  CreateCodeReviewPostResponse
);

@Resolver(CodeReviewQuestion)
export class CodeReviewPostResolver extends CodeReviewPostBaseResolver {}
