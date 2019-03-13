import * as DataLoader from "dataloader";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const userLoader = (): DataLoader<string, User> =>
  new DataLoader(async (keys: string[]) => {
    const users = await getRepository(User).findByIds(keys);

    const userMap: { [key: string]: User } = {};

    users.forEach(u => {
      userMap[u.id] = u;
    });

    // O(n) * O(1)
    return keys.map(k => userMap[k]);
  });
