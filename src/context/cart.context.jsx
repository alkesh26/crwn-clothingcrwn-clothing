import { createContext, useReducer } from "react"

import { createAction } from '../utils/reducer/reducer.utils'

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

const clearCartItem = (cartItems, itemToClear) => {
  const newArray = cartItems.filter((cartItem) => cartItem.id !== itemToClear.id)

  return newArray
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  total: 0,
})

const CART_ACTION_TYPES = {
  'UPDATE_CART_ITEMS': 'UPDATE_CART_ITEMS',
  'SET_IS_CART_OPEN': 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  total: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}) => {
  const [{ cartItems, isCartOpen, cartItemsCount, total }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) => {
    const totalCount = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity
    }, 0)

    const totalPrice = newCartItems.reduce((totalCost, cartItem) => {
      return totalCost + (cartItem.quantity * cartItem.price)
    }, 0)

    const payload = {
      cartItems: newCartItems,
      cartItemsCount: totalCount,
      total: totalPrice
    }

    dispatch(
      createAction(
        CART_ACTION_TYPES.UPDATE_CART_ITEMS,
        payload
      )
    )
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItems(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearItemFromCart = (itemToClear) => {
    const newCartItems = clearCartItem(cartItems, itemToClear)
    updateCartItemsReducer(newCartItems)
  }

  const setIsCartOpen = (value) => {
    dispatch(
      createAction(
        CART_ACTION_TYPES.SET_IS_CART_OPEN,
        value
      )
    )
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemsCount,
    removeItemFromCart,
    clearItemFromCart,
    total
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
