import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import Pizzaitem from '../components/PizzaItem/Pizzaitem'
import Skeleton from '../components/PizzaItem/Skeleton'
import Sort from '../components/Sort/Sort'

const Home = () => {
  const { catId, sortBy, search } = useSelector((store) => store.filter)

  const [pizzas, setpizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [curPage, setCurPage] = useState(1)

  useEffect(() => {
    const category = catId > 0 ? `&category=${catId}` : ''
    const order = sortBy.property.includes('-') ? 'asc' : 'desc'
    const sort = `&sortBy=${sortBy.property.replace('-', '')}&order=${order}`
    const searchValue = `&search=${search.toLowerCase()}`

    setIsLoading(true)
    axios
      .get(
        `https://639d1a8c16d1763ab1593307.mockapi.io/items?page=${curPage}&limit=4${sort}${category}${searchValue}`,
      )
      .then((response) => {
        setpizzas(response.data)
        setIsLoading(false)
      })
  }, [catId, sortBy, curPage, search])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items content__items--pizzas'>
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
      <Pagination onChangePage={(num) => setCurPage(num)} />
    </div>
  )
}

export default Home
