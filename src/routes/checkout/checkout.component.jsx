import './checkout.styles.scss'

import { CartContext } from '../../context/cart.context'
import { useContext } from 'react'

export default function Checkout() {
  const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext)

  return (
    <div>
      {
        cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem

          return (
            <div key={id}>
              <h2>{name}</h2>
              <h2>{quantity}</h2>
              <h6 onClick={() => addItemToCart(cartItem)}>increment</h6>
              <h6 onClick={() => removeItemFromCart(cartItem)}>decrement</h6>
            </div>
          )
        })
      }
    </div>
  )
}
