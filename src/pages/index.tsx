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
}

const IndexPage: FC<IProps> = ({ fetchCategoriesData, categories }) => {
  useEffect(() => {
    fetchCategoriesData()
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      {categories ? <Categories categories={categories} /> : <Loader />}
    </Layout>
  )
}

const mapStateToProps = ({ appReducer: { categories } }: IState) => ({
  categories,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchCategoriesData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(IndexPage)
