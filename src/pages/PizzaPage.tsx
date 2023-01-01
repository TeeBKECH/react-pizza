import React, { useEffect, useState, FC } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { typeNames } from '../components/PizzaItem'

type PizzaState = {
  imageUrl: string;
  title: string;
  price: string;
  types: number[];
  sizes: number[];
}

const PizzaPage: FC = () => {
  const [pizza, setPizza] = useState<PizzaState>()
  const { id } = useParams()

  useEffect(() => {
    const fetchPiiza = async () => {
      try {
        const { data } = await axios.get(`https://639d1a8c16d1763ab1593307.mockapi.io/items/${id}`)
        console.log(data)
        setPizza(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPiiza()
  }, [id])

  if (!pizza) {
    return <>Загрузка...</>
  }

  return (
    <div className='container container--pizza-page'>
      <div className='pizza-block'>
        <img
          className='pizza-block__image'
          src={pizza.imageUrl}
          alt={pizza.title}
        />
        <h4 className='pizza-block__title'>{pizza.title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {pizza.types.length === 1 ? (
              <li
                key={pizza.types[0]}
                className='active'
              >
                {typeNames[pizza.types[0]]}
              </li>
            ) : (
              pizza.types.map((type) => {
                return <li key={type}>{typeNames[type]}</li>
              })
            )}
          </ul>
          <ul>
            {pizza.sizes.map((size, i) => {
              return <li key={i}>{size} см.</li>
            })}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>{pizza.price} ₽</div>
        </div>
      </div>
    </div>
  )
}

export default PizzaPage
