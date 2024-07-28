import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: [],
  search: "",
};

export const recipeSlice = createSlice({
  name: "recipie",
  initialState,
  reducers: {
    newSearch: (state, action) => {
      state.search = action.payload;
    },
    addBook: (state, action) => {
      const bookmark = {
        id: action.payload.id,
        title: action.payload.title,
        img: action.payload.img,
        publisher: action.payload.publisher,
      };
      state.bookmarks.push(bookmark);
    },
    deleteBook: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      );
    },
    resetState: () => initialState,
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
  },
});

export const { newSearch, addBook, deleteBook, resetState, setBookmarks } =
  recipeSlice.actions;

export default recipeSlice.reducer;
