import * as React from "react";
import { Input } from "@codeponder/ui";
import { FieldProps } from "formik";

export const InputField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldProps<any>) => {
  const errorText = touched[field.name] && errors[field.name];
//@ts-ignore 
  return <Input errorText={errorText} {...field} {...props} />;
};
