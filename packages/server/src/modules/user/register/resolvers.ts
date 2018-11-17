import * as argon from "argon2";
import { registerSchema } from "@codeponder/common";

import { MutationResolvers } from "../../../types";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupErrors";

export const resolvers: MutationResolvers.Resolvers = {
  register: async (_, { input }) => {
    try {
      await registerSchema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        errors: formatYupError(err)
      };
    }

    const { email, username, password } = input;

    const hashedPassword = await argon.hash(password);

    try {
      await User.create({
        email,
        username,
        password: hashedPassword
      }).save();
    } catch (err) {
      const { detail } = err;
      if (detail.includes("already exists.")) {
        if (detail.includes("email")) {
          return {
            errors: [
              {
                path: "email",
                message: "email already in use"
              }
            ]
          };
        } else if (detail.includes("username")) {
          return {
            errors: [
              {
                path: "username",
                message: "already taken"
              }
            ]
          };
        }
      }
    }

    return {
      errors: []
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
