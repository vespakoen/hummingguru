const initialState = {
  page: 'login'
}

export function navigateTo(page) {
  return {
    type: 'NAVIGATE_TO',
    payload: page
  }
}

export const actions = {
  navigateTo
}

const reducers = {
  NAVIGATE_TO: (state, action) => ({
    ...state,
    page: action.payload
  })
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
