import * as DataLoader from "dataloader";
import { Request } from "express";
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";

export interface MyContext {
  req: Request;
  userLoader: DataLoader<string, User>;
  commentLoader: DataLoader<string, Comment[]>;
}
