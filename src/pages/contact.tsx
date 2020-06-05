import React, { FC, useEffect } from "react"
import { Link } from "gatsby"
import { IState, Category } from "../types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { connect } from "react-redux"
import { fetchCategoriesData } from "../state/actions"
import { bindActionCreators, AnyAction, Dispatch } from "redux"
import Sabina from "../images/sabina_contact.jpg"
import styles from "./about.module.scss"

interface IProps {
  categories: Category[]
  fetchCategoriesData: () => void
}
const Gallery: FC<IProps> = () => {
  return (
    <Layout>
      <SEO title="Contact Sabina Kovacevic" />
      <div className={styles.container}>
        <img className={styles.aboutMeImage} src={Sabina} />
        <p className={styles.aboutMeText}>
          Vill du ha en porträttfotografering? Behöver du en fotograf för ett
          evenemang eller en konsert? Ska du gifta dig? Behöver du nya bilder
          för ditt företag? Vad än ditt ärende gäller, tveka inte att kontakta
          mig och fråga! Baserat på hur mycket arbete det kommer bli och hur
          många bilder som ska levereras så föreslår jag ett pris till dig.
          <br />
          <br />
          Mail:{" "}
          <a href="mailto:sabina.kovacevic18@gmail.com">
            sabina.kovacevic18@gmail.com
          </a>
          <br />
          Telefon: <a href="tel:070-364 85 05">070-364 85 05</a>
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
