import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  items: [],
  status: 'loading',
}

export const fetchPizzas = createAsyncThunk('pizza/fetchStatus', async (url) => {
  const { data } = await axios.get(url)
  return data
})

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    getPizzas: (state, action) => {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state, action) => {
        state.items = []
        state.status = 'loading'
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'done'
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        console.log(action.error)
        state.status = 'error'
      })
  },
})

export const { getPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer
