import React, { FC, useEffect } from "react"
import { Link } from "gatsby"
import { IState, Category } from "../types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { connect } from "react-redux"
import { fetchCategoriesData } from "../state/actions"
import { bindActionCreators, AnyAction, Dispatch } from "redux"
import Sabina from "../images/sabina.jpg"
import styles from "./about.module.scss"

interface IProps {
  categories: Category[]
  fetchCategoriesData: () => void
}
const Gallery: FC<IProps> = () => {
  return (
    <Layout>
      <SEO title="Sabina Kovacevic" />
      <div className={styles.container}>
        <h1>Sabina Kovacevic</h1>
        <img className={styles.aboutMeImage} src={Sabina} />
        <h2>Jag är en stor potatis</h2>
        <p className={styles.aboutMeText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          finibus cursus porta. Aliquam eget pulvinar orci, id vulputate diam.
          Proin eget pretium sapien, et molestie dui. Donec in libero a arcu
          varius feugiat. Vestibulum varius tempor vehicula. Quisque et pretium
          quam. Cras interdum, tellus vehicula feugiat volutpat, justo nunc
          porttitor enim, sed porttitor magna risus eget elit. Ut vel velit
          metus. Proin tempus id risus a congue.
          <br />
          <br />
          Proin tempus massa ut finibus ultrices. Pellentesque viverra, lacus
          non eleifend vehicula, lacus sem rhoncus mauris, eget viverra leo
          sapien eu ipsum. Donec in justo vehicula, scelerisque ipsum non,
          lacinia odio. Fusce eget ex feugiat, fringilla justo in, mattis justo.
          Maecenas quis sem eu nisl tincidunt lacinia. Aenean consequat
          malesuada quam in consequat. Donec finibus blandit tincidunt. Mauris
          congue tristique lacus quis laoreet. Sed vel nibh vel nunc lacinia
          vulputate. Aenean at facilisis sem. Sed suscipit consectetur posuere.
          Donec laoreet dapibus consequat. Etiam sit amet tempus lorem, a
          pulvinar justo. Aenean malesuada sapien iaculis nibh euismod, non
          sodales nulla hendrerit.
        </p>
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ appReducer: { categories } }: IState) => ({
  categories,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchCategoriesData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(Gallery)
