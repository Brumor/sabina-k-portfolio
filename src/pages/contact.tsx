import React, { FC, useEffect } from "react"
import { Link } from "gatsby"
import { IState, Category } from "../types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { connect } from "react-redux"
import { fetchCategoriesData } from "../state/actions"
import { bindActionCreators, AnyAction, Dispatch } from "redux"

interface IProps {
  categories: Category[]
  fetchCategoriesData: () => void
}
const Gallery: FC<IProps> = ({ categories, fetchCategoriesData }) => {
  const queryString = window.location.search
  console.log(queryString)

  const urlParams = new URLSearchParams(queryString)

  const category = urlParams.get("category")

  console.log({ category, categories })

  useEffect(() => {
    if (categories === null) {
      fetchCategoriesData()
    }
  }, [])

  return (
    <Layout>
      <SEO title="Gallery" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

const mapStateToProps = ({ appReducer: { categories } }: IState) => ({
  categories,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchCategoriesData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(Gallery)
