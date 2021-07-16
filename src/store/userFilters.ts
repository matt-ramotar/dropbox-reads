import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Filters {
  [userId: string]: boolean;
}

const initialState: Filters = {};

const userFiltersSlice = createSlice({
  name: "userFilters",
  initialState,
  reducers: {
    addUserFilter(state, action: PayloadAction<string>) {
      state[action.payload] = true;
    },
    removeUserFilter(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
  },
});

export const { addUserFilter, removeUserFilter } = userFiltersSlice.actions;

export default userFiltersSlice.reducer;
