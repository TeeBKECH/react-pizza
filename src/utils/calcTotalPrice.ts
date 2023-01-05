import { ICartItem } from '../store/slices/cartSlice'

export const calcTotalPrice = (items: ICartItem[]) =>
  items.reduce((sum, acc) => {
    return acc.price * acc.count + sum
  }, 0)
