import {
  Chef,
  ChefCategory,
  Dish,
  DishMealTime,
  Restaurant,
  RestaurantCategory,
} from "../models";


export const filterRestaurants = (
  receivedRestaurants: Restaurant[],
  category: string,
  ratingFilter?: number[],
  priceFilter?: [number,number],
  
): Restaurant[] => {
  let filteredRestaurants = [...receivedRestaurants];


  switch (category) {
    case RestaurantCategory.NEW:
      filteredRestaurants = filteredRestaurants.filter((r) => r.new);
      break;
    case RestaurantCategory.POPULAR:
      filteredRestaurants = filteredRestaurants.filter((r) => r.rate >= 4);
      break;
    case RestaurantCategory.OPEN:
      filteredRestaurants = filteredRestaurants.filter((r) => r.open);
      break;
    default:
      break;
  }
  if (ratingFilter && ratingFilter.length > 0) {
    filteredRestaurants = filteredRestaurants.filter((r) =>
      ratingFilter.includes(r.rate)
    );
  }
  if (priceFilter && priceFilter[0]>12 || priceFilter && priceFilter[1]< 357) {
    filteredRestaurants = filteredRestaurants.filter((r) =>
      r.lowerPrice >= priceFilter[0] && r.higherPrice <= priceFilter[1]
    );
  }
  return filteredRestaurants;
};

export const filterDishes = (
  receivedDishes: Dish[],
  category: string
): Dish[] => {
  const dishes = [...receivedDishes];
  switch (category) {
    case DishMealTime.Breakfast:
      return dishes.filter((r) => r.mealTime == DishMealTime.Breakfast);

    case DishMealTime.Lunch:
      return dishes.filter((r) => r.mealTime == DishMealTime.Lunch);

    case DishMealTime.Dinner:
      return dishes.filter((r) => r.mealTime == DishMealTime.Dinner);

    default:
      return [];
  }
};

export const filterChefs = (
  receivedChefs: Chef[],
  category: string
): Chef[] => {
  const chefs = [...receivedChefs];
  switch (category) {
    case ChefCategory.new:
      return chefs.filter((r) => r.newChef);

    case ChefCategory.Viewed:
      return chefs.filter((r) => r.viewed > 200);

    default:
      return chefs;
  }
};
