import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  catId: 0,
  sortBy: {
    name: 'Популярности ▼',
    property: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.catId = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
  },
})

export const { setCategory, setSortBy } = filterSlice.actions

export default filterSlice.reducer
