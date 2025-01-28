import { CommentGroup } from "@/libs/enum/comment.enum";
import { Member } from "../member/member";

export interface Comment {
    _id: string;
    commentGroup: CommentGroup,
    commentRank: number,
    commentTargetId: string,
    commentContent: string;
    memberData: Member;
    commentLikes:number;
    meLiked: MeLiked[];
    createdAt: Date
}

export interface MeLiked {
    memberId: string;
    likeTargetId: string;
    myFavorite: boolean;
}