import { MutationResolvers } from "../../../types";
import { Offer } from "../../../entity/Offer";

const resolvers: MutationResolvers.Resolvers = {
  createOffer: async (_, { input: { codeReviewId, userId } }) => {
    await Offer.create({ codeReviewId, userId }).save();

    return {
      ok: true
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
