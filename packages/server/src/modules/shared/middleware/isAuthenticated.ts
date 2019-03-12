import { ApolloError } from "apollo-server-core";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../../types/Context";

export const isAuthenticated: MiddlewareFn<MyContext> = (
  { context },
  next
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  if (!context.req.session || !context.req.session.userId) {
    throw new ApolloError("not authenticated");
  }

  return next();
};
