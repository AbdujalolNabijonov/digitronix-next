import { ArticleCategory, ArticleStatus } from "@/libs/enum/article.enu"
import { Member } from "../member/member"

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
    updatedAt: Date,
    createdAt: Date,
    memberData: Member
}