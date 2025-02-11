export interface ArticleInquiry {
    page: number,
    limit: number,
    direction?: string,
    sort?: string,
    search: ASearch,
}

interface ASearch {
    text?: string,
    articleCategory?: string,
    articleStatus?: string,
    memberId?: string,
}