import React, {FC} from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../Header'

import '../../assets/scss/app.scss'

const App: FC = () => {
  return (
    <div className='wrapper'>
      <Header />

      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
