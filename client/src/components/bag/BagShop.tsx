import React from "react";
import { Bag } from "../../assets/icons";
import "./bagShop.scss";
import { selectBagDishes, useAppSelector } from "../../store";
import { ActiveBagComponent } from "./activeBag/ActiveBag";
const BagShop: React.FC<{ width?: string }> = ({ width }) => {
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
  return (
    <div className="empty-bag-container">
      <div className="bag-icon">
        <Bag />
      </div>
      <h2>Your bag is empty</h2>
    </div>
  );
};

export default BagShop;
