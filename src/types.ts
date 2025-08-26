export type CollectionData = {
    componentChunkName: string
    path: string
    result: {
        data: {
            contentfulFundraiser: {
                contentful_id: string
                title: string
                path: string
                description: {
                    description: string
                }
                goal: number
                image: {
                    contentful_id: string
                    title: string
                    description: string
                    gatsbyImageData: {
                        images: [
                            {
                                sources: [
                                    {
                                        srcSet: string
                                        sizes: string
                                        type: string
                                    }
                                ]
                            }
                        ]
                        layout: string
                        backgroundColor: string
                        width: number
                        height: number
                    }
                    url: string
                }
                externalLink: string
                startDate: string
                endDate: string
                address: string
                city: string
                createdAt: string
            }
        }
        pageContext: {
            URLpath: string
        }
    }
    staticQueryHashes: string[]
}

export type Amount = {
    amount: number
    prev_amount: number
}
