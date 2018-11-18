import { QueryResolvers } from "../../../types";
import { getConnection } from "typeorm";
import { isAuthenticated } from "../../../middleware";

const resolvers: QueryResolvers.Resolvers = {
  receivedOffers: (_, __, { req }) => {
    isAuthenticated(req);

    return getConnection().query(
      `
      select * from code_review cr
      inner join offer o
      on cr.id = o."codeReviewId"
      where cr."ownerId" = $1
    `,
      [req.session!.userId]
    );
  }
};

export default {
  Query: {
    ...resolvers
  }
};
