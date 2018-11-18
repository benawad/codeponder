import { Query, Mutation } from "react-apollo";
import { Button, Card } from "semantic-ui-react";

import Layout from "../components/Layout";
import { receivedOffersQuery } from "../graphql/offer/query/receivedOffers";
import {
  ReceivedOffersQuery,
  UpdateOfferStatusMutation,
  UpdateOfferStatusMutationVariables
} from "../lib/schema-types";
import { updateOfferStatusMutation } from "../graphql/offer/mutation/updateOfferStatus";

export default () => (
  <Layout showMenu title="view code review offers">
    <Mutation<UpdateOfferStatusMutation, UpdateOfferStatusMutationVariables>
      mutation={updateOfferStatusMutation}
      update={(store, { data }) => {
        if (!data || !data.updateOfferStatus.offer) {
          return null;
        }

        const { offer } = data.updateOfferStatus;
        const query = store.readQuery<ReceivedOffersQuery>({
          query: receivedOffersQuery
        });

        store.writeQuery({
          query: receivedOffersQuery,
          data: {
            ...query,
            receivedOffers: query.receivedOffers.map(x =>
              x.codeReview.id === offer.codeReview.id &&
              x.sender.id === offer.sender.id
                ? offer
                : x
            )
          }
        });
      }}
    >
      {mutate => (
        <Query<ReceivedOffersQuery> query={receivedOffersQuery}>
          {({ data, loading }) =>
            loading || !data ? null : (
              <Card.Group>
                {data.receivedOffers.map(
                  ({ codeReview, sender, status }, idx) => (
                    <Card key={idx}>
                      <Card.Content>
                        <Card.Header>{sender.username}</Card.Header>
                        <Card.Description>
                          <a
                            href={codeReview.codeUrl}
                            style={{ wordBreak: "break-all" }}
                          >
                            {codeReview.codeUrl}
                          </a>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button
                            onClick={() =>
                              mutate({
                                variables: {
                                  input: {
                                    codeReviewId: codeReview.id,
                                    userId: sender.id,
                                    status: "approved"
                                  }
                                }
                              })
                            }
                            basic={status !== "approved"}
                            color="green"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() =>
                              mutate({
                                variables: {
                                  input: {
                                    codeReviewId: codeReview.id,
                                    userId: sender.id,
                                    status: "declined"
                                  }
                                }
                              })
                            }
                            basic={status !== "declined"}
                            color="red"
                          >
                            Decline
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                  )
                )}
              </Card.Group>
            )
          }
        </Query>
      )}
    </Mutation>
  </Layout>
);
