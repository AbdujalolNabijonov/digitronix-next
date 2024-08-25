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