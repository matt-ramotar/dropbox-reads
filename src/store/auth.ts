import { createAction, createReducer } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
}

export const setToken = createAction<string>("auth/setToken");

const initialState = {
  token: "",
} as AuthState;

const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setToken, (state, action) => {
    state.token = action.payload;
  });
});

export default authReducer;
