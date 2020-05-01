import { TOGGLE_DARKMODE, UPDATE_CATEGORIES_DATA } from "./actionTypes"

import { IState } from "./stateTypes"
import { Reducer } from "redux"

const initialState: IState = {
  isDarkMode: false,
  categories: null,
}

export const reducer: Reducer<IState> = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, isDarkMode: action.payload }
    case UPDATE_CATEGORIES_DATA:
      return { ...state, categories: action.payload }
    default:
      return state
  }
}
