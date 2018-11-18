import { OfferResolvers } from "../../../types";
import { User } from "../../../entity/User";
import { CodeReview } from "../../../entity/CodeReviewRequest";

const resolvers: OfferResolvers.Resolvers = {
  sender: ({ userId }) => {
    return User.findOne(userId) as any;
  },
  codeReview: ({ codeReviewId }) => {
    return CodeReview.findOne(codeReviewId) as any;
  }
};

export default {
  Offer: {
    ...resolvers
  }
};
