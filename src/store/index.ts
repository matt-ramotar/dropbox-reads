import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import bookFormSlice from "./addBook";
import authReducer from "./auth";
import bookRecSlice from "./bookRec";
import filtersSlice from "./filters";
import searchSlice from "./search";
import userFiltersSlice from "./userFilters";
import viewsSlice from "./views";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersSlice,
    bookForm: bookFormSlice,
    userFilters: userFiltersSlice,
    search: searchSlice,
    views: viewsSlice,
    bookRec: bookRecSlice,
  },
  middleware: () => getDefaultMiddleware().concat(logger),
  devTools: process.env.REACT_APP_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
