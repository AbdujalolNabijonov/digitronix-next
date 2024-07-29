import LayoutHome from "@/libs/components/layouts/LayoutHome";
import { Stack } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = (props: any) => {
  const device: string = "desktop"
  if (device === "mobile") {
    return (
      <>
        <h1>This is mobile device</h1>
      </>
    )
  } else if (device === "desktop") {
    return (
      <>
        <Stack className="container" style={{height:"900px", paddingTop:"50px"}}>
          <h1 className="title-home">this is home page</h1>
        </Stack>
      </>
    );
  }
}


export default LayoutHome(Home)