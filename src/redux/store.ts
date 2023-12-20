import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/category";
import authSlice from "./reducers/auth";
const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
