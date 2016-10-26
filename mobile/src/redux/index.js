import { combineReducers } from 'redux'
import recorder from './recorder'
import helpOthers from './helpOthers'
import login from './login'

export default combineReducers({
  recorder,
  helpOthers,
  login
})
