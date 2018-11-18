import { MutationResolvers } from "../../../types";
import { CodeReviewRequest } from "../../../entity/CodeReviewRequest";
import { isAuthenticated } from "../../../middleware";

export const resolvers: MutationResolvers.Resolvers = {
  createCodeReviewRequest: async (
    _,
    { input: { codeUrl, notes, numDays, techTags } },
    { req }
  ) => {
    isAuthenticated(req);

    const codeReviewRequest = (await CodeReviewRequest.create({
      codeUrl,
      notes,
      numDays: numDays || undefined,
      techTags,
      ownerId: req.session!.userId
    }).save()) as any;

    return {
      errors: [],
      codeReviewRequest
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
