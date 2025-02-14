import { MeLiked } from "../comment/comment";
import { Member } from "../member/member";

export interface MeFollowed {
    followingId: string;
    followerId: string;
    myFollowing: boolean;
}

export interface FollowerObj {
    _id: string
    followingId: string
    followerId: string
    meLiked?: MeLiked[];
    meFollowed?: MeFollowed[];
    followerData?: Member;
    createdAt: Date
    updatedAt: Date
}
export interface FollowingObj {
    _id: string
    followingId: string
    followerId: string
    meLiked?: MeLiked[];
    meFollowed?: MeFollowed[];
    followingData?: Member;
    createdAt: Date
    updatedAt: Date
}
