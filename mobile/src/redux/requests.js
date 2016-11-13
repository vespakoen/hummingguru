import * as api from '../api'

const initialState = {
  requests: null
}

export function getRequests() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'FETCH_REQUESTS'
    })
    api.getRequests(state.login.user.id)
      .then(requests => dispatch({
        type: 'FETCH_REQUESTS_SUCCESS',
        payload: requests
      }))
      .catch(err => dispatch({
        type: 'FETCH_REQUESTS_ERROR',
        payload: err.message
      }))
  }
}

export const actions = {
  getRequests
}

const reducers = {
  FETCH_REQUESTS: (state) => ({
    ...state,
    isLoading: true
  }),
  FETCH_REQUESTS_SUCCESS: (state, action) => ({
    ...state,
    requests: action.payload,
    isLoading: false
  }),
  FETCH_REQUESTS_ERROR: (state, action) => ({
    ...state,
    requests: null,
    error: action.payload,
    isLoading: false
  }),
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
