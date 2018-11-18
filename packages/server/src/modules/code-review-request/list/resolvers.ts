import { QueryResolvers } from "../../../types";
import { CodeReviewRequest } from "../../../entity/CodeReviewRequest";

const resolvers: QueryResolvers.Resolvers = {
  listCodeReviewRequests: () => {
    return CodeReviewRequest.find() as any;
  }
};

export default {
  Query: {
    ...resolvers
  }
};
