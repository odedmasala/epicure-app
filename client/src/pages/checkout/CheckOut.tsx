import React, {useRef, useState } from "react";
import "./checkout.scss";
import { Logo, Shekel, X_dark } from "../../assets/icons";
import { CheckOutForm, ClickButton,BagDishCard } from "../../components";
import { selectBagDishes, selectBagTotal, useAppSelector, } from "../../store";
import useWindowSize, { desktop } from "../../hooks/useWindowSize";
import { Footer } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { MyFormValues } from "../../models";
const CheckOut: React.FC = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [isFormReady, setIsFormReady] = useState(false);
  const formRef = useRef<FormikProps<MyFormValues>>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const currentBagDishes = useAppSelector(selectBagDishes);
  const currentTotal = useAppSelector(selectBagTotal);
  const total = useAppSelector(selectBagTotal);
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const backToHome = () => navigate("/");
  return (
    <>
      <div className="checkout-mobile-navbar-container">
        <div onClick={backToHome} className="close-checkout-nav">
          <X_dark className="logo" />
        </div>
        <div className="close-mobile-logo">
          <Logo className="logo" />
        </div>
      </div>
      <div className="checkout-page-container">
        <div className="checkout-form-container">
          <div className="checkout-title">
            <h2>delivery details</h2>
          </div>
          <CheckOutForm formRef={formRef} setIsFormReady={setIsFormReady}/>
        </div>
        <div>
          <div className="order-details-container">
            <h2>My order</h2>
            {currentBagDishes.length > 0 && currentBagDishes.map((dish) => ( <BagDishCard key={dish.dish._id} item={dish} /> ))}
            {width > desktop && (
              <>
                <div className="top-comment-line"></div>
                <div className="bag-comment-container">
                  <div className="comment-title">
                    <h1>Add A Comment</h1>
                  </div>
                  <div className="comment-input">
                    <textarea ref={textAreaRef} placeholder="Special requests, allergies, detary restrictions, etc." cols={30} rows={10} />
                  </div>
                </div>
              </>
            )}
            <div className="order-total-container">
              <p>TOTAL - {currentTotal}</p>
            </div>
            <div className="submit-button-container">
              <ClickButton primaryBlack={isFormReady} type="submit" onClick={handleSubmit} icon={true} width="335px" >
                <div className={width > desktop - 1 ? "checkout-btn-title" : ""} >
                  {width > desktop - 1 ? (
                    <>
                      <span>pay</span>
                      <span className="total-price-checkout">
                        <div className="shekel-checkout"> <Shekel stroke="black" /> </div>
                        {total}
                      </span>
                    </>
                  ) : (
                    "Complete payment"
                  )}
                </div>
              </ClickButton>
            </div>
          </div>
        </div>
      </div>
      {width > desktop - 1 && <Footer />}
    </>
  );
};

export default CheckOut;
