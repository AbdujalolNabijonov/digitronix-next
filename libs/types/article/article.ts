import { ArticleCategory, ArticleStatus } from "@/libs/enum/article.enum"
import { Member } from "../member/member"
import { MeLiked } from "../comment/comment"

export interface Article {
    _id: string,
    memberId: string,
    articleCategory: ArticleCategory,
    articleStatus: ArticleStatus,
    articleTitle: string,
    articleContext: string,
    articleImage: string,
    articleLikes: number,
    articleViews: number,
    articleComments: number,
    meLiked:MeLiked[]
    updatedAt: Date,
    createdAt: Date,
    memberData: Member
}