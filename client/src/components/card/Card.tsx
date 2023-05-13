import React, { useEffect } from "react";
import "./card.scss";
import { Chef, Dish, Restaurant } from "../../models";
import CardDish from "../cardDish/CardDish";
import { EmptyStar, FullStar } from "../../assets/icons";
import { Link } from "react-router-dom";

type CardItem = Dish | Restaurant | Chef;
export const Card: React.FC<{
  card: CardItem;
  week?: boolean;
  hidePrice?: boolean;
  restPage?: boolean;
  dishPage?: boolean;
}> = ({ card, week, hidePrice, restPage, dishPage }) => {
  if ("name" in card && "chef" in card)
    return (
      <>
        <Link to={`/restaurants/${card._id}`}>
          <div className={ (week && "card-restaurant-container card-chef-week") || (restPage && "card-restaurant-container card-restaurant-page-container") || "card-restaurant-container" } >
            <div className="card-image-container">
              <img src={card.image} alt={card.name} />
            </div>
            <div className="card-text-container">
              <h3>{card.name}</h3>
              {!week && <p>{card.chef}</p>}
            </div>
            {!week && ( <div className="star-rating"><DisplayStars rate={card.rate}/></div> )}
          </div>
        </Link>
      </>
    );
  if ("fullName" in card && "newChef" in card)
    return (
      <>
        <div className="card-chef-container">
          <div className={week ? "chef-header chef-of-the-week" : "chef-header"} >
            <div className="chef-image" style={{ backgroundImage: `url(${card.image})` }} >
              <div className="chef-name">
                <h3>{card.fullName}</h3>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  return <CardDish dishPage={dishPage} hidePrice={hidePrice} card={card} />;
};


export const DisplayStars:React.FC<{rate:number}> = ({rate}) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rate) {
      stars.push(
        <div key={`full-star ${i}`} className="star">
          <FullStar />
        </div>
      );
    } else {
      stars.push(
        <div key={`empty-start ${i}`} className="star">
          <EmptyStar />
        </div>
      );
    }
  }
  return <>{stars.map(star => star)}</>;
};
export default Card;
