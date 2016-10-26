import * as api from '../api'

const initialState = {
  humm: null
}

export function getNextHumm() {
  return (dispatch, getState) => {
    const state = getState()
    api.getNextHumm(state.login.user.id)
      .then(nextHumm => dispatch({
        type: 'FETCH_NEXT_HUMM_SUCCESS',
        payload: nextHumm
      }))
      .catch(err => dispatch({
        type: 'FETCH_NEXT_HUMM_ERROR',
        payload: err.message
      }))
  }
}

export const actions = {
  getNextHumm
}

const reducers = {
  FETCH_NEXT_HUMM_SUCCESS: (state, action) => ({
    ...state,
    humm: action.payload
  }),
  FETCH_NEXT_HUMM_ERROR: (state, action) => ({
    ...state,
    error: action.payload
  })
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
