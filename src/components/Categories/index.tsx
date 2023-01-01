import React, {FC} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../store/slices/filterSlice'

const Categories: FC = () => {
  const dispatch = useDispatch()
  const { catId } = useSelector((store: any) => store.filter)

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
