import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from "./header.module.scss"
import "../utils/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from "react-redux"
import { bindActionCreators, Dispatch, AnyAction } from "redux"
import { IState } from "../types"
import { toggleDarkMode } from "../state/actions"

const Header = ({ siteTitle, toggleDarkMode, isDarkMode }) => {
  console.log({ styles })

  return (
    <header
      className={`${styles.header} ${
        isDarkMode ? styles.headerDark : styles.headerLight
      }`}
    >
      <div className={styles.logoContainer}>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
      <div className={styles.badgesContainer}>
        <a href="https://www.instagram.com/sabinakovacevic/">
          <FontAwesomeIcon
            color={isDarkMode ? "#fcfcfc" : "#414141"}
            style={{ width: 35, height: 35 }}
            icon={["fab", "instagram"]}
          />
        </a>
        <a onClick={() => toggleDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <FontAwesomeIcon
              color={"#fcfcfc"}
              style={{ width: 30, height: 30 }}
              icon="sun"
            />
          ) : (
            <FontAwesomeIcon
              color={"#414141"}
              style={{ width: 30, height: 30 }}
              icon="moon"
            />
          )}
        </a>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

const mapStateToProps = ({ appReducer: { isDarkMode } }: IState) => ({
  isDarkMode,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ toggleDarkMode }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(Header)
