import * as api from '../api'

const initialState = {
  humm: null,
  isLoading: true
}

export function getNextHumm() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'FETCH_NEXT_HUMM'
    })
    api.getNextHummForUser(state.login.user.id)
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
export function getCurrentHumm() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'FETCH_CURRENT_HUMM'
    })
    api.getCurrentHummForUser(state.login.user.id)
      .then(currentHumm => dispatch({
        type: 'FETCH_CURRENT_HUMM_SUCCESS',
        payload: currentHumm
      }))
      .catch(err => dispatch({
        type: 'FETCH_CURRENT_HUMM_ERROR',
        payload: err.message
      }))
  }
}

export const actions = {
  getNextHumm,
  getCurrentHumm
}

const reducers = {
  FETCH_CURRENT_HUMM: (state) => ({
    ...state,
    isLoading: true
  }),
  FETCH_NEXT_HUMM: (state) => ({
    ...state,
    isLoading: true
  }),
  FETCH_NEXT_HUMM_SUCCESS: (state, action) => ({
    ...state,
    humm: action.payload,
    isLoading: false
  }),
  FETCH_NEXT_HUMM_ERROR: (state, action) => ({
    ...state,
    humm: null,
    error: action.payload,
    isLoading: false
  }),
  FETCH_CURRENT_HUMM_SUCCESS: (state, action) => ({
    ...state,
    humm: action.payload,
    isLoading: false
  }),
  FETCH_CURRENT_HUMM_ERROR: (state, action) => ({
    ...state,
    humm: null,
    error: action.payload,
    isLoading: false
  })
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
