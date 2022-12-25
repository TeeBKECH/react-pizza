import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'

import { setFiltersFromUrl } from '../store/slices/filterSlice'

import Categories from '../components/Categories/Categories'
import Pagination from '../components/Pagination/Pagination'
import Pizzaitem from '../components/PizzaItem/Pizzaitem'
import Skeleton from '../components/PizzaItem/Skeleton'
import Sort, { sortItems } from '../components/Sort/Sort'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { catId, sortBy, searchValue, curPage } = useSelector((store) => store.filter)

  const [pizzas, setpizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const isSearchParams = useRef(false)
  const isMounted = useRef(false)

  const fetchPizzas = () => {
    const url = `https://639d1a8c16d1763ab1593307.mockapi.io/items`
    const category = catId > 0 ? `&category=${catId}` : ''
    const order = sortBy.property.includes('-') ? '&order=asc' : '&order=desc'
    const sort = `&sortBy=${sortBy.property.replace('-', '')}`
    const search = searchValue ? `&search=${searchValue.toLowerCase()}` : ''

    setIsLoading(true)
    axios
      .get(`${url}?page=${curPage}&limit=4${sort}${order}${category}${search}`)
      .then((response) => {
        setpizzas(response.data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortBy = sortItems.find((el) => el.property === params.property)

      dispatch(setFiltersFromUrl({ ...params, sortBy }))
      isSearchParams.current = true
    }
  }, [dispatch])

  useEffect(() => {
    if (!isSearchParams.current) {
      fetchPizzas()
    }
    isSearchParams.current = false
  }, [catId, sortBy.property, curPage, searchValue])

  useEffect(() => {
    window.scrollTo(0, 0)
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
      <Pagination />
    </div>
  )
}

export default Home
