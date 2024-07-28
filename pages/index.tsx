import LayoutHome from "@/libs/components/layouts/LayoutHome";
import { NextPage } from "next";

const Home: NextPage = (props:any) => {
  return (
    <>
      <h1 className="title-home">this is home page</h1>
    </>
  );
}


export default LayoutHome(Home)