import * as React from "react";
import { Formik, Field } from "formik";
import { InputField } from "../components/formik-fields/InputField";
import { Query } from "react-apollo";
import gql from "graphql-tag";

interface FormValues {
  username: string;
}

export default class PickUsername extends React.PureComponent {
  render() {
    return (
      <Query
        query={gql`
          {
            me {
              username
            }
          }
        `}
      >
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          if (!data.me) {
            return <div>me is null</div>;
          }

          return (
            <Formik<FormValues>
              initialValues={{ username: data.me.username }}
              onSubmit={async values => {
                console.log(values);
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="username" component={InputField} />
                  <button disabled={isSubmitting} type="submit">
                    submit
                  </button>
                </form>
              )}
            </Formik>
          );
        }}
      </Query>
    );
  }
}
