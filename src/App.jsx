import Categories from './components/Categories/Categories'
import Header from './components/Header/Header'
import Pizzaitem from './components/PizzaItem/Pizzaitem'
import Sort from './components/Sort/Sort'

import './scss/app.scss'

const App = () => {
  return (
    <div className='wrapper'>
      <Header />

      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            <Pizzaitem
              title='Мексиканская пицца'
              price={500}
            />
            <Pizzaitem
              title='Чизбургер-пицца'
              price={350}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
