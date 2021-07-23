import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Views {
  [key: string]: boolean | number | undefined;
  AddBookshelfDialog: boolean;
  SearchResultsPopover: boolean;
  RecommendABookModal: boolean;
  currentScene: number;
}

const initialState: Views = {
  AddBookshelfDialog: false,
  SearchResultsPopover: false,
  RecommendABookModal: false,
  currentScene: 1,
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
    setCurrentScene(state, action: PayloadAction<number>) {
      state.currentScene = action.payload;
    },
  },
});

export const { showView, hideView, setCurrentScene } = viewsSlice.actions;

export default viewsSlice.reducer;
