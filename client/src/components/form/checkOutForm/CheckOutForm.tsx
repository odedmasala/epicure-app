import React, { useEffect, useId } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { IOrderData, MyFormValues } from "../../../models";
import { InputFieldComponent } from "../..";
import { useFormikContext } from "formik";
import "./CheckOutForm.scss";
import { useNavigate } from "react-router-dom";
import { selectBag, selectUser, toggleOrderPlaced, useAppDispatch, useAppSelector, } from "../../../store";
import { addOrder } from "../../../services";
import { CheckOutFormProps, CheckoutFelid, fieldFill, initialValues, validateFunction, } from "./checkoutFormData";

const CheckOutForm: React.FC<CheckOutFormProps> = ({ formRef, setIsFormReady }) => {
  const navigate = useNavigate();
  const bag = useAppSelector(selectBag);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const onSubmit = ( values: MyFormValues, { setSubmitting }: FormikHelpers<MyFormValues> ) => {
    let dishesForServer = bag.bagDishes.map((dish) => {
      return { dish: dish.dish._id, quantity: dish.quantity, };
    });
    let sendOrder: IOrderData = {
      address: values.address,
      dishes: dishesForServer,
      restaurant: bag.restaurant?._id,
      status: "Pending",
      totalAmount: bag.total,
      user: user._id,
    };
    addOrder(sendOrder).then(() => {
      dispatch(toggleOrderPlaced(true));
      navigate("/");
      setSubmitting(false);
    });
  };
  const FormStatusEffect: React.FC = () => {
    const { isValid, dirty } = useFormikContext<MyFormValues>();
    useEffect(() => {
      setIsFormReady(isValid && dirty);
    }, [isValid, dirty]);

    return null;
  };
  return (
    <div>
      <Formik initialValues={initialValues} validate={validateFunction} innerRef={formRef} onSubmit={onSubmit} >
        {({ touched, errors, ...Formik }) => (
          <>
            <FormStatusEffect />
            <Form>
              <div className="checkout-form-inputs-top">
                {Object.keys(fieldFill) .slice(0, 3) .map((key) => (
                    <InputFieldComponent
                      key={useId()}
                      formikProps={{ touched, errors, ...Formik }}
                      labelName={ fieldFill[key as keyof CheckoutFelid].labelName }
                      inputName={ fieldFill[key as keyof CheckoutFelid] .name as keyof MyFormValues }
                      inputType="text"
                      inputPlaceholder={ fieldFill[key as keyof CheckoutFelid].placeholder }
                    />
                  ))}
              </div>
              <div className="checkout-form-inputs-bottom">
                <h2>payment details</h2>
                {Object.keys(fieldFill) .slice(3, 7) .map((key) => (
                    <InputFieldComponent
                      key={useId()}
                      formikProps={{ touched, errors, ...Formik }}
                      labelName={ fieldFill[key as keyof CheckoutFelid].labelName }
                      inputName={ fieldFill[key as keyof CheckoutFelid] .name as keyof MyFormValues }
                      inputType="text"
                      inputPlaceholder={ fieldFill[key as keyof CheckoutFelid].placeholder }
                    />
                  ))}
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CheckOutForm;
