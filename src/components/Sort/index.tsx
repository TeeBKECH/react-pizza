import React, { useEffect, useRef, useState, FC } from 'react'
import { useSelector } from 'react-redux'

import { ISortBy, setSortBy } from '../../store/slices/filterSlice'
import { RootState, useAppDispatch } from '../../store/store';

type PopupType = MouseEvent & {
  path: Node[]
}

export const sortItems: ISortBy[] = [
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

  const dispatch = useAppDispatch()
  const { sortBy } = useSelector((store: RootState) => store.filter)

  const sortRef = useRef<HTMLDivElement>(null)

  const onClick = (obj: ISortBy) => {
    dispatch(setSortBy(obj))
    setShowSortList(false)
  }

  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      const e = event as PopupType
      if (sortRef.current && !e.path.includes(sortRef.current)) {
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
