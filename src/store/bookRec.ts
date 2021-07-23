import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoogleBook } from "../types/GoogleBook";

export interface BookRec {
  title?: string;
  authorName?: string;
  book?: GoogleBook;
  books?: GoogleBook[];
  reason?: string;
}

const initialState: BookRec = {};

const bookRecSlice = createSlice({
  name: "bookRec",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    resetTitle(state) {
      if (state.title) delete state.title;
    },
    setAuthorName(state, action: PayloadAction<string>) {
      state.authorName = action.payload;
    },
    resetAuthorName(state) {
      if (state.authorName) delete state.authorName;
    },
    setBook(state, action: PayloadAction<GoogleBook>) {
      state.book = action.payload;
    },
    setBooks(state, action: PayloadAction<GoogleBook[]>) {
      state.books = action.payload;
    },
    resetBook(state) {
      if (state.book) delete state.book;
    },
    resetBooks(state) {
      if (state.books) delete state.books;
    },
    setReason(state, action: PayloadAction<string>) {
      state.reason = action.payload;
    },
    resetReason(state) {
      if (state.reason) delete state.reason;
    },
  },
});

export const { setTitle, setAuthorName, setBook, setBooks, setReason, resetTitle, resetAuthorName, resetBook, resetBooks, resetReason } =
  bookRecSlice.actions;

export default bookRecSlice.reducer;
