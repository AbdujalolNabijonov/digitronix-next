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