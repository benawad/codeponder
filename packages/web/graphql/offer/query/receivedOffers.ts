import gql from "graphql-tag";
import { OfferInfoFragment } from "../fragments";

export const receivedOffersQuery = gql`
  query ReceivedOffersQuery {
    receivedOffers {
      ...OfferInfo
    }
    myOffers {
      ...OfferInfo
    }
  }

  ${OfferInfoFragment}
`;
