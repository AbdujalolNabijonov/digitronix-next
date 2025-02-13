import { Member } from "../member/member";

export interface Notice {
    _id: string;
    noticeTitle: string;
    noticeContent: string;
    memberData:Member
    memberId: string;
    createdAt: Date
    updatedAt: Date
}