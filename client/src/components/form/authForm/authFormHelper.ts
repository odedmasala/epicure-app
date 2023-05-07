import * as Yup from "yup";
import { MyFormValues } from "../../../models";
import { FormikErrors } from "formik";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_!@#$%^&*]).{8,16}$/;
export const authSchema: Yup.Schema<MyFormValues> = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "8+ characters ,one A-Z, one a-z, ,one of _!@#$%^&*"
    )
    .required("Password is required"),
});

export const validateFunction = (values: MyFormValues) => {
    return authSchema
      .validate(values, { abortEarly: false })
      .then(() => {})
      .catch((err: Yup.ValidationError) => {
        const errors: FormikErrors<MyFormValues> = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          errors[error.path as keyof MyFormValues] = error.message;
        });
        return errors;
      });
  };
  export interface AuthFelid {
    email: {
        name: string,
        labelName: string
        placeholder: string
        type: string
    };
    password: {
        name: string,
        labelName: string
        placeholder: string
        type: string
    }
}
  export  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };
  export const authFieldFill : AuthFelid = {
    email: {
      name: "email",
      labelName: "Email",
      placeholder: "Email address",
      type: "email",
    },
    password: {
      name: "password",
      labelName: "Password",
      placeholder: "Password",
      type: "password",
    },
  };