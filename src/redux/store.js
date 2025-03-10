import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  devTools : process.env.NODE_ENV !=="production",
});

export default store;
