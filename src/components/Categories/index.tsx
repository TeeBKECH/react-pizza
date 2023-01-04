import React, {FC} from 'react'
import { useSelector } from 'react-redux'
import { setCategory } from '../../store/slices/filterSlice'
import { RootState, useAppDispatch } from '../../store/store'

const Categories: FC = () => {
  const dispatch = useAppDispatch()
  const { catId } = useSelector((store: RootState) => store.filter)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const onClickCategory = (id: number) => {
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
