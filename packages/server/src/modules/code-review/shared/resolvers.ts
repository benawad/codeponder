import { CodeReviewResolvers } from "../../../types";
import { User } from "../../../entity/User";

export const resolvers: CodeReviewResolvers.Resolvers = {
  owner: async ({ ownerId }) => {
    const user = await User.findOne(ownerId);
    if (user) {
      return user;
    }

    return {
      id: "deleted",
      email: "deleted",
      username: "deleted"
    };
  }
};

export default {
  CodeReview: {
    ...resolvers
  }
};
