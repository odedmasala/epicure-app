import React from "react";
import * as Yup from "yup";
import { Formik, Form, FormikErrors } from "formik";
import "./auth.scss";
import { MyFormValues } from "../../../models";
import InputFieldComponent from "../InputFieldComponent/InputFieldComponent";
import ClickButton from "../../buttons/clickButton/ClickButton";
import { loginUser } from "../../../services";
import {useAppDispatch,closeAllNavbar,login} from "../../../store"
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_!@#$%^&*]).{8,16}$/;
const authSchema: Yup.Schema<MyFormValues> = Yup.object().shape({
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
const validateFunction = (values: MyFormValues) => {
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
const AuthForm: React.FC<{ register: boolean }> = ({ register }) => {
  const dispatch = useAppDispatch();
  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };
  const fieldFill = {
    email: {
      name: "email",
      labelName: "Email",
      placeholder: "Email address",
    },
    password: {
      name: "password",
      labelName: "Password",
      placeholder: "Password",
    },
  };
  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validate={validateFunction}
          onSubmit={(values) => {
            let sendLoginRequest = () => {
              if (values.email && values.password)
                loginUser(values.email, values.password).then((res) => {
                  if (res?._id && res.email && res.userName) {
                    dispatch(login({email:res?.email,_id:res?._id,userName:res?.userName}));
                  }
                 
                }).then(() => {
                  dispatch(closeAllNavbar(false))
                  
                })
            };
           
            sendLoginRequest()
          }}
        >
          {({ touched, errors, handleSubmit, ...Formik }) => (
            <Form>
              <div className="auth-form-inputs-container">
                <InputFieldComponent
                  authPage={true}
                  formikProps={{ touched, errors, handleSubmit, ...Formik }}
                  inputName={fieldFill.email.name as keyof MyFormValues}
                  inputType="text"
                  inputPlaceholder={fieldFill.email.placeholder}
                />
                <InputFieldComponent
                  authPage={true}
                  formikProps={{ touched, errors, handleSubmit, ...Formik }}
                  inputName={fieldFill.password.name as keyof MyFormValues}
                  inputType="password"
                  inputPlaceholder={fieldFill.password.placeholder}
                />
                <div>
                  <ClickButton
                    type="submit"
                    onClick={handleSubmit}
                    primaryBlack={true}
                  >
                    {!register ? "Login" : "Register"}
                  </ClickButton>
                </div>
                {!register && (
                  <div className="forget-password-container">
                    <p>Forget password?</p>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AuthForm;
