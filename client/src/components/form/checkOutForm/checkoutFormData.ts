import { FormikErrors, FormikProps } from "formik";
import { MyFormValues } from "../../../models";
import * as Yup from "yup";
import { RefObject } from "react";
export interface CheckOutFormProps{
  formRef: RefObject<FormikProps<MyFormValues>>;
  setIsFormReady: (isReady: boolean) => void;
}
export interface CheckoutFelid {
  fullName: {
    name: string;
    labelName: string;
    placeholder: string;
  };
  address: {
    name: string;
    labelName: string;
    placeholder: string;
  };
  phone: {
    name: string;
    labelName: string;
    placeholder: string;
  };
  nameOnCard: {
    name: string;
    labelName: string;
    placeholder: string;
  };
  cardNumber: {
    name: string;
    labelName: string;
    placeholder: string;
  };
  cvc: {
    name: string;
    labelName: string;
    placeholder: string;
  };
  expiryDate: {
    name: string;
    labelName: string;
    placeholder: string;
  };
}
export const fieldFill : CheckoutFelid = {
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
const cvcRegex = /^\d{3,4}$/;
const expiryDateRegex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/;
const phoneRegex = /^((\+|00)?972\-?|0)([234578]\d|\d{2})\-?\d{7}$/;
const nameRegex = /^[a-zA-Z ]{2,50}$/;

export const checkoutSchema: Yup.Schema<MyFormValues> = Yup.object().shape({
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

export const initialValues: MyFormValues = {
  fullName: "",
  address: "",
  phone: "",
  nameOnCard: "",
  cardNumber: "",
  cvc: "",
  expiryDate: "",
};
export const validateFunction = (values: MyFormValues) => {
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