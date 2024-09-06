import { gql } from "@apollo/client";

export const LOG_IN = gql`
query Login($input: LoginInput!) {
    login(input: $input) {
        _id
        memberFullName
        memberType
        memberAuthType
        memberPhone
        memberNick
        memberImage
        memberAddress
        memberDesc
        memberProducts
        memberArticles
        memberFollowers
        memberFollowings
        memberPoints
        memberLikes
        memberViews
        memberComments
        memberRank
        memberWarnings
        memberBlocks
        accessToken
        deletedAt
        createdAt
        updatedAt
        memberEmail
        memberStatus
    }
}
`

export const GET_PRODUCT = gql`
query GetProductPc($input: String!) {
    getProductPc(input: $input) {
        memberId
        productName
        productCompany
        productType
        productStatus
        productSerie
        productProcessor
        productPocessorGen
        productGraphicsSerie
        productGraphicsType
        productDisplay
        productColor
        productCore
        productMemory
        productStorage
        poductBattery
        poductRgbType
        productWebCam
        productWeight
        productImages
        productDesc
        productPrice
        productRgbType
        productConnectivity
        productLikes
        productViews
        productComments
        productRank
        createdAt
        updatedAt
        deletedAt
        soldAt
    }
}
`

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts($input: ProductInquiry!) {
    getAllProducts(input: $input) {
        list {
            memberId
            productName
            productStatus
            productLabel
            productBrand
            productCategory
            productPrice
            productColor
            productCore
            productSerie
            productDisplay
            productMemory
            productStorage
            productWeight
            productGraphics
            productConnectivity
            productMaterial
            productImages
            productDesc
            productViews
            productLikes
            productComments
            productRank
            soldAt
            deletedAt
            createdAt
            updatedAt
            memberData {
                _id
                memberFullName
                memberEmail
                memberStatus
                memberType
                memberAuthType
                memberPhone
                memberNick
                memberImage
                memberAddress
                memberDesc
                memberProducts
                memberArticles
                memberFollowers
                memberFollowings
                memberPoints
                memberLikes
                memberViews
                memberComments
                memberRank
                memberWarnings
                memberBlocks
                accessToken
                deletedAt
                createdAt
                updatedAt
            }
            meLiked {
                memberId
                likeTargetId
                myFavorite
            }
        }
        metaCounter {
            total
        }
    }
}

`