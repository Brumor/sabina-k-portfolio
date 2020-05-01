import { appReducer } from "./reducer"
import { combineReducers, createStore } from "redux"

export const rootReducer = combineReducers({ appReducer })

export default preloadedState => {
  return createStore(rootReducer, preloadedState)
}
