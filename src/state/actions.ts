import { TOGGLE_DARKMODE, UPDATE_CATEGORIES_DATA } from "./actionTypes"
import { Category } from "./stateTypes"

export const toggleDarkMode = (isDarkMode: boolean) => ({
  type: TOGGLE_DARKMODE,
  payload: isDarkMode,
})

export const updateCategoriesData = (data: Category[]) => ({
  type: UPDATE_CATEGORIES_DATA,
  payload: data,
})
