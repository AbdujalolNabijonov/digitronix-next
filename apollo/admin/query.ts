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