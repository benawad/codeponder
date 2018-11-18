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
  numDays: tringumber;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export default () => (
  <Layout showMenu title="create code review request">
    <Mutation<CreateCodeReviewMutation, CreateCodeReviewMutationVariables>
      mutation={createCodeReviewMutation}
      refetchQueries={[{ query: listCodeReviewsQuery }]}
    >
      {mutate => (
        <Formik<FormValues>
          initialValues={{ numDays: "3", codeUrl: "", techTags: [], notes: "" }}
          onSubmit={async (
            { codeUrl, notes, numDays, techTags },
            { setErrors, setSubmitting }
          ) => {
            let days = 3;

            try {
              days = parseInt(numDays, 10);
            } catch (err) {}

            const response = await mutate({
              variables: {
                input: {
                  codeUrl,
                  notes,
                  techTags,
                  numDays: days
                }
              }
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
