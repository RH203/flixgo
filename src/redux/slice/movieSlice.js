import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  data: [],
  init: false
}

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovie: (state, action) => {
      if (state.init) {
        state.data = action.payload;
      } else if (state.data.length === 0) {
        state.data = action.payload;
      } else {
        swapData(state.data, action.payload);
      }
    },
    setInitLoad: (state, action) => {
      state.init = action.payload;
    }
  }
})

function swapData(data, newData) {
  for (let i = 0; i < data.length; i++) {
    data[i] = newData[i]
  }
}

export const {setMovie, setInitLoad} = movieSlice.actions;
export default movieSlice.reducer