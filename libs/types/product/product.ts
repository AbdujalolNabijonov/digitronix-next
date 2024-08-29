import {
    Connectivity,
    GraphicsType,
    MaterialType,
    ProductBrand,
    ProductCategory,
    ProductCore,
    ProductLabel,
    ProductSeries
} from "@/libs/enum/product.enum"
import { ProductStatus } from "./product.input"
import { Member } from "../member/member"

interface MeLiked {
    memberId: string;
    likeRefId: string;
    myFavorite: boolean;
}

export interface Product {
    _id: string,
    memberId: string,
    productName: string,
    productStatus: ProductStatus,
    productLabel?: ProductLabel,
    productBrand: ProductBrand,
    productCategory: ProductCategory,
    productPrice: number,
    productColor: string,
    productCore?: ProductCore,
    productSerie?: ProductSeries,
    productDisplay?: number,
    productMemory?: number,
    productStorage?: number,
    productWeight?: number,
    productGraphics?: GraphicsType,
    productConnectivity?: Connectivity,
    productMaterial?: MaterialType,
    productImages: string[],
    productDesc?: string[],
    productViews: number,
    productLikes: number,
    productComments: number,
    productRank: number,
    memberData?: Member,
    meLiked?: MeLiked[],
    soldAt?: Date
    deletedAt?: Date
    createdAt: Date
    updatedAt: Date
}


export const IntelCoreList = [
    'Intel 14th Gen.',
    'Intel 12th Gen',
    'Intel 11th Gen',
    'Intel 10th Gen',
    'Intel 9th Gen'
]

export const AmdCoreList = [
    "Ryzen™ AI 300 Series",
    "Ryzen™ 8000 Series",
    "Ryzen™ 7000 Series"
]

export const DisplayResolution = ["14'", "15'", "16'", "17'", "18'"];

export const BrandsList=["MSI", 'LENOVO', "ASUS", "ACER", 'LG', 'SAMSUNG']