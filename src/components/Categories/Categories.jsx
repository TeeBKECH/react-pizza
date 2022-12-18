import React from 'react'

const Categories = ({ activeCat, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className='categories'>
      <ul>
        {categories.map((el, i) => {
          return (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={activeCat === i ? 'active' : ''}
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
