import {
  TOGGLE_DARKMODE,
  FETCH_CATEGORIES_DATA_SUCCESS,
  FETCH_CATEGORIES_DATA_FAILURE,
} from "./actionTypes"
import { Category } from "../types"

export const toggleDarkMode = (isDarkMode: boolean) => {
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode))

  return {
    type: TOGGLE_DARKMODE,
    payload: isDarkMode,
  }
}
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxP_78K2uS8WKYGDtwmHqDtLEHDbGUG6Qa1DOB4hlkOjZuRgTxh/exec"

export const fetchCategoriesData = () => async dispatch => {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL)
    const data: Category[] = await res.json()

    return dispatch({
      type: FETCH_CATEGORIES_DATA_SUCCESS,
      payload: data,
    })
  } catch (error) {
    return dispatch({
      type: FETCH_CATEGORIES_DATA_FAILURE,
      payload: error.message,
    })
  }
}
