import { gql } from "@apollo/client"

export const GET_ALL_MEMBERS_BY_ADMIN = gql`
query GetAllMembersByAdmin($input:MemberInquiry!) {
    getAllMembersByAdmin(input: $input) {
        list {
            _id
            memberFullName
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
            memberStatus
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
        metaCounter {
            total
        }
    }
}
`

export const GET_ALL_PRODUCTS_BY_ADMIN = gql`
query GetAllProductsByAdmin($input: ProductInquiry!) {
    getAllProductsByAdmin(input: $input) {
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
        metaCounter {
            total
        }
    }
}
`
