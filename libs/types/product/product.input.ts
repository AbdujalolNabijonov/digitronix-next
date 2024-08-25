interface PISearch {
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
    PERIPHERAL = "PERIPHERAL",
    CHAIR = "CHAIR"
}


export interface ProductsInquiryByAdmin {
    page: number,
    limit: number,
    sort?: string,
    search: PISearch
}

