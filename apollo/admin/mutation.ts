import { gql } from "@apollo/client"

export const UPDATE_MEMBER_BY_ADMIN = gql`
mutation UpdateMemberByAdmin($input:UpdateMemberInquiry!) {
    updateMemberByAdmin(input: $input) {
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
`

export const UPDATE_PRODUCT_BY_ADMIN = gql`
mutation UpdateProductByAdmin($input:UpdateProduct!) {
    updateProductByAdmin(input: $input) {
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
    }
}
`