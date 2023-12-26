import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./reducers/category";
import authSlice from "./reducers/auth";
import requestSlice from "./reducers/request";
const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    auth: authSlice.reducer,
    request: requestSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
