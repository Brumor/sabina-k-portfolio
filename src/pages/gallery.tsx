import React, { FC, useEffect, useState } from "react"
import { IState, Category, Picture } from "../types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { connect } from "react-redux"
import { fetchCategoriesData } from "../state/actions"
import { bindActionCreators, AnyAction, Dispatch } from "redux"
import Loader from "../components/loader"
import NotFoundPage from "./404"
import styles from "./gallery.module.scss"
import GalleryImage from "../components/galleryImage"

interface IProps {
  categories: Category[]
  fetchCategoriesData: () => void
}

const Gallery: FC<IProps> = ({ categories, fetchCategoriesData }) => {
  const [categoryName, setCategoryName] = useState<string>("")
  const [hasWindow, setHasWindow] = useState<boolean>(false)

  useEffect(() => {
    if (categories === null) {
      fetchCategoriesData()
    }
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    setCategoryName(urlParams.get("category"))
    setHasWindow(true)
  }, [])

  if (categories === null) {
    return (
      <Layout>
        <Loader />
      </Layout>
    )
  }

  const category: Category = categories.filter(
    category => category.name === categoryName
  )[0]

  if (!category && hasWindow) {
    return <NotFoundPage />
  } else if (!hasWindow) {
    return <Loader />
  }

  const getColumns = (pictures: Picture[], number: number): Picture[][] => {
    const part_length = Math.ceil(pictures.length / number)

    const columns = []

    for (let i = 0; i < number; i++) {
      const column = pictures.slice(part_length * i, part_length * (i + 1))

      console.log(part_length * i)

      columns.push(column)
    }

    return columns
  }
  const pictureColumns = getColumns(category.pictures, 2)

  console.log(pictureColumns)

  return (
    <Layout>
      <SEO title="Gallery" />
      <h1 style={{ textAlign: "center" }}>{category.name}</h1>
      <div className={styles.container}>
        {pictureColumns.map(column => (
          <div className={styles.column}>
            {column.map(picture => (
              <GalleryImage picture={picture} />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ appReducer: { categories } }: IState) => ({
  categories,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchCategoriesData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(Gallery)
