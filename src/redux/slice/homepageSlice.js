import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  dataPopular: [],
  dataTvSeries: []
}

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setDataPopular: (state, action) => {
      state.dataPopular = action.payload;
    },
    setDataTvSeries: (state, action) => {
      state.dataTvSeries = action.payload;
    }
  }
})

export const {setDataPopular, setDataTvSeries} = homepageSlice.actions;
export default homepageSlice.reducer

