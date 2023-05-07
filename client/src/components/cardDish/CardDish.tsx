import {
  Shekel,
  SpicySmall,
  VeganSmall,
  VegetarianSmall,
} from "../../assets/icons";
import { Dish, DishCategory } from "../../models";
import { PopUp, DishComponent } from "../../components";
import "./cardDish.scss";
import { useEffect, useState } from "react";
import useWindowSize, { desktop } from "../../hooks/useWindowSize";
const CardDish: React.FC<{
  card: Dish;
  hidePrice?: boolean;
  dishPage?: boolean;
}> = ({ card, hidePrice, dishPage }) => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const { width } = useWindowSize();
  const handelPopup = () => {
    dishPage && setIsOpenPopup(!isOpenPopup);
    width < desktop &&
      document.body.classList.toggle("popup-is-open-container");
    width > desktop &&
      document.body.classList.remove("popup-is-open-container");
  };

  useEffect(() => {
    return function cleanup() {
      document.body.classList.remove("popup-is-open-container");
    };
  });
  return (
    <>
      <div>
        <div
          onClick={handelPopup}
          className={
            !dishPage
              ? "card-dish-container"
              : "card-dish-container dish-page-card"
          }
        >
          <div className="card-image-container">
            <img src={card.image} alt={card.name} />
          </div>
          <div className="card-text-container">
            <div className="card-text">
              <div className="card-title">
                <h3>{card.name}</h3>
              </div>
              <div className="card-description">
                {card.description && <p>{card.description}</p>}
              </div>
              {!dishPage &&
                card.category &&
                card.category.map((cardDishCategory, index) => (
                  <div key={index} className="card-category">
                    {cardDishCategory == DishCategory.Spicy && <SpicySmall />}
                    {cardDishCategory == DishCategory.Vegetarian && (
                      <VegetarianSmall />
                    )}
                    {cardDishCategory == DishCategory.Vegan && <VeganSmall />}
                  </div>
                ))}
            </div>
            {!hidePrice && (
              <div className="price-container">
                {!dishPage && <div className="price-line"></div>}
                {dishPage && <div className="price-card-line-1"></div>}
                <Shekel stroke="black" className="shekel-logo" />
                <p>{card.price}</p>
                {dishPage && <div className="price-card-line-2"></div>}
                {!dishPage && <div className="price-line"></div>}
              </div>
            )}
          </div>
        </div>
        {dishPage && isOpenPopup && (
          <PopUp>
            <DishComponent onClose={handelPopup} dishData={card} />
          </PopUp>
        )}
      </div> </>
  );
};

export default CardDish;
