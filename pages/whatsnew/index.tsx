import LayoutProduct from "@/libs/components/layouts/LayoutProduct";
import { NextPage } from "next";

const WhatsNew: NextPage = (props: any) => {
    return (
        <>
            <h1>This is WhatsNew page</h1>
        </>
    )
}

export default LayoutProduct(WhatsNew)