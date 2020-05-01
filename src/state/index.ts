import { appReducer } from "./reducer"
import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

export const rootReducer = combineReducers({ appReducer })

export default preloadedState => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk))
}
