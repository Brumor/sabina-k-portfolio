import React, { FC } from "react"
import "./layout.scss"
import { Category } from "../types"
import { Link } from "gatsby"
import styles from "./categories.module.scss"

interface ICategoryCard {
  category: Category
}

const CategoryCard: FC<ICategoryCard> = ({ category }) => {
  return (
    <Link
      className={styles.categoryContainer}
      to={`gallery?category=${category.name}`}
    >
      <img
        className={styles.backgroundPicture}
        src={
          category.pictures.filter(
            picture => picture.metadata.width > picture.metadata.height
          )[0].url
        }
        alt={category.name}
      />
      <p className={styles.title}>{category.name}</p>
    </Link>
  )
}

interface ICategories {
  categories: Category[]
}

const Categories: FC<ICategories> = ({ categories }) => {
  return (
    <div className={styles.container}>
      {categories.map(category => (
        <CategoryCard category={category} />
      ))}
    </div>
  )
}

export default Categories
