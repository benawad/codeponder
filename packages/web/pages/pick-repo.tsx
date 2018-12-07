import * as React from "react";
import { AppsListReposResponseRepositoriesItem } from "@octokit/rest";

import { NextContextWithApollo } from "../types/NextContextWithApollo";
import { meQuery } from "../graphql/user/query/me";
import { MeQuery } from "../components/apollo-components";
import { octokit } from "../lib/octo";
import redirect from "../lib/redirect";
import { AutoSelect } from "../components/AutoSelect";

interface Props {
  repositories: AppsListReposResponseRepositoriesItem[];
}

export default class PickRepo extends React.PureComponent<Props> {
  static async getInitialProps({
    apolloClient,
    ...ctx
  }: NextContextWithApollo) {
    const {
      data: { me }
    } = await apolloClient.query<MeQuery>({
      query: meQuery
    });

    if (!me) {
      redirect(ctx, "/");
      return {};
    }

    octokit.authenticate({
      type: "oauth",
      token: me.accessToken
    });

    // @todo handle the case where they have more than 100 repos
    const repos = await octokit.repos.list({
      per_page: 100
    });

    return {
      me,
      repositories: repos.data
    };
  }

  render() {
    const { repositories } = this.props;

    return (
      <AutoSelect
        items={repositories}
        itemToString={item => item.name}
        onChange={item => console.log(item)}
      />
    );
  }
}
