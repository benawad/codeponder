import * as React from "react"
import { HomeQuestionsComponent } from "../components/apollo-components"
import { Spinner } from "@codeponder/ui"

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <a href="http://localhost:4000/auth/github">login with github</a>
        <div>
          <HomeQuestionsComponent>
            {({ data, loading }) => {
              if (loading) {
                return <Spinner />
              }

              if (!data) {
                return "could not get data"
              }

              return JSON.stringify(data.homeQuestions)
            }}
          </HomeQuestionsComponent>
        </div>
      </div>
    )
  }
}
