import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import ErrorPage from './error-page';
import Stats from './routes/stats';
import Root from './routes/root';
import SelectCategoriesPage from './routes/select-categories/SelectionLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "stats",
        element: <Stats />,
      },
    ],
  },
  {
    path: "/select-categories",
    element: <SelectCategoriesPage/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "stats",
        element: <Stats />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
