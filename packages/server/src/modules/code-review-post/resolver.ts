import { CreateCodeReviewPostInput } from "./createInput";
import { CodeReviewPost } from "../../entity/CodeReviewPost";
import { CreateCodeReviewPostResponse } from "./createResponse";
import { findOrCreateResolver } from "../shared/find-or-create-resolver";
import { loadCreatorResolver } from "../shared/load-creator-resolver";
import { getByIdResolver } from "../shared/get-by-id-resolver";

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
