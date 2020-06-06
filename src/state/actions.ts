import {
  Category,
  PhotoSetListResponse,
  PhotosetDataResponse,
  PhotoSizeResponse,
  StoredData,
} from "./../types/index"
import {
  TOGGLE_DARKMODE,
  FETCH_CATEGORIES_DATA_SUCCESS,
  FETCH_CATEGORIES_DATA_FAILURE,
  FETCH_CATEGORIES_DATA,
} from "./actionTypes"
import Flickr from "flickr-sdk"
import { Dispatch } from "redux"
import config from "../config"

export const toggleDarkMode = (isDarkMode: boolean) => {
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode))

  return {
    type: TOGGLE_DARKMODE,
    payload: isDarkMode,
  }
}

export const fetchCategoriesData = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_DATA })
  try {
    const data: Category[] = []
    const previousStoredData: StoredData | null = JSON.parse(
      localStorage.getItem("picture_data")
    )
    const dateString = previousStoredData?.timestamp || 0
    const now = new Date().getTime()

    if (now - dateString <= config.cacheTime) {
      return dispatch({
        type: FETCH_CATEGORIES_DATA_SUCCESS,
        payload: previousStoredData.data,
      })
    }

    const flickr = await new Flickr(config.flickr_api_key)
    const photosetsListResponse: PhotoSetListResponse = await flickr.photosets.getList(
      {
        user_id: config.flickr_user_id,
      }
    )

    const photosetList = photosetsListResponse.body.photosets.photoset

    photosetList.sort(
      (a, b) => parseInt(a.date_update) - parseInt(b.date_update)
    )

    const getCategories = photosetList.map(async photoset => {
      const category: Category = {
        name: photoset.title._content,
        pictures: [],
      }
      const photosetDataResponse: PhotosetDataResponse = await flickr.photosets.getPhotos(
        {
          photoset_id: photoset.id,
          user_id: photoset.owner,
        }
      )

      const photoList = photosetDataResponse.body.photoset.photo
      const getPhotoData = photoList.map(async photo => {
        const photoSizeResponse: PhotoSizeResponse = await flickr.photos.getSizes(
          {
            photo_id: photo.id,
          }
        )

        const pictureData = photoSizeResponse.body.sizes.size.filter(
          size => size.label === "Large"
        )[0]

        return {
          name: photo.title,
          url: pictureData.source,
          metadata: {
            width: pictureData.width,
            height: pictureData.height,
          },
        }
      })

      const pictures = await Promise.all(getPhotoData)

      category.pictures.push(...pictures)
      return category
    })

    const categories = await Promise.all(getCategories)

    data.push(...categories)

    const storedData: StoredData = { data, timestamp: new Date().getTime() }
    localStorage.setItem("picture_data", JSON.stringify(storedData))

    return dispatch({
      type: FETCH_CATEGORIES_DATA_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.error("bonk", error)
    return dispatch({
      type: FETCH_CATEGORIES_DATA_FAILURE,
      payload: error.message ?? error ?? "",
    })
  }
}
