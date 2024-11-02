import Layout from "./layout";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
