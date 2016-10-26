import FBSDK, {
  LoginManager,
  AccessToken
} from 'react-native-fbsdk'
import * as fb from '../fb'
import * as api from '../api'

const initialState = {
  isLoggedIn: null,
  isFetchingProfile: false,
  isFetchingUser: false
}

export function getUserByFacebookUserId(profile) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_USER'
    })
    api.getUserByFacebookUserId(profile.id)
      // when not found, create a new user
      .catch(() => api.createFacebookUser(profile))
      .then(user => dispatch({
        type: 'FETCH_USER_SUCCESS',
        payload: user
      }))
      .catch(err => dispatch({
        type: 'FETCH_USER_ERROR',
        payload: err.message
      }))
  }
}

export function fetchProfile() {
  return (dispatch, getState) => {
    const state = getState()
    dispatch({
      type: 'FETCH_PROFILE'
    })
    fb.getProfile(state.login.accessToken)
      .then(profile => {
        dispatch({
          type: 'FETCH_PROFILE_SUCCESS',
          payload: profile
        })
        dispatch(getUserByFacebookUserId(profile))
      })
      .catch(err => dispatch({
        type: 'FETCH_PROFILE_ERROR',
        payload: err
      }))
  }
}

export function login() {
  return (dispatch) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          dispatch({
            type: 'LOGIN_CANCELLED'
          })
        } else {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              const accessToken = data.accessToken.toString()
              dispatch({
                type: 'LOGIN_SUCCESS',
                payload: accessToken
              })
              dispatch(fetchProfile())
            })
        }
      })
      .catch(err => dispatch({
        type: 'LOGIN_FAILED',
        payload: err
      }))
  }
}

export const actions = {
  login
}

const reducers = {
  LOGIN_SUCCESS: (state, action) => ({
    ...state,
    isLoggedIn: true,
    accessToken: action.payload
  }),
  FETCH_PROFILE: (state) => ({
    ...state,
    isFetchingProfile: true
  }),
  FETCH_PROFILE_SUCCESS: (state) => ({
    ...state,
    isFetchingProfile: false
  }),
  FETCH_PROFILE_ERROR: (state, action) => ({
    ...state,
    isFetchingProfile: false,
    error: action.payload
  }),
  FETCH_USER: (state) => ({
    ...state,
    isFetchingUser: true
  }),
  FETCH_USER_SUCCESS: (state, action) => ({
    ...state,
    isFetchingUser: false,
    user: action.payload
  }),
  FETCH_USER_ERROR: (state, action) => ({
    ...state,
    isFetchingUser: false,
    error: action.payload
  })
}

export default (state = initialState, action) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }
  return state
}
