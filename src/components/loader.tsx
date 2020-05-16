/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import styles from "./loader.module.scss"
import { IState } from "../types"
import { connect } from "react-redux"

const Layout = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.ldsHeart}>
        <div></div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
}

const mapStateToProps = ({ appReducer: { isDarkMode } }: IState) => ({
  isDarkMode,
})

export default connect(mapStateToProps)(Layout)
