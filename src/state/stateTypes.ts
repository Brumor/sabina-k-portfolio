export interface Category {
  name: string
  pictures: string[]
}

export interface IState {
  isDarkMode: boolean
  categories: Category[] | null
}
