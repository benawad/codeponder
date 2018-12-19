import { CreateCodeReviewPostInput } from "./createInput";
import { CodeReviewPost } from "../../entity/CodeReviewPost";
import { CreateCodeReviewPostResponse } from "./createResponse";
import { findOrCreateResolver } from "../shared/find-or-create-resolver";
import { loadCreatorResolver } from "../shared/load-creator-resolver";

export const findOrCreateCodeReviewPost = findOrCreateResolver(
  "CodeReviewPost",
  CreateCodeReviewPostInput,
  CodeReviewPost,
  CreateCodeReviewPostResponse,
  ["commitId", "repo", "repoOwner"] as any
);

export const loadCreatorForCodeReviewPost = loadCreatorResolver(CodeReviewPost);
