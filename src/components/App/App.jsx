import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

import '../../assets/scss/app.scss'

export const SearchContext = createContext()

const App = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />

        <div className='content'>
          <Outlet />
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
