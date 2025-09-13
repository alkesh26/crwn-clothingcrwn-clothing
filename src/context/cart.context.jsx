import { createContext, useState, useEffect } from "react"

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
  }, [])

  if(!found) {
    updated.push({...productToAdd, quantity: 1})
  }

  return updated
}

const removeCartItem = (cartItems, productToRemove) => {
  const updated = cartItems.reduce((newArray, cartItem) => {
    if(cartItem.id === productToRemove.id) {
      if(cartItem.quantity > 1) {
        newArray.push({...cartItem, quantity: cartItem.quantity - 1})
      }
    } else {
      newArray.push(cartItem)
    }

    return newArray
  }, [])

  return updated
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
  removeItemFromCart: () => {},
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartItemsCount, setCartItemsCount] = useState(0)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItems(cartItems, productToAdd))
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove))
  }

  useEffect(() => {
    const totalCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity
    }, 0)

    setCartItemsCount(totalCount)
  }, [cartItems])

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemsCount,
    removeItemFromCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
