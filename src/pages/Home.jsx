import { useEffect, useState } from 'react'

import Categories from '../components/Categories/Categories'
import Pizzaitem from '../components/PizzaItem/Pizzaitem'
import Skeleton from '../components/PizzaItem/Skeleton'
import Sort from '../components/Sort/Sort'

const Home = () => {
  const [pizzas, setpizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://639d1a8c16d1763ab1593307.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setpizzas(json)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((el, i) => {
              return (
                <Pizzaitem
                  key={el.id}
                  {...el}
                />
              )
            })}
      </div>
    </>
  )
}

export default Home
