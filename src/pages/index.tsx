import React, { useEffect, FC } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { connect } from "react-redux"
import { IState, Category } from "../types"
import { Dispatch, bindActionCreators, AnyAction, CombinedState } from "redux"
import { fetchCategoriesData } from "../state/actions"
import Categories from "../components/categories"
import Loader from "../components/loader"

interface IProps {
  fetchCategoriesData: () => void
  toggleDarkMode: (value: boolean) => void
  categories: Category[] | null
  isDarkMode: boolean
  fetch_error: string | null
  isLoading: boolean
}

const IndexPage: FC<IProps> = ({
  fetchCategoriesData,
  categories,
  fetch_error,
  isLoading,
}) => {
  useEffect(() => {
    fetchCategoriesData()
  }, [fetch_error])

  return (
    <Layout>
      <SEO title="Home" />
      {categories && <Categories categories={categories} />}
      {isLoading ? (
        <Loader />
      ) : (
        fetch_error && (
          <p>
            Error while fetching images page, try refreshing the page in a few
            seconds; Error message: {fetch_error}
          </p>
        )
      )}
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

export default connect(mapStateToProps, mapDispatchToProp)(IndexPage)
