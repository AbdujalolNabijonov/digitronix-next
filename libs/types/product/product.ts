import {
    Connectivity,
    GraphicsType,
    MaterialType,
    ProductBrand,
    ProductCategory,
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
    productOS?: string,
    productCore?: string,
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
    "i9",
    "i7",
    "i5",
    "i3",
    "Pentium",
    "Celeron"
]

export const AmdCoreList = [
    "Ryzen AI 300",
    "Ryzen 8000",
    "Ryzen 7000"
]

export const DisplayResolution = ["14", "15", "16", "17", "18"];

export const BrandsList = ["MSI", 'LENOVO', "ASUS", "ACER", 'LG', 'SAMSUNG']