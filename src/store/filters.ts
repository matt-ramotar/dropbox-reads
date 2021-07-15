import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  [tag: string]: boolean;
}

const initialState: Filters = {};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter(state, action: PayloadAction<string>) {
      state[action.payload] = true;
    },
    removeFilter(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
  },
});

export const { addFilter, removeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
