export interface ImageObject {
  url: string
}

export interface DescriptionField {
  description: string
}

export interface ContentfulFundraiser {
  contentful_id: string
  title: string
  path: string
  description: DescriptionField
  goal?: number | string
  externalLink?: string
  startDate?: string
  endDate?: string
  address?: string
  city?: string
  createdAt?: string
  image: ImageObject
}

export interface CollectionData {
  result: {
    data: {
      contentfulFundraiser: ContentfulFundraiser
    }
  }
}

export interface Amount {
  amount: number
  prev_amount?: number
}
