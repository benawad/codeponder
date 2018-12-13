import { Request } from "express";
import * as DataLoader from "dataloader";

import { User } from "../entity/User";
import { QuestionReply } from "../entity/QuestionReply";

export interface MyContext {
  req: Request;
  userLoader: DataLoader<string, User>;
  questionReplyLoader: DataLoader<string, QuestionReply[]>;
}
