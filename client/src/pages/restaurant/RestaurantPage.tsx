import React, { useEffect, useState } from "react";
import "./RestaurantPage.scss";
import { useParams } from "react-router-dom";
import { filterDishes, fetchDishesByRestId, fetchRestaurantById, } from "../../services";
import { Dish, DishMealTime, Restaurant } from "../../models";
import { Clock } from "../../assets/icons";
import { Card } from "../../components";
import { closeAllNavbar, setBagRestaurant, useAppDispatch, clearBagRestaurant } from "../../store";
const RestaurantPage: React.FC = () => {
  const { restId } = useParams();
  const dispatch = useAppDispatch();
  const [displayDishes, setDisplayDishes] = useState<Dish[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dishCategory, setDishCategory] = useState<string>(
    DishMealTime.Breakfast
  );
  const sendCloseNavbar = () => () => dispatch(closeAllNavbar(false));
  useEffect(() => {
    if (restId) {
      fetchRestaurantById(restId)
        .then((restaurant) => {
          setRestaurant(restaurant);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    if (restId) {
      fetchDishesByRestId(restId)
        .then((dishes) => {
          if(dishes) setDishes(dishes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    setDisplayDishes(filterDishes(dishes, dishCategory));
  }, [dishes, dishCategory]);
  useEffect(() => {
    if (restaurant) dispatch(setBagRestaurant(restaurant));
    return () => {
      if (restaurant) dispatch(clearBagRestaurant());
    };
  }, [restaurant]);
  return (
      <div onClick={sendCloseNavbar()}>
        <div className="restaurant-image-container">
          <img src={restaurant?.image} alt={restaurant?.name} className="restaurant-image" />
        </div>
        <section className="restaurant-section">
          <div className="restaurant-detail">
            <h3 className="restaurant-name">{restaurant?.name}</h3>
            <p className="restaurant-chef">{restaurant?.chef} </p>
          </div>
          <div className="open-container">
            <div className="clock-icon"> <Clock /> </div>
            {restaurant?.open ? <p>Open now</p> : <p>Close</p>}
          </div>
          <ul className="dish-category">
            <li onClick={() => setDishCategory(DishMealTime.Breakfast)} className={ dishCategory == DishMealTime.Breakfast ? "selected" : "category" } >
              <p>{DishMealTime.Breakfast}</p>
            </li>
            <li onClick={() => setDishCategory(DishMealTime.Lunch)} className={ dishCategory == DishMealTime.Lunch ? "selected" : "category" } >
              <p>{DishMealTime.Lunch}</p>
            </li>
            <li onClick={() => setDishCategory(DishMealTime.Dinner)} className={ dishCategory == DishMealTime.Dinner ? "selected" : "category" } >
              <p>{DishMealTime.Dinner}</p>
            </li>
          </ul>
          <div className="dish-list">
            {displayDishes.map((dish) => ( <Card key={dish._id} dishPage={true} card={dish} /> ))}
          </div>
        </section>
      </div>
  );
};

export default RestaurantPage;
