import { QueryResolvers } from "../../../types";
import { User } from "../../../entity/User";

const resolvers: QueryResolvers.Resolvers = {
  me: async (_, __, { req }) => {
    if (!req.session!.userId) {
      return null;
    }

    const user = await User.findOne(req.session!.userId);

    if (user) {
      return user;
    }

    return null;
  }
};

export default {
  Query: {
    ...resolvers
  }
};
