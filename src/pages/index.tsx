import React, { useEffect, FC } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { connect } from "react-redux"
import { IState, Category } from "../types"
import { Dispatch, bindActionCreators, AnyAction, CombinedState } from "redux"
import { toggleDarkMode, fetchCategoriesData } from "../state/actions"
import CategoryCard from "../components/CategoryCard"
import Loader from "../components/loader"

interface IProps {
  fetchCategoriesData: () => void
  toggleDarkMode: (value: boolean) => void
  categories: Category[] | null
  isDarkMode: boolean
}

const IndexPage: FC<IProps> = ({
  fetchCategoriesData,
  categories,
  toggleDarkMode,
  isDarkMode,
}) => {
  useEffect(() => {
    fetchCategoriesData()

    const darkMode = JSON.parse(localStorage.getItem("darkMode"))

    toggleDarkMode(darkMode as boolean)
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      {categories ? (
        categories.map(category => <CategoryCard category={category} />)
      ) : (
        <Loader />
      )}
    </Layout>
  )
}

const mapStateToProps = ({
  appReducer: { isDarkMode, categories },
}: IState) => ({
  isDarkMode,
  categories,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ toggleDarkMode, fetchCategoriesData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(IndexPage)
