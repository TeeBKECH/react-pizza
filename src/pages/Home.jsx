import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SearchContext } from '../components/App/App'

import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import Pizzaitem from '../components/PizzaItem/Pizzaitem'
import Skeleton from '../components/PizzaItem/Skeleton'
import Sort from '../components/Sort/Sort'

const Home = () => {
  const { catId, sortBy } = useSelector((store) => store.filter)

  const { searchValue } = useContext(SearchContext)
  const [pizzas, setpizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [curPage, setCurPage] = useState(1)

  useEffect(() => {
    const category = catId > 0 ? `&category=${catId}` : ''
    const order = sortBy.property.includes('-') ? 'asc' : 'desc'
    const sort = `&sortBy=${sortBy.property.replace('-', '')}&order=${order}`
    const search = `&search=${searchValue.toLowerCase()}`

    setIsLoading(true)
    fetch(
      `https://639d1a8c16d1763ab1593307.mockapi.io/items?page=${curPage}&limit=4${sort}${category}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setpizzas(json)
        setIsLoading(false)
      })
  }, [catId, sortBy, curPage, searchValue])

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
