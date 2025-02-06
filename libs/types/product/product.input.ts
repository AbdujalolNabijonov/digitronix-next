interface PIASearch {
    productCategory?: string,
    productStatus?: string,
    text?: string,
}

export enum ProductStatus {
    ACTIVE = "ACTIVE",
    SOLD = "SOLD",
    DELETE = "DELETE"
}

export enum ProductType {
    LAPTOP = "LAPTOP",
    DESKTOP = "DESKTOP",
    GRAPHICS = "GRAPHICS",
    KEYBOARD = "KEYBOARD",
    MICE = "MICE",
    CHAIR = "CHAIR"
}


export interface ProductsInquiryByAdmin {
    page: number,
    limit: number,
    sort?: string,
    search: PIASearch
}

interface PriceRange {
    start: number;
    end: number
}

interface PISearch {
    text?: string
    productStatus?: string
    productCategory?: string
    brandList?: string[]
    pricesRange?: PriceRange
    processorList?: string[]
    serieList?: string[]
    displayList?: number[]
    memoryList?: number[]
    graphicsList?: string[]
    connectList?: string[]
    materialList?: string[]
}

export interface ProductsInquiry {
    page: number;
    limit: number,
    sort?: string,
    direction?: number;
    search: PISearch
}

