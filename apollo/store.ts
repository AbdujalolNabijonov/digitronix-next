import { CustomJwtPayload } from "@/libs/types/customJwtPayload";
import { makeVar } from "@apollo/client"

export const themeVar = makeVar({});

export const userVar = makeVar<CustomJwtPayload>({
    _id: '',
    memberType: '',
    memberEmail:'',
    memberStatus: '',
    memberAuthType: '',
    memberPhone: '',
    memberNick: '',
    memberFullName: '',
    memberImage: '',
    memberAddress: '',
    memberDesc: '',
    memberProducts: 0,
    memberArticles: 0,
    memberFollowers: 0,
    memberFollowings: 0,
    memberPoints: 0,
    memberLikes: 0,
    memberViews: 0,
    memberComments: 0,
    memberRank: 0,
    memberWarnings: 0,
    memberBlocks: 0
})


//@ts-ignore
export const socketVar = makeVar<WebSocket>()

