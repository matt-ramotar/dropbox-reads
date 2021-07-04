import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: () => getDefaultMiddleware().concat(logger),
  devTools: process.env.REACT_APP_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
