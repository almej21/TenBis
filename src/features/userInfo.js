import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  is_logged_in: false,
  user_id: "",
  user_name: "",
  email: "",
  member_since: "",
  balance: 0,
  orders_history: [],
  favorite_restaurants: [],
};

export const userInfoSlice = createSlice({
  //the name of the slice/state.
  name: "userInfo",

  //the initial state object.
  initialState: {
    value: initialStateValue,
  },

  //the reducers functions.
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { login, logout } = userInfoSlice.actions;

export default userInfoSlice.reducer;
