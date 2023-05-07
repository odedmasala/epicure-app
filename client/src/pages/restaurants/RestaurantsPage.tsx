import React, { useEffect, useState } from "react";
import "./RestaurantsPage.scss";
import { filterRestaurants, fetchAllRestaurants } from "../../services";
import { Restaurant, RestaurantCategory, RestaurantRange } from "../../models";
import { Card, DistanceComponent, PriceComponent, RatingComponent, } from "../../components";
import useWindowSize, { tablet } from "../../hooks/useWindowSize";
import Dropdown from "../../components/DropdownButton/Dropdown";
import LiElement from "../../components/li/LiElement";
import { closeAllNavbar, useAppDispatch } from "../../store";

const RestaurantsPage: React.FC = () => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const sendCloseNavbar = () => () => dispatch(closeAllNavbar(false));
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>( RestaurantCategory.ALL );
  const [displayRestaurants, setDisplayRestaurants] = useState<Restaurant[]>( [] );
  const [currentRange, setCurrentRange] = useState<string>("");
  const [rating, seRrating] = useState<number[]>([]);
  const [values, setValues] = useState<[number, number]>([12, 357]);
  const handleChange = (newValues: [number, number]): void => setValues(newValues);
  const handelClickCategory = (category: string) => () => setSelectedCategory(category);
  const handelClickRange = (rangeType: string) => () => rangeType == currentRange ? setCurrentRange("") : setCurrentRange(rangeType);
  const dropdownOpenOrClose = (rangeName: string) => (rangeState: string) => rangeName == rangeState;
  const setRestaurantsData = () => {
    let condition = values[0] > 12 || values[1] < 357 || rating[0];
    if (condition) setDisplayRestaurants( filterRestaurants(restaurants, selectedCategory, rating, values) );
    if (restaurants && !condition) setDisplayRestaurants(filterRestaurants(restaurants, selectedCategory));
  };
  useEffect(() => {
    fetchAllRestaurants()
      .then((restaurants) => {
        restaurants && setRestaurants(restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => setRestaurantsData(), [restaurants,selectedCategory, rating, values]);
  return (
      <section onClick={sendCloseNavbar()} className="restaurants-section">
        <h2 className="restaurants-title">Restaurants</h2>
        <ul className="filter-restaurant">
          <li
            onClick={handelClickCategory(RestaurantCategory.ALL)}
            className={ selectedCategory == RestaurantCategory.ALL ? "selected" : "category" } >
            <p>All</p>
          </li>
          <li
            onClick={handelClickCategory(RestaurantCategory.NEW)}
            className={ selectedCategory == RestaurantCategory.NEW ? "selected" : "category" } >
            <p>New</p>
          </li>
          <li
            onClick={handelClickCategory(RestaurantCategory.POPULAR)}
            className={ selectedCategory == RestaurantCategory.POPULAR ? "selected" : "category" } >
            <p>Most Popular</p>
          </li>
          <li
            onClick={handelClickCategory(RestaurantCategory.OPEN)}
            className={ selectedCategory == RestaurantCategory.OPEN ? "selected" : "category" } >
            <p>Open Now</p>
          </li>
          <li className="map-view">
            <p>Map View</p>
          </li>
        </ul>
        <ul className="range-filter-restaurant">
          <div className={currentRange == RestaurantRange.PRICE ? "selected" : ""} >
            <Dropdown key={RestaurantRange.PRICE} onClick={handelClickRange(RestaurantRange.PRICE)} isOpen={dropdownOpenOrClose(RestaurantRange.PRICE)(currentRange)} dropdownLook={<LiElement title={RestaurantRange.PRICE} />} children={ <PriceComponent values={values} setValues={handleChange} /> } />
          </div>
          <div className="disable">
            <Dropdown key={RestaurantRange.DISTANCE} onClick={handelClickRange(RestaurantRange.DISTANCE)} isOpen={dropdownOpenOrClose(RestaurantRange.DISTANCE)( currentRange )} dropdownLook={<LiElement title={RestaurantRange.DISTANCE} />} children={<DistanceComponent />} />
          </div>
          <div className={currentRange == RestaurantRange.RATING ? "selected" : ""} >
            <Dropdown key={RestaurantRange.RATING} onClick={handelClickRange(RestaurantRange.RATING)} isOpen={dropdownOpenOrClose(RestaurantRange.RATING)(currentRange)} dropdownLook={<LiElement title={RestaurantRange.RATING} />} children={ <RatingComponent rateArr={rating} changeRate={seRrating} /> } />
          </div>
        </ul>
        {displayRestaurants.length > 0 && (
          <div className="restaurants-list" onClick={handelClickRange("")}>
            {displayRestaurants.map((restaurant) => (
              <Card key={restaurant.chef + restaurant.image} restPage={width < tablet} card={restaurant} />
            ))}
          </div>
        )}
        {displayRestaurants.length <= 0 && (
          <div className="no-restaurants">
            <h1>No restaurants within the range</h1>
            <p>
              Try different <span>&#128522;</span>
            </p>
          </div>
        )}
      </section>
  );
};

export default RestaurantsPage;
