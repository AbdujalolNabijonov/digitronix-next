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
export const GET_MEMBERS = gql`
    query GetMembers($input: MemberInquiry!) {
    getMembers(input: $input) {
        list {
            _id
            memberFullName
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
            memberEmail
        }
        metaCounter {
            total
        }
    }
}
`

//pRODUCT
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
//ARTICLE
export const GET_ALL_ARTICLES = gql`
    query GetAllArticles($input:ArticlesInquiry!) {
        getAllArticles(input: $input) {
            list {
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
            metaCounter {
                total
            }
        }
    }
`

//COMMENT
export const GET_COMMENTS = gql`
    query GetAllComments($input: CommentInquiry!) {
    getAllComments(input: $input) {
        list {
            _id
            commentStatus
            commentGroup
            commentContent
            commentTargetId
            commentLikes
            memberId
            commentRank
            createdAt
            updatedAt
            memberData {
                _id
                memberFullName
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
                meLiked {
                    memberId
                    likeTargetId
                    myFavorite
                }
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