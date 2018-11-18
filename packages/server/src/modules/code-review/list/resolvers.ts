import { QueryResolvers } from "../../../types";
import { CodeReview } from "../../../entity/CodeReviewRequest";

const resolvers: QueryResolvers.Resolvers = {
  listcodeReviews: () => {
    return CodeReview.find() as any;
  }
};

export default {
  Query: {
    ...resolvers
  }
};
