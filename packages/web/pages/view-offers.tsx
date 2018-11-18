import { Query, Mutation } from "react-apollo";
import { Button, Card, Header, Message } from "semantic-ui-react";

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
      refetchQueries={[{ query: receivedOffersQuery }]}
    >
      {mutate => (
        <Query<ReceivedOffersQuery> query={receivedOffersQuery}>
          {({ data, loading }) =>
            loading || !data ? null : (
              <>
                <Header>My Offers</Header>
                <Card.Group>
                  {data.myOffers.map(({ codeReview, sender, status }, idx) =>
                    status === "complete" ? null : (
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
                          <Message
                            positive={status === "approved"}
                            error={status === "declined"}
                            info={status === "inprogress"}
                          >
                            <Message.Header>{status}</Message.Header>
                            <p>
                              {status === "approved" &&
                                "you can now start reviewing the code"}
                              {status === "inprogress" &&
                                "we'll let you know when approved/declined"}
                            </p>
                          </Message>
                        </Card.Content>
                        {status === "approved" && (
                          <Card.Content extra>
                            <Button
                              onClick={() =>
                                mutate({
                                  variables: {
                                    input: {
                                      codeReviewId: codeReview.id,
                                      userId: sender.id,
                                      status: "complete"
                                    }
                                  }
                                })
                              }
                              fluid
                            >
                              finish reviewing
                            </Button>
                          </Card.Content>
                        )}
                      </Card>
                    )
                  )}
                </Card.Group>
                <Header>My Code Reviews</Header>
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
                        {status === "complete" && (
                          <Card.Content extra>
                            <Header size="small">review finished</Header>
                          </Card.Content>
                        )}
                        {status !== "complete" && (
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
                        )}
                      </Card>
                    )
                  )}
                </Card.Group>
              </>
            )
          }
        </Query>
      )}
    </Mutation>
  </Layout>
);
