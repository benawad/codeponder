import * as React from "react";
import { Spinner, CardGrid, QuestionCard, Button } from "@codeponder/ui";

import { HomeQuestionsComponent } from "../components/apollo-components";
import { Link } from "../server/routes";
// import Router from "next/router";
// import { Router } from "../server/routes";

export default class Index extends React.Component<
  {},
  { limit: number; offset: number }
> {
  state = {
    limit: 6,
    offset: 0,
  };

  render() {
    return (
      <HomeQuestionsComponent variables={this.state}>
        {({ data, loading }) => {
          if (loading) {
            return <Spinner />;
          }

          if (!data) {
            return "could not get data";
          }

          return (
            <div>
              <div>
                <a href="http://localhost:4000/auth/github">
                  login with github
                </a>
              </div>
              <div style={{ display: "inline-block" }}>
                <CardGrid>
                  {data.homeQuestions.map(q => (
                    <QuestionCard
                      key={q.id}
                      Link={Link}
                      getLinkProps={() => ({
                        route: "repo",
                        params: {
                          branch: q.branch,
                          owner: q.username,
                          path: (q.path ? q.path.split("/") : []) as any,
                          name: q.repo,
                        },
                      })}
                      {...q}
                    />
                  ))}
                </CardGrid>
              </div>
              {data.homeQuestions.length ? (
                <div>
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.setState(state => ({
                        offset: state.offset + state.limit,
                      }))
                    }
                  >
                    next
                  </Button>
                </div>
              ) : null}
            </div>
          );
        }}
      </HomeQuestionsComponent>
    );
  }
}
