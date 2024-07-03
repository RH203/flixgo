import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import {DetailMovie, FavoritePage, HomePage, PopularRightNow} from "../pages";
import {PageNotFound} from "../components/index.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "",
        element: <HomePage/>
      },
      {
        path: "popular",
        element: <PopularRightNow/>
      },
      {
        path: "detail-movie/:id",
        element: <DetailMovie/>
      },
      {
        path: "favorite",
        element: <FavoritePage/>
      }
    ],
  },
  {
    path: "*", element: <PageNotFound/>
  },
]);
