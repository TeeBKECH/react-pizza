import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  catId: 0,
  searchValue: '',
  curPage: 1,
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
    setCurrentPage: (state, action) => {
      state.curPage = Number(action.payload)
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setFiltersFromUrl: (state, action) => {
      state.catId = Number(action.payload.catId)
      state.curPage = Number(action.payload.curPage)
      state.sortBy = action.payload.sortBy
    },
  },
})

export const { setCategory, setSortBy, setSearchValue, setFiltersFromUrl, setCurrentPage } =
  filterSlice.actions

export default filterSlice.reducer
