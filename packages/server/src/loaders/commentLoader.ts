import * as DataLoader from "dataloader";
import { getRepository, In } from "typeorm";
import { Comment } from "../entity/Comment";

export const commentLoader = () =>
  new DataLoader(async (keys: string[]) => {
    // code review question ids
    const comments = await getRepository(Comment).find({
      where: {
        questionId: In(keys),
      },
    });

    const qrMap: { [key: string]: Comment[] } = {};

    comments.forEach(reply => {
      if (reply.questionId in qrMap) {
        qrMap[reply.questionId].push(reply);
      } else {
        qrMap[reply.questionId] = [reply];
      }
    });

    // O(n) * O(1)
    return keys.map(k => qrMap[k]);
  });
