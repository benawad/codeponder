import * as React from "react";
import { Spinner, CardGrid, QuestionCard } from "@codeponder/ui";

import { HomeQuestionsComponent } from "../components/apollo-components";

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <div>
          <a href="http://localhost:4000/auth/github">login with github</a>
        </div>
        <div style={{ display: "inline-block" }}>
          <HomeQuestionsComponent>
            {({ data, loading }) => {
              if (loading) {
                return <Spinner />;
              }

              if (!data) {
                return "could not get data";
              }

              return (
                <CardGrid>
                  {data.homeQuestions.map(q => (
                    <QuestionCard key={q.id} {...q} />
                  ))}
                </CardGrid>
              );
            }}
          </HomeQuestionsComponent>
        </div>
      </div>
    );
  }
}
