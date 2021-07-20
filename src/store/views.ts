import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Views {
  [view: string]: boolean;
  AddBookshelfDialog: boolean;
  SearchResultsPopover: boolean;
}

const initialState: Views = {
  AddBookshelfDialog: false,
  SearchResultsPopover: false,
};

const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    showView(state, action: PayloadAction<string>) {
      state[action.payload] = true;
    },
    hideView(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
  },
});

export const { showView, hideView } = viewsSlice.actions;

export default viewsSlice.reducer;
