import { Form, TextArea } from "semantic-ui-react";

export const TextAreaField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name];

  return (
    <Form.Field error={hasError}>
      <label>{label}</label>
      <TextArea error={hasError} {...field} {...props} />
    </Form.Field>
  );
};
