import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  data: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.total += 1
    },
    decrement: (state) => {
      state.total -= 1
    },
    setDataCart: (state, action) => {
      state.data.push(action.payload)
    }
  }
})

export const {increment, decrement, setDataCart} = cartSlice.actions
export default cartSlice.reducer;