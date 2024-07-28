import { Stack } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";

const Navbar: NextPage = (props: any) => {
    const device: string = "desktop";

    if (device === "mobile") {
        return (
            <>
                <Link href={"/"}>
                    Home
                </Link>
                <Link href={"/products"}>
                    Products
                </Link>
                <Link href={"/agents"}>
                    Agents
                </Link>
                <Link href={"/community"}>
                    Community
                </Link>
                <Link href={"/mypage"}>
                    My Page
                </Link>
                <Link href={"/whatsnew"}>
                    What's New
                </Link>
                <Link href={"/cs"}>
                    CS
                </Link>
            </>
        )
    } else if (device === "desktop") {
        return (
            <>
                <Stack flexDirection={"row"} gap={"20px"}>
                    <Link href={"/"}>
                        Home
                    </Link>
                    <Link href={"/products"}>
                        Products
                    </Link>
                    <Link href={"/agents"}>
                        Agents
                    </Link>
                    <Link href={"/community"}>
                        Community
                    </Link>
                    <Link href={"/mypage"}>
                        My Page
                    </Link>
                    <Link href={"/whatsnew"}>
                        What's New
                    </Link>
                    <Link href={"/cs"}>
                        CS
                    </Link>
                </Stack>
            </>
        )
    }
}
export default Navbar