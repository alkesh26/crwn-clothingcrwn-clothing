import { createContext, useState } from "react"

const addCartItems = (cartItems, productToAdd) => {
  let found = false;

  const updated = cartItems.reduce((newArray, cartItem) => {
    if(cartItem.id === productToAdd.id) {
      found = true
      newArray.push({...cartItem, quantity: cartItem.quantity + 1})
    } else {
      newArray.push(cartItem)
    }

    return newArray
  }, []);

  if(!found) {
    updated.push({...productToAdd, quantity: 1})
  }

  return updated
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd))
  }

  const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart}

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
