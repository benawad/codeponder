import { Resolver } from "type-graphql";

import { QuestionReply } from "../../entity/QuestionReply";
import { CreateQuestionReplyResponse } from "./createResponse";
import { createBaseResolver } from "../shared/createBaseResolver";
import { CreateQuestionReplyInput } from "./createInput";

const QuestionReplyBaseResolver = createBaseResolver(
  "QuestionReply",
  CreateQuestionReplyInput,
  QuestionReply,
  CreateQuestionReplyResponse
);

@Resolver(QuestionReply)
export class QuestionReplyResolver extends QuestionReplyBaseResolver {}
