interface PISearch {
    productType?: string,
    productStatus?: string,
    text?: string,
}


export interface ProductsInquiry {
    page: number,
    limit: number,
    sort?: string,
    search: PISearch
}