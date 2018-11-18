import gql from "graphql-tag";
import { OfferInfoFragment } from "../fragments";

export const updateOfferStatusMutation = gql`
  mutation UpdateOfferStatusMutation($input: UpdateOfferStatusInput!) {
    updateOfferStatus(input: $input) {
      offer {
        ...OfferInfo
      }
    }
  }

  ${OfferInfoFragment}
`;
