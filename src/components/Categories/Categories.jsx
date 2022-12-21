import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../store/slices/filterSlice'

const Categories = () => {
  const dispatch = useDispatch()
  const { catId } = useSelector((store) => store.filter)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const onClickCategory = (id) => {
    dispatch(setCategory(id))
  }

  return (
    <div className='categories'>
      <ul>
        {categories.map((el, i) => {
          return (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={catId === i ? 'active' : ''}
            >
              {el}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
