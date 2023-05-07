import { Dish } from "./dish.model";
import { Restaurant } from "./restaurant.model";

export interface BagDish {
    dish: Dish;
    quantity: number;
    sides: string[];
    changes: string[];
  }
  
  export interface BagState {
    total: number;
    totalQuantity: number;
    restaurant: Restaurant | null;
    bagDishes: BagDish[];
    limitPurchase: boolean;
    closeNow: boolean;
    orderComment: string;
    isOrderPlaced :boolean
  }