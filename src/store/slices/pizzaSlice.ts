import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface IPizzaItem {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

interface IpizzasState {
  items: IPizzaItem[],
  status: 'loading' | 'done' | 'error',
}

const initialState: IpizzasState = {
  items: [],
  status: 'loading',
}

export const fetchPizzas = createAsyncThunk<IPizzaItem[], string>('pizza/fetchStatus', async (url) => {
  const { data } = await axios.get(url)
  return data
})

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    getPizzas: (state, action: PayloadAction<IPizzaItem[]>) => {
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
