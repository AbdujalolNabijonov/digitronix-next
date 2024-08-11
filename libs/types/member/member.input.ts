import { MemberStatus, MemberType } from "./member";

export interface MembersInquiry {
    page: number,
    limit: number,
    sort?: string,
    search: MISearch
}

interface MISearch {
    memberStatus?: MemberStatus;
    memberType?: MemberType;
    text?: string;
}
