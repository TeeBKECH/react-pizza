import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  cartItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const item = state.cartItems.find((el) => el.id === action.payload.id)

      if (item) {
        item.count++
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id)
    },
  },
})

export const { addCartItem, removeCartItem } = cartSlice.actions

export default cartSlice.reducer
