import LayoutBasic from "@/libs/components/layouts/LayoutBasic";
import { NextPage } from "next";

const Cs: NextPage = (props: any) => {
    return (
        <>
            <h1>This is a Cs page</h1>
        </>
    )
}

export default LayoutBasic(Cs)