import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { registerSchema } from "@codeponder/common";
import { Mutation } from "react-apollo";

import { InputField } from "../components/formik-fields/InputField";
import { ErrorMessage } from "../components/ErrorMessage";
import { normalizeErrors } from "../utils/normalizeErrors";
import { registerMutation } from "../graphql/user/mutation/register";
import {
  RegisterMutation,
  RegisterMutationVariables
} from "../lib/schema-types";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

export default () => (
  <Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={registerMutation}
  >
    {mutate => (
      <Formik<FormValues>
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (input, { setErrors, setSubmitting }) => {
          const response = await mutate({
            variables: { input }
          });

          if (response && response.data && response.data.register.errors) {
            setSubmitting(false);
            return setErrors(normalizeErrors(response.data.register.errors));
          } else {
            // navigate screen
          }
        }}
        validationSchema={registerSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="username"
              label="Username"
              placeholder="Username"
              component={InputField}
            />
            <Field
              name="email"
              label="Email"
              placeholder="Email"
              component={InputField}
            />
            <Field
              name="password"
              label="Password"
              placeholder="Password"
              component={InputField}
              type="password"
            />
            <ErrorMessage errors={errors} />
            <Button type="submit">Create Account</Button>
          </Form>
        )}
      </Formik>
    )}
  </Mutation>
);
