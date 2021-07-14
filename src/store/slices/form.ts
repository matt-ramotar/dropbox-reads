import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import { GOOGLE_BOOKS_URL } from '../../util/endpoints'
import { GOOGLE_BOOKS_API_KEY } from "../../util/secrets";

// Interfaces
interface BookFormState {
    title: string,
    author: string,
    description: string,
    tags: string[],
    googleData: GoogleData
}

interface GoogleData {
    thumbnailURL: string,
    publishDate: string,
    snippet: string,
    googleLink: string,
    id: string,
}

interface BookPayload {
    title: string,
    author: string,
    description: string,
    tags?: string[]
}

interface SearchTerms {
    title: string,
    author: string,
}


// Initial State
const bookFormInitialState = {
    title: "",
    author: "",
    description: "",
    tags: [],
    googleData: {
        thumbnailURL: "",
        publishDate: "",
        snippet: "",
        googleLink: "",
        id: "",
    }
} as BookFormState

// Thunks
export const fetchBookFromGoogle = createAsyncThunk(
    'addBookForm/fetchFromGoogle',
    async (searchTerms: SearchTerms) => {
        const response: AxiosResponse = await axios.get(`${GOOGLE_BOOKS_URL}${encodeURI(searchTerms.title)}+inauthor:${encodeURI(searchTerms.author)}&key=${GOOGLE_BOOKS_API_KEY}`)
        return response.data
    }
)

// Slices
export const bookFormSlice = createSlice({
    name: 'addBookForm',
    initialState: bookFormInitialState,
    reducers: {
        setBook: (state, action: PayloadAction<BookPayload>) => {
            const { title, author, description, tags } = action.payload

            state.title = title
            state.author = author
            state.description = description
            if (tags?.length) {
                state.tags = tags
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookFromGoogle.fulfilled, (state, action) => {
                /*
                    FIXME: Find a better way to pick the right book

                    I noticed the first item is the most relevant. 
                    
                    I don't know how consistent that is and it seems fragile so 
                    will revisit this in the future
                */
                const bookData = action.payload.items[0]
                const { searchInfo, volumeInfo, selfLink, id } = bookData

                state.googleData.id = id
                state.googleData.thumbnailURL = volumeInfo.imageLinks.thumbnail
                state.googleData.publishDate = volumeInfo.publishedDate
                state.googleData.snippet = searchInfo.textSnippet
                state.googleData.googleLink = selfLink

                // Send current state to database here?
            })
    }
})

// Actions
export const { setBook } = bookFormSlice.actions