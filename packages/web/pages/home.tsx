import { Query, Mutation } from "react-apollo";
import { Grid } from "semantic-ui-react";

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

export default () => (
  <Layout title="list of code review requests">
    <Query<MeQuery> ssr={false} query={meQuery}>
      {({ data: meData, loading }) =>
        loading ? null : (
          <Mutation<CreateOfferMutation, CreateOfferMutationVariables>
            mutation={createOfferMutation}
            refetchQueries={[{ query: listCodeReviewsQuery }]}
          >
            {() => (
              <Query<ListCodeReviewsQuery> query={listCodeReviewsQuery}>
                {({ data, loading }) => {
                  console.log(data);
                  return loading ? null : (
                    <Grid>
                      {data.listCodeReviews.map(crr => (
                        <CodeReviewCard key={crr.id} crr={crr} />
                      ))}
                      {meData.me && meData.me.username}
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
