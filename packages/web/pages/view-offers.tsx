import Layout from "../components/Layout";
import { Query } from "react-apollo";
import { receivedOffersQuery } from "../graphql/offer/query/receivedOffers";
import { ReceivedOffersQuery } from "../lib/schema-types";

export default () => (
  <Layout showMenu title="view code review offers">
    <Query<ReceivedOffersQuery> query={receivedOffersQuery}>
      {({ data }) => <div>{JSON.stringify(data)}</div>}
    </Query>
  </Layout>
);
