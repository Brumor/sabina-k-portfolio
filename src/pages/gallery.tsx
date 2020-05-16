import React, { FC, useEffect } from "react"
import { IState, Category } from "../types"

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
  useEffect(() => {
    if (categories === null) {
      fetchCategoriesData()
    }
  }, [])

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const categoryName = urlParams.get("category")

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

  if (!category) {
    return <NotFoundPage />
  }

  return (
    <Layout>
      <SEO title="Gallery" />
      <h1 style={{ textAlign: "center" }}>{category.name}</h1>
      <div className={styles.container}>
        {category.pictures.map(picture => (
          <GalleryImage picture={picture} />
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
