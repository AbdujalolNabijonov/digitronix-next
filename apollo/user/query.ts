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
    query GetProduct($input:String!){
        getProduct(input: $input) {
            _id
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
            meLiked {
                memberId
                likeTargetId
                myFavorite
            }
            memberData {
                _id
                memberFullName
                memberEmail
                memberStatus
                memberType
                memberAuthType
                memberPhone
                memberNick
                memberPassword
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
        }
    }
`

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts($input: ProductInquiry!) {
    getAllProducts(input: $input) {
        list {
            _id
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