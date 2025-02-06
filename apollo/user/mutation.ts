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
export const UPDATE_MEMBER = gql`
    mutation UpdateMember($input:UpdateMemberInquiry!) {
    updateMember(input: $input) {
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
export const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
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
        _id
        productGraphics
    }
}
`
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
export const CREATE_ARTICLE = gql`
    mutation CreateArticle($input: ArticleInput!) {
    createArticle(input: $input) {
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

//FOLLOW
export const SUBSCRIBE_MEMBER = gql`
    mutation FollowMember($input:String!) {
    followMember(input: $input) {
        followingId
        followerId
        createdAt
        updatedAt
    }
}
`
export const UNSUBSCRIBE_MEMBER = gql`
    mutation UnfollowMember($input:String!) {
    unfollowMember(input: $input) {
        followingId
        followerId
        createdAt
        updatedAt
    }
}
`
export const DELETE_FOLLOWER = gql`
    mutation DeleteFollower($input:String!) {
    deleteFollower(input: $input) {
        _id
        followingId
        followerId
        createdAt
        updatedAt
    }
}
`

