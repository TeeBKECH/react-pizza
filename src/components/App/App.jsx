import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'

import '../../assets/scss/app.scss'

const App = () => {
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
