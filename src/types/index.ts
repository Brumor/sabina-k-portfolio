import { CombinedState } from "redux"

export interface PictureMetadata {
  width?: number
  height?: number
}

export interface Picture {
  name: string
  url: string
  metadata: PictureMetadata
}

export interface Category {
  name: string
  pictures: Picture[]
}

export interface AppState {
  isDarkMode: boolean
  categories: Category[] | null
  isLoading: boolean
  error: string | null
}

export type IState = CombinedState<{
  appReducer: AppState
}>
