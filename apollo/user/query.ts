import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
query GetProductPc($input: String!) {
    getProductPc(input: $input) {
        memberId
        productName
        productCompany
        productType
        productStatus
        productSerie
        productProcessor
        productPocessorGen
        productGraphicsSerie
        productGraphicsType
        productDisplay
        productColor
        productCore
        productMemory
        productStorage
        poductBattery
        poductRgbType
        productWebCam
        productWeight
        productImages
        productDesc
        productPrice
        productRgbType
        productConnectivity
        productLikes
        productViews
        productComments
        productRank
        createdAt
        updatedAt
        deletedAt
        soldAt
    }
}
`