export interface Photoset {
  title: {
    _content: string
  }
  id: string
  owner: string
  date_update: string
}

export interface PhotoSetListResponse {
  body: {
    photosets: {
      photoset: Photoset[]
    }
  }
}

export interface PhotosetDataResponse {
  body: {
    photoset: {
      photo: {
        title: string
        id: string
      }[]
    }
  }
}

type SizeLabel =
  | "Square"
  | "Large Square"
  | "Thumbnail"
  | "Small"
  | "Small 320"
  | "Small 400"
  | "Medium"
  | "Medium 640"
  | "Medium 820"
  | "Large"
  | "Large 1600"
  | "Large 2048"
  | "Original"

export interface Size {
  label: SizeLabel
  height: number
  media: string
  source: string
  url: string
  width: number
}

export interface PhotoSizeResponse {
  body: {
    sizes: {
      size: Size[]
    }
  }
}
