/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.scss"
import { IState } from "../types"
import { connect } from "react-redux"

const Layout = ({ children, isDarkMode }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("body-dark")
      document.body.classList.remove("body-light")
    } else {
      document.body.classList.add("body-light")
      document.body.classList.remove("body-dark")
    }
  }, [isDarkMode])

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const mapStateToProps = ({ appReducer: { isDarkMode } }: IState) => ({
  isDarkMode,
})

export default connect(mapStateToProps)(Layout)
