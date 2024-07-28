import LayoutHome from "@/libs/components/layouts/LayoutHome";
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
        <h1 className="title-home">this is home page</h1>
      </>
    );
  }
}


export default LayoutHome(Home)