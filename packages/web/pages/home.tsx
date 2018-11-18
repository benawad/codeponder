import * as React from "react";
import { Query, Mutation } from "react-apollo";
import { Message, Grid } from "semantic-ui-react";
import Router from "next/router";

import Layout from "../components/Layout";
import {
  ListCodeReviewsQuery,
  CreateOfferMutation,
  CreateOfferMutationVariables,
  MeQuery
} from "../lib/schema-types";
import { listCodeReviewsQuery } from "../graphql/code-review/query/listCodeReview";
import { createOfferMutation } from "../graphql/offer/mutation/createOffer";
import { CodeReviewCard } from "../components/CodeReviewCard";
import { meQuery } from "../graphql/user/query/me";

export default class Home extends React.Component<{}, { offerSentTo: string }> {
  state = {
    offerSentTo: ""
  };

  render() {
    const { offerSentTo } = this.state;

    return (
      <Layout showMenu title="list of code review requests">
        {offerSentTo && (
          <Message positive>
            <Message.Header>Success</Message.Header>
            <p>Your offer has been sent to {offerSentTo}</p>
          </Message>
        )}
        <Query<MeQuery> ssr={false} query={meQuery}>
          {({ data: meData, loading }) =>
            loading ? null : (
              <Mutation<CreateOfferMutation, CreateOfferMutationVariables>
                mutation={createOfferMutation}
                refetchQueries={[{ query: listCodeReviewsQuery }]}
              >
                {mutate => (
                  <Query<ListCodeReviewsQuery> query={listCodeReviewsQuery}>
                    {({ data, loading }) => {
                      return loading ? null : (
                        <Grid>
                          {data.listCodeReviews.map(crr => (
                            <CodeReviewCard
                              showOfferButton={
                                meData.me && meData.me.id === crr.owner.id
                                  ? false
                                  : true
                              }
                              key={crr.id}
                              onOfferClick={async () => {
                                if (meData.me) {
                                  await mutate({
                                    variables: {
                                      input: {
                                        codeReviewId: crr.id,
                                        userId: meData.me.id
                                      }
                                    }
                                  });
                                  this.setState({
                                    offerSentTo: crr.owner.username
                                  });
                                } else {
                                  Router.push("/login");
                                }
                              }}
                              crr={crr}
                            />
                          ))}
                        </Grid>
                      );
                    }}
                  </Query>
                )}
              </Mutation>
            )
          }
        </Query>
      </Layout>
    );
  }
}
