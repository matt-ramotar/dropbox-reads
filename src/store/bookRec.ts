import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types/Book";
import { BookshelfBook } from "../types/BookshelfBook";
import { GoogleBook } from "../types/GoogleBook";

export interface BookRec {
  title?: string;
  authorName?: string;
  book?: Book;
  googleBook?: GoogleBook;
  books?: GoogleBook[];
  reason?: string;
  bookshelfBook?: BookshelfBook;
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
    setGoogleBook(state, action: PayloadAction<GoogleBook>) {
      state.googleBook = action.payload;
    },
    setBook(state, action: PayloadAction<Book>) {
      state.book = action.payload;
    },
    setBooks(state, action: PayloadAction<GoogleBook[]>) {
      state.books = action.payload;
    },
    setBookshelfBook(state, action: PayloadAction<BookshelfBook>) {
      state.bookshelfBook = action.payload;
    },
    resetBook(state) {
      if (state.googleBook) delete state.googleBook;
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

export const {
  setTitle,
  setAuthorName,
  setGoogleBook,
  setBook,
  setBooks,
  setReason,
  setBookshelfBook,
  resetTitle,
  resetAuthorName,
  resetBook,
  resetBooks,
  resetReason,
} = bookRecSlice.actions;

export default bookRecSlice.reducer;
