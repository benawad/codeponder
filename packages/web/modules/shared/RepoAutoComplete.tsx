import React from "react";
import Select from "react-select";
import {
  GetViewerReposComponent,
  GetViewerReposEdges,
} from "../../generated/github-apollo-components";
import { GitHubApolloClientContext } from "./GithubApolloClientContext";

interface Props {
  onChange: (data: GetViewerReposEdges | null) => void;
}

const itemToString = (x: GetViewerReposEdges): string =>
  x && x.node ? x.node.name : "";

export class RepoAutoComplete extends React.Component<Props> {
  static contextType = GitHubApolloClientContext;

  render(): JSX.Element {
    const { onChange } = this.props;

    return (
      <GetViewerReposComponent client={this.context}>
        {({ data }) => (
          <Select
            placeholder="browse repos"
            onChange={x => {
              onChange(x ? (Array.isArray(x) ? x[0] : x).value : null);
            }}
            isSearchable
            options={
              data && data.viewer && data.viewer.repositories.edges
                ? data.viewer.repositories.edges.map(x => ({
                    value: x,
                    label: itemToString(x),
                  }))
                : []
            }
          />
        )}
      </GetViewerReposComponent>
    );
  }
}
