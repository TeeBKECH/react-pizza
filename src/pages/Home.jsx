import { useContext, useEffect, useState } from 'react'

import { SearchContext } from '../components/App/App'

import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import Pizzaitem from '../components/PizzaItem/Pizzaitem'
import Skeleton from '../components/PizzaItem/Skeleton'
import Sort from '../components/Sort/Sort'

const Home = () => {
  const { searchValue } = useContext(SearchContext)
  const [pizzas, setpizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCat, setActiveCat] = useState(0)
  const [curPage, setCurPage] = useState(1)
  const [sortProperty, setSortProperty] = useState({
    name: 'Популярности ▼',
    property: 'rating',
  })

  useEffect(() => {
    const category = activeCat > 0 ? `&category=${activeCat}` : ''
    const order = sortProperty.property.includes('-') ? 'asc' : 'desc'
    const sortBy = `&sortBy=${sortProperty.property.replace('-', '')}&order=${order}`
    const search = `&search=${searchValue.toLowerCase()}`

    setIsLoading(true)
    fetch(
      `https://639d1a8c16d1763ab1593307.mockapi.io/items?page=${curPage}&limit=4${sortBy}${category}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setpizzas(json)
        setIsLoading(false)
      })
  }, [activeCat, sortProperty, curPage, searchValue])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeCat={activeCat}
          onClickCategory={(i) => setActiveCat(i)}
        />
        <Sort
          sortProperty={sortProperty}
          onClickSortItem={(obj) => setSortProperty(obj)}
        />
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
