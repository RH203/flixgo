import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import { HomePage, PopularRightNow } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "popular", element: <PopularRightNow /> },
    ],
  },
]);
