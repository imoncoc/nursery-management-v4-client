import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Product from "../pages/products/Product";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Product />,
      },
      //   {
      //     path: "/movies",
      //     element: <Movies />,
      //   },
      //   {
      //     path: "/movie/:id",
      //     element: <MovieDetails />,
      //   },
      //   {
      //     path: "*",
      //     element: <NotFound />,
      //   },
    ],
  },
]);

export default router;
