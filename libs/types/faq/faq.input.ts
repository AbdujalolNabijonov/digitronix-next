export interface FaqInquiry{
    page:number,
    limit:number,
    sort?:string,
    direction?:string,
    search:FSearch
}

interface FSearch{
    text?:string,
    faqStatus?:string,
    faqCategory?:string
}