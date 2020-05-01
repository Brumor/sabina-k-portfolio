import React, { FC } from "react"
import "./layout.scss"
import { Category } from "../state/stateTypes"
import { Link } from "gatsby"

interface IProps {
  category: Category
}

const CategoryCard: FC<IProps> = ({ category }) => {
  return (
    <Link
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0 1.0875rem 1.45rem`,
      }}
      to="./page-2"
    >
      {category.name}
    </Link>
  )
}

export default CategoryCard
