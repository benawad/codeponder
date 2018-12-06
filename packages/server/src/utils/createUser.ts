import { User } from "../entity/User";

export const createUser = async ({
  username,
  githubId,
  pictureUrl,
  bio,
  name
}: {
  username: string;
  githubId: string;
  pictureUrl: string;
  bio: string;
  name: string;
}) => {
  let user: User | undefined = undefined;
  let times = 0;

  while (times < 100) {
    try {
      user = await User.create({
        username: times ? `${username}${times}` : username,
        githubId,
        pictureUrl,
        bio,
        name
      }).save();
      break;
    } catch (err) {
      if (!err.detail.includes("already exists")) {
        throw err;
      }
    }
    times += 1;
  }

  return user;
};
