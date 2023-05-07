import React, { useEffect } from "react";
import "./orderSuccess.scss";
import { Shekel, Vector, X_white } from "../../assets/icons";
import {
  selectBagDishes,
  selectBagTotal,
  useAppDispatch,
  useAppSelector,
  clearBag,
  toggleOrderPlaced,
} from "../../store";
const OrderSuccess: React.FC<{ isPopUp?: boolean }> = ({ isPopUp }) => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectBagDishes);
  const total = useAppSelector(selectBagTotal);
  const closePopup = () => {
    dispatch(clearBag());
    dispatch(toggleOrderPlaced(false));
  };
  useEffect(() => {
    return () => {
      if (isPopUp) {
        return;
      }
      dispatch(clearBag());
    };
  }, []);
  return (
    <>
      <div className={isPopUp ? "popup-order-success-container" : ""}>
        {isPopUp && (
          <div className="close-container" onClick={closePopup}>
            <div className="x-icon">
              <X_white />
            </div>
          </div>
        )}
        <div className="order-success-container">
          <div className="vector-container">
            <Vector />
          </div>
          <div className="order-title-container">
            <h2>order received</h2>
          </div>
          <div className="order-subtitle-container">
            <h3>Your food is in process</h3>
          </div>
          <div className="order-arrive-container">
            <p>Arrive in</p> <h3>90:00</h3>
            <p> min</p>
          </div>
          <div className="order-details-container">
            {dishes.map((dish) => {
              return (
                <div className="order-details">
                  <div className="order-details-title-container">
                    <p>
                      {dish.quantity} x {dish.dish.name}
                    </p>
                  </div>
                  <div className="order-details-price-container">
                    <div className="shekel-icon">
                      <Shekel stroke="black" />
                    </div>
                    <h3>{dish.dish.price}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="order-total-container">
            <h3>TOTAL - </h3>{" "}
            <div className="shekel-total-icon">
              <Shekel stroke="black" />
            </div>{" "}
            <h3>{total}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
