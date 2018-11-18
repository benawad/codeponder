import { QueryResolvers } from "../../../types";
import { CodeReview } from "../../../entity/CodeReviewRequest";

const resolvers: QueryResolvers.Resolvers = {
  listCodeReviews: () => {
    return CodeReview.find() as any;
  }
};

export default {
  Query: {
    ...resolvers
  }
};
