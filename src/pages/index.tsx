import React, { useEffect, FC } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { connect } from "react-redux"
import { IState, Category } from "../state/stateTypes"
import { Dispatch, bindActionCreators, AnyAction, CombinedState } from "redux"
import { toggleDarkMode, fetchCategoriesData } from "../state/actions"
import CategoryCard from "../components/CategoryCard"

interface IProps {
  fetchCategoriesData: () => void
  toggleDarkMode: (value: boolean) => void
  categories: Category[]
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
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {categories &&
        categories.map(category => <CategoryCard category={category} />)}
      <Link to="/page-2/">Go to page 2</Link>
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
