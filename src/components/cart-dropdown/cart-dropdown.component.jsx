import { useContext } from 'react'
import './cart-dropdown.styles.scss'
import Button from '../button/button.component.jsx'

import CartItem from '../cart-item/cart-item.component.jsx'
import { CartContext } from '../../context/cart.context.jsx'

export default function CartDropdown() {
  const { cartItems } = useContext(CartContext)

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        { cartItems.map((cartItem) => <CartItem key={cartItem.id} cartItem={cartItem} />) }
      </div>
      <Button>Go To Checkout</Button>
    </div>
  )
}
