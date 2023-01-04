import { useEffect, useRef, FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import { setFiltersFromUrl } from '../store/slices/filterSlice'
import { fetchPizzas } from '../store/slices/pizzaSlice'
import { RootState, useAppDispatch } from '../store/store'

import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import Pizzaitem from '../components/PizzaItem'
import Skeleton from '../components/PizzaItem/Skeleton'
import Sort, { sortItems } from '../components/Sort'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { catId, sortBy, searchValue, curPage } = useSelector((store: RootState) => store.filter)
  const { items, status } = useSelector((store: RootState) => store.pizza)

  const isSearchParams = useRef(false)
  const isMounted = useRef(false)

  const getPizzas = () => {
    const category = catId > 0 ? `&category=${catId}` : ''
    const order = sortBy.property.includes('-') ? '&order=asc' : '&order=desc'
    const sort = `&sortBy=${sortBy.property.replace('-', '')}`
    const search = searchValue ? `&search=${searchValue.toLowerCase()}` : ''
    const url = `https://639d1a8c16d1763ab1593307.mockapi.io/items?page=${curPage}&limit=4${sort}${order}${category}${search}`

    dispatch(fetchPizzas(url))

    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sorting = sortItems.find((el) => el.property === params.property) || sortItems[0]

      dispatch(setFiltersFromUrl({
        catId: Number(params.catId),
        curPage: Number(params.curPage),
        sortBy: sorting
      }))
      isSearchParams.current = true
    }
  }, [dispatch])

  useEffect(() => {
    if (!isSearchParams.current) {
      getPizzas()
    }
    isSearchParams.current = false
  }, [catId, sortBy.property, curPage, searchValue])

  useEffect(() => {
    if (isMounted.current) {
      const queryParams = qs.stringify({
        catId,
        curPage,
        property: sortBy.property,
      })
      navigate(`?${queryParams}`)
    }
    isMounted.current = true
  }, [catId, sortBy.property, curPage, navigate])

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items content__items--pizzas'>
        {status === 'loading' && [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
        {status === 'error' && <h2>Ошибка загрузки пицц</h2>}
        {status === 'done' &&
          items.map((el, i) => {
            return (
              <Pizzaitem
                key={el.id}
                {...el}
              />
            )
          })}
      </div>
      <Pagination />
    </div>
  )
}

export default Home
