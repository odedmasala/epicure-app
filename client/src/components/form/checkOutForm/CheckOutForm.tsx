import React, { RefObject, useEffect, useId } from "react";
import {
  Formik,
  FormikProps,
  Form,
  FormikErrors,
  FormikHelpers,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { MyFormValues } from "../../../models";
import { InputFieldComponent } from "../..";
import "./CheckOutForm.scss";
import { useNavigate } from "react-router-dom";
import {
  selectBag,
  selectUser,
  toggleOrderPlaced,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { addOrder } from "../../../services";
const cvcRegex = /^\d{3,4}$/;
const expiryDateRegex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
const phoneRegex = /^((\+|00)?972\-?|0)([234578]\d|\d{2})\-?\d{7}$/;
const nameRegex = /^[a-zA-Z ]{2,50}$/;

const checkoutSchema: Yup.Schema<MyFormValues> = Yup.object().shape({
  fullName: Yup.string()
    .matches(nameRegex, "Must be a valid name")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegex, "Must be a valid Israel phone number")
    .required("Required"),
  nameOnCard: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Must be a 16-digit number")
    .required("Required"),
  cvc: Yup.string()
    .matches(cvcRegex, "Must be a 3- or 4-digit number")
    .required("Required"),
  expiryDate: Yup.string()
    .matches(expiryDateRegex, "Must be a valid expiry date (MM/YY or MM/YYYY)")
    .required("Required"),
});

const validateFunction = (values: MyFormValues) => {
  return checkoutSchema
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

const CheckOutForm: React.FC<{
  formRef: RefObject<FormikProps<MyFormValues>>;
}> = ({ formRef }) => {
  const navigate = useNavigate();
  const bag = useAppSelector(selectBag);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const initialValues: MyFormValues = {
    fullName: "",
    address: "",
    phone: "",
    nameOnCard: "",
    cardNumber: "",
    cvc: "",
    expiryDate: "",
  };

  const fieldFill = {
    fullName: {
      name: "fullName",
      labelName: "Full Name",
      placeholder: "fill your full name",
    },
    address: {
      name: "address",
      labelName: "Address",
      placeholder: "fill your address",
    },
    phone: {
      name: "phone",
      labelName: "Phone",
      placeholder: "fill your phone number",
    },
    nameOnCard: {
      name: "nameOnCard",
      labelName: "Name on Card",
      placeholder: "Name On Card",
    },
    cardNumber: {
      name: "cardNumber",
      labelName: "Card Number",
      placeholder: "Card Number",
    },
    cvc: { name: "cvc", labelName: "CVC", placeholder: "CVV" },
    expiryDate: {
      name: "expiryDate",
      labelName: "Expiry Date",
      placeholder: "Expiry Date",
    },
  };
  const onSubmit = (
    values: MyFormValues,
    { setSubmitting }: FormikHelpers<MyFormValues>
  ) => {
    console.log("Form submitted with values: ", values);
    let dishesForServer = bag.bagDishes.map((dish) => {
      return {
        dish: dish.dish._id,
        quantity: dish.quantity,
      };
    });
    addOrder({
      address: values.address,
      dishes: dishesForServer,
      restaurant: bag.restaurant?._id,
      status: "Pending",
      totalAmount: bag.total,
      user: user._id,
    }).then((res) => {
      dispatch(toggleOrderPlaced(true));
      navigate("/");
      setSubmitting(false);
    });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validateFunction}
        innerRef={formRef}
        onSubmit={onSubmit}
      >
        {({ touched, errors, ...Formik }) => (
          <Form>
            <div className="checkout-form-inputs-top">
              <InputFieldComponent
                key={useId()}
                formikProps={{ touched, errors, ...Formik }}
                labelName={fieldFill.fullName.labelName}
                inputName={fieldFill.fullName.name as keyof MyFormValues}
                inputType="text"
                inputPlaceholder={fieldFill.fullName.placeholder}
              />
              <InputFieldComponent
                key={useId()}
                formikProps={{ touched, errors, ...Formik }}
                labelName={fieldFill.address.labelName}
                inputName={fieldFill.address.name as keyof MyFormValues}
                inputType="text"
                inputPlaceholder={fieldFill.address.placeholder}
              />
              <InputFieldComponent
                key={useId()}
                formikProps={{ touched, errors, ...Formik }}
                labelName={fieldFill.phone.labelName}
                inputName={fieldFill.phone.name as keyof MyFormValues}
                inputType="tel"
                inputPlaceholder={fieldFill.phone.placeholder}
              />
            </div>
            <div className="checkout-form-inputs-bottom">
              <h2>payment details</h2>
              <InputFieldComponent
                key={useId()}
                formikProps={{ touched, errors, ...Formik }}
                inputName={fieldFill.cardNumber.name as keyof MyFormValues}
                inputType="text"
                inputPlaceholder={fieldFill.cardNumber.placeholder}
              />
              <InputFieldComponent
                key={useId()}
                formikProps={{ touched, errors, ...Formik }}
                inputName={fieldFill.nameOnCard.name as keyof MyFormValues}
                inputType="text"
                inputPlaceholder={fieldFill.nameOnCard.placeholder}
              />
              <InputFieldComponent
                key={useId()}
                formikProps={{ touched, errors, ...Formik }}
                inputName={fieldFill.cvc.name as keyof MyFormValues}
                inputType="text"
                inputPlaceholder={fieldFill.cvc.placeholder}
              />
              <InputFieldComponent
                key={useId()}
                formikProps={{ touched, errors, ...Formik }}
                inputName={fieldFill.expiryDate.name as keyof MyFormValues}
                inputType="text"
                inputPlaceholder={fieldFill.expiryDate.placeholder}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckOutForm;
