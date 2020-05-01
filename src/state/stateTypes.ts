import { CombinedState } from "redux"

export interface Category {
  name: string
  pictures: string[]
}

export interface AppState {
  isDarkMode: boolean
  categories: Category[] | null
}

export type IState = CombinedState<{
  appReducer: AppState
}>
