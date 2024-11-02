import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Stats from "./routes/stats";
import Root from "./routes/root";
import SelectCategoriesPage from "./routes/select-categories/SelectionLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "stats",
        element: <Stats />,
      },
    ],
  },
  {
    path: "/start",
    element: <SelectCategoriesPage />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App>
        <RouterProvider router={router} />
      </App>
    </QueryClientProvider>
  </StrictMode>
);
