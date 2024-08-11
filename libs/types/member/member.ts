export enum MemberStatus {
    ACTIVE = "ACTIVE",
    BLOCK = "BLOCK",
    DELETE = "DELTE"
}

export enum MemberType {
    ALL = "ALL",
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    USER = "USER"
}

export enum memberAuthType {
    PHONE = "PHONE",
    TELEGRAM = "TELEGRAM",
    EMAIL = "EMAIL"
}

export interface Member {
    _id: string,
    memberType: MemberType,
    memberEmail: string,
    memberStatus: MemberStatus,
    memberAuthType: memberAuthType,
    memberPhone: string,
    memberNick: string,
    memberFullName: string,
    memberImage: string,
    memberAddress: string,
    memberDesc: string,
    memberProducts: number,
    memberArticles: number,
    memberFollowers: number,
    memberFollowings: number,
    memberPoints: number,
    memberLikes: number,
    memberViews: number,
    memberComments: number,
    memberRank: number,
    memberWarnings: number,
    memberBlocks: number
}