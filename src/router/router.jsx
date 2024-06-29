import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import {HomePage, PopularRightNow, SearchPage} from "../pages";
import {PageNotFound} from "../components/index.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {path: "", element: <HomePage/>},
      {path: "popular", element: <PopularRightNow/>},
      {path: "search", element: <SearchPage/>},
    ],
  },
  {
    path: "*", element: <PageNotFound/>
  },
]);
