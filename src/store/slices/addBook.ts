import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { VERSION } from "../../util/endpoints";
import { API_URL } from "../../util/secrets";
import { buildGoogleBooksQuery } from "../../helpers";
import prepareBookForDB from "../../lib/prepareBookForDB";
import { GoogleBookData } from "../../types/GoogleBookData";
import { BookRequest } from "../../types/BookRequest";
import SafeUser from "../../types/SafeUser";

// Interfaces
interface AddBookState {
  title: string;
  author: string;
  description: string;
  tags: string[];
  fetchStatus: string;
  sendToDBStatus: string;
  googleData: GoogleData;
}

interface GoogleData {
  items: GoogleBookData[];
  kind: string;
  totalItems: number;
}

interface BookPayload {
  title: string;
  author: string;
  description: string;
  tags?: string[];
}

interface DataToDB {
  book: GoogleBookData;
  user: SafeUser;
}

interface SearchTerms {
  title: string;
  author: string;
}

// Initial State
const initialState = {
  title: "",
  author: "",
  description: "",
  tags: [],
  fetchStatus: "idle",
  sendToDBStatus: "idle",
  googleData: {
    items: [],
    kind: "",
    totalItems: 0,
  },
} as AddBookState;

// Thunks
export const fetchBooksFromGoogle = createAsyncThunk("addBookForm/fetchFromGoogle", async (searchTerms: SearchTerms) => {
  const response: AxiosResponse = await axios.get(buildGoogleBooksQuery(searchTerms.title, searchTerms.author));
  return response.data;
});

export const sendBookToDB = createAsyncThunk("addBookForm/sendToDB", async (dataToDB: DataToDB) => {
  const bookToDB: BookRequest = await prepareBookForDB(dataToDB.book, dataToDB.user);
  if (!bookToDB.authorId) {
    throw new Error("Book is missing authorID");
  }
  const response: AxiosResponse = await axios.post(`${API_URL}${VERSION}/books`, bookToDB);

  return response.data;
});

// Slices
export const bookFormSlice = createSlice({
  name: "addBookForm",
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<BookPayload>) => {
      const { title, author, description, tags } = action.payload;

      state.title = title;
      state.author = author;
      state.description = description;
      if (tags?.length) {
        state.tags = tags;
      }
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setFetchStatusToIdle: (state) => {
      state.fetchStatus = "idle";
    },
    setSendToDBStatusToIdle: (state) => {
      state.sendToDBStatus = "idle";
    },
    clearGoogleData: (state) => {
      state.googleData = { items: [], kind: "", totalItems: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksFromGoogle.pending, (state) => {
        state.fetchStatus = "pending";
      })
      .addCase(fetchBooksFromGoogle.rejected, (state) => {
        state.fetchStatus = "rejected";
      })
      .addCase(fetchBooksFromGoogle.fulfilled, (state, action: PayloadAction<GoogleData>) => {
        state.fetchStatus = "fulfilled";
        state.googleData = action.payload;
      })
      .addCase(sendBookToDB.pending, (state) => {
        state.sendToDBStatus = "pending";
      })
      .addCase(sendBookToDB.rejected, (state) => {
        state.sendToDBStatus = "rejected";
      })
      .addCase(sendBookToDB.fulfilled, (state) => {
        state.sendToDBStatus = "fulfilled";
      });
  },
});

// Actions
export const { setBook, setDescription, setFetchStatusToIdle, setSendToDBStatusToIdle, clearGoogleData } = bookFormSlice.actions;
