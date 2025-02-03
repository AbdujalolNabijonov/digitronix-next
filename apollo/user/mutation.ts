import { gql } from "@apollo/client"

export const SIGN_UP = gql`
mutation Signup($input: MemberInput!) {
    signup(input: $input) {
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
        deletedAt
        createdAt
        updatedAt
        accessToken
    }
}
`
export const LIKE_TARGET_MEMBER = gql`
    mutation LikeTargetMember($input:String!) {
    likeTargetMember(input: $input) {
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
`
//PRODUCT
export const LIKE_TARGET_PRODUCT = gql`
    mutation LikeTargetProduct($input: String!) {
    likeTargetProduct(input: $input) {
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
        productOS
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

//COMMENT
export const CREATE_COMMENT = gql`
    mutation CreateComment($input: CommentInput!) {
        createComment(input: $input) {
            _id
            commentStatus
            commentGroup
            commentContent
            commentTargetId
            memberId
            createdAt
            updatedAt
            commentRank
        }
    }
`

export const LIKE_TARGET_COMMENT = gql`
    mutation LikeTargetComment($input:String!) {
    likeTargetComment(input: $input) {
        _id
        commentStatus
        commentGroup
        commentContent
        commentTargetId
        memberId
        commentRank
        commentLikes
        createdAt
        updatedAt
    }
}
`

//ARTICLE
export const LIKE_TARGET_ARTICLE = gql`
    mutation LikeTargetArticle($input: String!) {
    likeTargetArticle(input: $input) {
        _id
        memberId
        articleCategory
        articleStatus
        articleTitle
        articleContext
        articleImage
        articleLikes
        articleViews
        articleComments
        updatedAt
        createdAt
    }
}

`