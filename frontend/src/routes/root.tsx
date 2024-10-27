import { ModeToggle } from "@/components/mode-toggle";
import Layout from "./layout";

export default function Root() {
  return (
    <>
      <Layout>
        <ModeToggle />
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-gray-500">Welcome to the home page.</p>
      </Layout>
    </>
  );
}
