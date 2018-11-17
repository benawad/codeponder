import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { registerSchema } from "@codeponder/common";

import { InputField } from "../components/formik-fields/InputField";
import { ErrorMessage } from "../components/ErrorMessage";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

export default () => (
  <Formik<FormValues>
    initialValues={{ username: "", email: "", password: "" }}
    onSubmit={() => {}}
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
);
