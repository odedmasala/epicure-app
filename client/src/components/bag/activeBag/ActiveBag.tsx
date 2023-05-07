import { useWindowSize } from "usehooks-ts";
import {
  addCommentToBag,
  selectBagDishes,
  selectBagRestaurant,
  selectComment,
  selectBagTotal,
  useAppSelector,
  useAppDispatch,
  closeAllNavbar,
} from "../../../store";
import { BagDishCard } from "../bagDishCard/BagDishCard";
import { desktop } from "../../../hooks/useWindowSize";
import { Shekel } from "../../../assets/icons";
import ClickButton from "../../buttons/clickButton/ClickButton";
import "./activeBag.scss";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const ActiveBagComponent: React.FC = () => {
  const { width } = useWindowSize();
  const restaurant = useAppSelector(selectBagRestaurant);
  const comment = useAppSelector(selectComment);
  const shopBag = useAppSelector(selectBagDishes);
  const total = useAppSelector(selectBagTotal);
  const dispatch = useAppDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const goToCheckOut = () => () => {
    if (textAreaRef.current) dispatch(addCommentToBag(textAreaRef.current.value));
    dispatch(closeAllNavbar(true))
     navigate("/checkout")
  };
  return (
    <div className="active-bag-container">
      <h2 className="bag-title"> my order</h2>
      <p className="rest-title">{restaurant?.name}</p>
      <div className="bag-item-list-container">
        {shopBag.map((shopBagItem) => (
          <BagDishCard key={shopBagItem.dish._id} item={shopBagItem} />
        ))}
      </div>
      {width < desktop && (
        <div className="total-bag-price-container">
          <h2>total -</h2>
          <div className="icon">
            <Shekel stroke="black" />
          </div>
          <p>{total}</p>
        </div>
      )}
      {width > desktop && (
        <>
          <div className="top-comment-line"></div>
          <div className="bag-comment-container">
            <div className="comment-title">
              <h1>Add A Comment</h1>
            </div>
            <div className="comment-input">
              <textarea
                ref={textAreaRef}
                placeholder="Special requests, allergies, detary restrictions, etc."
                cols={30}
                rows={10}
              />
            </div>
          </div>
        </>
      )}
      <div onClick={goToCheckOut()} className="checkout-bag-btn">
        <ClickButton width="220px" primaryBlack={true}>
          checkout
          {width > desktop && (
            <div className="btn-checkout-total">
              <div className="icon">
                <Shekel stroke="white" />
              </div>
              {total}
            </div>
          )}
        </ClickButton>
        {width > desktop - 1 && (
          <ClickButton width="220px" secondary={true}>
            order history
          </ClickButton>
        )}
      </div>
    </div>
  );
};
