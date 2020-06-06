export default {
  flickr_api_key: process.env.GATSBY_FLICKR_API_KEY,
  flickr_user_id: process.env.GATSBY_FLICKR_USER_ID,
  cacheTime: process.env.NODE_ENV === "development" ? 0 : 3600000,
}
