import Layout from "../components/Layout";
import { listCodeReviewRequestsQuery } from "../graphql/code-review-request/query/listCodeReviewRequests";
import { Query } from "react-apollo";
import { ListCodeReviewRequestsQuery } from "../lib/schema-types";
import { Card, Icon, Grid } from "semantic-ui-react";

export default () => (
  <Layout title="list of code review requests">
    <Query<ListCodeReviewRequestsQuery> query={listCodeReviewRequestsQuery}>
      {({ data }) => {
        return (
          <Grid>
            {data.listCodeReviewRequests.map(crr => (
              <Grid.Column key={crr.id} width={4}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      {crr.owner.username} wants a review
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">in {crr.numDays} days</span>
                    </Card.Meta>
                    <Card.Description>
                      {crr.notes.slice(0, 150)}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <a href={crr.codeUrl}>
                      <Icon name="user" />
                      Offer Review
                    </a>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        );
      }}
    </Query>
  </Layout>
);
