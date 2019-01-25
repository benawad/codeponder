import * as DataLoader from "dataloader";
import { User } from "../entity/User";

export const userLoader = () =>
  new DataLoader((keys: string[]) => {
    return Promise.all(
      keys.map(id => {
        return User.find({ where: { id } });
      })
    );
  });
