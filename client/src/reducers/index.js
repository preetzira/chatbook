import { combineReducers } from 'redux'
import rootState from './reducers'

const rootReducer = combineReducers({
  state:rootState
})

export default rootReducer
