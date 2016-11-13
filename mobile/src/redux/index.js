import { combineReducers } from 'redux'
import recorder from './recorder'
import helpOthers from './helpOthers'
import login from './login'
import requests from './requests'
import navigation from './navigation'

export default combineReducers({
  recorder,
  helpOthers,
  login,
  requests,
  navigation
})
