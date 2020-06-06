import React, { FC } from "react"
import "./layout.scss"
import { Picture } from "../types"
import styles from "./galleryImage.module.scss"

interface IGalleryImage {
  picture: Picture
}

const GalleryImage: FC<IGalleryImage> = ({ picture }) => {
  return <img src={picture.url} className={`${styles.image}`} />
}

export default GalleryImage
