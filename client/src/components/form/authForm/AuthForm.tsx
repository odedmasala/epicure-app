import React from "react";
import { Formik, Form } from "formik";
import "./auth.scss";
import { MyFormValues } from "../../../models";
import InputFieldComponent from "../InputFieldComponent/InputFieldComponent";
import ClickButton from "../../buttons/clickButton/ClickButton";
import { loginUser } from "../../../services";
import {useAppDispatch,closeAllNavbar,login} from "../../../store"
import { AuthFelid, authFieldFill, initialValues, validateFunction } from "./authFormHelper";

const AuthForm: React.FC<{ register: boolean }> = ({ register }) => {
  const dispatch = useAppDispatch();
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
          {({ touched, errors, handleSubmit, dirty,isValid, ...Formik }) => (
            <Form>
              <div className="auth-form-inputs-container">
                  {Object.keys(authFieldFill).map((key) => (
                  <InputFieldComponent
                    authPage={true}
                    formikProps={{ touched, errors, handleSubmit, dirty,isValid, ...Formik }}
                    inputName={ authFieldFill[key as keyof AuthFelid].name as keyof MyFormValues }
                    inputType={ authFieldFill[key as keyof AuthFelid].type }
                    inputPlaceholder={ authFieldFill[key as keyof AuthFelid].placeholder }
                  />
                ))}
                <div>
                  <ClickButton type="submit" onClick={handleSubmit} primaryBlack={dirty && isValid} >
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
