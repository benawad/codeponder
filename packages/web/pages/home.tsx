import Layout from "../components/Layout";
import { Query } from "react-apollo";
import { ListCodeReviewsQuery } from "../lib/schema-types";
import { Card, Icon, Grid } from "semantic-ui-react";
import { listcodeReviewsQuery } from "../graphql/code-review/query/listCodeReview";

export default () => (
  <Layout title="list of code review requests">
    <Query<ListCodeReviewsQuery> query={listcodeReviewsQuery}>
      {({ data }) => {
        return (
          <Grid>
            {data.listcodeReviews.map(crr => (
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
