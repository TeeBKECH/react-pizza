import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSortBy } from '../../store/slices/filterSlice'

const Sort = () => {
  const [showSortList, setShowSortList] = useState(false)

  const dispatch = useDispatch()
  const { sortBy } = useSelector((store) => store.filter)

  const sortItems = [
    {
      name: 'Популярности ▼',
      property: 'rating',
    },
    {
      name: 'Популярности ▲',
      property: '-rating',
    },
    {
      name: 'Цене ▼',
      property: 'price',
    },
    {
      name: 'Цене ▲',
      property: '-price',
    },
    {
      name: 'Алфавиту (А-Я)',
      property: '-title',
    },
    {
      name: 'Алфавиту (Я-А)',
      property: 'title',
    },
  ]

  const onClick = (obj) => {
    dispatch(setSortBy(obj))
    setShowSortList(false)
  }

  return (
    <div className='sort'>
      <div className='sort__label'>
        <b>Сортировка по:</b>
        <span onClick={() => setShowSortList((prev) => !prev)}>{sortBy.name}</span>
      </div>
      {showSortList && (
        <div className='sort__popup'>
          <ul>
            {sortItems.map((obj, i) => {
              return (
                <li
                  key={i}
                  onClick={() => onClick(obj)}
                  className={sortBy.property === obj.property ? 'active' : ''}
                >
                  {obj.name}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
