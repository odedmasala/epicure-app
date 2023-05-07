import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BagState, Dish, Restaurant } from "../../models";


const initialState: BagState = {
  total: 0,
  totalQuantity: 0,
  restaurant: null,
  bagDishes: [],
  limitPurchase: false,
  isOrderPlaced : false,
  closeNow: false,
  orderComment: "",
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    setBagRestaurant: (state, action: PayloadAction<Restaurant>) => {
      if (!state.bagDishes.length) state.restaurant = action.payload;
    },
    clearBagRestaurant: (state) => {
      if (!state.bagDishes.length) state.restaurant = null;
    },
    addDishToBag: (
      state,
      action: PayloadAction<{
        dish: Dish;
        quantity: number;
        sides: string[];
        changes: string[];
      }>
    ) => {
      const { dish, quantity, sides, changes } = action.payload;

      if (state.restaurant?._id !== dish.restId) {
        state.limitPurchase = true;
        return;
      }

      const existingDish = state.bagDishes.find((d) => d.dish._id === dish._id);
      if (existingDish) {
        existingDish.quantity += quantity;
      } else {
        state.bagDishes.push({ dish, quantity, sides, changes });
      }
      state.total += dish.price * quantity;
      state.totalQuantity += quantity;
      state.limitPurchase = false;
    },
    removeDishFromBag: (
      state,
      action: PayloadAction<{ dish: Dish; sides: string[]; changes: string[] }>
    ) => {
      const { dish, sides, changes } = action.payload;
      const existingDish = state.bagDishes.find((d) => d.dish._id === dish._id);
      if (!existingDish) {
        return;
      }
      state.total -= existingDish.quantity * dish.price;
      state.totalQuantity -= existingDish.quantity;
      state.bagDishes = state.bagDishes.filter(
        (d) =>
          d.dish._id !== dish._id || d.sides !== sides || d.changes !== changes
      );
      if (!state.bagDishes.length) {
        state.restaurant = null;
      }
    },
    addCommentToBag: (state, action: PayloadAction<string>) => {
      state.orderComment = action.payload;
    },
    clearCommentFromBag: (state) => {
      state.orderComment = "";
    },
    clearBag: (state) => {
      state.total = 0;
      state.totalQuantity = 0;
      state.restaurant = null;
      state.bagDishes = [];
      state.limitPurchase = false;
    },
    toggleOrderPlaced: (state, action: PayloadAction<boolean>) => {
      state.isOrderPlaced = action.payload;
    },
    closeAllNavbar(state, action: PayloadAction<boolean>) {
      state.closeNow = action.payload;
    },
  },
});

export const {
  addDishToBag,
  clearBag,
  clearBagRestaurant,
  removeDishFromBag,
  setBagRestaurant,
  closeAllNavbar,
  addCommentToBag,
  clearCommentFromBag,
  toggleOrderPlaced
} = bagSlice.actions;

export const selectBag = (state: RootState) => state.bag;
export const selectBagDishes = (state: RootState) => state.bag.bagDishes;
export const selectBagTotal = (state: RootState) => state.bag.total;
export const selectBagTotalQuantity = (state: RootState) => state.bag.totalQuantity;
export const selectBagRestaurant = (state: RootState) => state.bag.restaurant;
export const selectCloseNow = (state: RootState) => state.bag.closeNow;
export const selectComment = (state: RootState) => state.bag.orderComment;
export const selectIsOrderPlaced = (state: RootState) => state.bag.isOrderPlaced;

export const bagReducer = bagSlice.reducer ;
