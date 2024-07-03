import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  data: [],
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      state.data = action.payload;
    }
  },

})



export const {setMovie} = movieSlice.actions;
export default movieSlice.reducer