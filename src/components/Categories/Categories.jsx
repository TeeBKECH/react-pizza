import React, { useState } from 'react'

const Categories = () => {
  const [activeCat, setActiveCat] = useState(0)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const onClick = (index) => {
    setActiveCat(index)
  }

  return (
    <div className='categories'>
      <ul>
        {categories.map((el, i) => {
          return (
            <li
              key={i}
              onClick={() => onClick(i)}
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
