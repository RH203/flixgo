import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  data: []
}

const detailSlice = createSlice({
  name: "detail-movie",
  initialState,
  reducers: {
    setDataDetail: (state, action) => {
      state.data = action.payload
    }
  }
})

export const {setDataDetail} = detailSlice.actions
export default detailSlice.reducer