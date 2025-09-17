export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

const INITIAL_USER = {
  currentUser: null
}

export const userReducer = (state = INITIAL_USER, action) => {
  const { type, payload } = action

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      return state
  }
}
