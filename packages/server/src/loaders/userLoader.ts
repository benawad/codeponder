import * as DataLoader from "dataloader";
import { User } from "../entity/User";

export const userLoader = () =>
  new DataLoader(async (keys: string[]) => {
    const users = await User.findByIds(keys);

    const userMap: { [key: string]: User } = {};

    users.forEach(u => {
      userMap[u.id] = u;
    });

    // O(n) * O(1)
    return keys.map(k => userMap[k]);
  });
