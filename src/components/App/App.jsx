import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

import '../../assets/scss/app.scss'

const App = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='wrapper'>
      <Header
        searchValue={searchValue}
        setSearchValue={(value) => setSearchValue(value)}
      />

      <div className='content'>
        <Outlet context={[searchValue]} />
      </div>
    </div>
  )
}

export default App
