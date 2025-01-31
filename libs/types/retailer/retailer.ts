import { MemberType } from "../member/member";

export interface SearchRetailer {
    page: number;
    limit: number;
    sort?: string;
    direction?: number;
    search: SRetailer
}

interface SRetailer {
    text?: string
    memberType:MemberType
}