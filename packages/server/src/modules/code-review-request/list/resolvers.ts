import { QueryResolvers } from "../../../types";
import { CodeReviewRequest } from "../../../entity/CodeReviewRequest";

const resolvers: QueryResolvers.Resolvers = {
  listCodeReviewRequests: () => {
    return CodeReviewRequest.find();
  }
};

export default {
  Query: {
    ...resolvers
  }
};
