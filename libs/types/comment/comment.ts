import { CommentGroup } from "@/libs/enum/comment.enum";
import { Member } from "../member/member";
import { Direction } from "@mui/material";

export interface Comment {
    _id: string;
    commentGroup: CommentGroup,
    commentRank: number,
    commentTargetId: string,
    commentContent: string;
    memberData: Member;
    commentLikes: number;
    meLiked: MeLiked[];
    createdAt: Date
}

export interface MeLiked {
    memberId: string;
    likeTargetId: string;
    myFavorite: boolean;
}

export interface CommentObj {
    commentGroup: CommentGroup;
    commentRank: number;
    commentContent: string,
    commentTargetId: string,
}

export interface CommentSearch {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: CSSearch
}

interface CSSearch {
    commentTargetId?: string
}