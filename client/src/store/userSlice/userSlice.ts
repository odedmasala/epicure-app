import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface userModel{
  _id: string;
  userName: string;
  email: string;
}
const initialState: userModel = {
  _id: "",
  userName: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        _id: string;
        userName: string;
        email: string;
      }>
    ) => {
      const { _id, userName, email } = action.payload;
      state._id = _id;
      state.userName = userName;
      state.email = email;
    },
    logout: (state) => {
      state._id = "";
      state.userName = "";
      state.email = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectUserName = (state: RootState) => state.user.userName;
export const selectUserEmail = (state: RootState) => state.user.email;

export const userReducer = userSlice.reducer;
