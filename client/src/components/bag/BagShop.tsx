import React from "react";
import { Bag } from "../../assets/icons";
import "./bagShop.scss";
import { selectBagDishes, useAppSelector } from "../../store";
import { ActiveBagComponent } from "./activeBag/ActiveBag";
import ClickButton from "../buttons/clickButton/ClickButton";
import useWindowSize, {desktop} from "../../hooks/useWindowSize";
const BagShop: React.FC = () => {
  const shopBag = useAppSelector(selectBagDishes);

  if (shopBag.length)
    return (
      <div className="nav-bag-container">
        <ActiveBagComponent />
      </div>
    );
  return (
    <div className="nav-bag-container">
      <EmptyBag />
    </div>
  );
};

export const EmptyBag: React.FC = () => {
  const {width} = useWindowSize()
  return (
    <div className="empty-bag-container">
      <div className="top-empty-bag-container">
      <div className="bag-icon">
        <Bag />
      </div>
      <h2>Your bag is empty</h2>
      </div>
     { width > desktop- 1 && <div className="bottom-empty-bag-container">
      <div className="order-history-btn">
      <ClickButton width="215px" secondary={true}>
        order history
      </ClickButton>
      </div>
      </div>}
      
      
    </div>
  );
};

export default BagShop;
