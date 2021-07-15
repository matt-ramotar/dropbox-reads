import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth";
import filtersSlice from "./filters";
import bookFormSlice from "./addBook";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersSlice,
    bookForm: bookFormSlice,
  },
  middleware: () => getDefaultMiddleware().concat(logger),
  devTools: process.env.REACT_APP_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
