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
  fetch_error: string | null
  isLoading: boolean
}

const Gallery: FC<IProps> = ({
  categories,
  fetchCategoriesData,
  fetch_error,
  isLoading,
}) => {
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
  }, [fetch_error])

  if (fetch_error) {
    return (
      <Layout>
        <p>
          Error while fetching images page, try refreshing the page in a few
          seconds; Error message: {fetch_error}
        </p>
      </Layout>
    )
  }

  if (isLoading || categories === null) {
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
  } else if (!category && !hasWindow) {
    return <Loader />
  }

  const getColumns = (pictures: Picture[], number: number): Picture[][] => {
    const part_length = Math.ceil(pictures.length / number)

    const columns = []

    for (let i = 0; i < number; i++) {
      const column = pictures.slice(part_length * i, part_length * (i + 1))

      columns.push(column)
    }

    return columns
  }
  const pictureColumns = getColumns(category.pictures, 2)

  return (
    <Layout>
      <SEO title="Gallery" />
      <h1 style={{ textAlign: "center" }}>{category.name}</h1>
      <div className={styles.container}>
        {pictureColumns.map((column, index) => (
          <div key={index} className={styles.column}>
            {column.map(picture => (
              <GalleryImage key={picture.name} picture={picture} />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  )
}

const mapStateToProps = ({
  appReducer: { categories, error, isLoading },
}: IState) => ({
  categories,
  fetch_error: error,
  isLoading,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchCategoriesData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(Gallery)
