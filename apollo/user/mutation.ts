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
        deletedAt
        createdAt
        updatedAt
        accessToken
    }
}
`