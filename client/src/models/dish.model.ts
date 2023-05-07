export interface Dish {
  _id: string;
  restId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  side: string[];
  changesOptions: string[];
  category: string[];
  mealTime: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export enum DishCategory {
  Spicy = "Spicy",
  Vegetarian = "Vegetarian",
  Vegan = "Vegan",
}
export enum DishMealTime {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
}
