import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ISortBy {
  name: string;
  property: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title';
}

export interface IFilterState {
  catId: number;
  searchValue?: string;
  curPage: number;
  sortBy: ISortBy,
}

const initialState: IFilterState = {
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
    setCategory: (state, action: PayloadAction<number>) => {
      state.catId = action.payload
    },
    setSortBy: (state, action: PayloadAction<ISortBy>) => {
      state.sortBy = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.curPage = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setFiltersFromUrl: (state, action: PayloadAction<IFilterState>) => {
      state.catId = Number(action.payload.catId)
      state.curPage = Number(action.payload.curPage)
      state.sortBy = action.payload.sortBy
    },
  },
})

export const { setCategory, setSortBy, setSearchValue, setFiltersFromUrl, setCurrentPage } =
  filterSlice.actions

export default filterSlice.reducer
