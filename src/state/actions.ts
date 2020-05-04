import {
  TOGGLE_DARKMODE,
  FETCH_CATEGORIES_DATA_SUCCESS,
  FETCH_CATEGORIES_DATA_FAILURE,
} from "./actionTypes"
import { Category } from "../types"

export const toggleDarkMode = (isDarkMode: boolean) => ({
  type: TOGGLE_DARKMODE,
  payload: isDarkMode,
})
const GOOGLE_SCRIPT_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=wHjEPsNXKbVHpEdOVj8KkJ-5pn6XT13CPaY_-9O3Bo-3QgL-ZPEEFpi6W8n93F5GxHcIWBEuGcw2QDVgznzbeadPMrIbhumym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGuL99xyZiMjD66-KTJIeKwbB9stynZPnAbZoBaw9zV8sa8fp0GWTWyMJXJRuw5OT-SnGNRr8kiy&lib=MfaMyQ5NmFoGs8LGgRtVo5hMsjtUQM4zV"

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
