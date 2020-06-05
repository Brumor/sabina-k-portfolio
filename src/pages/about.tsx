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
        <h2>Amatörfotograf bosatt i Arvika</h2>
        <p className={styles.aboutMeText}>
          En värmländsk 18-åring med en särskild kärlek för att fota porträtt
          och konserter, ja det beskriver nog mig ganska bra! Jag fick upp
          ögonen för fotografering när jag fick en systemkamera i
          födelsedagspresent för ett par år sedan och sedan dess har den varit
          en självklar del av min vardag. Från det att jag började fotografera
          har jag experimenterat en hel del och därmed utvecklats mycket i mitt
          bildspråk, och i dagsläget så fotar jag med en Nikon D750.
          <br />
          <br />
          Erfarenhetsmässigt så var jag fotograf för Dansstudions vårshow 2019,
          jag var en av fotograferna för UKM i Arvika 2020 och jag har fotat ett
          flertal studentkonserter. Jag har inte varit anställd för någon
          porträttfotografering men jag har mycket erfarenhet av porträttfoto,
          vilket man kan se om man klickar in i{" "}
          <Link to="/gallery?category=Porträtt">den mappen</Link>.
          <br />
          <br />
          Men egentligen, så länge jag har en kamera och ett motiv så är jag
          nöjd! Jag kan tänka mig att fota allt, och om du tycker om mitt
          bildspråk och är intresserad så tveka inte att höra av dig! Klicka in
          på <Link to="/gallery?category=Porträtt">kontaktsidan</Link> så hittar
          du alla mina uppgifter där.
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
