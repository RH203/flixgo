import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
};

export const categoryMovieSlice = createSlice({
  name: "categoryMovie",
  initialState,
  reducers: {
    setCategoryMovie: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const { setCategoryMovie } = categoryMovieSlice.actions;
export default categoryMovieSlice.reducer;
