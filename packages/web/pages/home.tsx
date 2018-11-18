import Layout from "../components/Layout";
import { listCodeReviewRequestsQuery } from "../graphql/code-review-request/query/listCodeReviewRequests";
import { Query } from "react-apollo";
import { ListCodeReviewRequestsQuery } from "../lib/schema-types";
import { Grid, Segment } from "semantic-ui-react";

export default () => (
  <Layout title="list of code review requests">
    <Query<ListCodeReviewRequestsQuery> query={listCodeReviewRequestsQuery}>
      {({ data }) => {
        return (
          <Grid>
            {data.listCodeReviewRequests.map(crr => (
              <Grid.Column key={crr.id} width={3}>
                <Segment>{crr.notes.slice(0, 150)}</Segment>
              </Grid.Column>
            ))}
          </Grid>
        );
      }}
    </Query>
  </Layout>
);
