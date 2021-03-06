import {
  TOGGLE_DARKMODE,
  FETCH_CATEGORIES_DATA_SUCCESS,
  FETCH_CATEGORIES_DATA_FAILURE,
  FETCH_CATEGORIES_DATA,
} from "./actionTypes"

import { AppState } from "../types"
import { Reducer } from "redux"

const initialState: AppState = {
  isDarkMode: false,
  categories: null,
  isLoading: false,
  error: null,
}

export const appReducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, isDarkMode: action.payload }
    case FETCH_CATEGORIES_DATA:
      return { ...state, error: null, isLoading: true }
    case FETCH_CATEGORIES_DATA_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        error: null,
        isLoading: false,
      }
    case FETCH_CATEGORIES_DATA_FAILURE:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}
