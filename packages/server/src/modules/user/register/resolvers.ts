import * as argon from "argon2";
import * as yup from "yup";

import { MutationResolvers } from "../../../types";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupErrors";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, "username can only contain letters and numbers")
    .min(3)
    .max(30)
    .required(),
  email: yup
    .string()
    .email()
    .min(3)
    .max(500)
    .required(),
  password: yup
    .string()
    .min(5)
    .max(1000)
    .required()
});

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
      console.log(err);
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
                message: "username already taken"
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
