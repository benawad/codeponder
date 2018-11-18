import gql from "graphql-tag";

export const createOfferMutation = gql`
  mutation CreateOfferMutation($input: CreateOfferInput!) {
    createOffer(input: $input) {
      ok
    }
  }
`;
