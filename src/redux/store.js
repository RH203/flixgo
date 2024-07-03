import { configureStore } from "@reduxjs/toolkit";
import categoryMovieReducer from "./slice/categoryMovieSlice";
import movieSliceReducer from "./slice/movieSlice.js"
import homepageSliceReducer from "./slice/homepageSlice.js"
import cartSliceReducer from "./slice/cartSlice.js"

export const store = configureStore({
  reducer: {
    categoryMovie: categoryMovieReducer,
    movie: movieSliceReducer,
    homepage: homepageSliceReducer,
    cart: cartSliceReducer
  },
});
