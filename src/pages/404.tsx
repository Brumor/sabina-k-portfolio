import React, { useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { navigate } from "gatsby"

const NotFoundPage = () => {
  useEffect(() => {
    const location = window.location.pathname
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const categoryName = urlParams.get("category")
    if (location.split("/").indexOf("gallery") !== -1 && categoryName !== "") {
      navigate(`/`)
    }
  }, [])

  return (
    <Layout>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
    </Layout>
  )
}

export default NotFoundPage
