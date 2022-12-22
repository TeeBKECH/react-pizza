import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  catId: 0,
  search: '',
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
    setSearchValue: (state, action) => {
      state.search = action.payload
    },
  },
})

export const { setCategory, setSortBy, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
