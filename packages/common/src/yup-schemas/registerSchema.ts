import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, "letters and numbers only")
    .min(3)
    .max(30)
    .required(),
  email: yup
    .string()
    .email()
    .min(3)
    .max(500)
    .required(),
  password: yup
    .string()
    .min(5)
    .max(1000)
    .required()
});
