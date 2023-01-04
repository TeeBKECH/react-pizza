import React, { useState, FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addCartItem, ICartItem } from '../../store/slices/cartSlice'
import { IPizzaItem } from '../../store/slices/pizzaSlice'
import { RootState, useAppDispatch } from '../../store/store'

export const typeNames = ['Тонкое', 'Традиционное']

const Pizzaitem: FC<IPizzaItem> = ({ id, title, price, imageUrl, types, sizes }) => {
  const dispatch = useAppDispatch()
  const { cartItems } = useSelector((store: RootState) => store.cart)

  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const itemCount: ICartItem | boolean = cartItems.find((el: ICartItem) => el.id === id) || false

  const onClickAddItem = () => {
    dispatch(
      addCartItem({
        id,
        title,
        price,
        imageUrl,
        type: typeNames[activeType],
        size: sizes[activeSize],
        count: 1
      }),
    )
  }

  return (
    <div className='pizza-block'>
      <Link to={`/pizza/${id}`}>
        <img
          className='pizza-block__image'
          src={imageUrl}
          alt={title}
        />
        <h4 className='pizza-block__title'>{title}</h4>
      </Link>
      <div className='pizza-block__selector'>
        <ul>
          {types.length === 1 ? (
            <li
              key={types[0]}
              className='active'
            >
              {typeNames[types[0]]}
            </li>
          ) : (
            types.map((type) => {
              return (
                <li
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={activeType === type ? 'active' : ''}
                >
                  {typeNames[type]}
                </li>
              )
            })
          )}
        </ul>
        <ul>
          {sizes.map((size, i) => {
            return (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}
              >
                {size} см.
              </li>
            )
          })}
        </ul>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>{price} ₽</div>
        <div
          onClick={onClickAddItem}
          className='button button--outline button--add'
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          &nbsp;
          <span>Добавить</span>
          {itemCount && itemCount.count > 0 && <i>{itemCount.count}</i>}
        </div>
      </div>
    </div>
  )
}

export default Pizzaitem
