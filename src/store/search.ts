import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Search {
  query?: string;
}

const initialState: Search = {};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    resetQuery(state) {
      delete state.query;
    },
  },
});

export const { setQuery, resetQuery } = searchSlice.actions;

export default searchSlice.reducer;
