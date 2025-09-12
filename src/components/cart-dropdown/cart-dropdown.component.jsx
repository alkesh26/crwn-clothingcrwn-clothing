import './cart-dropdown.styles.scss'
import Button from '../button/button.component.jsx'

import CartItem from '../cart-item/cart-item.component.jsx'

export default function CartDropdown() {
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        { [].map((item) => <CartItem cartItem={item} />) }
      </div>
      <Button>Go To Checkout</Button>
    </div>
  )
}
