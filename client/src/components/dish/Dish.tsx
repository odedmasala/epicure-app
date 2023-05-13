import React, { useEffect, useState } from "react";
import "./dish.scss";
import {
  Minus,
  Plus,
  Shekel,
  SpicyBig,
  VeganBig,
  VegetarianBig,
  X_dark,
  X_white,
} from "../../assets/icons";
import { Dish, DishCategory } from "../../models";
import CheckButton from "../buttons/checkButton/CheckButton";
import { Footer } from "../../layouts";
import ClickButton from "../buttons/clickButton/ClickButton";
import useWindowSize, { desktop } from "../../hooks/useWindowSize";
import { addDishToBag, useAppDispatch } from "../../store";
interface DishComponentProps {
  onClose: () => void;
  dishData: Dish;
}
const DishComponent: React.FC<DishComponentProps> = ({ onClose, dishData }) => {
  const { width } = useWindowSize();
  const [ChosenSide, setIsChosenSide] = useState<string[]>([]);
  const [sideChanges, setSideChanges] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    onClose();
  };
  const sendDishToCart = ()=> () => {
    dispatch(addDishToBag({dish:dishData, quantity:quantity,changes:sideChanges,sides:ChosenSide}));
    onClose();
  }
  const increase = () => () => setQuantity(quantity + 1);
  const decrease = () => () =>
    quantity >= 0 ? setQuantity(quantity - 1) : setQuantity(0);

  const handleSide = (side: string) => {
    if (!ChosenSide.includes(side)) {
      setIsChosenSide([...ChosenSide, side]);
    } else {
      let ChosenSideCheck = [...ChosenSide];
      let index = ChosenSide.indexOf(side);
      if (index > -1) {
        ChosenSideCheck.splice(index, 1);
        setIsChosenSide(ChosenSideCheck);
      }
    }
  };

  const handleChangeDish = (side: string) => {
    if (!sideChanges.includes(side)) {
      setSideChanges([...sideChanges, side]);
    } else {
      let ChosenSideCheck = [...sideChanges];
      let index = sideChanges.indexOf(side);
      if (index > -1) {
        ChosenSideCheck.splice(index, 1);
        setSideChanges(ChosenSideCheck);
      }
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="dish-card-popup-container">
        <div className="dish-popup-container"></div>
        <div className="dish-card-popup">
          <div className="nav-dish-container">
            <div className="close-btn" onClick={handleClose}>
              {width > desktop - 1 ? <X_white /> : <X_dark />}
            </div>
          </div>
          <div className="dish-component">
            <div className="dish-image-container">
              <img src={dishData.image} alt="" />
            </div>
            <div className="dish-detail-container">
              <div className="title-container">
                <h3>{dishData.name}</h3>
              </div>
              <div className="description-container">
                <p>{dishData.description}</p>
              </div>
            </div>
            {width > desktop - 1 && (
              <div className="dish-category-container">
                {dishData.category?.map(
                  (categoryDish, index) =>
                    (categoryDish == DishCategory.Spicy && (
                      <div className="dish-icon">
                        <SpicyBig />
                      </div>
                    )) ||
                    (categoryDish == DishCategory.Vegan && (
                      <div className="dish-icon">
                        <VeganBig />
                      </div>
                    )) ||
                    (categoryDish == DishCategory.Vegetarian && (
                      <div className="dish-icon">
                        <VegetarianBig />
                      </div>
                    ))
                )}
              </div>
            )}
            {width > desktop - 1 && (
              <div className="price-container">
                <div className="line"></div>
                <div className="price">
                  <div className="price-icon">
                    <Shekel stroke="black"/>
                  </div>
                  <p>{dishData.price}</p>
                </div>
                <div className="line"></div>
              </div>
            )}
            <div className="edit-side-container">
              <div className="side-title-container">
                <p>Choose a side</p>
              </div>
              {dishData.side.map((side) => (
                <div className="side">
                  <div onClick={() => handleSide(side)}>
                    <CheckButton
                      checked={ChosenSide.includes(side)}
                      Circle={true}
                    />
                  </div>
                  <div>
                    <p>{side}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="edit-side-container">
              <div className="side-change-title-container">
                <p>Changes</p>
              </div>
              {dishData.changesOptions.map((side) => (
                <div className="side">
                  <div onClick={() => handleChangeDish(side)}>
                    <CheckButton
                      checked={sideChanges.includes(side)}
                      Circle={false}
                    />
                  </div>
                  <div>
                    {" "}
                    <p>{side}</p>{" "}
                  </div>
                </div>
              ))}
            </div>
            <div className="quantity-container">
              <p className="quantity-title">Quantity</p>
              <div className="quantity">
                <div className="handler-button" onClick={decrease()}>
                  <Minus />
                </div>
                <p>{quantity}</p>
                <div className="handler-button" onClick={increase()}>
                  <Plus />
                </div>
              </div>
            </div>
            <div className="add-to-bag-container">
              <ClickButton
                onClick={sendDishToCart()}
                disabled= {quantity == 0}
                children={"add to bag"}
                primaryBlack={true}
              />
            </div>
            {width < desktop && <Footer />}
          </div>
        </div>
        <div className="right-popup-container"></div>
      </div>
    </>
  );
};

export default DishComponent;
