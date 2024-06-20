import { configureStore } from "@reduxjs/toolkit";
import categoryMovieReducer from "./slice/categoryMovieSlice";

export const store = configureStore({
  reducer: {
    categoryMovie: categoryMovieReducer,
  },
});
