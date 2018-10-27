import { combineReducers } from 'redux'
import appState from './appState/reducer'

const appReducer = combineReducers({
  appState,
})

export default appReducer
