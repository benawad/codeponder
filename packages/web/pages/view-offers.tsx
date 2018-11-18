import Layout from "../components/Layout";
import { Query } from "react-apollo";
import { Button, Card } from "semantic-ui-react";

import { receivedOffersQuery } from "../graphql/offer/query/receivedOffers";
import { ReceivedOffersQuery } from "../lib/schema-types";

export default () => (
  <Layout showMenu title="view code review offers">
    <Query<ReceivedOffersQuery> query={receivedOffersQuery}>
      {({ data, loading }) =>
        loading || !data ? null : (
          <Card.Group>
            {data.receivedOffers.map(({ codeReview, sender }, idx) => (
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
                    <Button basic color="green">
                      Approve
                    </Button>
                    <Button basic color="red">
                      Decline
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )
      }
    </Query>
  </Layout>
);
