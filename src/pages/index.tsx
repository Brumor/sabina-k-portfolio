import React, { useEffect, FC } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { connect } from "react-redux"
import { IState, Category } from "../state/stateTypes"
import { Dispatch, bindActionCreators, AnyAction } from "redux"
import { toggleDarkMode, updateCategoriesData } from "../state/actions"

const GOOGLE_SCRIPT_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=wHjEPsNXKbVHpEdOVj8KkJ-5pn6XT13CPaY_-9O3Bo-3QgL-ZPEEFpi6W8n93F5GxHcIWBEuGcw2QDVgznzbeadPMrIbhumym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGuL99xyZiMjD66-KTJIeKwbB9stynZPnAbZoBaw9zV8sa8fp0GWTWyMJXJRuw5OT-SnGNRr8kiy&lib=MfaMyQ5NmFoGs8LGgRtVo5hMsjtUQM4zV"

interface IProps {
  updateCategoriesData: (data: Category[]) => void
  toggleDarkMode: (value: boolean) => void
  categories: Category[]
  isDarkMode: boolean
}

const IndexPage: FC<IProps> = ({
  updateCategoriesData,
  toggleDarkMode,
  categories,
  isDarkMode,
}) => {
  const getData = async () => {
    const res = await fetch(GOOGLE_SCRIPT_URL)
    const data = await res.json()
    console.log({ data })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

const mapStateToProps = ({ categories, isDarkMode }: IState) => ({
  categories,
  isDarkMode,
})

const mapDispatchToProp = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ toggleDarkMode, updateCategoriesData }, dispatch)

export default connect(mapStateToProps, mapDispatchToProp)(IndexPage)
