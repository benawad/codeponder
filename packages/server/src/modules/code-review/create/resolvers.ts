import { MutationResolvers } from "../../../types";
import { CodeReview } from "../../../entity/CodeReviewRequest";
import { isAuthenticated } from "../../../middleware";

export const resolvers: MutationResolvers.Resolvers = {
  createCodeReview: async (
    _,
    { input: { codeUrl, notes, numDays, techTags } },
    { req }
  ) => {
    isAuthenticated(req);

    const codeReview = (await CodeReview.create({
      codeUrl,
      notes,
      numDays: numDays || undefined,
      techTags,
      ownerId: req.session!.userId
    }).save()) as any;

    return {
      errors: [],
      codeReview
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
