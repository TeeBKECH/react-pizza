import React, { useEffect, useRef, useState, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSortBy } from '../../store/slices/filterSlice'

type SortItem = {
  name: string;
  property: string;
}

export const sortItems: SortItem[] = [
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

const Sort: FC = () => {
  const [showSortList, setShowSortList] = useState(false)

  const dispatch = useDispatch()
  const { sortBy } = useSelector((store: any) => store.filter)

  const sortRef = useRef<HTMLDivElement>(null)

  const onClick = (obj: SortItem) => {
    dispatch(setSortBy(obj))
    setShowSortList(false)
  }

  useEffect(() => {
    const eventHandler = (event: any) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setShowSortList(false)
      }
    }
    document.body.addEventListener('click', eventHandler)
    return () => {
      document.body.removeEventListener('click', eventHandler)
    }
  }, [])

  return (
    <div
      ref={sortRef}
      className='sort'
    >
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
