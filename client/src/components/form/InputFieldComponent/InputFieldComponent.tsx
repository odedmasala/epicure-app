import { Field, FormikProps } from "formik";
import { MyFormValues } from "../../../models";
import "./inputFieldComponent.scss"
interface InputFieldProp {
  labelName?: string;
  inputName: keyof MyFormValues;
  inputType: string;
  inputPlaceholder?: string;
  formikProps: FormikProps<MyFormValues>;
  authPage?: boolean;
  className?: string;
}

const InputFieldComponent: React.FC<InputFieldProp> = ({ labelName, inputName, inputPlaceholder, formikProps, inputType,authPage,className }) => {
  const { touched, errors } = formikProps;
  const hasError = touched[inputName] && errors[inputName];

  return (
    <>
      <div className={`input-checkout-container ${className}`}>
       {labelName && <label className="label-checkout" htmlFor={inputName}>
          {labelName}
        </label>}
        <Field
          className={`input-checkout ${authPage ? "auth-input-change":""} ${hasError ? "has-error" : ""}`}
          name={inputName}
          type={inputType}
          placeholder={inputPlaceholder}
        />
       {<div>{hasError && <p className="error-message">{errors[inputName]}</p>}</div>}
    
      </div>
    </>
  );
};

export default InputFieldComponent;
