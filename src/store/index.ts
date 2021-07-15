import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth";
import filtersSlice from "./filters";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersSlice,
  },
  middleware: () => getDefaultMiddleware().concat(logger),
  devTools: process.env.REACT_APP_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
