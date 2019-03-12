import * as DataLoader from "dataloader";
import { getRepository, In } from "typeorm";
import { Comment } from "../entity/Comment";

export const commentLoader = (): DataLoader<string, Comment[]> =>
  new DataLoader(async (keys: string[]) => {
    // code review question ids
    const comments = await getRepository(Comment).find({
      where: {
        questionId: In(keys),
      },
    });

    const qrMap: { [key: string]: Comment[] } = {};

    comments.forEach(comment => {
      if (comment.questionId in qrMap) {
        qrMap[comment.questionId].push(comment);
      } else {
        qrMap[comment.questionId] = [comment];
      }
    });

    // O(n) * O(1)
    return keys.map(k => qrMap[k]);
  });
