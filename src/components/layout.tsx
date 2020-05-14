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
import { toggleDarkMode } from "../state/actions"
import { bindActionCreators, AnyAction, Dispatch } from "redux"

const Layout = ({ children, isDarkMode, toggleDarkMode }) => {
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
    const darkMode = JSON.parse(localStorage.getItem("darkMode"))

    toggleDarkMode(darkMode as boolean)
  })

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
      <div className={"content-container"}>
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

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ toggleDarkMode }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(Layout)
