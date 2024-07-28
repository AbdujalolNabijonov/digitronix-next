import LayoutProduct from "@/libs/components/layouts/LayoutProduct";
import { NextPage } from "next";

const Products: NextPage = (props: any) => {
    return (
        <>
            <h1>This is product page</h1>
        </>
    )
}

export default LayoutProduct(Products)