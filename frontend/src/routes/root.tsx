import App from "@/App";
import Layout from "./layout";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <App>
      <Layout>
        <Outlet />
      </Layout>
    </App>
  );
}
