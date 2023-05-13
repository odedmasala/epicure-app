import { Chef, Dish, Restaurant } from "../models";
import axios from "axios";
import Cookies from 'js-cookie';
import { userModel } from "../store/userSlice/userSlice";
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER_API_URL
  : import.meta.env.VITE_LOCAL_SERVER_API_URL;

export const fetchAllRestaurants = async () => {
  try {
    let res = await axios.get<Restaurant[]>(`${BASE_URL}/restaurant`);
    const token = Cookies.get('token');    
    return res.data;
  } catch (e) {
    console.log(e);
  }
};


export const fetchRestaurantById = async (id: string) => {
  try {
    let res = await axios.get<Restaurant>(`${BASE_URL}/restaurant/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const fetchRestaurantByChefId = async (id: string) => {
  try {
    let res = await axios.get<Restaurant[]>(
      `${BASE_URL}/restaurant/chef_restaurant/${id}`
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const fetchDishes = async () => {
  try {
    let res = await axios.get<Dish[]>(`${BASE_URL}/dish`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const fetchDishesByRestId = async (id: string) => {
  try {
    let res = await axios.get<Dish[]>(
      `${BASE_URL}/dish/restaurant_dishes/${id}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getChefs = async () => {
  try {
    let res = await axios.get<Chef[]>(`${BASE_URL}/chef`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
