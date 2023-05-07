import { BagDish } from "./bag.model";

export interface IOrderItem {
    dish:  string;
    quantity: number;
  }
  
  export interface IOrderData {
    user:  string;
    restaurant?: string;
    dishes: IOrderItem[];
    totalAmount: number;
    address?: string;
    status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  }