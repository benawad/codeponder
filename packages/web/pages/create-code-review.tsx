import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { Mutation } from "react-apollo";
import Router from "next/router";

import { InputField } from "../components/formik-fields/InputField";
import { ErrorMessage } from "../components/ErrorMessage";
import { normalizeErrors } from "../utils/normalizeErrors";
import Layout from "../components/Layout";
import { TextAreaField } from "../components/formik-fields/TextAreaField";
import { createCodeReviewMutation } from "../graphql/code-review/mutation/createCodeReview";
import { listCodeReviewsQuery } from "../graphql/code-review/query/listCodeReview";
import {
  CreateCodeReviewMutationVariables,
  CreateCodeReviewMutation
} from "../lib/schema-types";

interface FormValues {
  numDays: number;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export default () => (
  <Layout title="create code review request">
    <Mutation<CreateCodeReviewMutation, CreateCodeReviewMutationVariables>
      mutation={createCodeReviewMutation}
      refetchQueries={[{ query: listCodeReviewsQuery }]}
    >
      {mutate => (
        <Formik<FormValues>
          initialValues={{ numDays: 3, codeUrl: "", techTags: [], notes: "" }}
          onSubmit={async (input, { setErrors, setSubmitting }) => {
            const response = await mutate({
              variables: { input }
            });

            if (
              response &&
              response.data &&
              response.data.createCodeReview.errors &&
              response.data.createCodeReview.errors.length
            ) {
              setSubmitting(false);
              return setErrors(
                normalizeErrors(response.data.createCodeReview.errors)
              );
            } else {
              Router.push("/home");
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="numDays"
                label="Number of days"
                placeholder="Number of days"
                component={InputField}
              />
              <Field
                name="codeUrl"
                label="Github Url"
                placeholder="Github Url"
                component={InputField}
              />
              <Field
                name="notes"
                label="Notes"
                placeholder="Notes"
                component={TextAreaField}
              />
              <ErrorMessage errors={errors as any} />
              <Button disabled={isSubmitting} type="submit">
                Create Code Review Request
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  </Layout>
);
