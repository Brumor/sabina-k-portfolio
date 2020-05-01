import { TOGGLE_DARKMODE, UPDATE_CATEGORIES_DATA } from "./actionTypes"

import { AppState } from "./stateTypes"
import { Reducer } from "redux"

const initialState: AppState = {
  isDarkMode: false,
  categories: null,
}

export const appReducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, isDarkMode: action.payload }
    case UPDATE_CATEGORIES_DATA:
      return { ...state, categories: action.payload }
    default:
      return state
  }
}
