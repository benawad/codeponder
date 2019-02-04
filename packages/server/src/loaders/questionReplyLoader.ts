import * as DataLoader from "dataloader";
import { getRepository, In } from "typeorm";
import { QuestionReply } from "../entity/QuestionReply";

export const questionReplyLoader = () =>
  new DataLoader(async (keys: string[]) => {
    // code review question ids
    const questionReplies = await getRepository(QuestionReply).find({
      where: {
        questionId: In(keys),
      },
    });

    const qrMap: { [key: string]: QuestionReply[] } = {};

    questionReplies.forEach(reply => {
      if (reply.questionId in qrMap) {
        qrMap[reply.questionId].push(reply);
      } else {
        qrMap[reply.questionId] = [reply];
      }
    });

    // O(n) * O(1)
    return keys.map(k => qrMap[k]);
  });
