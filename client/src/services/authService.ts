import { Chef, Dish, Restaurant } from "../models";
import axios from "axios";
import Cookies from 'js-cookie';
import { userModel } from "../store/userSlice/userSlice";
const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER_API_URL
  : import.meta.env.VITE_LOCAL_SERVER_API_URL;

  export const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, { email, password }, {withCredentials: true});
      const token = await response.headers.authorization.split(' ')[1];
      Cookies.set('token', token);
      return response.data.userData as userModel;
    } catch (e) {
      console.log(e);
    }
  };
  export const logoutUser = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post(`${BASE_URL}/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
  
      if (response.data.res_message === 200) {
        Cookies.remove('token');
      }
  
      return (response.status);
    } catch (e) {
      console.log(e);
    }
  };
  