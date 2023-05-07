import axios from "axios";
import Cookies from "js-cookie";
import { IOrderData, IOrderItem } from "../models";

const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PRODUCTION_SERVER_API_URL
  : import.meta.env.VITE_LOCAL_SERVER_API_URL;

export const getAllOrders = async () => {
  try {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.get(`${BASE_URL}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    return Error("No token");
  } catch (e) {
    console.log(e);
  }
};

export const getOrder = async (id: string) => {
  try {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.get(`${BASE_URL}/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    return Error("No token");
  } catch (e) {
    console.log(e);
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.get(`${BASE_URL}/order/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    return Error("No token");
  } catch (e) {
    console.log(e);
  }
};
export const updateOrder = async (id: string, orderData: IOrderItem) => {
  try {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.put(`${BASE_URL}/order/${id}`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    return Error("No token");
  } catch (e) {
    console.log(e);
  }
};

export const addOrder = async (orderData: IOrderData) => {
  try {
    const { user, restaurant, dishes, totalAmount, address, status } = orderData;
    if (
      !user ||
      !restaurant ||
      !dishes ||
      !Array.isArray(dishes) ||
      !totalAmount ||
      !address ||
      !status
    ) {
      return false;
    }
  
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.post(`${BASE_URL}/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    return Error("No token");
  } catch (e) {
    console.log(e);
  }
};

export const deleteOrder = async (id: string) => {
  try {
    const token = Cookies.get("token");
    if (token) {
      const response = await axios.delete(`${BASE_URL}/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    return Error("No token");
  } catch (e) {
    console.log(e);
  }
};
